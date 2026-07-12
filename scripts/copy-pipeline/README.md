# Copy pipeline

Multi-stage rewrite pipeline for site copy, modeled on `storyling-content-pipeline` (draft → lint → critique → revise → judge). Replaces the old `copy:ja:brief` manual-prompt workflow.

## Stages

1. **draft** — 3 variants rewritten *from the fact sheet* (never translated); current copy is used for keys/structure only
2. **lint** — deterministic checks, no LLM (JA: banned positioning-language, 支援-density, slogan patterns; EN: AI-phrase list, em-dash/triad density)
3. **critique** — LLM editor: translationese, ai-voice, fact fidelity, verbosity
4. **revise** — applies critique + lint findings, compresses 10–20%
5. **judge** — cross-provider model scores variants against native exemplars and runs a pairwise comparison vs the current live copy ("current wins" is a legal verdict)

## Usage

```bash
# needs GOOGLE_GENERATIVE_AI_API_KEY + OPENROUTER_API_KEY in .env
bun run copy:pipeline home --lang ja      # → outputs/ja/home.{json,md}
bun run copy:pipeline home --lang en
bun run copy:apply home --lang ja --variant 2   # merge winner into messages/ja.json
bun run check:messages
```

Outputs are never overwritten without `--force` (reviewed candidates are expensive).

## Inputs you own

- `facts/{namespace}.md` — the only allowed source of claims. Review before first run.
- `voice/{lang}.md` — voice rules per language
- `exemplars/{lang}/*.md` — native-written reference pages anchoring the judge (see per-dir README + candidates.md)

## The human pass is still Pass 4

The pipeline gets you to reviewed candidates; you still read the winner aloud once before shipping (docs/copy/ja-copy-workflow.md Pass 4).
