# DEMO_CONTEXT.md — Hardesty Roofing

**⚠️ DEMO CONTENT. Delete this file when live data sync is wired (Phase 4 — AccuLynx → Supabase → Atlas).**

This file exists so Atlas has realistic operational specifics to reference during demos and early client conversations. When live data is wired, Atlas will pull these facts from Supabase/GHL in real time, and this file becomes stale and should be removed.

_Last updated: 2026-04-22_

---

## Team

- **Sam** — Owner. Approves all re-roof pricing personally. Handles commercial walkthroughs. On-site most days.
- **Brian** — Director of Marketing. Runs lead-source analysis, campaign decisions, vendor relationships.
- **Brittany** — Operations & scheduling. Single point of failure in the current manual process — every lead, estimate, and customer comm flows through her.
- **Marcus** — Crew A lead. Residential re-roofs primarily.
- **Derek** — Crew B lead. Repairs, gutters, mixed work. Currently underbooked (gap Thursday PM this week).
- **Tony** — Crew C lead. Residential + light commercial.

**Geographic scheduling rule:** never book New Kent and Charlottesville on the same day — the drive time kills the schedule.

---

## Pipeline — current snapshot

**Stage counts:**
- New leads: 8
- Scheduled appointments this week: 7
- Quotes out: 11 · $218,400 total pipeline
- Pending Sam approval: 3 · $47,200 total
- Won MTD: 9 jobs · $84,200

**Metrics:**
- Close rate (30d): 34% (up 8pts vs last month)
- Avg job value: $9,350 (up 12%)
- Crew utilization: 62% (Crew B underbooked)

## Key leads right now

- **Thompson, R.** — New residential lead in Chesterfield, called this morning, not yet scheduled. Needs Brittany to reach out.
- **Williams, D.** — Residential Chesterfield. Walkthrough today at 3:30pm with Sam. Est. ~$18k.
- **Oakridge Commercial** — Flat roof, Midlothian. $34,500. Marcus walked it 2 days ago. Awaiting Sam approval.
- **Henderson, M.** — Residential Richmond. $12,800 quote sent 6 days ago. No response — **needs follow-up today**.
- **Sunrise Apartments** — Commercial, Henrico. $67,000 quote sent 2 days ago. Site measure Friday.
- **Westover Hills HOA** — Commercial, Richmond. $89,000 quote sent yesterday. Biggest single job in pipeline.
- **Henderson re-roof** — Separate job. Arch shingle, Derek walked it. $9,200 awaiting Sam approval.
- **Nguyen** — Re-roof + fascia, Chesterfield. $3,500. Marcus walked it today. Awaiting Sam approval.

## Today's schedule (Wed Apr 22)

- **8:00 AM** — Johnson re-roof inspection. 4821 Crestwood Dr, Richmond. Crew A / Marcus.
- **10:30 AM** — Midlothian Commercial estimate. 901 Commonwealth Blvd. Sam.
- **1:00 PM** — Patterson repair + gutter. 2214 Forest Hill Ave, Richmond. Crew B / Derek.
- **3:30 PM** — Williams new lead walkthrough. 7703 Ridgefield Rd, Chesterfield. Sam.

---

## Marketing snapshot

- **Leads this month:** 31 (up 18% vs last month)
- **Cost per lead:** $42 (down $8)
- **Marketing ROI:** 6.2x — first time actually trackable thanks to UTM wiring

**By source (last 30 days):**
- Referral — 13 leads · 41% of total · 58% close rate · $12,400 avg job value
- Google — 8 leads · 26% · 24% close rate · $7,800 avg
- Website — 5 leads · 16%
- Yard signs — 3 leads · 10%
- Other — 2 leads · 7%

**Email deliverability:** open rate now 61% (was ~3% before Google Workspace setup — the "98% spam" problem).

**Avg follow-ups to close:** 2.3.

---

## Finance snapshot — April MTD

- Gross revenue: $84,200 (up 22% vs April '25)
- Material costs: −$31,200
- Labor costs: −$28,400
- Gross margin: $24,600 (29%)
- Outstanding invoices: $31,400 across 4 invoices
- Projected month at current close rate: $128,600
- QuickBooks sync: pending setup

**Recent transactions:**
- Miller re-roof — Invoice #1042 — $22,400 paid
- Patterson repair — Invoice #1041 — $4,200 paid
- Chen commercial — Invoice #1040 — $14,800 pending
- Roberts re-roof — Invoice #1039 — $8,600 pending

---

## Voice agent — last week

- Calls this week: 14 (up 4 vs last week)
- Booked by agent: 6 (43% booking rate)
- Avg call length: 3:42 (down 1:10 vs phone)
- Transferred to human: 2 (complex queries)

**Recent calls worth remembering:**
- Thompson, R. — today 9:14am, residential re-roof inquiry, appointment booked for Thu 2pm (4:12 call)
- Unknown commercial caller — today 8:32am, transferred to Sam (2:08)
- Williams, D. — yesterday 4:15pm, confirmed walkthrough Wed 3:30pm (1:54)
- Missed call — yesterday 1:22pm, no voicemail — SMS follow-up sent automatically
- Garcia, M. — yesterday 11:08am, repair inquiry, estimate request logged (3:31)

---

## Q2 goals (Apr–Jun 2026)

- **Revenue target:** $380k — currently at $128,600 (34%)
- **Close rate target:** reach 40% — currently 34%
- **Commercial mix target:** 30% of jobs — currently 18%, tracking up
- **Email deliverability target:** 60%+ open rate — ✓ achieved (61%)

## Big bets in flight

- Westover Hills HOA — $89k commercial, biggest in pipeline, quote out
- Sunrise Apartments — $67k commercial, site measure Friday
- Add 4th crew — trigger is >85% utilization sustained 3+ weeks
- HOA recurring contracts — target 3 signed by end of Q3

---

## What this system solved (context for "why does this exist")

Hardesty had five acute pain points before Obsidian Labs stack:

1. Lead process entirely manual — Brittany entered every lead, called to schedule, typed every estimate
2. 98% of emails went to spam — forced manual "check your spam" text with every send
3. Estimates looked terrible — AccuLynx templates, unprofessional
4. Systems siloed — AccuLynx and QuickBooks not connected, no lead source tracking
5. Brittany was the bottleneck — scheduling, quoting, all comms through one person, single point of failure

Atlas + the GHL stack resolves all five. Voice agent further reduces Brittany's phone load. Real-time pipeline + marketing attribution gives Sam and Brian visibility they've never had.
