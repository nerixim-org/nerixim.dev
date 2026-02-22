# Gate 1: Site Skeleton — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and deploy the nerixim.dev hub site with 6 real pages, responsive layout, dark mode, working contact form, and Vercel Analytics.

**Architecture:** Next.js App Router with static Server Components. All pages are SSG-friendly (no dynamic data). shadcn/ui for component primitives. Resend via Server Actions for contact form. MDX infrastructure for future blog content.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, shadcn/ui, next-themes, @next/mdx, Resend, Zod, next/font (Source Serif 4 + DM Sans), Lucide React, Vercel Analytics

**Design Direction:** Refined minimal. Serif headings (Source Serif 4) + clean sans body (DM Sans). Lots of whitespace. Subtle, intentional. Dark mode as first-class. No stock photos — code screenshots, terminal output, geometric/initial avatar.

---

## Decisions Made

| Decision | Choice | Rationale |
|---|---|---|
| Component library | shadcn/ui + Tailwind | Accessible primitives, fast dev, full ownership |
| Design aesthetic | Refined minimal | Stands out from typical dev portfolio sites |
| Font pairing | Source Serif 4 (headings) + DM Sans (body) | Distinctive serif headings, highly readable body |
| Contact form | Server Action + Resend | No third-party form service, full control, matches stack |
| MDX tooling | @next/mdx | Minimal setup for Gate 1, blog content is Gate 2 |
| Dark mode | next-themes (class strategy) | Persisted preference, SSR-safe, no flash |
| Avatar | Geometric placeholder / initials | Real photo added later |

---

## File Structure

```
nerixim.dev/
├── docs/                              # existing (unchanged)
├── content/
│   └── blog/                          # empty, ready for Gate 2
├── public/
│   ├── og-default.png                 # OG image (generated)
│   └── favicon.svg                    # simple favicon
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # root layout, fonts, theme provider
│   │   ├── page.tsx                   # home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── contact/
│   │   │   ├── page.tsx
│   │   │   └── actions.ts            # server action for Resend
│   │   ├── blog/page.tsx              # blog index (empty state)
│   │   └── globals.css                # tailwind + shadcn CSS vars
│   ├── components/
│   │   ├── ui/                        # shadcn components (auto-generated)
│   │   ├── layout/
│   │   │   ├── site-header.tsx
│   │   │   ├── site-footer.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── home/
│   │   │   ├── hero.tsx
│   │   │   ├── services-preview.tsx
│   │   │   └── cta-section.tsx
│   │   ├── contact-form.tsx
│   │   └── project-card.tsx
│   └── lib/
│       ├── utils.ts                   # cn() helper (shadcn)
│       └── site-config.ts             # site name, description, nav links, social
├── .env.local                         # RESEND_API_KEY (gitignored)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── components.json                    # shadcn config
```

---

## Task 1: Project Scaffolding

**Time estimate:** 30-60 min
**Files:** Create all config files and project structure

### Step 1: Create Next.js project

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Note: Run from the repo root. The `.` installs into the existing directory.

### Step 2: Verify the project runs

```bash
npm run dev
```

Expected: Dev server starts at localhost:3000 with the default Next.js page.

### Step 3: Initialize shadcn/ui

```bash
npx shadcn@latest init
```

Configuration:

- Style: Default
- Base color: Neutral
- CSS variables: Yes
- `tailwind.config.ts` path: confirm
- `globals.css` path: `src/app/globals.css`
- Components path: `src/components`
- Utils path: `src/lib/utils`

### Step 4: Install shadcn components needed for Gate 1

```bash
npx shadcn@latest add button card input textarea separator badge sheet navigation-menu
```

### Step 5: Install additional dependencies

```bash
npm install next-themes resend zod lucide-react @vercel/analytics @next/mdx @mdx-js/loader @mdx-js/react
```

### Step 6: Set up .gitignore

Ensure `.gitignore` includes:

```
node_modules/
.next/
.env*.local
out/
content/blog/drafts/
```

### Step 7: Create directory structure

```bash
mkdir -p content/blog public src/components/layout src/components/home src/lib
```

### Step 8: Configure next.config.ts for MDX

```typescript
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
```

### Step 9: Create mdx-components.tsx at project root

```typescript
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components }
}
```

### Step 10: Commit

```bash
git add -A && git commit -m "chore: scaffold Next.js project with shadcn/ui, MDX, and dependencies"
```

---

## Task 2: Design System Foundation

**Time estimate:** 1-2 hours
**Files:**

- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/lib/site-config.ts`

### Step 1: Configure fonts in layout.tsx

```typescript
import { Source_Serif_4, DM_Sans } from 'next/font/google'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
```

Apply as CSS variables on `<html>`:

```tsx
<html lang="en" className={`${sourceSerif.variable} ${dmSans.variable}`} suppressHydrationWarning>
```

### Step 2: Update globals.css with custom theme

Update the shadcn CSS variables for a refined minimal palette. Key values:

- Light mode: warm off-white background (`--background: 40 20% 98%`), near-black foreground
- Dark mode: deep charcoal background (`--background: 240 10% 8%`), warm white foreground
- Primary accent: muted blue-gray or warm accent (to be decided in implementation)
- Extend Tailwind config with `fontFamily` mapping to the CSS variables

### Step 3: Set up Tailwind font families

In `tailwind.config.ts`, extend `fontFamily`:

```typescript
fontFamily: {
  heading: ['var(--font-heading)', 'Georgia', 'serif'],
  body: ['var(--font-body)', 'system-ui', 'sans-serif'],
}
```

### Step 4: Create site-config.ts

```typescript
export const siteConfig = {
  name: 'nerixim',
  title: 'Nikita — Software Developer',
  description: 'Full-stack developer building software across languages and borders. Based in Japan.',
  url: 'https://nerixim.dev',
  author: 'Nikita',
  links: {
    github: 'https://github.com/nerixim',
    // twitter, linkedin etc. when ready
  },
  nav: [
    { title: 'About', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/blog' },
    { title: 'Contact', href: '/contact' },
  ],
} as const
```

### Step 5: Set up next-themes provider

Create `src/app/providers.tsx`:

```typescript
'use client'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
```

Wire into `layout.tsx`.

### Step 6: Verify fonts and dark mode work

Run dev server. Check:

- [ ] Serif font renders for headings
- [ ] Sans font renders for body text
- [ ] Dark mode toggleable via browser devtools (prefers-color-scheme)

### Step 7: Commit

```bash
git add -A && git commit -m "feat: design system foundation — fonts, theme, site config"
```

---

## Task 3: Layout Shell

**Time estimate:** 2-3 hours
**Files:**

- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Create: `src/components/layout/mobile-nav.tsx`
- Create: `src/components/layout/theme-toggle.tsx`
- Modify: `src/app/layout.tsx`

### Step 1: Build theme-toggle.tsx

Client component. Uses `next-themes` `useTheme()`. Renders Sun/Moon icon toggle. Accessible button with aria-label.

### Step 2: Build site-header.tsx

- Sticky header with backdrop blur
- Left: site name "nerixim" in serif font, links to `/`
- Center/right: nav links from `siteConfig.nav`
- Right: theme toggle
- Desktop: horizontal nav
- Mobile: hamburger icon that opens Sheet (shadcn)

### Step 3: Build mobile-nav.tsx

Uses shadcn Sheet component. Slide-in from right. Shows all nav links + theme toggle. Closes on navigation.

### Step 4: Build site-footer.tsx

Minimal footer:

- Left: "(c) 2026 nerixim"
- Right: GitHub icon link, maybe other social links
- Subtle separator line above

### Step 5: Wire layout.tsx

```tsx
<body className={cn('min-h-screen bg-background font-body antialiased', fontVariables)}>
  <Providers>
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
    <Analytics />
  </Providers>
</body>
```

### Step 6: Verify layout

- [ ] Header renders with all nav links
- [ ] Mobile: hamburger opens sheet with nav
- [ ] Dark mode toggle works
- [ ] Footer visible at bottom
- [ ] Page content scrolls correctly

### Step 7: Commit

```bash
git add -A && git commit -m "feat: layout shell — header, footer, mobile nav, theme toggle"
```

---

## Task 4: Home Page

**Time estimate:** 2-3 hours
**Files:**

- Modify: `src/app/page.tsx`
- Create: `src/components/home/hero.tsx`
- Create: `src/components/home/services-preview.tsx`
- Create: `src/components/home/cta-section.tsx`

### Step 1: Build hero.tsx

Server Component. The first thing visitors see.

**Copy direction:**

- Heading (serif): "Building software across languages and borders."
- Subtext: "Full-stack developer based in Japan. I ship products in English, Japanese, and Russian."
- Two CTAs: "See my work" (link to /projects, outline), "Get in touch" (link to /contact, primary)
- Clean, generous whitespace. No background image. Let the typography speak.

### Step 2: Build services-preview.tsx

3-column grid (stacked on mobile) previewing the services page:

1. **Software Development** — "Web apps, mobile apps, APIs. TypeScript, React, Next.js."
2. **AI Integration** — "AI automation, workflow optimization, intelligent tooling."
3. **Localization** — "EN/JP/RU translation and cultural adaptation for software."

Each is a Card with a Lucide icon, title (serif), and 1-2 line description. Links to `/services`.

### Step 3: Build cta-section.tsx

Bottom section before footer:

- "Have a project? Let's talk."
- Button linking to `/contact`
- Subdued background (muted) to visually separate from content above

### Step 4: Compose page.tsx

```tsx
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <CtaSection />
    </>
  )
}
```

### Step 5: Verify home page

- [ ] Hero renders with correct copy
- [ ] Services grid responsive (3-col desktop, 1-col mobile)
- [ ] CTA section visible
- [ ] All links work
- [ ] Dark mode looks good

### Step 6: Commit

```bash
git add -A && git commit -m "feat: home page with hero, services preview, and CTA"
```

---

## Task 5: About Page

**Time estimate:** 2 hours
**Files:**

- Create: `src/app/about/page.tsx`
- Create: `public/avatar-placeholder.svg`

### Step 1: Create avatar placeholder

Simple SVG: geometric shape or initials "N" in a circle. Muted colors matching the theme. ~200x200px.

### Step 2: Write about/page.tsx

Server Component. Sections:

**Top section:**

- Avatar (placeholder) + name + brief tagline
- "Nikita — Software developer, language enthusiast, builder of things."

**Story section (prose):**
Real copy based on persona.md. Tone: direct, personal, not performative.

- Background: studied languages, moved to Japan, became a developer
- What drives you: bridging cultures through software
- Current focus: freelancing, building products, exploring AI

**Skills/tech section:**
Badge components showing key skills:
`TypeScript` `React` `Next.js` `SwiftUI` `React Native` `Node.js` `Tailwind` `AI/LLM Integration`

**Languages section:**
Three columns or inline:

- Russian (native)
- English (fluent)
- Japanese (fluent)

### Step 3: Add metadata

```typescript
export const metadata: Metadata = {
  title: 'About',
  description: 'Software developer based in Japan. Trilingual (EN/JP/RU). Building products across languages and borders.',
}
```

### Step 4: Verify

- [ ] Avatar renders
- [ ] Story reads well
- [ ] Badges/skills display correctly
- [ ] Responsive layout
- [ ] Metadata correct

### Step 5: Commit

```bash
git add -A && git commit -m "feat: about page with story, skills, and languages"
```

---

## Task 6: Services + Projects Pages

**Time estimate:** 2-3 hours
**Files:**

- Create: `src/app/services/page.tsx`
- Create: `src/app/projects/page.tsx`
- Create: `src/components/project-card.tsx`

### Step 1: Build services/page.tsx

Three service sections, each with:

- Icon (Lucide)
- Title (serif heading)
- 3-4 bullet points of what's included
- "Who this is for" line

**Services:**

1. **Software Development**
   - Web applications (React, Next.js)
   - Mobile apps (React Native, SwiftUI)
   - APIs and backend services
   - Who: startups, SMBs, agencies needing dev capacity

2. **AI Integration & Consulting**
   - AI-powered workflow automation
   - LLM integration into existing products
   - AI tool evaluation and strategy
   - Who: businesses wanting to adopt AI practically

3. **Localization & Cross-Cultural Software**
   - EN/JP/RU software localization
   - Cultural adaptation (not just translation)
   - i18n architecture and implementation
   - Who: products expanding to Japan or Russian-speaking markets

Bottom CTA: "Interested? Let's talk about your project." -> /contact

### Step 2: Build project-card.tsx

Reusable Card component:

```typescript
interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  href?: string
  status: 'live' | 'in-progress' | 'planned'
}
```

### Step 3: Build projects/page.tsx

Project cards for:

1. **Pechka** — "A language learning app built around spaced repetition and immersion." Status: in-progress. Tags: `Swift` `SwiftUI` `iOS`
2. **nerixim.dev** — "This site. A hub for my work, writing, and tools." Status: live. Tags: `Next.js` `TypeScript` `Tailwind`
3. **Freelance Development** — "Web and mobile projects for clients in Japan and globally." Status: live. Tags: `React` `TypeScript` `Node.js`

### Step 4: Add metadata for both pages

### Step 5: Verify

- [ ] Services page readable, well-structured
- [ ] Projects page shows cards
- [ ] Tags render as Badges
- [ ] CTA links work
- [ ] Both pages responsive

### Step 6: Commit

```bash
git add -A && git commit -m "feat: services and projects pages"
```

---

## Task 7: Contact Page + Blog Index

**Time estimate:** 3-4 hours
**Files:**

- Create: `src/app/contact/page.tsx`
- Create: `src/app/contact/actions.ts`
- Create: `src/components/contact-form.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `.env.local`

### Step 1: Set up Resend

1. Sign up at resend.com
2. Add domain `nerixim.dev` in Resend dashboard
3. Add DNS records (MX, TXT, CNAME) to Cloudflare
4. Wait for verification
5. Generate API key
6. Add to `.env.local`:

   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   CONTACT_EMAIL=your-email@example.com
   ```

### Step 2: Build contact server action

`src/app/contact/actions.ts`:

```typescript
'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'nerixim.dev <contact@nerixim.dev>',
      to: process.env.CONTACT_EMAIL!,
      replyTo: parsed.data.email,
      subject: `Contact form: ${parsed.data.name}`,
      text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`,
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Failed to send message. Please try again.' }
  }
}
```

### Step 3: Build contact-form.tsx

Client component using `useActionState` (React 19).

- Three fields: Name, Email, Message (textarea)
- Uses shadcn Input, Textarea, Button
- Shows field-level validation errors
- Shows success message after submission
- Disable button while pending

### Step 4: Build contact/page.tsx

```tsx
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch about development, consulting, or collaboration.',
}

export default function ContactPage() {
  return (
    <div className="container max-w-2xl py-16">
      <h1 className="font-heading text-3xl mb-4">Get in touch</h1>
      <p className="text-muted-foreground mb-8">
        Have a project in mind? Want to discuss a collaboration? Send me a message.
      </p>
      <ContactForm />
    </div>
  )
}
```

### Step 5: Build blog/page.tsx

Empty state blog index:

```tsx
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing about development, freelancing in Japan, and building products.',
}

export default function BlogPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="font-heading text-3xl mb-4">Blog</h1>
      <p className="text-muted-foreground">
        Posts coming soon. I'll be writing about freelancing in Japan,
        building products, and working across languages.
      </p>
    </div>
  )
}
```

### Step 6: Verify

- [ ] Contact form renders with all fields
- [ ] Validation errors show on empty/invalid submit
- [ ] Email sends successfully via Resend (test with real submission)
- [ ] Success message appears after send
- [ ] Blog page renders empty state
- [ ] Both pages responsive, dark mode correct

### Step 7: Commit

```bash
git add -A && git commit -m "feat: contact page with Resend + blog index empty state"
```

---

## Task 8: Polish + Deploy

**Time estimate:** 2-3 hours
**Files:**

- Modify: `src/app/layout.tsx` (metadata, analytics)
- Create: `public/favicon.svg`
- Create: `public/og-default.png`

### Step 1: Set up Open Graph metadata

In `layout.tsx`, add comprehensive metadata:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://nerixim.dev'),
  title: { default: 'nerixim — Software Developer', template: '%s | nerixim' },
  description: 'Full-stack developer based in Japan. Building software across languages and borders.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nerixim.dev',
    siteName: 'nerixim',
    title: 'nerixim — Software Developer',
    description: 'Full-stack developer based in Japan.',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nerixim — Software Developer',
    description: 'Full-stack developer based in Japan.',
    images: ['/og-default.png'],
  },
  robots: { index: true, follow: true },
}
```

### Step 2: Create favicon

Simple SVG favicon — the letter "N" or a minimal geometric mark. Place at `public/favicon.svg`. Reference in layout via `<link>` or metadata `icons`.

### Step 3: Create OG image

Generate a simple 1200x630 OG image:

- Background: dark charcoal matching theme
- Text: "nerixim" in Source Serif 4 + "Software Developer" subtext
- Could generate via `@vercel/og` at build time, or create a static PNG

### Step 4: Add Vercel Analytics

Already imported. Ensure `<Analytics />` is in the root layout body.

```tsx
import { Analytics } from '@vercel/analytics/react'
```

### Step 5: Deploy to Vercel

1. Push to GitHub:

   ```bash
   git push origin main
   ```

2. Connect repo in Vercel dashboard
3. Set environment variables in Vercel:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Set custom domain: `nerixim.dev`
5. Verify DNS (Cloudflare -> Vercel)

### Step 6: QA Checklist

Run through every page on both desktop and mobile:

- [ ] **Home**: hero, services preview, CTA all render
- [ ] **About**: avatar, story, skills, languages all render
- [ ] **Services**: three services, CTA at bottom
- [ ] **Projects**: project cards with tags
- [ ] **Contact**: form submits, validation works, email received
- [ ] **Blog**: empty state renders
- [ ] **Dark mode**: toggle works on every page, no flash on load
- [ ] **Mobile**: hamburger nav works, all pages readable
- [ ] **Performance**: Lighthouse score > 90 on all categories
- [ ] **OG tags**: test with <https://www.opengraph.xyz/>
- [ ] **Favicon**: shows in browser tab
- [ ] **Analytics**: Vercel Analytics dashboard shows page views

### Step 7: Final commit + push

```bash
git add -A && git commit -m "feat: OG metadata, favicon, analytics, deploy config"
git push origin main
```

<!--
 -->
---

## Skill Application Map

Which skills apply at each task:

| Task | Skills to Apply |
|---|---|
| 1. Scaffolding | `shadcn-ui`, `vercel-react-best-practices`, `next-best-practices` |
| 2. Design system | `frontend-design`, `visual-design-foundations`, `tailwind-design-system`, `theme-factory` |
| 3. Layout | `web-component-design`, `vercel-composition-patterns`, `interaction-design`, `web-design-guidelines` |
| 4. Home page | `copywriting`, `page-cro`, `writing-clearly-and-concisely`, `humanizer` |
| 5. About page | `copywriting`, `humanizer`, `writing-clearly-and-concisely` |
| 6. Services + Projects | `copywriting`, `page-cro`, `marketing-psychology` |
| 7. Contact + Blog | `form-cro`, `shadcn-ui`, `nextjs-app-router-patterns` |
| 8. Polish + Deploy | `seo-geo`, `analytics-tracking`, `audit-website`, `frontend-code-review`, `next-best-practices` |

---

## Post-Implementation

After all 8 tasks are complete, run:

1. `audit-website` skill against the live URL
2. `frontend-code-review` skill on all TSX files
3. `web-design-guidelines` skill review
4. Update `docs/plans/2026-02-21-personal-site-plan.md` to mark Gate 1 items as checked
