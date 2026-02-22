# Gate 2: First Content — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build full blog infrastructure, write and publish 2 blog posts with SEO optimization, apply targeted polish to existing pages, and share content publicly.

**Scope:** Blog infra (MDX loading, dynamic routes, custom components, reading-optimized layout, ToC, reading time, related posts, share buttons) + 2 posts + targeted site polish + post-Gate-2 audit.

**Tech additions:** `gray-matter` (frontmatter parsing), `rehype-pretty-code` + `shiki` (syntax highlighting), `reading-time` (word count), `rehype-slug` + `rehype-autolink-headings` (ToC anchors).

---

## Decisions Made

| Decision | Choice | Rationale |
|---|---|---|
| Frontmatter format | YAML in MDX files | Standard, gray-matter compatible, no custom parser needed |
| Blog file location | `content/blog/` (already exists) | Separates content from code, `.gitignore` already excludes drafts |
| URL pattern | `/blog/[slug]` | Clean, SEO-friendly, slug derived from filename |
| Syntax highlighting | rehype-pretty-code + shiki | Best-in-class, supports light/dark themes, no client JS |
| ToC generation | Server-side from headings + rehype-slug | No client component needed, accessible anchor links |
| Share buttons | Static links (X, Reddit, copy URL) | No third-party scripts, no tracking, lightweight |
| Reading time | Calculated at build time from word count | ~200 WPM, displayed in post header |
| Post length | ~1500-2000 words per post | Quick-to-read, shareable, matches plan |
| Cross-posting | Manual to Dev.to with canonical URL | Simple for now, revisit automation later |
| Blog layout | Reading-optimized (wider prose, larger text) | Better long-form reading experience |

---

## File Structure (New/Modified)

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # MODIFY — real blog index with post list
│   │   └── [slug]/
│   │       ├── page.tsx           # NEW — dynamic blog post page
│   │       └── opengraph-image.tsx # NEW — per-post dynamic OG images
│   ├── page.tsx                   # MODIFY — add recent posts section
│   └── globals.css                # MODIFY — add prose/article typography styles
├── components/
│   ├── blog/
│   │   ├── post-header.tsx        # NEW — title, date, reading time, tags
│   │   ├── post-body.tsx          # NEW — MDX renderer with custom components
│   │   ├── table-of-contents.tsx  # NEW — sidebar/top ToC from headings
│   │   ├── share-buttons.tsx      # NEW — X, Reddit, copy link
│   │   ├── related-posts.tsx      # NEW — 2-3 related posts by tag
│   │   └── post-card.tsx          # NEW — card for blog index listing
│   └── mdx/
│       ├── callout.tsx            # NEW — tip/warning/note callout component
│       ├── code-block.tsx         # NEW — styled code block wrapper (if needed beyond rehype)
│       └── index.ts               # NEW — MDX component map export
├── lib/
│   ├── blog.ts                    # NEW — MDX loading, frontmatter parsing, sorting
│   └── site-config.ts             # MODIFY — add blog-related config
content/
├── blog/
│   ├── freelancing-as-a-developer-in-japan.mdx    # NEW — Post #1
│   └── japan-invoice-system-foreign-freelancer.mdx # NEW — Post #2
mdx-components.tsx                 # MODIFY — wire custom MDX components
```

---

## Task 1: Blog Infrastructure — MDX Loading & Frontmatter

**Time estimate:** 2-3 hours
**Skills:** `next-best-practices`, `vercel-react-best-practices`, `naming-analyzer`
**Files:** `src/lib/blog.ts`, `package.json`, `next.config.ts`

### Step 1: Install dependencies

```bash
bun add gray-matter reading-time rehype-pretty-code shiki rehype-slug rehype-autolink-headings
bun add -D @types/mdx
```

### Step 2: Create `src/lib/blog.ts`

Blog utility module:

```typescript
// Frontmatter schema (Zod v4)
const postFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(), // ISO date string
  updated: z.string().optional(),
  tags: z.array(z.string()),
  published: z.boolean().default(true),
})

type PostFrontmatter = z.infer<typeof postFrontmatterSchema>

type Post = PostFrontmatter & {
  slug: string
  readingTime: string
  content: string
}
```

Functions to implement:

- `getPostBySlug(slug: string): Promise<Post>` — reads MDX file, parses frontmatter, calculates reading time
- `getAllPosts(): Promise<Post[]>` — returns all published posts sorted by date (newest first)
- `getRelatedPosts(currentSlug: string, tags: string[], limit?: number): Promise<Post[]>` — find posts with overlapping tags

### Step 3: Configure MDX plugins in `next.config.ts`

Add rehype plugins to `createMDX()`:

```typescript
const withMDX = createMDX({
  options: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, { theme: { dark: 'github-dark', light: 'github-light' } }],
    ],
  },
})
```

### Step 4: Verify

- [ ] `getAllPosts()` returns empty array (no posts yet)
- [ ] Frontmatter schema validates correctly
- [ ] Build succeeds

### Step 5: Commit

```
feat: blog infrastructure — MDX loading, frontmatter parsing, reading time
```

---

## Task 2: Blog Post Layout — Reading-Optimized

**Time estimate:** 3-4 hours
**Skills:** `frontend-design`, `visual-design-foundations`, `tailwind-design-system`, `web-design-guidelines`, `interaction-design`
**Files:** `src/app/blog/[slug]/page.tsx`, `src/app/globals.css`, blog components

### Step 1: Add prose typography to `globals.css`

Reading-optimized article styles:

- Wider prose width (~720px max for body text)
- Larger body text for articles (~18px / `text-lg`)
- Generous line-height (~1.8)
- Comfortable paragraph spacing
- Styled headings with anchor links
- Code block styling (light/dark theme-aware via rehype-pretty-code)
- Blockquote styling
- List styling
- Image max-width and rounding
- Link styling with subtle underline

### Step 2: Build `post-header.tsx`

Server component displaying:

- Post title (serif, large)
- Publication date (formatted) + reading time
- Tags as Badges
- Optional "Updated" date

### Step 3: Build `table-of-contents.tsx`

Extracts headings (h2, h3) from the MDX content and renders a sidebar/top navigation:

- On desktop: sticky sidebar or top section
- On mobile: collapsible section at the top
- Links to heading anchors (rehype-slug provides IDs)

### Step 4: Build `share-buttons.tsx`

Static share links (no JavaScript tracking):

- Share on X/Twitter (pre-filled URL + title)
- Share on Reddit (pre-filled URL)
- Copy link to clipboard (minimal client-side JS)

### Step 5: Build `related-posts.tsx`

Server component:

- Takes current post's tags, finds 2-3 posts with overlapping tags
- Renders as small cards linking to those posts
- Graceful empty state (hidden if no related posts)

### Step 6: Build `post-card.tsx`

Used on the blog index page:

- Title (link to post)
- Date + reading time
- Description (1-2 lines)
- Tags as small badges

### Step 7: Build `src/app/blog/[slug]/page.tsx`

Dynamic route with:

- `generateStaticParams()` for SSG
- `generateMetadata()` for per-post SEO
- Reading-optimized layout: post header, optional ToC, MDX body, share buttons, related posts
- Proper `<article>` semantic HTML

### Step 8: Build per-post OG image (`opengraph-image.tsx`)

Extends the existing site-wide OG image pattern:

- Shows post title (large)
- Shows date and "nerixim.dev" branding
- Same visual style as the root OG image

### Step 9: Verify

- [ ] Blog post page renders with correct layout
- [ ] Typography is reading-optimized (wider, larger, more spacing)
- [ ] ToC renders and links work
- [ ] Share buttons generate correct URLs
- [ ] OG image generates with post title
- [ ] Dark mode looks correct
- [ ] Mobile layout is readable

### Step 10: Commit

```
feat: blog post layout — reading-optimized typography, ToC, share buttons, OG images
```

---

## Task 3: Custom MDX Components

**Time estimate:** 1-2 hours
**Skills:** `web-component-design`, `shadcn-ui`, `vercel-composition-patterns`
**Files:** `src/components/mdx/`, `mdx-components.tsx`

### Step 1: Build `callout.tsx`

Admonition/callout component for tips, warnings, notes:

```mdx
<Callout type="tip">
  This is important information.
</Callout>
```

Three variants: `tip` (blue), `warning` (amber), `note` (gray). Uses appropriate icons from Lucide.

### Step 2: Build any additional MDX component overrides

Custom styled versions of:

- `a` — external link indicator, opens in new tab for external URLs
- `img` — responsive with rounded corners
- `pre`/`code` — ensure rehype-pretty-code output is styled correctly
- `table` — responsive wrapper with horizontal scroll on mobile
- `blockquote` — styled with left border accent

### Step 3: Wire `mdx-components.tsx`

Update the passthrough implementation to include custom components:

```typescript
import { mdxComponents } from '@/components/mdx'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxComponents, ...components }
}
```

### Step 4: Verify

- [ ] Callout renders in all 3 variants
- [ ] Code blocks have syntax highlighting (light + dark)
- [ ] Links, images, tables render correctly
- [ ] Build succeeds

### Step 5: Commit

```
feat: custom MDX components — callouts, code blocks, prose styling
```

---

## Task 4: Blog Index Page

**Time estimate:** 1 hour
**Skills:** `page-cro`, `seo-geo`
**Files:** `src/app/blog/page.tsx`

### Step 1: Replace placeholder with real blog index

- Page heading + description
- List of posts using `post-card.tsx`
- Posts sorted by date (newest first)
- SEO metadata with keyword targeting

### Step 2: Add structured data (JSON-LD)

Blog listing page schema markup for search engines.

### Step 3: Verify

- [ ] Blog index lists all published posts
- [ ] Post cards link correctly
- [ ] Empty state still works if no published posts
- [ ] Metadata is correct

### Step 4: Commit

```
feat: blog index page — post listing with cards and structured data
```

---

## Task 5: Write Blog Post #1 — "What It's Actually Like Freelancing as a Developer in Japan"

**Time estimate:** 3-4 hours
**Skills:** `copywriting`, `humanizer`, `writing-clearly-and-concisely`, `seo-geo`, `content-strategy`, `copy-editing`
**Files:** `content/blog/freelancing-as-a-developer-in-japan.mdx`

### Content Strategy

- **Pillar:** Dev in Japan
- **Target audience:** English-speaking developers considering Japan, expats already here, r/japanlife readers
- **Tone:** Personal, honest, direct. Not promotional. Not "10 reasons why Japan is great."
- **SEO target:** "freelancing as developer in Japan", "freelance software engineer Japan"
- **Length:** ~1500-2000 words

### Outline

1. **Opening** — How you ended up freelancing in Japan (brief, personal, no clichés)
2. **The visa situation** — What visa allows freelancing, practical reality
3. **Finding clients** — Referrals vs. platforms vs. cold outreach, Japanese business culture
4. **Money** — Tax basics (withholding, consumption tax, blue form), invoicing culture
5. **The language gap** — Working in Japanese vs. English, code-switching, client expectations
6. **Tools and workflow** — What you actually use day-to-day
7. **Honest downsides** — Isolation, lack of dev community, admin overhead
8. **Would I recommend it?** — Nuanced take, not a sales pitch

### Writing Process

1. Draft outline with key points per section
2. Write first draft focusing on clarity and authenticity
3. Apply `humanizer` skill — remove AI-sounding patterns
4. Apply `copy-editing` skill — multiple editing passes (structure, clarity, concision)
5. Apply `seo-geo` — optimize title, meta description, heading structure, internal linking
6. Final read for tone — should sound like a real person writing from experience

### Frontmatter

```yaml
---
title: "What It's Actually Like Freelancing as a Developer in Japan"
description: "An honest look at visa, taxes, clients, language, and the daily reality of freelance software development in Japan."
date: "2026-02-XX"
tags: ["freelancing", "japan", "career"]
published: true
---
```

### Commit

```
content: publish post — freelancing as a developer in Japan
```

---

## Task 6: Write Blog Post #2 — "Navigating Japan's Invoice System as a Foreign Freelancer"

**Time estimate:** 3-4 hours
**Skills:** `copywriting`, `humanizer`, `writing-clearly-and-concisely`, `seo-geo`, `content-strategy`, `copy-editing`
**Files:** `content/blog/japan-invoice-system-foreign-freelancer.mdx`

### Content Strategy

- **Pillar:** Dev in Japan
- **Target audience:** Foreign freelancers in Japan, people confused by インボイス制度
- **Tone:** Practical, reference-heavy, helpful. This is a "how-to" not a story.
- **SEO target:** "Japan invoice system freelancer", "インボイス制度 English", "Japan withholding tax freelancer"
- **Length:** ~1500-2000 words
- **Gate 4 connection:** This post will become the top-of-funnel for the tax calculator tool

### Outline

1. **Opening** — Why this is confusing and why it matters
2. **The Invoice System (インボイス制度)** — What it is, when it started, who it affects
3. **Registration** — How to register, the T-number, what changes after registration
4. **Withholding tax (源泉徴収)** — The 10.21% rate, over-1M rate, how to calculate
5. **Consumption tax (消費税)** — 10M threshold, simplified vs. standard, what to file
6. **What your invoice must include** — Checklist of required fields
7. **Common mistakes** — Things foreign freelancers get wrong
8. **Resources** — Links to NTA, tax office, useful tools (future: your calculator)

### Writing Process

Same as Post #1: draft → humanizer → copy-editing → SEO optimization → final tone check.

### Frontmatter

```yaml
---
title: "Navigating Japan's Invoice System as a Foreign Freelancer"
description: "A practical guide to Japan's invoice registration, withholding tax, and consumption tax for foreign freelancers. Covers the インボイス制度 in English."
date: "2026-02-XX"
tags: ["freelancing", "japan", "taxes"]
published: true
---
```

### Commit

```
content: publish post — Japan invoice system guide for foreign freelancers
```

---

## Task 7: Targeted Site Polish

**Time estimate:** 2-3 hours
**Skills:** `page-cro`, `copywriting`, `marketing-psychology`, `seo-geo`, `web-design-guidelines`, `writing-clearly-and-concisely`, `humanizer`

These are improvements to existing pages that directly support Gate 2 goals (content distribution, SEO, credibility).

### 7a: Add "Recent Posts" section to Home page

After `<ServicesPreview />`, before `<CtaSection />`, add a section showing the 2 most recent blog posts. Uses `post-card.tsx`. Drives traffic from home page to content.

### 7b: Copy review on existing pages

Using `copy-editing` and `humanizer` skills, review and tighten copy on:

- Home page (hero, services preview, CTA)
- About page (story section)
- Services page

Focus: remove any AI-sounding patterns, tighten prose, strengthen CTAs. No major structural changes.

### 7c: SEO improvements

Using `seo-geo` skill:

- Add JSON-LD structured data to key pages (Person schema on About, Service schema on Services)
- Review and optimize meta descriptions
- Ensure heading hierarchy is correct on all pages
- Add internal links between related pages (services ↔ blog posts, about → projects, etc.)

### 7d: Add blog link prominence

Ensure blog is visible and linked from:

- Navigation (already done)
- Home page (via recent posts section)
- About page (mention "I write about..." with link)
- Services page footer CTA (secondary CTA: "Read about my experience in Japan")

### Commit

```
enhance: home page recent posts, copy tightening, SEO structured data
```

---

## Task 8: Site Audit & Final QA

**Time estimate:** 1-2 hours
**Skills:** `audit-website`, `frontend-code-review`, `web-design-guidelines`, `reducing-entropy`

### Step 1: Run squirrelscan audit

```bash
squirrel scan https://nerixim.dev
```

Compare score to Gate 1 baseline (83). Fix any regressions. Target: maintain or improve score.

### Step 2: Frontend code review

Using `frontend-code-review` skill on all new/modified TSX files. Check for:

- Accessibility issues
- Performance concerns
- Component composition quality
- Proper use of server vs. client components

### Step 3: Code cleanup

Using `reducing-entropy` skill:

- Remove any dead code introduced during Gate 2
- Ensure consistent patterns across new blog components
- Check for unused dependencies

### Step 4: Build verification

```bash
bun run build
bun run lint
bun run compile
```

All must pass cleanly.

### Step 5: QA checklist

- [ ] Blog index page lists both posts
- [ ] Both blog posts render correctly
- [ ] Reading-optimized layout works on desktop and mobile
- [ ] ToC generates correct anchor links
- [ ] Share buttons work (X, Reddit, copy)
- [ ] Per-post OG images generate correctly
- [ ] Dark mode works on all blog pages
- [ ] Syntax highlighting works in both themes
- [ ] Callout components render correctly
- [ ] Related posts section works
- [ ] Home page shows recent posts
- [ ] Internal links between pages work
- [ ] JSON-LD structured data validates
- [ ] Site audit score ≥ 83
- [ ] Build completes without errors/warnings

### Step 6: Commit

```
chore: post-Gate-2 audit fixes and code cleanup
```

---

## Skill Application Map

| Task | Skills to Apply |
|---|---|
| 1. Blog infra — MDX loading | `next-best-practices`, `vercel-react-best-practices`, `naming-analyzer` |
| 2. Blog post layout | `frontend-design`, `visual-design-foundations`, `tailwind-design-system`, `web-design-guidelines`, `interaction-design` |
| 3. Custom MDX components | `web-component-design`, `shadcn-ui`, `vercel-composition-patterns` |
| 4. Blog index page | `page-cro`, `seo-geo` |
| 5. Blog post #1 | `copywriting`, `humanizer`, `writing-clearly-and-concisely`, `seo-geo`, `content-strategy`, `copy-editing` |
| 6. Blog post #2 | `copywriting`, `humanizer`, `writing-clearly-and-concisely`, `seo-geo`, `content-strategy`, `copy-editing` |
| 7. Site polish | `page-cro`, `copywriting`, `marketing-psychology`, `seo-geo`, `web-design-guidelines`, `humanizer`, `writing-clearly-and-concisely` |
| 8. Audit & QA | `audit-website`, `frontend-code-review`, `web-design-guidelines`, `reducing-entropy` |

### Skills NOT used in Gate 2 (available but deferred)

| Skill | Applicable Gate |
|---|---|
| `free-tool-strategy` | Gate 4 (tax calculator) |
| `form-cro` | Gate 4 (calculator inputs) |
| `paid-ads` | Gate 5 (launch) |
| `popup-cro` | Post-Gate 5 (newsletter) |
| `launch-strategy` | Gate 5 |
| `marketing-ideas` | Gate 5 |
| `analytics-tracking` | Gate 5 (deeper tracking setup) |
| `competitive-landscape` | Post-Gate 5 |
| `market-sizing-analysis` | Post-Gate 5 |
| `brainstorming` | As needed |
| `test-driven-development` | Gate 4 (calculator logic) |
| `professional-communication` | Gate 5 (outreach) |
| `theme-factory` | Future redesign |
| `writing-skills` | Future skill creation |

---

## Post-Implementation

After all 8 tasks:

1. Deploy to Vercel (push to main)
2. Verify live site
3. Update `docs/plans/2026-02-21-personal-site-plan.md` — check off Gate 2 items
4. Share post #1 on Reddit (r/japanlife) — genuine tone, not promotional
5. Cross-post post #1 to Dev.to (manual, with canonical URL pointing to nerixim.dev)
6. Share on any other relevant communities
