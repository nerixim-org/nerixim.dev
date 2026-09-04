# Tax article: claims checked against 国税庁 pages (2026-09-05)

Article: `content/blog/japan-invoice-system-foreign-freelancer.mdx` (draft, `published: false`). The claim list comes from `fact-check-2026-09-05.md` §2. Each row below was matched against the raw text of the cited page with `meta/scripts/verify-claim.mjs`. Rows marked ✗ must be fixed before publishing; rows marked ? have no NTA page found yet.

| Article claim (line) | Verdict | Page | What the page says |
|---|---|---|---|
| Invoice system launched October 2023 (17) | ✓ | [国税庁 2割特例の概要](https://www.nta.go.jp/publication/pamph/shohi/kaisei/202304/01.htm) | 令和5年10月1日 |
| 80% credit on unregistered suppliers through Sept 2026, 50% Oct 2026 → Sept 2029, then zero (21) | **✗ outdated** | [国税庁 令和8年度改正リーフレット (PDF)](https://www.nta.go.jp/taxes/shiraberu/zeimokubetsu/shohi/keigenzeiritsu/invoice-review/pdf/0026002-095.pdf) | 令和8年度改正で2年延長・緩和: 80% → **70% from 2026-10**, **50% from 2028-10**, **30% 2030-10 → 2031-09**, then 0. Also a new ¥1億 cap per supplier per year. |
| 2割特例: pay 20% of collected tax, for registrants who would otherwise be exempt, "through December 2026" (98–100) | ✓ with wording | same leaflet + [Q&A問115 (PDF)](https://www.nta.go.jp/taxes/shiraberu/zeimokubetsu/shohi/keigenzeiritsu/pdf/qa/115.pdf) | Ends with the period containing 2026-09-30, i.e. 2026年分 for individuals. Not available if base-period sales > ¥10M. **Add**: 3割特例 for 2027年分・2028年分 (individuals only, same eligibility). |
| Base period = two fiscal years prior; ¥10M threshold (85, 125) | ✓ | Q&A問115 | 基準期間の課税売上高が１千万円を超える課税期間は2割特例不可; 基準期間 = 前々年 |
| Registering for the invoice system makes you taxable regardless of revenue (44, 87) | ✓ | 2割特例の概要 | 免税事業者がインボイス発行事業者となる場合… |
| Withholding 10.21% up to ¥1M, 20.42% above (56–57, 70) | ✓ | [No.2795 原稿料や講演料等](https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2795.htm) | 100万円以下 A×10.21％、100万円超 (A−100万円)×20.42％＋102,100円 |
| Withholding applies to "software development, design, writing, consulting" (52) | **✗ unsupported** | No.2795, [No.2792](https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2792.htm) | The pages list 原稿料・講演料・デザイン料・弁護士等の報酬 (所得税法204条1項). **Software development / programming is not on the list**; most freelance engineering invoices are not subject to withholding. Rewrite: withholding applies to specific categories (writing, design, lectures, professional fees); ordinary development work usually is not. |
| Clients are "legally required" to give you a 源泉徴収票 (76) | **✗ wrong document, wrong duty** | [No.7431 支払調書](https://www.nta.go.jp/taxes/shiraberu/taxanswer/hotei/7431.htm) | The payer files a 支払調書 with the tax office; giving a copy to the payee is optional ("写しを受給者に交付する場合には"). 源泉徴収票 is for salary. Rewrite: keep your own record of withheld amounts from each payment; a 支払調書 copy is a courtesy. |
| Withholding calculated on the fee before consumption tax (73) | partial | No.2795 | The page's example uses the fee; NTA practice allows either basis when tax is shown separately. Say "when consumption tax is shown separately on the invoice, withholding may be calculated on the pre-tax amount". |
| Consumption tax 10% (8% reduced) (81) | ✓ | general | — |
| Simplified method available if base-period sales < ¥50M; deemed purchase ratio for IT services 50% (94) | ✓ | [No.6505](https://www.nta.go.jp/taxes/shiraberu/taxanswer/shohi/6505.htm), [No.6509](https://www.nta.go.jp/taxes/shiraberu/taxanswer/shohi/6509.htm) | 5,000万円以下; 第5種事業(サービス業) 50％ |
| 青色申告 gives a ¥650,000 deduction (123; freelancing article 49) | ✓ with condition | [No.2072](https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/2072.htm) | 65万円 requires e-Tax filing or 電子帳簿保存; otherwise 55万円 (or 10万円). State the condition. |
| Required fields of a qualified invoice (104–111) | ? | — | Not checked against the 記載事項 page yet. |
| Registration via 税務署 or e-Tax, "a few weeks", T + 13 digits (27–35) | ? | — | Not checked. |
| "Crossing ¥10M in 2025 means taxable in 2027" (125) | ✓ | Q&A問115 (基準期間 = 前々年) | — |

Also from the ground truth, not from NTA: line 46 says "revenue exceeded 10 million yen in the previous fiscal year, so I was already taxable" — the test is the base period (two years prior), and the article itself says so at line 85. Fix the wording. Line 96 "I use the simplified method" is unconfirmed (the owner's 2027 filing method is decided by 2026-12-31).

Next: fix the three ✗ rows and the wording rows in the draft, then check the two ? rows on the NTA 記載事項 and 登録申請 pages before `published: true`.
