// /api/claude.js
//
// Thin streaming proxy in front of Anthropic.
// Fetches live KB via in-process context helper, prepends a role preamble,
// then pipes the SSE stream back to the frontend unchanged.
//
// Frontend sends: { role: 'owner'|'owner_brian'|'ops'|'crew'|'admin', messages: [...] }
// Backend owns: model, max_tokens, system prompt.
//
// CRITICAL: stream:true is forced on every call. Do not refactor back to
// buffered JSON — the frontend reads SSE chunks with content_block_delta events.

import { getContext } from './context.js';

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1000;

// Role-specific framing. The backend owns this now (was previously inlined
// in the frontend's buildKB). Keep it short — the living docs do the heavy
// lifting for actual content; this just tells Claude who it's talking to.
const ROLE_PREAMBLES = {
  owner: `CURRENT USER: Sam (owner). Focus on revenue, close rates, ROI, utilization, approval queue. He makes pricing decisions on re-roofs.`,
  owner_brian: `CURRENT USER: Brian (director of marketing). Focus heavily on marketing — lead source attribution, cost per lead, channel ROI, campaign ideas, deliverability. Full access but questions usually marketing/growth-framed.`,
  ops: `CURRENT USER: Brittany (operations). Focus on what needs doing now, scheduling, crew coordination, keeping her unblocked. She does NOT approve pricing — that's Sam.`,
  crew: `CURRENT USER: Crew member. Focus on TODAY'S JOBS only — addresses, times, customer notes, materials, directions. Do not discuss pipeline, revenue, approvals, or internal ops. Keep answers short and field-practical.`,
  admin: `CURRENT USER: Admin (Obsidian Labs). Full access. Questions may be about the project/build itself, not just client operations.`
};

function buildSystemPrompt({ kb, role }) {
  const clientName = process.env.CLIENT_NAME || 'the client';
  const preamble = `You are Atlas, the AI brain for ${clientName}. You have access to the client's living project docs below — use them as the source of truth for anything about this business. Be direct and operational. Draft messages ready to send. Use real names and numbers. Keep answers tight.`;
  const rolePreamble = ROLE_PREAMBLES[role] || ROLE_PREAMBLES.ops;
  return `${preamble}\n\n${rolePreamble}\n\n---\n\n${kb}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Anthropic API key not configured' });
  }

  const { messages, role } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const ctx = await getContext();
    const system = buildSystemPrompt({ kb: ctx.kb, role });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system,
        messages,
        stream: true
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json(err);
    }

    // Pipe SSE stream straight through. Frontend parses content_block_delta events.
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      res.write(chunk);
    }

    res.end();
  } catch (err) {
    // If headers already sent (mid-stream), we can't send JSON — just close.
    if (res.headersSent) {
      try { res.end(); } catch {}
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}
