// /api/context.js
//
// Builds the live system prompt Atlas uses to answer questions.
// Currently one source (GitHub living docs), designed so future connectors
// (GHL pipeline, Supabase live data, Gmail threads, etc.) slot in as siblings.
//
// Env vars required:
//   CLIENT_REPO     e.g. "labsobsidian/hardesty-ops"
//   CLIENT_NAME     e.g. "Hardesty Roofing"
//   CLIENT_SLUG     e.g. "hardesty"
//   GITHUB_TOKEN    fine-grained PAT scoped to the repo above,
//                   with contents:read (+ contents:write for /api/commit)

import { Octokit } from '@octokit/rest';

// Living docs Atlas reads every context build.
// DEMO_CONTEXT.md is optional — if missing (404), we skip gracefully.
const LIVING_DOCS = [
  'PROJECT_STATE.md',
  'ARCHITECTURE.md',
  'CONSTANTS.md',
  'DECISIONS.md',
  'GO_LIVE_CHECKLIST.md',
  'DEMO_CONTEXT.md'
];

// In-memory cache. Vercel serverless instances each have their own copy;
// that's fine — 60s TTL × small number of warm instances keeps us well
// under the 5000 req/hr GitHub PAT rate limit.
let cache = { kb: null, docsLoaded: [], fetchedAt: 0 };
const CACHE_TTL_MS = 60 * 1000;

// --- SOURCE: GitHub living docs ---
async function fetchGitHubDocs() {
  const repo = process.env.CLIENT_REPO;
  const token = process.env.GITHUB_TOKEN;
  if (!repo || !token) {
    throw new Error('CLIENT_REPO and GITHUB_TOKEN env vars are required');
  }
  const [owner, repoName] = repo.split('/');
  const octokit = new Octokit({ auth: token });

  const results = await Promise.all(
    LIVING_DOCS.map(async (path) => {
      try {
        const { data } = await octokit.repos.getContent({ owner, repo: repoName, path, ref: 'main' });
        // getContent with a file path returns { content, encoding: 'base64', ... }
        const content = Buffer.from(data.content, 'base64').toString('utf8');
        return { path, content, ok: true };
      } catch (err) {
        // 404 = doc doesn't exist yet, skip silently. Anything else, surface it.
        if (err.status === 404) return { path, content: null, ok: false, reason: 'not_found' };
        return { path, content: null, ok: false, reason: err.message };
      }
    })
  );

  const sections = [];
  const loaded = [];
  for (const r of results) {
    if (r.ok) {
      sections.push(`# === DOCUMENT: ${r.path} ===\n\n${r.content.trim()}\n`);
      loaded.push(r.path);
    }
  }
  return { text: sections.join('\n\n'), loaded };
}

// --- Assembler ---
// Future connectors become siblings to fetchGitHubDocs() in this Promise.all.
// Each should return { text: string, loaded: string[] } so assembleKB stays uniform.
async function buildKB() {
  const [github] = await Promise.all([
    fetchGitHubDocs()
    // future:
    // fetchGhlPipeline(),
    // fetchSupabaseLiveData(),
  ]);
  return {
    kb: github.text,
    docsLoaded: github.loaded
  };
}

async function getContext({ force = false } = {}) {
  const now = Date.now();
  if (!force && cache.kb && now - cache.fetchedAt < CACHE_TTL_MS) {
    return { ...cache, fromCache: true };
  }
  const fresh = await buildKB();
  cache = { kb: fresh.kb, docsLoaded: fresh.docsLoaded, fetchedAt: now };
  return { ...cache, fromCache: false };
}

// Exposed so /api/claude can call this in-process instead of going over HTTP.
// Faster, avoids a round-trip, and keeps caching in one place.
export { getContext };

// HTTP handler — primarily for debugging / observability.
// Hit this URL to see what KB Atlas is currently working with.
export default async function handler(req, res) {
  try {
    const force = req.query?.force === '1';
    const ctx = await getContext({ force });
    res.status(200).json({
      client: process.env.CLIENT_NAME || null,
      slug: process.env.CLIENT_SLUG || null,
      repo: process.env.CLIENT_REPO || null,
      docsLoaded: ctx.docsLoaded,
      kbLength: ctx.kb.length,
      fromCache: ctx.fromCache,
      fetchedAt: new Date(ctx.fetchedAt).toISOString()
      // Intentionally NOT returning ctx.kb here — it's large and might leak
      // docs to anyone who hits the URL. Uncomment below for local debugging.
      // kb: ctx.kb
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
