# PROJECT_STATE.md — Hardesty Roofing
_Last updated: 2026-04-22_

---

## Mission

Build an AI-forward ops stack for Hardesty Roofing that eliminates the manual, fragmented lead-to-estimate workflow, professionalizes customer-facing documents, solves email deliverability, and gives Sam and Brittany a single pane of glass to run the business — built to handle double the current lead volume without adding headcount.

## Primary Contacts

- **Sam** — Owner, approves all re-roof pricing, key demo stakeholder
- **Brittany** — Operations & scheduling, primary day-to-day user, single point of failure in current process
- **Brian** — Obsidian Labs contact at Hardesty

## Current Phase

**Phase 1 — GHL Build + Demo Polish.** Atlas Brain demo is live on Vercel. Now building out the full GHL stack and voice agent.

---

## Pain Points (from 2026-04-20 consultation)

1. Lead process is entirely manual — Brittany enters every lead, calls to schedule, types estimates
2. 98% of emails go to spam — forces manual "check your spam" text every time
3. Estimates look terrible — AccuLynx templates, "dog doo doo"
4. Systems are siloed — AccuLynx + QuickBooks not connected, no lead source tracking
5. Brittany is the bottleneck — scheduling, quoting, comms all through one person
6. Sam approval adds friction — re-roof pricing requires back-and-forth with Sam
7. Follow-ups tracked on paper
8. No pipeline visibility — no dashboard, team not on the same page
9. Sales order replication needed — QuickBooks paper doc with job number used by field teams + supply houses

---

## What's Built

### Infrastructure
- `hardesty-ops` repo — scaffolded, pushed to GitHub
- `hardesty-ops` Vercel deployment — live at hardesty-b120v3g2a-labsobsidians-projects.vercel.app
- `/api/claude` serverless endpoint — live, own Anthropic API key
- Atlas Brain demo app (index.html) — 7-tab app, seeded data, white-labeled

### Demo App Tabs
- Atlas (AI Brain — opens by default)
- Operations (schedule, crew capacity, needs attention)
- Sales (pipeline, approvals)
- Marketing (lead sources, ROI)
- Finance (P&L snapshot, transactions)
- Voice (call log, agent config)
- Strategy (Q2 goals, big bets)
- Settings (integrations, users, brain config)

### Documents Built
- Voice Agent Technical Spec (hardesty-voice-agent-spec.md)
- Booking Form with Google Maps autocomplete + lead scoring (hardesty-booking-form.html)

---

## Remaining Work

### GHL Build (Priority Order)

#### 1. Pipeline Setup
- Create pipeline: New Lead → Scheduled → Estimate Sent → Approval Pending → Won → Lost
- Custom fields: service type, property address, roof age, lead source, lead score, job number, territory, estimate amount, Sam approval status
- Opportunity auto-creation from booking form webhook

#### 2. Lead Nurture Workflow
- Trigger: new contact created
- Day 0: confirmation SMS — "Thanks for reaching out to Hardesty Roofing! We'll be in touch within the hour to schedule your free estimate."
- Day 1 (if not scheduled): follow-up SMS — "Hi [name], this is Brittany at Hardesty Roofing. Still looking to get that estimate scheduled — what time works for you?"
- Day 3 (if not scheduled): second follow-up SMS + email
- Day 7 (if not scheduled): final touch — "Last check-in before we close this out. Happy to help whenever you're ready."
- Stop trigger: appointment booked OR contact replies

#### 3. Auto-Scheduling Workflow
- Trigger: new lead created from booking form
- Immediate SMS with GHL calendar booking link
- Confirmation SMS + email on booking
- 24hr reminder SMS day before appointment
- Brittany only touches exceptions (no-shows, reschedules)

#### 4. Post-Appointment Data Capture Form
- GHL survey/form sent to rep after appointment
- Fields: job type, property address confirmed, roof condition, approx sqft, materials discussed, customer urgency, pricing notes
- Conditional logic: if job type = re-roof → trigger Sam approval workflow
- If job type = repair/inspection → trigger quote generation directly

#### 5. Sam Approval Workflow
- Trigger: post-appointment form submitted with job type = re-roof
- Sam receives SMS: "New re-roof estimate needs your approval. [Customer name], [address], [rep notes]. Tap to review: [link]"
- Approval link opens simple GHL page showing job details + approve / adjust buttons
- On approve: pipeline stage moves to Estimate Sent, quote packet generated + sent
- On adjust: Sam enters revised amount, same flow continues

#### 6. Professional Quote Packet Template
- HTML email template in GHL
- Sections: cover letter, itemized estimate, Hardesty company info, why Hardesty, testimonials, CTA to book
- Sent from Google Workspace email (when Hardesty sets up domain)
- Template variables: customer name, address, service type, estimate amount, rep name
- NOTE: Brittany to provide current estimate format for reference

#### 7. Sales Order Document
- Replicate current QuickBooks paper sales order in GHL
- Auto-generates on opportunity Won
- Fields: job number (auto-incremented), customer name, address, service type, materials, crew assigned, start date
- PDF sent to: field crew SMS, supply house email, Brittany email
- NOTE: Brittany scanning existing sales order format — needed before building

#### 8. Quote Follow-up Sequence
- Trigger: pipeline stage = Estimate Sent
- Day 2: check-in SMS — "Hi [name], just checking you received your estimate from Hardesty Roofing. Any questions?"
- Day 5: follow-up email with 1-2 customer testimonials
- Day 8: internal task created for Brittany — "Call [name] re: estimate"
- Stop trigger: customer replies, books, or pipeline stage changes

#### 9. GHL Calendar Setup
- Calendar per salesperson: Sam (commercial), Marcus, Derek, Tony (crews)
- Territory tags: Richmond, Chesterfield, Henrico, Midlothian, Commercial
- Rule: flag if New Kent + Charlottesville booked same day
- Booking form connects to calendar for self-scheduling

#### 10. UTM Attribution
- Add UTM params to booking form URL
- Capture source/medium/campaign in GHL contact record
- Pipeline reporting shows revenue by lead source
- Answers: "if I spend a dollar, how many do I get back"

#### 11. Dashboard Views
- Brittany view: today's schedule, needs attention, quote queue, crew assignments
- Sam view: pipeline value, close rate, revenue MTD, marketing ROI, approval queue

### Voice Agent (ElevenLabs)
- Stand up ElevenLabs Conversational AI agent
- Connect Twilio (port or add Hardesty main line)
- Wire GHL APIs: contact lookup, calendar booking, pipeline creation
- Build Atlas Brain /api/voice-brain endpoint
- Build lead scoring in n8n
- Full spec: see hardesty-voice-agent-spec.md

### Booking Form (Ready to Deploy)
- File: hardesty-booking-form.html
- Needs: Google Maps API key, GHL webhook URL, n8n webhook URL
- Google Maps API key: get from Google Cloud Console (free tier sufficient)
- GHL webhook: create inbound webhook in GHL → Automations → Webhooks
- Deploy to: GHL funnel page or Vercel subdomain

### AccuLynx Sync (Post-Demo)
- Awaiting API credentials from Brittany/Sam
- n8n workflow: AccuLynx → Supabase standard schema nightly sync
- Flip DEMO_MODE flag in Atlas Brain once live data flowing

### Atlas Brain — Live Data (Post-AccuLynx)
- Wire /api/ghl-data route — pull live contacts + pipeline from GHL
- Wire /api/kb route — fetch living docs from GitHub, inject into system prompt
- Wire /api/voice-brain route — public endpoint for ElevenLabs mid-call queries
- Flip data connection pills from Pending to Live in Settings tab

---

## Blockers

- AccuLynx API credentials — needed for live data sync (post-demo)
- Google Workspace domain — Hardesty's task, needed for email deliverability
- Sales order format — Brittany scanning and sending existing QuickBooks doc
- Twilio number — needed for voice agent (port existing or new number)
- ElevenLabs account setup — Garrett has account, needs agent configured

## Notes

- Skills version: v0.2.0
- Demo URL: hardesty-b120v3g2a-labsobsidians-projects.vercel.app
- GHL sub-account: white-label, under labsobsidian account
- Anthropic API key: hardesty-specific key in Vercel env vars
- DEMO_MODE: true — seeded data until AccuLynx sync wired
