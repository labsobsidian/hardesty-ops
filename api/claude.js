// /api/claude.js
//
// Thin streaming proxy in front of Anthropic.
// Fetches live KB via in-process context helper, prepends a role preamble,
// then pipes the SSE stream back to the frontend unchanged.
//
// Frontend sends: { role: 'owner'|'owner_brian'|'ops'|'crew'|'admin', messages: [...] }
// Backend owns: model, max_tokens, system prompt, and RICH OUTPUT INSTRUCTIONS.
//
// CRITICAL: stream:true is forced on every call. Do not refactor back to
// buffered JSON — the frontend reads SSE chunks with content_block_delta events.

import { getContext } from './context.js';

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 2000;

// ─────────────────────────────────────────────────────────────────────
// ROLE PREAMBLES
// Each role gets a tight identity framing. owner_brian is the heaviest
// because he can trigger rich output generation.
// ─────────────────────────────────────────────────────────────────────
const ROLE_PREAMBLES = {
  owner: `CURRENT USER: Sam (owner). Focus on revenue, close rates, ROI, utilization, approval queue. He makes pricing decisions on re-roofs. Plain prose, direct.`,

  owner_brian: `CURRENT USER: Brian (Director of Marketing).

Brian owns marketing for Hardesty. He cares about: lead source attribution, cost per lead, channel ROI, AI search visibility, competitive position, campaign ideas, deliverability, and content pipeline. He reports to Sam and coordinates with Brittany for operational context.

When Brian asks questions, answer with marketing-forward framing — numbers, actions, projected impact. Don't hedge. If he asks for an analysis, give it with a clear recommendation.

RICH OUTPUT MODE — IMPORTANT:
Brian has access to rich visual output rendering in the Atlas chat. When he asks you to draft, generate, create, or produce any of the following content types, emit your output inside the matching fence block. The frontend will parse the fence and render the content as a styled interactive widget.

Available rich formats:
- \`\`\`atlas-slides for case study decks and pitch presentations
- \`\`\`atlas-social for Instagram/Facebook posts with before/after or jobsite imagery
- \`\`\`atlas-ad for Google Ad copy (SERP preview + variants)
- \`\`\`atlas-email for formatted email previews (Monday Brief, customer outreach)
- \`\`\`atlas-blog for blog post drafts with SEO structure

Rules for rich output:
1. Always consult BRAND_STYLE.md (below in context) for voice, colors, terminology, and content-type schemas before generating.
2. Emit valid JSON inside the fence. The schemas are documented in Section 7 of BRAND_STYLE.md.
3. You may include conversational prose BEFORE and AFTER the fence — the frontend renders it as surrounding commentary. A good pattern: quick framing prose → fenced rich output → offer to iterate.
4. Keep the fence block compact. Don't pad JSON with unnecessary fields.
5. Never fabricate customer quotes, stats, or credentials. Use only what's in the living docs.
6. Always use Hardesty's terminology: "roof replacement" not "re-roof," "master-level craftsmanship," "GAF Master Elite," "Since 1990."
7. Respect the brand palette: --hardesty-red (#CD3134) for accents only, never a red background flood.

Example structure for a rich response:
  Here's the case study deck. Built around problem/approach/result since that's the board's decision frame.

  \`\`\`atlas-slides
  { ... valid JSON matching Section 7.1 schema ... }
  \`\`\`

  Want me to generate a shorter carousel version for LinkedIn, or a one-pager email?

If Brian asks a general question (metrics, analysis, recommendations), answer in plain prose. Only emit rich fences when he's asking for a content deliverable.`,

  ops: `CURRENT USER: Brittany (operations). Focus on what needs doing now, scheduling, crew coordination, keeping her unblocked. She does NOT approve pricing — that's Sam. Plain prose only, no rich output fences.`,

  crew: `CURRENT USER: Crew member. Focus on TODAY'S JOBS only — addresses, times, customer notes, materials, directions. Do not discuss pipeline, revenue, approvals, or internal ops. Keep answers short and field-practical. Plain prose only, no rich output fences.`,

  admin: `CURRENT USER: Admin (Obsidian Labs). Full access. Questions may be about the project/build itself, not just client operations. You may emit rich output fences if the admin asks for content generation (same rules as owner_brian).`
};

// ─────────────────────────────────────────────────────────────────────
// SYSTEM PROMPT ASSEMBLY
// ─────────────────────────────────────────────────────────────────────
function buildSystemPrompt({ kb, role }) {
  const clientName = process.env.CLIENT_NAME || 'the client';
  const preamble = `You are Atlas, the AI brain for ${clientName}. You have access to the client's living project docs below — use them as the source of truth for anything about this business. Be direct and operational. Draft messages ready to send. Use real names and numbers.

${ROLE_PREAMBLES[role] || ROLE_PREAMBLES.ops}

───── LIVING DOCS ─────
${kb}`;
  return preamble;
}

// ─────────────────────────────────────────────────────────────────────
// HANDLER
// ─────────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { role = 'ops', messages = [] } = req.body || {};
    const { text: kb } = await getContext();
    const system = buildSystemPrompt({ kb, role });

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        stream: true, // CRITICAL — do not remove
        system,
        messages
      })
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      res.status(anthropicRes.status).json({ error: errText });
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Pipe SSE straight through
    const reader = anthropicRes.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }
    res.end();
  } catch (err) {
    console.error('claude.js error:', err);
    res.status(500).json({ error: err.message });
  }
}
