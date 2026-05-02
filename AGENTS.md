# AGENTS.md

## Purpose
This project is a small personal site and blog built with Next.js, TypeScript, MDX, and Tailwind.

Agents working in this repo should prioritize:
- **KISS**: keep implementations simple
- **YAGNI**: do not add features, abstractions, or dependencies unless they are clearly needed
- small, low-risk changes over broad refactors

## Project summary
- Personal homepage in `app/page.tsx`
- Blog index in `app/blog/page.tsx`
- Blog posts in `app/blog/posts/*.mdx`
- Blog post route in `app/blog/[slug]/page.tsx`
- Shared UI in `app/components/*`
- Blog utilities in `app/blog/utils.ts`
- SEO helpers in:
  - `app/sitemap.ts`
  - `app/robots.ts`
  - `app/opengraph-image.tsx`
  - `app/rss/route.ts`

## Key principles

### 1. Keep solutions small
- Prefer targeted edits
- Avoid unnecessary rewrites
- Do not introduce patterns that make the code harder to follow

### 2. Avoid speculative abstractions
- Do not add helper layers, config wrappers, or shared constants unless repetition is already causing pain
- Do not add libraries for problems that can be solved clearly with the standard library or existing code

### 3. Preserve the current simplicity of the content system
- Blog content is file-based MDX
- Do not introduce a CMS, database, or schema system unless explicitly requested
- Keep frontmatter format simple and predictable

### 4. Prefer runtime guards over heavy tooling
- If content validation is needed, add minimal runtime checks first
- Do not add validation libraries unless the content model becomes meaningfully more complex

## Coding guidelines
- Use clear names and straightforward logic
- Favor readability over cleverness
- Keep component structure flat and easy to scan
- Keep metadata and branding consistent
- When fixing bugs, choose the smallest change that fully resolves the issue

## Things to avoid unless explicitly requested
- adding new dependencies
- introducing a CMS
- switching blog parsing architecture
- adding complex date handling libraries
- large-scale folder reorganizations
- broad stylistic refactors with no product value

## Commands
- Install deps: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`
- Lint: `pnpm lint`

## Editing priorities
When making changes, prefer this order:
1. correctness
2. simplicity
3. consistency
4. polish

## Content editing notes
- Blog posts live in `app/blog/posts`
- Required frontmatter should remain minimal:
  - `title`
  - `publishedAt`
  - `summary`
- Keep MDX authoring conventions simple unless the project explicitly grows beyond current needs

## Documentation
Before making larger cleanup changes, review:
- `docs/cleanup.md`
- `docs/potential-bugs.md`

## Definition of done
A change is usually good enough when it:
- solves the actual problem
- keeps the codebase simple
- avoids unnecessary new abstractions
- does not add features that were not requested
