# Japanese Copy Workflow

## Goal

Make the Japanese copy on `nerixim.dev` read as if it was originally written in Japanese, not translated from English.

The working rule is:

- English is a fact source
- Japanese is original copy
- The model should rewrite from facts, not translate sentence by sentence

## Better Reference Sources

Do not use generic engineering blog posts as your main reference set. They are useful for technical prose, but not for profile or service-page voice.

Use these instead:

- Personal profile pages by Japanese freelance engineers
- Service pages by solo developers or small studios
- Speaker bios for Japanese engineering conferences
- Short self-intros on `note`, Zenn profile pages, or company member pages
- Japanese founder or CTO profile pages

Look for writing that is:

- calm
- concrete
- slightly understated
- not too corporate
- not too sales-heavy

## What To Avoid

These patterns tend to make Japanese sound like translated English:

- abstract headline language like `言語と市場をまたぐ`
- too many `〜を支援しています`
- noun-heavy phrases that compress too much meaning
- parallel three-part slogans
- overuse of `プロダクト`, `越境`, `実務`, `基盤` when a simpler phrase would work
- trying to preserve English sentence order

## Current Phrases Worth Reviewing

These are not wrong, but they are good candidates for a more native rewrite:

- `言語と市場をまたぐ`
- `越境プロダクト支援`
- `実運用に乗る形で`
- `プロダクト基盤づくり`
- `対外・対内の言語調整`
- `多言語・越境プロダクト支援`
- `実務で定着することを前提にした`

In many cases, simpler Japanese will read better than “positioning language.”

## Voice Guidelines

Preferred voice:

- first-person and direct
- calm confidence
- specific over abstract
- slightly restrained
- more “what I do” than “what I represent”

Prefer:

- `日本を拠点に活動しています`
- `Webアプリやバックエンド、インフラまわりまで見ています`
- `新規立ち上げと既存システムの改善の両方に対応しています`

Be cautious with:

- `支援`
- `またぐ`
- `越境`
- `落とし込む`
- `橋渡し`

They can work, but they start sounding generic if repeated.

## LLM Workflow

### Pass 1: Rewrite from facts

Use English only as a fact sheet. Do not ask for a translation.

Prompt template:

```text
以下の英語は翻訳しないでください。
書かれている事実だけを保持して、日本のスタートアップや事業会社の担当者が読む個人サイトの文章として、
日本語で新規に書き直してください。

要件:
- 英語の文構造をなぞらない
- 日本語ネイティブが自分で書いたように見えること
- 営業っぽくしすぎない
- 抽象語を減らす
- 技術名は証拠として必要最小限だけ残す
- 事実は足さない
- 3案出す:
  1. 端正で仕事向け
  2. 少し人柄が出る
  3. 最も簡潔

事実メモ:
[facts]

英語:
[english]

現在の日本語:
[current_ja]
```

### Pass 2: Translationese critic

Ask the model to act as a Japanese editor, not a writer.

```text
以下の日本語コピーについて、翻訳調に見える箇所をすべて指摘してください。

各箇所について:
1. なぜ不自然か
2. もっと自然な言い方
3. 元の意味を保った改善案

そのあと、全文の改善版を出してください。
文体は、日本のエンジニアが自分の個人サイトに書く自然な日本語にしてください。
```

### Pass 3: Compression pass

Japanese usually improves when you cut 10-20%.

```text
以下の文章を、意味を変えずに10〜20%短くしてください。
説明っぽさと翻訳調を減らし、日本語として自然な密度にしてください。
```

### Pass 4: Human final pass

Read it and ask:

- would a Japanese engineer actually write this?
- does it sound like a translation of a better English sentence?
- are there any phrases that feel “marketing-ish” rather than personal?

## Practical Routine For This Repo (2026-09-05)

1. Check the fact sheet for the namespace: `scripts/copy-pipeline/facts/<ns>.md` (home, about, services exist). The pipeline may only claim what is in it.
2. Run the pipeline for one namespace: `bun run copy:pipeline <ns> --lang ja` → `scripts/copy-pipeline/outputs/ja/<ns>.md` (3 variants, lint, critique, judge vs. exemplars and vs. current copy).
3. Read the winner aloud (Pass 4 above). Compare its register with `scripts/copy-pipeline/exemplars/ja/phrasebank.md` — 13 verbatim sentences by Japanese freelance engineers, each matched against the page's raw text on 2026-09-05.
4. Apply: `bun run copy:apply <ns> --lang ja --variant <n>`, then `bun run check:messages`.
5. Ship through the normal route (push to `main`; Vercel deploys).

References: the 9 source pages are listed in `exemplars/ja/candidates.md` (re-verified live 2026-09-05) and loaded into the NotebookLM notebook 「nerixim.dev 日本語コピー参照 2026-09」 for questions like "how do these authors state scope of work". Any quote taken from the notebook goes through `verify-claim` before it is used; the notebook paraphrased 1 of 15 quotes on the first ask. `portfolios.md` at the repo root is the earlier AI-drafted note and is superseded (see `candidates.md`). The old `copy:ja:brief` script no longer exists.
