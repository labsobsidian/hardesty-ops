# BRAND_STYLE.md — Hardesty Roofing

_Last updated: 2026-04-23_
_Source of truth for all Atlas-generated content. Atlas reads this on every content generation._

---

## How Atlas Uses This File

This is the style guide Atlas consults every time it generates content for Hardesty Roofing — blog posts, social posts, ad copy, case studies, slide decks, email briefs, and anything else customer-facing or brand-adjacent.

**If Atlas is generating content and hasn't applied the relevant section from this file, the output is wrong.** Style rules win over clever output. When a user instruction conflicts with a rule here, flag it and ask rather than silently override.

This file is fork-ready. The structure mirrors what will live in every `{client}-ops` repo under Obsidian Labs — voice, visual tokens, content templates, service language, and content-type schemas.

---

## 1. Brand Snapshot

- **Company:** Hardesty Roofing
- **Founded:** 1990 (36 years and counting — lead with heritage)
- **Location:** Midlothian, VA · serving Richmond metro + Central Virginia
- **Owner:** Sam Hardesty (owner-operator, on-site most days)
- **Credentials that lead:** GAF Master Elite · GAF President's Club · Class A Licensed & Insured · BBB member · Owens Corning Preferred · #1 roofer by Richmond Magazine (multiple years)
- **By the numbers (use these — they're earned):** 10,525+ installations · 9,350+ customers · 22,000,000+ shingles hung

---

## 2. Brand Voice

Hardesty is an **owner-operator roofing company with 36 years of earned trust in Richmond**. The voice is confident without being flashy, local without being folksy, professional without sounding corporate. Think of it as: the best tradesman in town who happens to also know how to write a clean sentence.

### Voice attributes (in order of importance)

1. **Trustworthy** — the word "trust" is literally in their tagline. Earn it in every sentence.
2. **Craftsmanship-forward** — this isn't a commodity service. They do master-level work. Say so when it's true.
3. **Heritage-aware** — "Since 1990" is a real moat. Lean on it in the right moments, not every sentence.
4. **Local** — Richmond / Central Virginia references are specific and frequent. Chesterfield, Henrico, Midlothian, Ashland, Mechanicsville — use real place names.
5. **Credentials-proud** — GAF Master Elite is the #1 trust signal. Mention in formal content; use sparingly on social.
6. **Confident, not cocky** — "#1 undisputed roofer by Richmond Magazine" is on the website; we can reference it, not brag with it.

### Signature voice patterns

- **Three-word rhythm.** The brand uses triplets: "Tested. Trusted. Local." / "Tested. Proven. Trusted." / "Craftsmanship, integrity, reliability." This cadence works — use it for hero lines, taglines, ad headlines.
- **"Peace of mind"** is their core promised outcome. Use it.
- **"The best warranty in the business"** is a line they own. Don't soften it; use it in sales content.
- **"Master-level craftsmanship"** — repeat phrasing from site.

### Voice — do

- Lead with specifics: "Architectural shingles installed over synthetic underlayment" beats "quality materials"
- Cite real Richmond geography, real neighborhoods, real weather (Virginia humidity, spring hail, summer thunderstorms)
- Reference Sam by name in credibility moments ("Sam personally walks every commercial estimate")
- Use earned numbers: 10,525+ installations, 36 years, etc.
- Mention GAF Master Elite when the context warrants it (residential, warranties, quality questions)
- Keep sentences tight. Short > long. Cut every adjective that isn't earning rent.

### Voice — don't

- **Don't use "we" with corporate vagueness.** "We strive to provide quality service" is dead prose. "Sam and Marcus walked 47 units in three days" is alive.
- **Don't invent quotes, awards, or stats.** Only use what's in this file, DEMO_CONTEXT.md, or real data. If the stat isn't sourced, don't fabricate one.
- **Don't use "state-of-the-art," "cutting-edge," "innovative," "solutions."** Roofing is timeless; tech-speak cheapens it.
- **Don't call it "re-roofing"** unless the customer used the word. The brand calls it **"roof replacement."** (Atlas: update internal language — old docs may use "re-roof" inconsistently.)
- **Don't soften pricing.** Hardesty isn't the cheapest; they're the best. Cost content should be confident and specific.
- **Don't use "family-owned" as a lead unless true and verified.** Use "owner-operated since 1990" — that's the documented claim.
- **Don't reference competitors by name in customer-facing content.** (Internal Atlas analysis for Brian/Sam is fine.)
- **Don't use emoji in formal content** (blog posts, case studies, email briefs, ad copy). Social posts get 1-2 max, purposeful.

### Tone by channel

| Channel                  | Tone                                                               | Length target        |
|--------------------------|--------------------------------------------------------------------|----------------------|
| Blog / SEO content       | Authoritative, educational, zero fluff. Specific numbers.          | 800–1,200 words      |
| Case study / slide deck  | Confident narrative. Problem → approach → result. Real stats.      | 5–6 slides           |
| Google Ad copy           | Tight, benefit-led. Credentials + local hook + clear CTA.          | Per Google limits    |
| Facebook / Instagram     | Warmer, still professional. Real names, real jobs, real proof.     | 80–150 words         |
| Email (Brian briefs)     | Direct, operational, actionable. Like Atlas is writing to him.     | Scannable, bulleted  |
| Email (customer-facing)  | Warm, clear, confident. Sam's voice if direct-from-him.            | Short, plain English |

---

## 3. Visual System

### Colors

The brand palette is **red, black, white** — classic, confident, trade-traditional. Atlas uses teal for its own UI; **teal should not appear in Hardesty customer-facing content.**

| Token                   | Hex         | Use                                                           |
|-------------------------|-------------|---------------------------------------------------------------|
| `--hardesty-red`        | `#CD3134`   | Primary brand color. Accents, CTAs, key highlights, logo red. |
| `--hardesty-red-dark`   | `#A82428`   | Hover states, darker accent when `--hardesty-red` is too loud.|
| `--hardesty-red-light`  | `#FDECEC`   | Soft backgrounds for alerts, callouts, light accents.         |
| `--hardesty-black`      | `#000000`   | Primary text, logo wordmark, dominant UI.                     |
| `--hardesty-charcoal`   | `#1A1A1A`   | Deep backgrounds, dark cards, slide covers.                   |
| `--hardesty-gray-dark`  | `#3A3A3A`   | Body text secondary, de-emphasized copy.                      |
| `--hardesty-gray-mid`   | `#6B6B6B`   | Captions, meta info, labels.                                  |
| `--hardesty-gray-light` | `#9A9A9A`   | Low-emphasis labels, placeholders.                            |
| `--hardesty-gray-border`| `#E2E2E2`   | Borders, dividers.                                            |
| `--hardesty-gray-surface`| `#F5F5F5`  | Background surfaces, cards at rest.                           |
| `--hardesty-white`      | `#FFFFFF`   | Clean surfaces, reverse logo lockups.                         |
| `--hardesty-amber`      | `#D4860A`   | Warning / attention only. Use sparingly.                      |
| `--hardesty-success`    | `#1E8449`   | Success states, positive deltas. Sparingly.                   |

**Rule:** Red is an accent, not a flood. Never use `--hardesty-red` as a full-page background. Use for: callouts, CTAs, highlights, a single header stripe, the logo's native moments. Solid-red slides look amateur; red accents on black look premium.

### Typography

- **Primary family:** `'DM Sans', sans-serif` (matches Atlas; clean, modern sans with enough weight range)
- **Headings:** DM Sans 500 (medium) — never use 700 (too heavy, reads as shouty)
- **Body:** DM Sans 400 (regular)
- **Captions / labels:** DM Sans 500, uppercase, tracked `letter-spacing: 0.08em`, size 11–12px
- **Large display:** DM Sans 500, 32–38px for slide titles

**Rule:** Never mix in a second font. Don't introduce a serif "for contrast" — the logo wordmark is bold sans-serif and the brand is consistent on that.

### Logo Usage

**Primary logo variants available:**
- **Standard:** Black wordmark + red house icon + "EST. 1990" badge, white/light background
- **Reverse:** White wordmark + white house lines + red line accent, dark/photo background

**Rules:**
- Minimum clear space around logo = height of the "H" in HARDESTY
- Never stretch, tilt, recolor, or add effects
- Never place the standard (dark) logo on a busy photo — use reverse
- Never place the red house icon alone without the wordmark (brand is the lockup)
- On slides: use reverse logo on dark cover slides, standard on light content slides

### Imagery & Photography

- **Preferred:** Real Hardesty job photos (before/after, in-progress, finished). Crew members visible. Richmond-area homes and buildings.
- **Acceptable:** Close-ups of materials (shingle detail, metal seams, flashing work) — shows craftsmanship.
- **Avoid:** Generic stock photography of "happy families in front of houses." Reads fake.
- **Avoid:** Drone shots unless they're from real Hardesty jobs (a generic drone shot is stock in disguise).
- **Color treatment:** No heavy filters. Natural light preferred. High contrast is fine for hero shots; sepia / black-and-white for heritage moments only.
- **People:** Always credit the crew. Marcus, Derek, Tony, and Sam are real humans with real skills.

### Icons

- Use line icons, 1.5px stroke, rounded caps and joins. Never filled-shape icons.
- Match DM Sans weight — 500 equivalent (not thin, not bold).
- Single color per icon (black on light, white on dark, red for emphasis).

---

## 4. Service Language (Terminology)

Consistent language matters for SEO, brand, and trust. Always use the left column; never use the right.

| Use this                                 | Not this                            |
|------------------------------------------|-------------------------------------|
| Roof replacement                         | Re-roof (internal Atlas use only)   |
| Roof repair                              | Roof fix                            |
| Roof restoration                         | Roof refresh / revamp               |
| Architectural shingles                   | Architectural tiles                 |
| Metal roofing                            | Metal roofs (when generic)          |
| Standing seam metal roof                 | Metal panel roof                    |
| TPO / EPDM / PVC roofing (commercial)    | "Rubber roof"                       |
| GAF Master Elite Certified               | GAF certified (we're the top tier)  |
| Gutters and gutter guards                | Gutter systems                      |
| Skylights by Velux                       | Skylight installation               |
| Storm damage / hail damage inspection    | Storm assessment                    |
| Emergency roof repair                    | Urgent roof service                 |
| Windows and siding                       | Window replacement / siding install |
| Free estimate                            | Free quote (both work but "estimate" is on-site) |
| Master-level craftsmanship               | High-quality workmanship            |
| Since 1990 / 36 years                    | "Decades"                           |

---

## 5. Geographic Rules

**Service area (in order of focus):**
1. Richmond (primary)
2. Chesterfield County (Midlothian HQ — strong local presence)
3. Henrico County
4. Ashland, Mechanicsville
5. Charlottesville (requires mindful scheduling — see geographic rule)
6. Colonial Heights, Hopewell, Petersburg
7. Central Virginia broadly

**Rules:**
- Always say **"Richmond"** not "RVA" in formal content (blogs, ads, case studies). "RVA" is okay on social and informal email.
- When naming neighborhoods, use the actual neighborhood not just the city (e.g., "Westover Hills" not just "Richmond").
- **Geographic scheduling constraint:** Never pair New Kent with Charlottesville same-day (drive time kills the schedule). This is an operational rule but relevant for any content that mentions scheduling flexibility.
- County context matters: Chesterfield ≠ Henrico. Mentioning the wrong one in local ad copy kills trust.

---

## 6. Credentials & Trust Signals

Lead with these in trust-heavy content (ads, about pages, case study intros, formal email). Don't list them all every time — pick the one that fits the context.

| Signal                                 | When to use                                              |
|----------------------------------------|----------------------------------------------------------|
| GAF Master Elite Certified             | Residential content, warranty questions, quality claims  |
| GAF President's Club                   | Top-tier recognition — commercial + high-end residential |
| #1 Roofer by Richmond Magazine         | Awareness / brand content, local credibility             |
| Since 1990 / 36 years in business      | Heritage moments, trust building, About content          |
| Class A Licensed & Insured             | Commercial, formal proposals, skeptical customers        |
| 10,525+ installations                  | Scale / proof content                                    |
| 22 million+ shingles hung              | Memorable / shareable scale stat                         |
| BBB Member                             | Trust content, comparison vs unknown contractors         |
| Owens Corning Preferred Contractor     | Material-quality discussions                             |
| Lifetime warranties                    | Warranty content, long-term value                        |

**Rule:** Never invent credentials. Only use what's on hardestyroofing.com and in the repo's source-of-truth files.

---

## 7. Content-Type Templates

### 7.1 `atlas-slides` — Case Study Slide Deck

**Required structure (5–6 slides):**

1. **Cover** — `layout: "cover"` — Hero claim + subtitle + client name + location. Hardesty-red stripe accent.
2. **Problem** — `layout: "content"` — 3–4 bullets. What the customer was facing.
3. **Approach** — `layout: "content"` — 3–4 bullets. How Hardesty solved it. Name the crew when relevant.
4. **Stats** — `layout: "stats"` — 3 metric cards. Real numbers from the job.
5. **Result** — `layout: "result"` — One big number + one-sentence caption.
6. **Quote** — `layout: "quote"` — Customer testimonial with attribution. Only if we have a real one.

**Content rules:**
- Never fabricate customer quotes, numbers, or outcomes.
- If a real quote isn't available, end the deck after the Result slide — don't fake one.
- Use `"hardesty-red"` as the accent color token on slide title marks and result numbers.
- Cover slide uses `--hardesty-charcoal` background with white text + red accent stripe.
- Result slide uses very light red tint background (`--hardesty-red-light`).

**Example JSON schema:**

```json
{
  "title": "Westover Hills HOA · Case Study",
  "client": "Westover Hills HOA",
  "location": "Richmond, Virginia",
  "slides": [
    {
      "layout": "cover",
      "eyebrow": "Case Study · 2026",
      "title": "47 units re-roofed. Zero tenants displaced.",
      "subtitle": "Westover Hills HOA · Richmond, Virginia",
      "footer": "Hardesty Roofing · GAF Master Elite"
    },
    {
      "layout": "content",
      "eyebrow": "The Problem",
      "title": "A 22-year-old roof system on borrowed time.",
      "bullets": [
        "Active leaks across 4 of 6 buildings after March hailstorm",
        "HOA reserves covered materials but not full-property mobilization",
        "Board required zero tenant displacement during repair window",
        "Previous bidder quoted 14-week timeline — board had budgeted 8"
      ]
    }
  ]
}
```

### 7.2 `atlas-social` — Social Post

**Required fields:** `platform`, `username`, `location`, `imageStyle` (one of `before-after`, `jobsite`, `crew`, `finished`), `caption`, `hashtags` (array).

**Content rules:**
- **Caption length:** 80–150 words for Instagram, 40–80 for Facebook.
- **Lead with the story, not the product.** "From 22-year-old 3-tab to new architectural shingle" beats "We installed new shingles today."
- **Name crew when relevant.** "Marcus's crew wrapped this one in three days" > "Our team completed this project."
- **Credit the homeowner/customer.** "Big thanks to the Miller family for trusting us with their home." Never use last names without sign-off.
- **Hashtag max:** 6 on Instagram, 3 on Facebook. Must include: `#RichmondRoofing` or `#HardestyRoofing`, one location tag (`#RVA`, `#ChesterfieldVA`, `#HenricoVA`), one service tag.
- **Never use:** `#BestRoofer`, `#AffordableRoofing`, `#1RoofingCompany` — hollow and reads desperate.
- **CTA:** Either "DM for a free estimate" or "Link in bio" or a specific phone number. Pick one.
- **Emoji:** 1–2 maximum, purposeful. 🏠 ✨ ⚒️ are the brand's natural set. Avoid 🔥💯🙌.

### 7.3 `atlas-ad` — Google Ad Copy

**Required fields:** `campaign`, `finalUrl`, `headlines` (3–5), `descriptions` (2–3), `extensions`.

**Content rules:**
- **Headlines:** max 30 characters each. At least one must include a local qualifier (Richmond, Chesterfield, Henrico, etc.).
- **Descriptions:** max 90 characters each. Lead with the benefit, back with a credential.
- **Required elements across headlines + descriptions combined:**
  - At least one mention of GAF Master Elite OR "Since 1990" (credential)
  - At least one local place name (city or county)
  - At least one specific differentiator (response time, free estimate, lifetime warranty, etc.)
  - Clear CTA in at least one headline (Call, Get Estimate, Schedule Inspection)
- **Never use:** "Best" (ad policy issues), "cheapest" (off-brand), "guaranteed" without qualification, "#1" (unless Richmond Magazine context).
- **Phone number:** `(804) 523-9955` — always use parentheses format.

### 7.4 `atlas-email` — Email / Monday Brief

**Required fields:** `from`, `to`, `subject`, `eyebrow`, `greeting`, `sections`, `ctas`.

**Content rules:**
- **Subject line:** action-oriented, specific. "Storm season is coming in hot. Here's what to do about it." works. "Your weekly marketing update" doesn't.
- **Eyebrow:** small caps label above subject. Examples: "Monday Marketing Brief · Week 17", "Estimate Follow-Up", "Project Update".
- **Greeting:** the recipient's context in one line. "For Brian · April 22–28 performance · 6 drafts ready for review."
- **Section headings:** 3–4 words max. "Last week — what happened", "This week — what I recommend", "Drafts waiting for you".
- **Lists over paragraphs** for action items. Bolded lead phrases for scannability: "**Kill** the Generic Roof Repair campaign."
- **CTAs:** 2–3 buttons max. First is primary (filled black), rest are ghost (bordered white).
- **Signature:** Atlas never signs as a person. Footer is always "Atlas · Hardesty Roofing".

### 7.5 `atlas-blog` — Blog Post

**Required fields:** `title`, `category`, `readTime`, `seoTarget`, `lead`, `sections`.

**Content rules:**
- **Title:** one line, SEO-targeted. Question format works well for AI search ("How long does a roof last in Virginia?"). Avoid clickbait.
- **Lead paragraph:** answers the core question in the first sentence. This is what AI engines quote. Example: "A full roof replacement in Richmond costs $8,500 to $24,000 for a typical single-family home in 2026."
- **Length:** 800–1,200 words. Longer only if the SEO target demands it.
- **Structure:** lead → 3–5 H3 sections → specific lists where possible → closing paragraph that reinforces the lead answer.
- **Richmond specificity:** every blog post should have at least one Richmond-specific data point or example.
- **Credentials:** mention GAF Master Elite once, not more. Mention "Since 1990" in heritage-relevant posts only.
- **Never use:** "In today's fast-paced world," "In conclusion," "It goes without saying," or any Chat-GPT filler phrase.
- **Internal links:** when mentioning a service, link to the corresponding page on hardestyroofing.com.
- **FAQ block:** optional, appended at end with FAQ schema markup for AI search optimization.

---

## 8. Content Quality Gates

Before any Atlas-generated content is marked "ready for review," it must pass:

1. **Voice check** — reads like Hardesty, not like a generic marketing bot.
2. **Terminology check** — uses the preferred service language from Section 4.
3. **Credential check** — all claims, credentials, stats are sourced (website, DEMO_CONTEXT.md, or verified data). Zero fabrication.
4. **Geography check** — place names are real and correctly spelled, relevant to Richmond metro.
5. **Visual token check** — uses `--hardesty-red` for accents, no teal in customer-facing output.
6. **CTA check** — there is exactly one clear action for the reader to take (except for Monday Brief, which can have 2–3).
7. **Name check** — if referencing Hardesty team members, uses real names (Sam, Brittany, Marcus, Derek, Tony). Never invent team members.

If any gate fails, Atlas flags it rather than ships it.

---

## 9. Forbidden Patterns

These are hard no's. Atlas does not produce content containing these regardless of user prompt.

- Fabricated customer quotes or testimonials
- Fabricated statistics, review counts, or credentials
- Promises beyond what warranties explicitly guarantee ("roof will last forever")
- Competitor names in customer-facing content (internal analysis for Brian/Sam is fine)
- Pricing promises without the word "starting at" or a specific tier reference
- "Best roofer in Richmond" as a direct claim (we say "voted #1 by Richmond Magazine" because that's sourced)
- Emergency / fear-based urgency tactics ("Your roof could collapse any day!")
- Stock-photo-style generic language ("Our team of experts is standing by")
- Any language that implies or suggests unlicensed contractors, shortcuts, or corner-cutting
- AI self-reference in customer-facing content ("As an AI I don't have access to…" — if Atlas doesn't know something, it says so as Atlas, not as an AI)

---

## 10. Template Fork Notes (for Obsidian Labs agency)

_This section is for Garrett when forking this file for a new client. Delete from Hardesty's live copy if desired, or leave — it's low-cost context._

The structure of this file is designed to be a template. When spinning up a new client, the sections to customize are:

- **Section 1 (Brand Snapshot)** — all new
- **Section 2 (Voice)** — rewrite based on client's existing voice samples; keep the structure
- **Section 3 (Visual System)** — extract colors from client logo, update all `--{client}-*` tokens
- **Section 4 (Service Language)** — industry-specific, full rewrite per vertical
- **Section 5 (Geographic Rules)** — per client's service area
- **Section 6 (Credentials)** — per client's real credentials (never invent)
- **Section 7 (Content Templates)** — mostly reusable; update only industry-specific language conventions
- **Section 8 (Quality Gates)** — reusable with minor tweaks
- **Section 9 (Forbidden Patterns)** — most rules are universal; industry-specific items layer in

Candidate for promotion to `obsidian-labs-skills` → `brand-style-setup` skill once Musser Biomass gets its version.

---

_This file is maintained by Garrett (Obsidian Labs) in partnership with Brian (Hardesty Director of Marketing). Updates get logged in DECISIONS.md with date + rationale._
