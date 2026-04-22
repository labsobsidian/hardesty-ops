# ARCHITECTURE.md — Hardesty Roofing
_Last updated: 2026-04-22_

---

## What Hardesty Is

A mid-size roofing contractor (6–15 people, multiple crews) operating in the Richmond/Central Virginia area. Does both residential and commercial roofing. Currently running a fragmented manual process — AccuLynx for quoting/light CRM, QuickBooks for invoicing, no integration between them or the website.

**Primary operator:** Brittany (ops/scheduling) — single point of failure in current process.
**Owner:** Sam — approves all re-roof pricing.

---

## Current State (Pre-Atlas)

```
Lead arrives
    ↓ (manual)
Brittany enters into AccuLynx
    ↓ (manual call/text)
Appointment scheduled
    ↓ (salesperson on-site)
Sales info returned to Brittany
    ↓ (Brittany manually types)
Estimate created in AccuLynx
    ↓ (re-roofs only)
Sam approves pricing
    ↓ (emailed from QuickBooks)
Estimate sent → lands in spam 98% of the time
    ↓ (separate manual text)
"Check your spam" text sent from AccuLynx
    ↓
Follow-up tracked on paper
```

**Result:** 5–7 manual touches per lead, Brittany bottleneck, no marketing ROI visibility, unprofessional estimates, scaling impossible.

---

## Future State (Atlas)

```
Lead arrives (web, phone, referral)
    ↓ (GHL auto-captures + creates contact)
Automated scheduling SMS/email sent
    ↓ (AI booking or Brittany one-click)
Appointment confirmed, crew assigned (geo-aware)
    ↓ (rep completes GHL form post-appointment)
Structured job data captured
    ↓ (re-roofs: Sam gets approval link)
Sam approves/adjusts pricing in one click
    ↓ (GHL generates professional quote packet)
Estimate sent from Google Workspace → lands in inbox
    ↓ (automated follow-up sequences in GHL)
Follow-up handled automatically
    ↓ (Atlas Brain)
Sam and Brittany see full pipeline, close rates, ROI
```

---

## Stack

| Layer | Tool | Role |
|---|---|---|
| CRM / Comms | GoHighLevel (white-label) | Pipeline, SMS, email, quote delivery, workflows |
| Job Management | AccuLynx | Source of truth for jobs/quotes (transitioning) |
| Database | Supabase | Standard schema — jobs, contacts, revenue, pipeline |
| Sync | n8n | AccuLynx → Supabase nightly + webhook |
| Brain | Vercel + Anthropic API | Hardesty Brain app, hosted |
| Email | Google Workspace | Fix deliverability (replace QuickBooks email) |
| Accounting | QuickBooks | Retained for accounting; sales order replicated in GHL |

---

## Standard Schema (Supabase)

Matches the cross-client schema so the master Atlas Brain can query all clients the same way.

```
jobs
  id, client_id, job_type (residential/commercial), status,
  job_number, address, crew_id, salesperson_id,
  estimate_amount, final_amount, created_at, closed_at

contacts
  id, client_id, name, email, phone, lead_source,
  first_contact_at, status

pipeline_stages
  id, contact_id, stage, entered_at, exited_at, notes

revenue_events
  id, job_id, type (estimate/invoice/payment), amount, created_at

crews
  id, name, territory, capacity
```

---

## GHL Workflows (to build)

1. **Lead Intake** — new contact → assign pipeline stage → trigger scheduling SMS
2. **Appointment Confirmation** — automated confirmation + reminder sequence
3. **Post-Appointment Data Capture** — GHL form for reps, conditional logic, triggers Sam approval for re-roofs
4. **Sam Approval** — notification to Sam with approve/adjust link → updates record → triggers quote generation
5. **Quote Delivery** — professional quote packet sent via Google Workspace email + SMS
6. **Follow-up Sequences** — automated cadence for unresponded quotes
7. **Won/Lost** — job marked won → triggers sales order generation + job number assignment

---

## Key Decisions

See DECISIONS.md. Critical ones:
- AccuLynx retained as source of truth short-term; GHL takes over comms immediately
- Google Workspace replaces QuickBooks email for deliverability
- Sales order replicated in GHL (job number, field team format)
- Demo uses seeded data; live AccuLynx sync wired post-demo
