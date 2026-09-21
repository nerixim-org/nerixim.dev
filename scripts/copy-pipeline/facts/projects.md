# Fact sheet: projects

REVIEW ME — the pipeline may only make claims listed here. Drafted 2026-09-05 from `_ground-truth.md`, product statuses refreshed 2026-09-22; statuses are the point of this page, so get them right.

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

### Kanyomi (カンヨミ) — status: 公開中 (web, since 2026-09-16; iOS app not out)
- Korean reading for Japanese speakers, web-first: three short stories a week within TOPIK I (1級・2級) vocabulary and grammar, with Japanese explanations only where a reader would stumble. 29 stories live at kanyomi.app/yomimono (sitemap, 2026-09-22).
- Also live: 学習資料 library at /contents (58 articles: TOPIK-from-zero, terms, grammar, words), 今日の1問 at /kyou, a level check at /level, three converters under /tools (名前のハングル表記, 韓国の年齢, 数詞).
- An LLM pipeline drafts, glosses, level-tags and QA-checks every story; two judges gate publication.
- Do not claim: paid archive (Stripe registration is not done), subscriber or reader numbers, the iOS app (no Swift code since 2026-05).

### pechka.app (ペチカ) — status: 公開中 (since 2026-09-21)
- Russian grammar library for Japanese speakers, keyed to the ТРКИ levels: 48 articles across A1 and A2 (sitemap, 2026-09-22), each with an optional 日本語・英語とくらべると note.
- Static site on the same pipeline, gates and deploy as Kanyomi (Cloudflare). No app, no accounts, no pricing.
- The old Pechka iOS codebase (spaced repetition + reading) is unrelated to this site and stays off the page.

### storyling.app — status: 公開中 (since 2026-09-21)
- Italian grammar library for Japanese speakers, keyed to the CILS levels: 24 articles across A1 and A2 (sitemap, 2026-09-22), same format as pechka.app.
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
