# ARCHITECTURE.md — Hardesty Roofing

_Last updated: 2026-04-23_

---

## Stack

- **Vercel** — hosts `index.html` (Atlas Brain demo) + `/api/claude` serverless endpoint. Auto-deploys from `main`.
- **Anthropic API (Claude)** — powers Atlas Brain chat via `/api/claude`. Streaming SSE.
- **GoHighLevel (GHL)** — white-label sub-account under `labsobsidian`. CRM, pipelines, SMS, email, workflows, Conversation AI. Replaces AccuLynx for all customer comms.
- **AccuLynx** — incumbent job management system. Source of truth for jobs short-term. Comms responsibilities moved to GHL in Phase 1; full replacement TBD.
- **QuickBooks** — accounting + paper sales order originator. Not yet integrated.
- **Supabase** — Postgres database (standard cross-client schema). Not yet provisioned for Hardesty. Wires in Phase 4.
- **n8n** — self-hosted on DigitalOcean (shared across Obsidian Labs clients, `n8n.labsobsidian.co`). Orchestrates AccuLynx → Supabase sync.
- **ElevenLabs** — Conversational AI voice agent. Not yet stood up.
- **Twilio** — voice agent phone number. Port or new number TBD.
- **GitHub** — `labsobsidian/hardesty-ops` (this repo) holds living docs + Atlas Brain app. Source of truth for project state.

## Repos

- [`hardesty-ops`](https://github.com/labsobsidian/hardesty-ops) — this repo. Atlas Brain demo app + living docs.

## Domain Topology

- **Atlas Brain:** `hardesty-atlas.labsobsidian.co` (custom domain on Vercel)
- **Raw Vercel URL:** `hardesty-b120v3g2a-labsobsidians-projects.vercel.app` (fallback / build preview)
- **GHL sub-account:** `app.gohighlevel.com` (white-label, Location ID TBD)
- **n8n:** `n8n.labsobsidian.co` (shared infra)

## Repo Layout

```
index.html                       # Atlas Brain demo app — 7 tabs, seeded data, streaming chat
api/claude.js                    # Vercel serverless endpoint — proxies to Anthropic, streams SSE
vercel.json                      # Vercel config (iframe-friendly headers)
hardesty-voice-agent-spec.md     # Voice agent technical spec
hardesty-booking-form.html       # Booking form (Google Maps autocomplete, lead scoring)

PROJECT_STATE.md                 # Mission, current phase, what's built, remaining work
ARCHITECTURE.md                  # This file — stack, data flow, service responsibilities
CONSTANTS.md                     # Non-secret IDs, URLs, slugs, flags
DECISIONS.md                     # Dated decision log (append-only)
GO_LIVE_CHECKLIST.md             # Phased checklist Demo → Sign-Off
CLAUDE.md                        # Instructions for Claude Code when working in this repo
```

## Data Flow

### Current (Demo Phase)

1. User hits `hardesty-atlas.labsobsidian.co` (optionally via GHL custom menu link with `?email=&name=` — see CONSTANTS.md)
2. `index.html` detects role from URL params, applies role-specific view
3. Chat messages POST to `/api/claude` with `{ role, messages }`
4. `/api/claude` loads living docs from this GitHub repo (via `api/context.js`), assembles system prompt with role preamble + docs, streams response from Anthropic API back to frontend as SSE

### Target (Phase 4 — post AccuLynx credentials)

#### Nightly Sync
1. n8n `Hardesty AccuLynx Sync` runs at 2am
2. Pulls jobs, contacts, and pipeline stages from AccuLynx API
3. Upserts into Hardesty Supabase following cross-client standard schema (`jobs`, `contacts`, `pipeline_stages`, `revenue_events`, `crews`)

#### Lead Intake
1. Customer submits `hardesty-booking-form.html` (deployed on GHL funnel or Vercel subdomain)
2. Form POSTs to GHL inbound webhook + n8n webhook in parallel
3. GHL workflow creates contact, assigns to pipeline, fires confirmation SMS
4. n8n webhook runs lead scoring, writes score + UTM attribution back to GHL contact

#### Quote Flow
1. Rep completes post-appointment form after estimate visit
2. If re-roof → SMS to Sam with approval link → approval routes to GHL workflow
3. On approval → pipeline moves to Estimate Sent, quote packet email fires from Google Workspace domain
4. Day 2/5/8 follow-up sequence runs until customer responds or stage changes

#### Voice Agent (Phase 3)
1. Inbound call hits Twilio number
2. Twilio routes to ElevenLabs Conversational AI agent
3. Agent queries `/api/voice-brain` on Vercel for customer lookup + knowledge
4. Agent books appointment via GHL calendar API directly
5. Lead scoring fires in n8n on call end

## Service Responsibilities

| System | Owns |
|---|---|
| GHL | All customer-facing comms (SMS, email), pipeline, calendar, quote templates, approval workflows |
| AccuLynx | Job records (short-term). Migrating away from comms. |
| Supabase | Cross-client standard data (jobs, contacts, pipeline, revenue). Enables master Atlas Brain queries. |
| n8n | Scheduled syncs + webhook-triggered automations (AccuLynx → Supabase, lead scoring, GHL tagging) |
| Vercel | Hosts Atlas Brain UI + `/api/claude` proxy (and future `/api/voice-brain`, `/api/kb`, `/api/ghl-data`) |
| Anthropic API | LLM inference for Atlas Brain, voice agent mid-call queries, lead scoring prompts |
| ElevenLabs | Voice agent persona + turn-taking |
| Twilio | Phone number + call routing |
| GitHub | Living docs (source of truth for Atlas Brain system prompt) + code |

## Environment Variables

Held in Vercel env vars only. Never commit.

| Var | Used by | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | `/api/claude` | Hardesty-specific key |
| `CLIENT_NAME` | `/api/claude` | Optional; defaults to "the client" |
| `GITHUB_TOKEN` | `/api/context` | PAT narrowly scoped to this repo, for fetching living docs |

## Notes

- `DEMO_MODE=true` until AccuLynx sync wired. Seeded data in `index.html` is intentional.
- `vercel.json` sets `X-Frame-Options: ALLOWALL` and `frame-ancestors *` so GHL can host Atlas Brain in an iframe.
- Single branch `main`. No PR flow yet.
