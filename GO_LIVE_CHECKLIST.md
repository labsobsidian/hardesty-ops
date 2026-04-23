# GO_LIVE_CHECKLIST.md — Hardesty Roofing
_Last updated: 2026-04-23_

---

## Demo (Friday 2026-04-25) ✓

- [x] hardesty-ops repo scaffolded and pushed to GitHub
- [x] Atlas Brain demo app built (7 tabs, seeded data, white-labeled)
- [x] /api/claude serverless endpoint live
- [x] Deployed to Vercel — hardesty-b120v3g2a-labsobsidians-projects.vercel.app
- [x] Voice agent spec written (hardesty-voice-agent-spec.md)
- [x] Booking form built (hardesty-booking-form.html)
- [x] Custom domain configured — hardesty-atlas.labsobsidian.co
- [ ] Demo run-through with Garrett before Friday
- [ ] GHL custom menu link configured (see CONSTANTS.md for URL pattern)

---

## Phase 1 — GHL Stack (Post-Demo, Week 1–2)

### Pipeline
- [ ] Create pipeline with 6 stages: New Lead → Scheduled → Estimate Sent → Approval Pending → Won → Lost
- [ ] Add custom fields: service type, property address, roof age, lead source, lead score, job number, territory, estimate amount, Sam approval status
- [ ] Connect booking form webhook → auto-creates GHL contact + opportunity

### Workflows
- [ ] Lead nurture workflow (Day 0/1/3/7 sequence, stops on booking)
- [ ] Auto-scheduling workflow (SMS with calendar link, confirmation, 24hr reminder)
- [ ] Post-appointment data capture form (conditional: re-roof → Sam approval)
- [ ] Sam approval workflow (SMS to Sam → one-click approve → triggers quote)
- [ ] Quote follow-up sequence (Day 2/5/8, stops on response)

### Templates & Documents
- [ ] Professional quote packet HTML email template
- [ ] Sales order document template (pending Brittany's scan of existing format)
- [ ] Appointment confirmation SMS template
- [ ] Follow-up SMS templates (lead nurture series)

### Calendar
- [ ] Calendar setup: Sam (commercial), Marcus, Derek, Tony (residential crews)
- [ ] Territory tags configured
- [ ] Booking form connected to calendar

### Email Deliverability
- [ ] Google Workspace domain set up (Hardesty's task)
- [ ] GHL SMTP connected to Google Workspace (Garrett's task once domain is ready)

---

## Phase 2 — Booking Form Live (Week 2)

- [ ] Google Maps API key obtained (Google Cloud Console)
- [ ] GHL inbound webhook URL created
- [ ] n8n webhook URL created (lead scoring pipeline)
- [ ] hardesty-booking-form.html deployed (GHL funnel or Vercel)
- [ ] UTM params wired for lead source attribution
- [ ] End-to-end test: submit form → GHL contact created → lead score written → workflow fires

---

## Phase 3 — Voice Agent (Week 2–3)

- [ ] ElevenLabs Conversational AI agent configured
- [ ] Voice persona set: professional female, identifies as AI
- [ ] Twilio connected (port or new number)
- [ ] GHL contact lookup wired
- [ ] GHL calendar booking wired
- [ ] Lead scoring logic in n8n
- [ ] /api/voice-brain endpoint built on Vercel
- [ ] Internal test calls (Garrett, Sam, Brittany)
- [ ] 80% correct routing achieved before going live on main line

---

## Phase 4 — Live Data (Week 3–4, post AccuLynx credentials)

- [ ] AccuLynx API credentials received from Brittany/Sam
- [ ] Supabase project created (standard schema)
- [ ] n8n AccuLynx → Supabase nightly sync built and tested
- [ ] /api/ghl-data route built (live pipeline + contacts)
- [ ] /api/kb route built (GitHub living docs → system prompt)
- [ ] Atlas Brain DEMO_MODE flipped to false
- [ ] Data connection pills flip from Pending to Live in Settings

---

## Phase 5 — Go-Live Sign-Off

- [ ] 98% spam problem eliminated (email deliverability tested)
- [ ] Quote packet looks professional — Sam and Brittany approve
- [ ] Brittany's manual touches reduced by >50%
- [ ] Sam can see close rate and marketing ROI on demand
- [ ] Voice agent handling >70% of inbound calls without human
- [ ] System handles double lead volume without adding headcount
- [ ] Sam and Brittany sign off
