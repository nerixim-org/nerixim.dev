# Plan: Personal/Business Website (Hub Site)

Date: 2026-02-21
Updated: 2026-02-23
Status: Gate 1 (implementation complete, deployment pending)
Type: MVP build plan

---

## Goal

Build a personal hub website that serves as distribution infrastructure for all business and product activities. Not a static portfolio -- a living platform that hosts tools, content, and services.

---

## How to Work: The Gate System

You work alone. Your failure mode is "losing the forest for the trees" -- starting too many things, not finishing any. The system below is designed to prevent that.

### Rules

1. **One gate at a time.** Do not advance to the next gate until the current one is DONE. "Done" means every item in the gate's checklist is checked off.
2. **WIP limit: 1 project.** You may have exactly one project in active development at a time. Background tasks (content writing, community posting) don't count -- but building software does.
3. **No new ideas during a gate.** If a new idea comes up, write it in the ideas doc and forget it until the current gate is complete. Ideas are cheap. Execution is expensive.
4. **Weekly checkpoint.** Every Sunday: re-read this file top to bottom. Update status. If you're stuck on a gate for 2+ weeks, something is scoped wrong -- cut scope, don't add time.
5. **Ship, then improve.** Each gate produces something live/public. Not a prototype on localhost. Not "almost ready." Live.

### Tracking

Use a single GitHub Project board with one column per gate. Each gate has issues. Move issues across columns only when a gate is complete (all issues closed).

```
GitHub Project: "Hub Site"
Columns: Gate 0 | Gate 1 | Gate 2 | Gate 3 | Gate 4 | Gate 5 | Icebox
```

**Icebox** = ideas and nice-to-haves that don't belong in any gate yet. Things go in, they rarely come out. That's fine.

### Why Not a More Complex System?

- Notion boards, Jira, Linear: overhead > value for a solo builder. You'll spend time organizing instead of shipping.
- Plain markdown TODOs: no visibility into progress over time, no "done" dopamine.
- GitHub Issues + a single Project board: free, already in your stack, has just enough structure.

Each issue should be small (completable in 1-3 days). If an issue takes longer than 3 days, it's too big -- split it.

---

## The Gates

### Gate 0: Decisions (1-2 days)

No code. Just decisions that unblock everything else.

- [x] **Pick brand/domain name** -- decided: `nerixim`
  - Already have the GitHub org
  - Pronounceable in EN/JP/RU
  - Unique, no conflicts
  - `.dev`, `.com`, `.io`, `.co` all available (verified 2026-02-22)
- [x] **Register domain** -- `nerixim.dev` via Cloudflare (2026-02-22)
- [x] **Create GitHub repo** -- public, single repo for code + content. Drafts in `.gitignore`. (2026-02-22)
- [x] **Create GitHub Project board** (2026-02-22)

**Gate 0: COMPLETE** (2026-02-22)

---

### Gate 1: Site Skeleton (1 week)

Build and deploy the site with real content on every page. No placeholder text. No "coming soon" sections. Every page either has content or doesn't exist.

- [x] Set up Next.js project (App Router, Tailwind, MDX)
- [x] Build layout: header, footer, nav (responsive, dark mode)
- [x] Build and write: Home page
- [x] Build and write: About page (your story, skills, photo)
- [x] Build and write: Services page (dev, AI consulting, localization)
- [x] Build and write: Projects page (existing work, Pechka description)
- [x] Build: Contact page (Slack webhook integration, server action)
- [x] Build: Blog index page (empty state is ok if design is ready)
- [x] Set up Open Graph / social meta tags (dynamic OG image via opengraph-image.tsx)
- [ ] Deploy to Vercel
- [ ] Set up Vercel Analytics (free tier)
- [ ] Verify: site loads fast, looks good on mobile, dark mode works

**Gate 1 exit criteria:** Site is live at your domain. All 6 pages exist with real copy. Contact form works. You can share the URL with someone and not be embarrassed.

**What's NOT in Gate 1:**

- Blog posts (Gate 2)
- i18n / Japanese (Gate 3)
- Tax calculator (Gate 4)
- Newsletter signup
- Comments
- CMS

---

### Gate 2: First Content (1 week)

Write and publish 2 blog posts. This starts the SEO clock and gives you something to share.

- [ ] Write blog post #1: "What It's Actually Like Freelancing as a Developer in Japan"
  - Pillar: Dev in Japan
  - Target: EN audience, r/japanlife, general search
  - ~1500-2000 words, personal experience, honest
- [ ] Write blog post #2: "Navigating Japan's Invoice System as a Foreign Freelancer"
  - Pillar: Dev in Japan
  - Target: EN audience, leads for tax calculator
  - ~1500-2000 words, practical, reference-heavy
- [ ] Publish both on the site
- [ ] Share post #1 on Reddit (r/japanlife) -- genuine tone, not promotional
- [ ] Share on any other relevant communities you're part of
- [ ] Cross-post post #1 to Dev.to

**Gate 2 exit criteria:** 2 blog posts live on the site. At least 1 shared publicly. Site has real content worth visiting.

**Soft launch.** This is not a "launch." You're just making the site exist and putting content on it. No fanfare, no Product Hunt.

---

### Gate 3: Japanese + i18n (1 week)

Add Japanese language support. This is the trilingual credibility proof and unlocks JP client acquisition.

- [ ] Add i18n infrastructure (next-intl recommended)
- [ ] Translate Home page to Japanese
- [ ] Translate About page to Japanese
- [ ] Translate Services page to Japanese
- [ ] Add language switcher in header
- [ ] Verify: JP pages render correctly, no layout breaks with Japanese text
- [ ] Write blog post #3: either "How I Built an AI-Powered Vocabulary Pipeline" (EN) or translate post #1 to Japanese
- [ ] (Optional) Cross-post JP content to Zenn

**Gate 3 exit criteria:** Site works in EN + JP. Language switcher functions. At least Home/About/Services available in both languages.

**Why JP before RU:** Your existing client base is Japanese. Japanese SMBs (D1, D3) won't engage with EN-only. Japanese SEO has less competition for your topics. RU comes later for D9 content.

---

### Gate 4: Tax Calculator (2 weeks)

Build and ship the free tool. This is your first "Engineering as Marketing" play.

#### Free Tool Strategy Assessment

| Factor | Score (1-5) | Notes |
|--------|------------|-------|
| Search demand | 4 | "Japan freelance tax", "源泉徴収 計算" have real volume |
| Audience match to buyers | 5 | Foreign freelancers in Japan = your exact client profile |
| Uniqueness vs. existing | 4 | Freee/MoneyForward exist but are JP-only, not English-first |
| Natural path to product | 4 | Calculator -> invoicing tool -> consulting lead |
| Build feasibility | 5 | Pure client-side, no backend, known tech |
| Maintenance burden (low=5) | 4 | Tax rates change yearly but rarely; mostly static |
| Link-building potential | 4 | Genuinely useful = people link to it |
| Share-worthiness | 4 | "I built a free tool" posts do well on Reddit |
| **Total** | **34/40** | Strong candidate |

#### MVP Features

- [ ] **Withholding tax calculator (源泉徴収)**
  - Input: invoice amount, service type
  - Output: withholding amount, net payment, tax rate applied
  - Covers: 10.21% standard rate, amounts over 1M yen (different rate)
- [ ] **Consumption tax estimator (消費税)**
  - Input: annual revenue, business type, filing status
  - Output: estimated consumption tax liability
  - Threshold display: are you over the 10M yen threshold?
- [ ] **Invoice number format validator (インボイス制度)**
  - Input: invoice registration number (T + 13 digits)
  - Output: valid/invalid format check + link to NTA lookup
- [ ] **Basic invoice PDF generator**
  - Input: your info, client info, line items, dates
  - Output: downloadable PDF with correct Japanese format
  - Includes: registration number, consumption tax breakdown, withholding tax line
  - EN + JP invoice templates

#### Technical

- Pure client-side React components on the site
- PDF generation: `@react-pdf/renderer` or `jsPDF`
- Hosted at `/tools/tax-calculator`
- Mobile-friendly
- No accounts, no saved data, no backend

#### Lead Capture Strategy

- **Ungated + optional.** Calculator is 100% free, no email required.
- After generating an invoice: "Want help with your freelance business in Japan? [Contact me]" -- soft CTA.
- Blog posts about taxes link to the tool. Tool links to blog posts. Flywheel.

#### What's NOT in v1

- User accounts / saved invoices
- Multi-client management
- Tax filing prep / annual reports
- Integration with Freee or MoneyForward
- Recurring invoices
- These become the paid tier if the free calculator gets traction.

**Gate 4 exit criteria:** Tax calculator is live at `/tools/tax-calculator`. All 4 components work. Mobile-friendly. Linked from relevant blog posts.

---

### Gate 5: Launch & Distribution (1 week)

Now you have a site, content, Japanese support, and a free tool. Time to tell people.

This is NOT a massive Product Hunt launch. It's a controlled, authentic distribution push.

- [ ] Write blog post: "I Built a Free Tax Calculator for Foreign Freelancers in Japan"
- [ ] Post on r/japanlife (genuine "I built this because I needed it" framing)
- [ ] Post on r/japanfinance if applicable
- [ ] Share in Facebook groups for foreigners in Japan
- [ ] Post on X/Twitter with screenshots
- [ ] (Optional) Cross-post calculator announcement to Zenn in Japanese
- [ ] (Optional) Submit to "free tools for freelancers" lists
- [ ] List on Toptal/Arc.dev with portfolio link (D2 positioning)
- [ ] Monitor: check Vercel Analytics daily for first 2 weeks

#### Launch Psychology

- **Reciprocity:** The tool is free. You gave value first. People feel goodwill.
- **Authority Bias:** "I'm a freelancer in Japan who built this for myself" = instant credibility.
- **Unity Principle:** "I'm one of you" to the foreign freelancer community.
- **Zero-Price Effect:** Free has disproportionate pull. Don't charge for v1.

#### Success Metrics (First Month After Gate 5)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Unique visitors | 100 | Vercel Analytics |
| Return visitors | 10 | Vercel Analytics |
| Contact form submissions | 3 | Formspree / email |
| Reddit post upvotes | 10+ | Reddit |
| Tool usage (calculator) | 50 uses | Client-side event (optional) |

**Gate 5 exit criteria:** Calculator announced in at least 3 communities. Blog post about it published. Listed on at least 1 freelance platform.

---

## After the Gates: What's Next

Once Gate 5 is done (~6 weeks), you'll have:

- A live trilingual-ready website
- 3-4 blog posts generating SEO traffic
- A free tool attracting your target audience
- Presence on freelance platforms

Then evaluate what to do next based on data, not feelings:

| Signal | Next Move |
|--------|-----------|
| Tax calculator gets traffic + contact form leads | Build B4 full version (paid invoicing tool) |
| Blog posts rank and get traffic | Double down on content (weekly posts) |
| Freelance platform profiles get responses | Focus on D2 (dev shop) client work |
| Japanese site version gets engagement | Write JP-only content, Zenn strategy |
| None of the above | Reassess. Talk to actual users. Something is wrong with positioning. |

### Other projects that are NOT part of this plan

These are explicitly parked until Gate 5 is done:

- **Pechka (A1):** Important but separate project. Do NOT interleave Pechka iOS development with website gates. After Gate 5, Pechka gets its own gate plan.
- **D9 RU/EE Ecosystem:** Content phase can start after Gate 5 as a background track (1 blog post/month in Russian). Not a gate.
- **D8 Freelance Scraper:** Hub automation project, not related to the website. Separate gate plan after Gate 5.
- **Everything else:** Icebox. Write ideas down, don't build them.

---

## Content Strategy

### Pillars

| Pillar | Topics | Serves | Searchable | Shareable |
|--------|--------|--------|------------|-----------|
| Dev in Japan | Freelancing, taxes, visa, culture, tools | D2, D9, B4 | High | Medium |
| Building Products | Ship log, tutorials, AI automation | D1, D2 | Medium | High |
| Language & Culture | Language learning insights, cross-cultural | Pechka, C2 | Medium | Medium |

### Cross-Posting

- Publish on your site first (canonical URL)
- Dev.to (EN), Zenn (JP), Habr (RU when ready)
- Reddit for distribution, not promotion. Be genuinely helpful.

### Content cadence

Start with what you can sustain. 2 posts in Gate 2 is the minimum. After Gate 5, evaluate whether weekly is realistic. If not, biweekly is fine. Consistency > frequency.

---

## On Japanese: Full Reasoning

This is NOT about deprioritizing Japanese clients. It's about shipping speed vs. scope.

### Why EN-first (Gate 1-2)

1. **Scope control.** Bilingual doubles content work. 5 pages x 2 languages = 10 pages. Turns a 1-week build into 2-3 weeks.
2. **Your existing JP clients find you through referrals (紹介), not websites.** The site doesn't need JP to maintain current relationships.
3. **English unlocks global reach.** EN content is discoverable worldwide. An EN-only site still works for JP clients who evaluate technical skill.

### Why JP in Gate 3 (not "later, maybe")

1. **Japanese SMBs (D1, D3) won't engage with EN-only sites.** If you want consulting work with language schools or small businesses, they need Japanese.
2. **Credibility signal.** A bilingual site IS the proof of D2 (trilingual dev shop). Showing beats claiming.
3. **Zenn cross-posting** creates a second distribution channel.
4. **JP SEO has less competition** for your topics (AI automation, freelancer tools).

Gate 3 is 2-3 weeks after launch, not "someday." Japanese is a must, just not a blocker for shipping.

---

## Tech Decisions

### Stack

- **Framework:** Next.js (App Router) -- already known, SSG-friendly, good i18n
- **Styling:** Tailwind CSS
- **Content:** MDX for blog posts (no CMS needed)
- **Deployment:** Vercel (free tier sufficient)
- **Domain:** TBD (Gate 0)
- **Contact form:** Formspree (free tier: 50 submissions/month)
- **Analytics:** Vercel Analytics (free)

### i18n (Gate 3)

- `next-intl` for translation management
- `/en/`, `/ja/` path prefixes via Next.js middleware
- Blog posts: separate MDX files per language (not all posts need translation)
- UI strings: JSON translation files

---

## Domain Name

**Decided:** `nerixim.dev`

- Brand: nerixim (matches existing GitHub org)
- Domain: `nerixim.dev` (~$12/yr, `.dev` enforces HTTPS, signals developer)
- Availability confirmed 2026-02-22: `.dev`, `.com`, `.io`, `.co` all available
- Consider registering `.com` as well for brand protection (~$10/yr extra)

---

## Design Direction

- Clean, minimal, fast-loading
- Dark mode support
- Mobile-first
- No stock photos. Code screenshots, terminal output, project screenshots.
- Subtle personality in footer/sidebar

---

## Decision Log

| Decision | Choice | Rationale | Date |
|----------|--------|-----------|------|
| Website purpose | Hub (not portfolio-only) | Max flexibility, unblocks 5+ ideas | 2026-02-21 |
| Work system | Sequential gates, WIP limit 1 | Prevents paralysis, matches preferred style | 2026-02-22 |
| First language | EN only (JP in Gate 3) | Ship speed. JP added ~week 3-4. | 2026-02-21 |
| First tool on site | Tax calculator (B4 lite) | You're the user, SEO synergy, lead magnet | 2026-02-21 |
| Tech stack | Next.js + Tailwind + MDX + Vercel | Known stack, fast, free | 2026-02-21 |
| Lead capture | Ungated tool + soft CTA | Max reach for v1, trust > capture | 2026-02-22 |
| Launch approach | Soft community launch (not PH) | No audience yet, PH is premature | 2026-02-22 |
| Brand name | nerixim | Already have GitHub org, unique, works in EN/JP/RU | 2026-02-22 |
| Domain | nerixim.dev | Signals developer, HTTPS enforced, ~$12/yr, available | 2026-02-22 |
| Repo structure | Single public repo, drafts in .gitignore | Simplicity > edge cases, code is portfolio | 2026-02-22 |
| Contact form | Slack incoming webhook | Simpler than Formspree, no DNS/email setup, instant notification | 2026-02-23 |
| Linter/formatter | Biome (not ESLint/Prettier) | Faster, single tool, enforces CSS class sorting | 2026-02-23 |
| UI components | shadcn/ui (new-york style) | Accessible, composable, Tailwind-native | 2026-02-23 |
| Design direction | Refined minimal (serif + sans) | Source Serif 4 + DM Sans, dark mode first-class | 2026-02-23 |
| OG image | Dynamic opengraph-image.tsx | No static images to maintain, auto-generates | 2026-02-23 |
| Validation | Zod v4 | Type-safe, server action compatible | 2026-02-23 |

---

## Open Questions

- [x] ~~Brand name~~ -- decided: nerixim (2026-02-22)
- [x] ~~Domain~~ -- decided: nerixim.dev (2026-02-22)
- [x] ~~Repo structure~~ -- single public repo, code + content together, drafts in .gitignore (2026-02-22)
- [x] ~~Katakana check~~ -- ネリクシム is passable, not elegant, acceptable (2026-02-22)
- [ ] Repo public or private? (public = credibility; private = less exposure of messy commits)
- [ ] Newsletter: skip for MVP. Revisit after Gate 5 based on traffic data.
- [ ] Product Hunt: skip for now. No audience to rally. Revisit when you have something with broader appeal (B4 full version or Pechka).

---

## Weekly Checkpoint Template

Copy this to your notes every Sunday:

```
## Week of [date]

### Current gate: [#]
### Status: [on track / behind / blocked]

### What shipped this week:
-

### What's blocked:
-

### Am I working on the right thing? (re-read gate criteria)
- [ ] Yes / No -- if No, why?

### Did I start anything outside the current gate?
- [ ] No (good) / Yes (stop it)
```
