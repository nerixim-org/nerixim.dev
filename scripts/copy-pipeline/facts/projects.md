# Fact sheet: projects

REVIEW ME — the pipeline may only make claims listed here. Drafted 2026-09-05 from `_ground-truth.md`; statuses are the point of this page, so get them right.

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

### Kanyomi (カンヨミ) — status: 開発中 (documentation, content pipeline and a landing page exist; **no app yet**)
- Korean reading app for Japanese speakers: level-matched stories with Japanese-native support (particles mapped to は/を, 漢字語 cognates, 語尾/敬語 mapped to です・ます).
- Content pipeline generates and QA-checks stories with LLMs; 21 stories drafted, none approved yet.
- Domain kanyomi.app. The landing page is not deployed yet.

### Pechka — status: unpublished (codebase complete, never submitted to the App Store)
- Russian-learning app for Japanese speakers (spaced repetition + extensive reading). It is NOT the Korean app.
- Either describe it as 未公開 / 開発を一時停止 or leave it off the page. Never 公開中.

### nerixim.dev — status: 公開中
- This site. Next.js App Router, four languages (ja/en/ru/uk), statically generated.

### Freelance development — status: ongoing
- Web, mobile and infrastructure work for teams in Japan and abroad: zero-to-one product builds, Rails→Next.js modernisation, AWS infrastructure as code (Terraform/CDK).
- Do not list current client names.

## Do not claim

- User numbers, downloads, revenue, launch dates, "coming soon" dates.
- That Pechka or Kanyomi can be downloaded.
- Client names.
