# Ground truth about the owner's real work (2026-09-05)

NOT FOR PUBLICATION. This is the checklist every page, fact sheet and article is compared against. Sources: `automation/cv-generator/private/resume.md` and `resume-ja.md` (career timeline), `meta/2-income/*` and the 2026-09 contracts (current engagements), the repos themselves (product status), the owner's own statements on 2026-09-05. Items marked OWNER are the owner's word only.

## Identity

- Nikita Kamaev (カマエフ ニキータ). Russian passport, Japanese permanent resident, lives in Tokyo (Edogawa).
- Languages: Russian native; Japanese — resume-ja says ネイティブレベル, resume.md and the site say "fluent/流暢"; English — resume-ja says ビジネスレベル, resume.md and the site say "fluent". Pick one wording per language and use it everywhere.
- Education: Bachelor of Foreign Language Studies, Kobe City University of Foreign Studies. Came to Japan around 2008 as a language student (OWNER, from the draft article).
- Engineer since Mar 2017 (Mixi). "9+ years" is correct through 2026.

## Career timeline (resume.md)

| Period | Where | Shape |
|---|---|---|
| 2017-03 → 2019-04 | Mixi | employee, backend/full-stack (Python/Django, React, AWS ECS) |
| 2019-05 → 2020-11 | Chikaku | employee, backend (IoT, Rails on ECS, serverless) |
| 2020-12 → 2022-02 | LegalForce | employee, backend/full-stack |
| 2021-02 → now | Cambia | freelance, ~10h/month in 2026 (job-matching service; Rails/GraphQL/React; Terraform/CDK) |
| 2022-03 → 2022-10 | Stores.jp | contract |
| 2022-11 → 2023-08 | Archers | contract, React Native + Rails, EKS→ECS/Terraform |
| 2023-10 → 2024-03 | Asobica | contract |
| 2024-03 → 2024-06 | Cybersecurity Cloud | contract, Rails views → Next.js, 2FA, gRPC |
| 2024-07 → 2026-08 (paused) | CareFran / Troika | contract; healthcare (care-manager) AI SaaS; LLM pipelines, eval harness, hallucination observability, CI agents. **On pause since ~2026-08 (client short of money).** |
| 2025-06 → 2025-09 | Algomatic | contract; business app from scratch (React, Hono, PostgreSQL, AWS); OpenSearch; **AI coding tools rolled out to an 8-person team** |
| 2026-05 → now | GMO NIKKO via DYM Career | 業務委託, fixed monthly fee, no timesheet; implementation delegated to coding agents, owner does review + meetings, ~30h/month. Client name must not appear on the site. |
| 2026-09-01 → 2026-11-30 (renewable) | Trabox | 準委任 140h±20h/month, 3 days/week on site (Shibuya). Role details: see `meta/inputs/trabox.txt`. Client name must not appear on the site. |

Freelance since 2021-02 (Cambia). Full-time freelance/contract since 2022-03. The draft article's "went freelance about two years ago" (written 2026-02) does not match; four to five years is right depending on the definition.

## Products and public work

- **Troika bot fleet / LLM reliability layer**: real, production, at CareFran (paused). Anonymised case study allowed (NDA judged OK 2026-07-12). Article `llm-reliability-in-production.mdx` describes this.
- **hub** (automation/hub): personal Mastra-based job-discovery pipeline, 11 source adapters, dashboard. Runs locally/Hetzner. Not a product.
- **Pechka / MiniLexer**: Russian-for-Japanese language app codebase (repo `minilexer`), feature-complete per 2026-07 survey, **never published to the App Store** (OWNER 2026-09-05: "I don't have Pechka app published yet, though I want to"). Do not describe it as an available app or as a Korean app.
- **Kanyomi** (korean-reader-ios): Japanese-first Korean reading app. Documentation, ADRs, content pipeline and 21 stories exist; **no Swift code since 2026-05, no app**. Domain kanyomi.app registered 2026-07-18; LP (storyling-lp `main`, 11 commits) **not deployed** — storyling.app still serves the 2025 StoryLing LP. Describe as "building" / 開発中, never 公開中.
- **StoryLing**: 2025 project; its LP is what is live at storyling.app. Superseded by Kanyomi.
- **sglypper**: Telegram/LINE meme-and-persona bot, live on Hetzner.
- **nagashima-proto**: two-day museum site prototype (2026-07), deployed behind Basic auth, outcome unknown.
- **nerixim.dev**: this site. Live version = old `main`; editorial refresh unpushed.

## Claims that need care

- "8人規模のチームへのAIコーディングツール導入" — Algomatic, 2025. True, but it was a 3-month contract; do not imply it is ongoing.
- "いまは医療系AIのSaaS開発をリードしながら" (about p4) and "現在は医療系SaaSのAI開発を主に担当" (home ai) — **stale**: Troika is paused. Current shape: review-and-meetings role for a fixed-fee client + a 3-days-on-site 準委任 + Cambia.
- "日本人向けの韓国語リーディングアプリを作っています" — acceptable as 開発中 only if it is clear there is no app yet.
- Projects page "Pechka: 日本語話者向けの韓国語リーディングアプリ" (uncommitted WIP) — wrong product: Pechka is the Russian app; the Korean one is Kanyomi.
- Any client name: only in the private CV, never on the site.
- Tax/invoice article: every rule and number must be checked against 国税庁 pages (`meta/5-workflow/sources-index.md` has the pages). Known 2026 facts: 2割特例 ends with the 2026年分 (individuals); 3割特例 for 2027–2028 (individuals with base-period sales ≤ ¥10M); the owner himself is over the ¥10M base-period threshold.
