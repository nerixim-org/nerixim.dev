#!/usr/bin/env bun
// Renders the applied home/about copy (ja + en) as a self-contained HTML page
// for a read-aloud proofing pass. Run: bun scripts/copy-pipeline/review.ts
// Output: scripts/copy-pipeline/outputs/review.html (gitignored, regenerate anytime).

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
const NAMESPACES = ["home", "about"] as const;

type Leaf = { path: string; text: string };

function flatten(obj: unknown, prefix: string[] = []): Leaf[] {
  if (typeof obj === "string") {
    return [{ path: prefix.join("."), text: obj }];
  }
  if (obj && typeof obj === "object") {
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
      flatten(v, [...prefix, k]),
    );
  }
  return [];
}

// Group leaves by their top-level section (e.g. "hero", "services.ai" -> "services")
function groupBySection(leaves: Leaf[]): Map<string, Leaf[]> {
  const groups = new Map<string, Leaf[]>();
  for (const leaf of leaves) {
    const section = leaf.path.split(".")[0] ?? leaf.path;
    if (!groups.has(section)) groups.set(section, []);
    groups.get(section)?.push(leaf);
  }
  return groups;
}

async function loadNamespace(lang: "ja" | "en", namespace: string) {
  const messages = await Bun.file(join(ROOT, "messages", `${lang}.json`)).json();
  return messages[namespace] ?? {};
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderLeafRow(ja: string | undefined, en: string | undefined, path: string): string {
  const jaCell = ja
    ? `<p class="leaf-text lang-ja" lang="ja">${escapeHtml(ja)}</p>`
    : `<p class="leaf-missing">—</p>`;
  const enCell = en
    ? `<p class="leaf-text lang-en" lang="en">${escapeHtml(en)}</p>`
    : `<p class="leaf-missing">—</p>`;
  const copyPayload = escapeHtml(`${ja ?? ""}\n${en ?? ""}`.trim());
  return `
    <div class="leaf-row">
      <div class="leaf-path">${escapeHtml(path)}</div>
      <div class="leaf-pair">
        <div class="leaf-col">${jaCell}</div>
        <div class="leaf-col">${enCell}</div>
      </div>
      <button class="copy-btn" type="button" data-copy="${copyPayload}" aria-label="Copy ${escapeHtml(path)}">Copy</button>
    </div>`;
}

async function renderNamespace(namespace: string): Promise<string> {
  const [ja, en] = await Promise.all([
    loadNamespace("ja", namespace),
    loadNamespace("en", namespace),
  ]);
  const jaLeaves = flatten(ja);
  const enByPath = new Map(flatten(en).map((l) => [l.path, l.text]));
  const jaByPath = new Map(jaLeaves.map((l) => [l.path, l.text]));
  const allPaths = new Set([...jaByPath.keys(), ...enByPath.keys()]);
  const ordered = jaLeaves.map((l) => l.path).concat([...allPaths].filter((p) => !jaByPath.has(p)));
  const grouped = groupBySection(ordered.map((path) => ({ path, text: jaByPath.get(path) ?? "" })));

  const sections = [...grouped.entries()]
    .map(([section, leaves]) => {
      const rows = leaves
        .map((l) => renderLeafRow(jaByPath.get(l.path), enByPath.get(l.path), l.path))
        .join("\n");
      return `
        <section class="group">
          <h3 class="group-title">${escapeHtml(section)}</h3>
          ${rows}
        </section>`;
    })
    .join("\n");

  return `
    <section class="namespace" id="ns-${namespace}">
      <h2 class="namespace-title">${namespace}</h2>
      ${sections}
    </section>`;
}

async function main() {
  const body = (await Promise.all(NAMESPACES.map(renderNamespace))).join("\n");
  const generatedAt = new Date().toISOString().slice(0, 16).replace("T", " ");

  const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>nerixim.dev copy review</title>
<style>
:root {
  --bg: #fafafb;
  --surface: #ffffff;
  --surface-muted: #f1f1f5;
  --border: #e3e3ea;
  --fg: #1b1b22;
  --fg-muted: #63636f;
  --accent: #4c5a8c;
  --accent-soft: #e8eaf3;
  --mono: ui-monospace, "SF Mono", "Menlo", monospace;
  --serif-ja: "Hiragino Mincho ProN", "Yu Mincho", "YuMincho", serif;
  --serif-en: Georgia, "Iowan Old Style", ui-serif, serif;
  --sans: -apple-system, "Helvetica Neue", "Hiragino Kaku Gothic ProN", sans-serif;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #17171c;
    --surface: #1e1e25;
    --surface-muted: #26262f;
    --border: #33333e;
    --fg: #ecebf1;
    --fg-muted: #9a99a6;
    --accent: #9aa6d6;
    --accent-soft: #262c42;
  }
}
:root[data-theme="dark"] {
  --bg: #17171c;
  --surface: #1e1e25;
  --surface-muted: #26262f;
  --border: #33333e;
  --fg: #ecebf1;
  --fg-muted: #9a99a6;
  --accent: #9aa6d6;
  --accent-soft: #262c42;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--sans);
  line-height: 1.6;
}
.page {
  max-width: 880px;
  margin: 0 auto;
  padding: 3rem 1.5rem 6rem;
}
.masthead {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}
.masthead h1 {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.01em;
}
.masthead p {
  margin: 0;
  color: var(--fg-muted);
  font-size: 0.85rem;
}
.nav-jump {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
}
.nav-jump a {
  font-size: 0.8rem;
  color: var(--accent);
  text-decoration: none;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.3rem 0.8rem;
}
.nav-jump a:hover { background: var(--accent-soft); }
.namespace { margin-bottom: 3rem; }
.namespace-title {
  font-family: var(--mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin: 0 0 1.25rem;
  scroll-margin-top: 1rem;
}
.group {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem 1.25rem 0.5rem;
  margin-bottom: 1.25rem;
}
.group-title {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--fg-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 0.75rem;
}
.leaf-row {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "path btn" "pair pair";
  align-items: start;
  gap: 0.25rem 0.75rem;
  padding: 0.85rem 0;
  border-top: 1px solid var(--border);
}
.leaf-row:first-of-type { border-top: none; }
.leaf-path {
  grid-area: path;
  font-family: var(--mono);
  font-size: 0.68rem;
  color: var(--fg-muted);
  align-self: center;
}
.leaf-pair {
  grid-area: pair;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media (max-width: 640px) {
  .leaf-pair { grid-template-columns: 1fr; }
}
.leaf-text { margin: 0.15rem 0 0; }
.lang-ja {
  font-family: var(--serif-ja);
  font-size: 1.05rem;
  text-wrap: pretty;
}
.lang-en {
  font-family: var(--serif-en);
  font-size: 0.95rem;
  color: var(--fg-muted);
  text-wrap: pretty;
}
.leaf-missing {
  margin: 0.15rem 0 0;
  color: var(--fg-muted);
  font-family: var(--mono);
  font-size: 0.8rem;
}
.copy-btn {
  grid-area: btn;
  justify-self: end;
  font-family: var(--sans);
  font-size: 0.7rem;
  border: 1px solid var(--border);
  background: var(--surface-muted);
  color: var(--fg-muted);
  border-radius: 6px;
  padding: 0.25rem 0.55rem;
  cursor: pointer;
}
.copy-btn:hover { border-color: var(--accent); color: var(--accent); }
.copy-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.copy-btn.copied { color: var(--accent); border-color: var(--accent); }
</style>
</head>
<body>
<div class="page">
  <header class="masthead">
    <h1>nerixim.dev — copy review</h1>
    <p>Applied home/about copy, ja (serif, primary) alongside en (secondary). Generated ${generatedAt} from messages/ja.json + messages/en.json.</p>
    <nav class="nav-jump">
      ${NAMESPACES.map((ns) => `<a href="#ns-${ns}">${ns}</a>`).join("\n      ")}
    </nav>
  </header>
  ${body}
</div>
<script>
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.getAttribute("data-copy") || "";
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copied";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("copied");
      }, 1200);
    } catch (e) {}
  });
});
</script>
</body>
</html>
`;

  const outDir = join(ROOT, "scripts", "copy-pipeline", "outputs");
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, "review.html");
  await writeFile(outPath, html, "utf-8");
  console.log(`Wrote ${outPath}`);
}

main();
