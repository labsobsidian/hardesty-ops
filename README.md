# Hardesty Ops — Atlas Deployment

Atlas is a thin Vercel app that streams chat from Claude, pulling its knowledge base live from this GitHub repo. The app is per-client: one deployment per client, scoped by env vars to exactly one repo. Isolation is enforced by infrastructure (separate GitHub tokens per deployment), not runtime logic.

## Architecture (Phase B — GitHub brain)

```
Browser (index.html)
    │  POST /api/claude  { role, messages }
    ▼
/api/claude.js  ────► getContext() ────► /api/context.js
    │                                          │
    │                                          ▼
    │                             GitHub repo (5 living docs + DEMO_CONTEXT)
    ▼
Anthropic /v1/messages (streaming SSE back to browser)
```

`/api/context.js` caches 60s in-process so back-to-back chat messages don't re-fetch. Future connectors (GHL pipeline, Supabase live data, Gmail) become additional sources in the same assembler.

## Env vars (Vercel → Project Settings → Environment Variables)

| Name | Example | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Powers `/api/claude` |
| `GITHUB_TOKEN` | `github_pat_...` | Fine-grained PAT scoped to THIS repo only. Needs `contents:read` (and `contents:write` + `pull_requests:write` once Phase C ships `/api/commit`). |
| `CLIENT_REPO` | `labsobsidian/hardesty-ops` | The repo to read living docs from |
| `CLIENT_NAME` | `Hardesty Roofing` | Used in role preamble |
| `CLIENT_SLUG` | `hardesty` | Reserved for future connectors |

All four must be set in **Production** and **Preview** environments. Without them `/api/claude` returns 500.

### Creating the GitHub PAT

1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens**
2. "Generate new token"
3. **Resource owner:** `labsobsidian`
4. **Repository access:** Only select repositories → pick **only** `hardesty-ops`
5. **Repository permissions:**
   - Contents: **Read-only** for Phase B (bump to Read and write when `/api/commit` ships)
   - Pull requests: **Read and write** (needed in Phase C for DECISIONS.md / ARCHITECTURE.md PR flow)
6. Generate, copy the token, paste into Vercel env var `GITHUB_TOKEN`
7. Token expires — calendar a reminder to rotate before it does

The PAT is narrowly scoped by design. Even if this Vercel deployment got compromised, the token can't touch any other client's repo.

## Local dev

No `.env.local` is checked in. Create one mirroring Vercel's env vars if you want to run `vercel dev`. Otherwise just push to main — Vercel auto-deploys.

Install once:

```bash
npm install
```

## Debugging the KB

Hit `/api/context` in a browser to see what docs Atlas is currently loading:

```
https://hardesty-atlas.labsobsidian.co/api/context
```

Returns:

```json
{
  "client": "Hardesty Roofing",
  "slug": "hardesty",
  "repo": "labsobsidian/hardesty-ops",
  "docsLoaded": ["PROJECT_STATE.md", "ARCHITECTURE.md", "CONSTANTS.md", "DECISIONS.md", "GO_LIVE_CHECKLIST.md", "DEMO_CONTEXT.md"],
  "kbLength": 12847,
  "fromCache": false,
  "fetchedAt": "2026-04-22T19:24:00.000Z"
}
```

Add `?force=1` to bypass the 60s cache. Useful when you've just committed a doc update and want to verify Atlas sees it.

The endpoint intentionally does **not** return the full KB body — that's large and we don't want the repo contents exposed at a public URL. Uncomment the `kb` field in `api/context.js` for local debugging only.

## Living docs Atlas reads

These six files in the repo root become the KB. All are optional — missing files are skipped gracefully, so new clients can start with a minimal set and grow.

- `PROJECT_STATE.md` — what IS (updated every session)
- `ARCHITECTURE.md` — how components relate
- `CONSTANTS.md` — IDs, URLs (no secrets)
- `DECISIONS.md` — append-only log of architectural choices
- `GO_LIVE_CHECKLIST.md` — pre-launch punch list
- `DEMO_CONTEXT.md` — rich operational narrative for demos; **delete when live data sync is wired**

## Deploy steps (first-time)

1. Create Vercel project, link to this GitHub repo
2. Set the 5 env vars listed above in both Production and Preview
3. Push to `main` — auto-deploys
4. Visit `/api/context` to confirm GitHub fetch works
5. Visit the root URL, open Atlas chat, ask a question — confirm streaming works and responses reference the docs

## Phase C (not yet built)

`/api/commit` endpoint for Atlas to write back to this repo. Direct commits for state/constants/checklist; PRs for decisions/architecture. Will need:

- GitHub PAT upgraded to `contents:write` + `pull_requests:write`
- Simple shared-secret auth header (the endpoint edits git history, so it needs some gate)

## Skill reference

The pattern this repo implements is being skillified at `obsidian-labs-skills/skills/atlas-github-brain/`. Future client deployments start from that skill.
