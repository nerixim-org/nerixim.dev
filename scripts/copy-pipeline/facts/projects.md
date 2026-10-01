# Fact sheet: projects

REVIEW ME — the pipeline may only make claims listed here. Drafted 2026-09-05 from `_ground-truth.md`, product statuses refreshed 2026-10-01; statuses are the point of this page, so get them right.

## Page intent

- A short list of what is being built now and what was built before. Each item has a status: 公開中 / 開発中 / 計画中. Statuses must match reality on the day of publishing.

## Items

### Healthcare AI platform (client work, anonymised) — status: past work (2024-07 → 2026-08, paused)
- Client product that generates official care-management documents with LLMs.
- Built the reliability layer around the generation pipeline: LLM-as-a-judge evaluation on a stratified fixed case set, hallucination-rate observability correlated with traces, resumable eval runs that allow unattended prompt A/B comparisons.
- Do not name the client or the product.

### Agent-driven engineering process (client work, anonymised) — status: past/ongoing practice
- CI agents that triage code-quality debt and pick up backlog items and open reviewable PRs; a guard that prevents review agents from approving their own changes; a Slack agent that investigates Sentry alerts across repositories.
- Same client as above; do not name it.

### sglypper — status: 公開中 (side project, private repo, no link)
- A Telegram and LINE bot that imports a group chat's history, learns the group's voice with a Markov chain plus an LLM (Gemini), and replies in character. Runs for one group.
- Do not claim: revenue, user numbers, that it is a product.

### Kanyomi (カンヨミ) — status: 公開中 (web, since 2026-09-16)
- Korean reading for Japanese speakers, web-first: three short stories a week within TOPIK I (1級・2級) vocabulary and grammar, with Japanese explanations only where a reader would stumble.
- Also live (sitemap, 2026-10-01): the 学習コンテンツ library at /contents (TOPIK-from-zero, terms, grammar, words), drills under /drill (穴埋め問題, 活用練習, listening, numbers, time), TOPIK I 模試 at /mogi, 今日の1問 at /kyou, a level check at /level, small tools under /tools (活用を調べる, 名前のハングル表記, 韓国の年齢, 数詞 and others), study-method essays at /blog.
- Counts on 2026-10-01, for reference only: 34 stories, 111 library articles, 15 tools, 6 drills, 2 mock exams. The library doubled within nine days of 2026-09-22, so page copy carries no counts.
- An LLM pipeline drafts, glosses, level-tags and QA-checks every story; two LLM judges (not people) gate publication. Do not write that humans review the stories.
- Do not claim: the paid archive (live-mode checkout is not switched on as of 2026-10-01), subscriber or reader numbers, an iOS app (no Swift code since 2026-05; the product is the web reader, so the page does not mention an app).

### pechka.app (ペチカ) — status: 公開中 (since 2026-09-21)
- Russian for Japanese speakers, keyed to the ТРКИ levels: a grammar library (one item per article, each with an optional 日本語・英語とくらべると note), short graded stories at /yomimono written within A1・A2, drills (cloze, forms, numerals, stress), three small tools (cursive, patronymics, proverbs) and level-crosswalk pages (ТРКИ, 露検).
- Counts on 2026-10-01, for reference only: 98 grammar articles, 30 stories, 4 drills, 3 tools. Page copy carries no counts.
- Static site on the same pipeline, gates and deploy as Kanyomi (Cloudflare). No app, no accounts, no pricing.
- The old Pechka iOS codebase (spaced repetition + reading) is unrelated to this site and stays off the page.

### storyling.app — status: 公開中 (since 2026-09-21)
- Italian for Japanese speakers, keyed to the CILS levels: a grammar library in the same format as pechka.app, drills (cloze, forms, accent, numbers, time), a level check keyed to 伊検 5級–3級, two small tools (conjugation, proverbs).
- Counts on 2026-10-01, for reference only: 93 grammar articles, 5 drills, 2 tools. Page copy carries no counts.
- Do not describe it as the 2025 StoryLing app; that LP is gone.

### nerixim.dev — status: 公開中
- This site. Next.js App Router, four languages (ja/en/ru/uk), statically generated.

### Freelance development — status: ongoing
- Web, mobile and infrastructure work for teams in Japan and abroad: zero-to-one product builds, Rails→Next.js modernisation, AWS infrastructure as code (Terraform/CDK).
- Do not list current client names.

## Do not claim

- User numbers, downloads, revenue, launch dates, "coming soon" dates.
- That Kanyomi, pechka.app or storyling.app can be downloaded as apps, or that any of them has paying users.
- Client names.
