# CLAUDE.md — hardesty-ops

Instructions for Claude Code when working in this repo.

## What this is

AI ops command center for **Hardesty Roofing**, delivered by Obsidian Labs. A single-page demo app (Atlas Brain) plus living docs that drive a GHL + voice-agent + Supabase build-out. Clients: Sam (owner), Brittany (ops).

## Living docs — the source of truth

Five docs at the repo root drive everything. Keep them current before writing code:

- `PROJECT_STATE.md` — mission, current phase, what's built, remaining work, blockers. Update on every material change.
- `ARCHITECTURE.md` — stack, data flow, service responsibilities, repo layout.
- `CONSTANTS.md` — non-secret IDs, slugs, env flags. **Never put secrets here.**
- `DECISIONS.md` — dated decision log. Add an entry when a tradeoff is made.
- `GO_LIVE_CHECKLIST.md` — phased checklist (Demo → GHL → Booking → Voice → Live Data → Sign-Off).

When the user says "update state" / "log a decision" / "check off X," edit these directly and commit.

## Repo layout

```
index.html              # Atlas Brain demo app — 7 tabs, seeded data, streaming chat
api/claude.js           # Vercel serverless endpoint — proxies to Anthropic, streams SSE
PROJECT_STATE.md
ARCHITECTURE.md
CONSTANTS.md
DECISIONS.md
GO_LIVE_CHECKLIST.md
```

Everything deploys to Vercel from `main`. No build step — static `index.html` + Node serverless function.

## Working rules

- **Do not commit secrets.** `ANTHROPIC_API_KEY` lives only in Vercel env vars. If you see a key in a diff, stop and flag it.
- **DEMO_MODE is currently `true`.** Seeded data in the UI is intentional until AccuLynx sync is wired. Don't "fix" it by pulling live data.
- **Streaming matters.** `/api/claude` streams SSE; the frontend parses chunks progressively. Don't refactor it back to buffered JSON.
- **Commit style:** short, lowercase-prefixed (`feat:`, `fix:`, `state:`, `init:`, `docs:`). Match existing log.
- **Push only when asked.** Default is commit locally.
- **Single branch:** `main`. No PR flow for this repo yet.

## When editing the demo app (`index.html`)

- Single file, no bundler. Keep it that way until we outgrow it.
- Tabs: Atlas, Operations, Sales, Marketing, Finance, Voice, Strategy, Settings.
- Brand colors / logo are tuned — don't swap without asking.
- Seeded data should read as plausible Hardesty data (Richmond/Chesterfield/Henrico territories, realistic names and dollar amounts).

## When editing `api/claude.js`

- Keep it thin: proxy + stream. Auth/rate-limiting belong in Vercel, not here.
- Forces `stream: true` on every request. The frontend depends on this.

## Out of scope until asked

- Tests, CI, build tooling, TypeScript migration, framework adoption.
- Live data wiring (waits on AccuLynx creds — see `PROJECT_STATE.md` blockers).
- Custom domain (waits on Google Workspace setup on Hardesty's side).

## External systems referenced

- **Vercel** — deploy target (auto-deploys from `main`)
- **Anthropic API** — via `api/claude.js`
- **GHL (GoHighLevel)** — white-label sub-account under labsobsidian; build plan in `PROJECT_STATE.md`
- **AccuLynx / QuickBooks** — source systems (not yet connected)
- **ElevenLabs + Twilio** — voice agent (not yet stood up)
- **Supabase + n8n** — data layer + sync orchestration (Phase 4)
