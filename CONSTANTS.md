# DECISIONS.md — Hardesty Roofing
_Append-only. Newest at bottom._

---

## 2026-04-22: Demo with seeded data, wire live sync post-demo

**Context:** AccuLynx API credentials not yet available. Friday demo is hard deadline.

**Decision:** Build demo with realistic seeded data (roofing jobs, pipeline, crew schedule). Wire real AccuLynx → Supabase sync after demo once credentials received.

**Reasoning:** Demo doesn't need live data to be convincing — it needs to show the future state accurately. Seeded data lets us build faster and control the narrative. Real data comes in week 2.

**Revisit if:** Sam/Brittany specifically ask to see their live AccuLynx data during demo (have a fallback answer ready).

---

## 2026-04-22: GHL replaces AccuLynx comms immediately; AccuLynx retained as job record source of truth short-term

**Context:** AccuLynx does two things: job management/quoting (useful) and communications (broken — spam problem). GHL does comms better. Full AccuLynx replacement is a bigger lift.

**Decision:** Phase 1 — GHL takes all customer comms (estimates, follow-ups, confirmations). AccuLynx stays for job records. Phase 2 — sync AccuLynx to Supabase. Phase 3 — evaluate full AccuLynx replacement once GHL is stable.

**Reasoning:** Solves the biggest pain (spam, ugly estimates) fastest without a rip-and-replace that will scare Brittany.

---

## 2026-04-22: Standard Supabase schema from day one

**Context:** Hardesty is client #2. Master Atlas Brain needs to query all clients with a common data shape.

**Decision:** Hardesty's Supabase schema follows the cross-client standard (jobs, contacts, pipeline_stages, revenue_events, crews). No custom schema.

**Reasoning:** Retrofitting Chem-Dry was already noted as technical debt. Don't repeat it with Hardesty.
