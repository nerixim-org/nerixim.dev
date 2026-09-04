# Fact check of all pages and articles vs facts/_ground-truth.md (2026-09-05)

Produced by Codex CLI (gpt-5.6-sol, read-only) from `scripts/copy-pipeline/facts/_ground-truth.md`. Section 2 lists the tax-article claims; the ones checked against 国税庁 pages the same day are marked in `docs/copy/tax-article-verification-2026-09-05.md`.

## 1. Fact-check findings

For the tax article, the complete set of externally verifiable tax claims is in section 2 rather than duplicated in this table.

| file | key or line | quoted claim (verbatim, short) | problem | what the ground truth says | suggested fix |
|---|---|---|---|---|---|
| `messages/en.json` | `home.hero.description`; `about.metadata.description`; `about.story.p2` | “Nine years…” / “9 years of experience” | (d) | Engineering career began in March 2017; “9+ years” is correct in September 2026. Japanese consistently says `9年以上`. | “More than nine years…” / “over nine years of experience” |
| `messages/ja.json` | `home.services.ai.description` | 「現在は医療系SaaSのAI開発を主に担当しています。」 | (b) | The healthcare-AI engagement has been paused since approximately August 2026. | 「直近では医療系SaaSのAI機能と評価基盤を開発しました。」 |
| `messages/ja.json` | `about.story.p4_pre` | 「いまは医療系AIのSaaS開発をリードしながら」 | (b) | That engagement is paused. Current work consists of a review-and-meetings role, a three-days-on-site contract, and Cambia. | 「直近では医療系AI SaaSの開発に携わり、現在は複数の業務委託案件を担当しながら」 |
| `messages/en.json` | `about.story.p4_pre` | “One of my main projects is architecting a healthcare AI SaaS.” | (b) | The healthcare-AI engagement has been paused since approximately August 2026. | “Until August 2026, one of my main projects was building a healthcare AI SaaS.” |
| `messages/ja.json` | `projects.items.pechka.description` | 「日本語話者向けの韓国語リーディングアプリ。」 | (a), (d) | Pechka is a Russian-learning app. The Korean-reading project is Kanyomi. | 「日本語話者向けのロシア語学習アプリ。機能は完成していますが、App Storeではまだ公開していません。」 |
| `messages/en.json` | `projects.items.pechka.description` | “A Japanese-first Korean reading app…” | (a), (d) | Pechka is a Russian-learning app. The Korean-reading project is Kanyomi. | “A Russian-learning app for Japanese speakers. It is feature-complete but not yet published on the App Store.” |
| `messages/ja.json` | `home.cta.heading` | 「プロジェクトのご相談を受け付けています。」 | (c) | Current engagements total approximately 180 hours/month before variance, but the ground truth does not state whether additional work is being accepted. | 「現在の対応可否についてはお問い合わせください。」 |
| `messages/en.json` | `home.cta.heading` | “Available for freelance work.” | (c) | Current engagements total approximately 180 hours/month before variance, but availability is not documented. | “Contact me to check current availability.” |
| `messages/ja.json` | `metadata.description`; `services.metadata.description`; `services.localization.*` | 「ローカライズに対応しています。」 | (c) | Trilingual ability is documented, but professional localization work or clients are not established by the ground truth. | 「英語・日本語・ロシア語での技術コミュニケーションと多言語実装に対応しています。」 |
| `messages/en.json` | `metadata.description`; `services.metadata.description`; `services.localization.*` | “localization” / “Cultural adaptation beyond literal translation” | (c) | Trilingual ability is documented, but professional localization work or clients are not established. | “Multilingual implementation and technical communication in English, Japanese, and Russian.” |
| `messages/ja.json` | `projects.items.agentOps.description` | 「Sentryアラートをリポジトリ横断で調査するSlackエージェント」 | (c) | Coding and CI agents are documented; this particular Slack/Sentry agent is not in the ground truth. | 「この実績を裏付けられない場合は、Slack・Sentryエージェントの記述を削除します。」 |
| `messages/en.json` | `projects.items.agentOps.description` | “a Slack agent that triages Sentry alerts with cross-repo code and issue search” | (c) | Coding and CI agents are documented; this particular Slack/Sentry agent is not. | “Remove the Slack/Sentry-agent clause unless it can be added to the substantiated ground truth.” |
| `messages/en.json` | `about.story.p3` | “splitting monoliths” | (c), (d) | Rails-to-Next.js modernization is documented, but splitting monoliths is not; the Japanese version does not make this claim. | “Modernization usually means Rails-to-Next.js migrations and incremental improvements to existing systems.” |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 4 | `date: "2026-02-23"` | (c) | The ground truth says the draft was written in February 2026, but does not verify the exact date. | Confirm the intended publication date before publishing. |
| `content/blog/llm-reliability-in-production.mdx` | line 4 | `date: "2026-08-20"` | (c) | The exact publication date is not recorded in the ground truth. | Confirm the publication date against the site history. |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 11 | “I went freelance about two years ago.” | (a) | Freelance work began in February 2021; full-time freelance/contract work began in March 2022. In February 2026, the correct duration was approximately five or four years respectively. | “I started freelancing in 2021 and moved into full-time contract work in 2022.” |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | lines 17–22 | “There's no ‘freelancer visa.’” / “unrestricted work permission” | (c) | Immigration-status rules are not covered by the ground truth. | Verify every residence-status claim with the Immigration Services Agency before publication. |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | lines 19, 24 | “You can freelance on this” / “A one-page contract with a client's company stamp… goes a long way.” | (c) | These renewal and documentary-evidence claims are not covered by the ground truth. | Attribute these requirements to an official immigration source or clearly label them as personal experience. |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | lines 33, 94 | “the agents take a 15-20% cut” | (c) | Neither the percentage nor how most engagements were obtained is documented. | Remove the percentage or support it with the relevant agency terms. |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 47 | “Clients withhold 10.21%… up to 1 million yen per payment.” | (c) | The ground truth does not validate the scope or rate; all tax rules require an NTA check. | Verify which kinds of software work are subject to withholding and confirm the rates with the NTA. |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 49 | “It gives you a 650,000 yen deduction and lets you depreciate equipment.” | (c) | These blue-return rules are not validated by the ground truth. | Verify the deduction conditions and equipment treatment with the NTA. |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 51 | “If your revenue stays under 10 million yen, you're exempt…” | (c), (d) | The article’s more detailed version uses a two-years-prior base period; this sentence omits that qualification. | “Consumption-tax status generally depends on taxable sales in the applicable base period, not simply current revenue.” |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 53 | “Since October 2023…” | (c) | The invoice-system rules and date require an NTA check. | Verify the date and input-tax-credit wording against the current NTA guidance. |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 55 | “home office… cafes… meals… electronics” | (c) | Deductibility of these expenses is not established by the ground truth. | Present these only as expenses that may qualify depending on business purpose and documentation. |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 57 | “often 30-60 days after invoice” | (c) | No payment-term data appears in the ground truth. | “Payment terms vary by client; confirm them before budgeting.” |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 61 | “I work in Japanese with all my clients, and my Japanese is near-native” | (c), (d) | “All clients” is unverified. The site and English CV say “fluent”; the Japanese CV says native-level. One wording should be used consistently. | “I work with clients in Japanese, and my Japanese is fluent.” |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 80 | “a Japanese bank account is required” | (c) | This requirement and the assertion about most clients are not documented. | “Many domestic clients prefer payment to a Japanese bank account; confirm this with each client.” |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 82 | “A typical day: I work remotely from home” | (b) | The current principal engagement requires three on-site days per week in Shibuya. | “My current schedule mixes three on-site days per week with remote work.” |
| `content/blog/freelancing-as-a-developer-in-japan.mdx` | line 88 | “The national health insurance… and pension payments are your responsibility” | (c) | These legal/insurance rules are not covered by the ground truth. | Verify the applicable insurance and pension obligations against official guidance. |
| `content/blog/japan-invoice-system-foreign-freelancer.mdx` | line 46 | “my revenue exceeded 10 million yen in the previous fiscal year, so I was already a taxable business” | (a), (d) | The owner is over the ¥10 million base-period threshold. The same article later says liability is based on two fiscal years prior, not the previous fiscal year. | “My taxable sales exceeded ¥10 million in the applicable base period, so I was already a taxable business.” |
| `content/blog/japan-invoice-system-foreign-freelancer.mdx` | line 96 | “I use the simplified method.” | (c) | The owner’s current consumption-tax calculation method is not recorded. | Keep this sentence only after confirming the current filing method. |
| `content/blog/llm-reliability-in-production.mdx` | line 19 | “A prompt change looks like a 6% improvement” | (c) | No measured 6% result appears in the ground truth; the context does not clearly mark it as hypothetical. | “For example, a prompt change can appear to improve results even when the sample changed.” |
| `content/blog/llm-reliability-in-production.mdx` | line 47 | “Most regressions turned out to be concentrated in a specific slice” | (c) | Per-generation observability is documented, but this quantified generalization about most regressions is not. | “Several regressions were concentrated in a specific slice rather than spread evenly.” |

## 2. Tax-article claims requiring external verification

These are reproduced without judging their correctness.

- Line 4 — `date: "2026-02-26"`
- Line 17 — “The qualified invoice system launched in October 2023.”
- Line 17 — “Before it, any business could issue invoices that let clients claim consumption tax credits.”
- Line 17 — “Now, only registered businesses with a T-number (適格請求書発行事業者登録番号) can issue qualified invoices.”
- Line 19 — “If you're not registered, they can't”
- Line 21 — “Through September 2026, clients can still claim 80% of the consumption tax credit on invoices from unregistered businesses.”
- Line 21 — “From October 2026 to September 2029, that drops to 50%.”
- Line 21 — “After September 2029, it goes to zero.”
- Line 27 — “Registration is voluntary.”
- Line 27 — “You apply through your local tax office (税務署) or through the e-Tax online system.”
- Line 31 — “Your My Number (マイナンバー)”
- Line 32 — “A completed application form (適格請求書発行事業者の登録申請書)”
- Line 33 — “A registered business address (your home works if you're a sole proprietor / 個人事業主)”
- Line 35 — “Processing takes a few weeks.”
- Line 35 — “a 13-digit number prefixed with ‘T’ (e.g., T1234567890123)”
- Line 35 — “This number goes on every qualified invoice you issue.”
- Line 39 — “You must charge 10% consumption tax on your invoices”
- Line 40 — “You must file consumption tax returns (消費税申告) annually”
- Line 41 — “Your invoices must include specific required fields”
- Line 42 — “Your registration and T-number become publicly searchable on the NTA website”
- Line 44 — “if you were below the 10-million-yen revenue threshold and exempt from consumption tax, registration means you give up that exemption.”
- Line 44 — “You're now a taxable business regardless of revenue.”
- Line 46 — “my revenue exceeded 10 million yen in the previous fiscal year, so I was already a taxable business.”
- Line 52 — “When a Japanese company pays a freelancer for certain types of work — including software development, design, writing, and consulting — they're required to withhold income tax from the payment.”
- Line 56 — “10.21% on amounts up to 1,000,000 yen per payment”
- Line 57 — “20.42% on the portion exceeding 1,000,000 yen”
- Line 59 — “When you file your annual return (確定申告), you reconcile these withheld amounts against your actual tax liability.”
- Line 59 — “If too much was withheld, you get a refund.”
- Line 63 — “Say your fee is 500,000 yen plus 10% consumption tax”
- Line 67 — “Service fee \| ¥500,000”
- Line 68 — “Consumption tax (10%) \| ¥50,000”
- Line 69 — “Subtotal \| ¥550,000”
- Line 70 — “Withholding tax (10.21% of ¥500,000) \| -¥51,050”
- Line 71 — “Payment amount \| ¥498,950”
- Line 73 — “Withholding tax is calculated on the service fee before consumption tax, not on the total.”
- Line 76 — “Keep every withholding tax certificate (源泉徴収票) your clients give you. You need these when filing your annual return. If a client doesn't send one, ask — they're legally required to provide it.”
- Line 81 — “The standard rate is 10% (8% on certain food and beverages).”
- Line 85 — “If your taxable revenue in the ‘base period’ (基準期間 — two fiscal years prior) was under 10 million yen, you're exempt from collecting and remitting consumption tax.”
- Line 85 — “Cross that threshold, and you become a taxable business two years later.”
- Line 87 — “if you register for the invoice system, you become taxable immediately, regardless of revenue.”
- Line 91 — “Once you're taxable, you choose how to calculate your consumption tax liability”
- Line 93 — “Track actual consumption tax paid on business expenses and subtract it from consumption tax collected.”
- Line 94 — “Available if your base-period revenue was under 50 million yen.”
- Line 94 — “you apply a fixed ‘deemed purchase ratio’ (みなし仕入率) based on your industry.”
- Line 94 — “For IT services, this is 50%.”
- Line 98 — “The 2-割特例 (20% special measure)”
- Line 100 — “For freelancers who registered for the invoice system and would otherwise be tax-exempt (revenue under 10 million yen), there's a temporary measure through December 2026.”
- Line 100 — “You pay only 20% of the consumption tax you collected, regardless of actual expenses.”
- Line 104 — “A qualified invoice (適格請求書) must contain”
- Line 106 — “Your name or business name and T-number”
- Line 107 — “Invoice date”
- Line 108 — “Description of services provided”
- Line 109 — “Amount broken down by tax rate (10% standard, 8% reduced)”
- Line 110 — “Consumption tax amount for each rate”
- Line 111 — “Client's name or business name”
- Line 113 — “Missing any of these fields means the invoice doesn't qualify.”
- Line 113 — “The client can't use it for their tax credit.”
- Line 116 — “If you issue invoices in English, the required fields still apply.”
- Line 121 — “Withholding tax is income tax prepaid by clients.”
- Line 121 — “Consumption tax is a sales tax you collect and remit.”
- Line 123 — “The 青色申告 (blue form) gives you a 650,000 yen deduction and lets you carry forward losses.”
- Line 123 — “you just need to submit the application to your tax office before the filing deadline.”
- Line 125 — “Consumption tax obligations are based on revenue from two years ago, not current year revenue.”
- Line 125 — “Crossing 10 million yen in 2025 means you become taxable in 2027.”

## 3. Correct claims that need care

- The eight-person AI-coding-tool rollout in `about.story.p3` is real, but it was performed during a three-month Algomatic contract in 2025. Keep it clearly historical.
- “Building a Japanese-first Korean reading app” is acceptable for Kanyomi. There is no app yet, no Swift implementation since May 2026, and its landing page is not deployed.
- Pechka may reasonably remain “In Progress” while preparing publication, but it is feature-complete and has never been available on the App Store. Its Korean-app description must be corrected first.
- The healthcare reliability layer and the published LLM article describe real production work, and the anonymized case study is permitted. The engagement itself has been paused since approximately August 2026, so “built” is accurate while “currently leading” is not.