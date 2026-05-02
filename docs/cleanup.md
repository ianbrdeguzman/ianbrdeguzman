# Cleanup Plan

This document outlines a small, practical cleanup plan for this codebase.

The goal is to improve reliability and consistency without adding unnecessary abstractions, dependencies, or features.

## Guiding principles

### KISS
Keep the implementation simple.

- Prefer small edits over rewrites.
- Prefer clear code over clever code.
- Prefer fewer moving parts.

### YAGNI
Do not add things the project does not need yet.

- Do not add libraries unless the current code is causing real pain.
- Do not build abstractions for hypothetical future use.
- Do not add features just because the template supports them.

---

## Recommended cleanup order

1. Fix branding/template leftovers
2. Simplify date formatting if relative dates are not needed
3. Add small safety checks around blog frontmatter
4. Align blog Open Graph fallback behavior with existing routes
5. Make tiny consistency cleanups only where cheap and obvious

---

## 1) Fix branding and template leftovers

### Why
The codebase still contains some generic template wording. This is low-risk and improves polish immediately.

### Files to review
- `app/layout.tsx`
- `app/blog/[slug]/page.tsx`
- `app/blog/page.tsx`
- `README.md`

### What to clean up

#### A. Replace generic site naming
Current examples:
- `siteName: "My Portfolio"` in `app/layout.tsx`
- JSON-LD author name uses `"My Portfolio"` in `app/blog/[slug]/page.tsx`

Replace these with consistent real branding, for example:
- `Ian D Guzman`
- or another single canonical site name if preferred

### Step-by-step
1. Open `app/layout.tsx`
2. Find `openGraph.siteName`
3. Replace the generic value with the real site name
4. Open `app/blog/[slug]/page.tsx`
5. Find the JSON-LD `author.name`
6. Replace the generic value with the real name/site name
7. Scan metadata strings and page headings for anything else that still feels template-derived

### Keep it simple
- Do not introduce a central constants file unless repeated branding becomes annoying in practice.
- For now, direct string replacement is enough.

---

## 2) Simplify date formatting if relative dates are not needed

### Why
`app/blog/utils.ts` contains logic for relative dates (`Today`, `3d ago`, `2mo ago`, etc.).

That logic is more complex than what this site appears to need, and it can be inaccurate around month/day boundaries.

If the site only needs a readable publish date like `Jan 24, 2026`, then the relative logic is unnecessary.

### File to review
- `app/blog/utils.ts`

### Current behavior
- `formatDate(date, includeRelative = false)`
- Most current call sites use the default absolute-date behavior

### Recommended cleanup
Simplify `formatDate()` to only return the full formatted date.

### Step-by-step
1. Open `app/blog/utils.ts`
2. Find `formatDate()`
3. Confirm whether any caller passes `true` for `includeRelative`
4. If no caller needs relative dates:
   - remove the `includeRelative` parameter
   - remove relative-date calculations
   - keep only absolute formatting
5. Keep the implementation focused on one job: format a date string for display

### Keep it simple
- Do not add a date library.
- Do not add localization options unless the site actually needs them.
- Native `Date` formatting is enough here.

---

## 3) Add minimal safety checks for blog frontmatter

### Why
The frontmatter parser is intentionally lightweight, but it currently assumes the frontmatter always exists and is valid.

This line is the main risk:
- `match![1]`

If a post is malformed or missing frontmatter, the build may fail with an unclear error.

### File to review
- `app/blog/utils.ts`

### Current approach
- Uses a regex to extract frontmatter
- Splits each line with `": "`
- Casts the result to the expected metadata type

### Recommended cleanup
Keep the parser simple, but make failure states explicit and easier to debug.

### Step-by-step
1. Open `app/blog/utils.ts`
2. In `parseFrontmatter()`:
   - check whether the regex matched anything
   - if not, throw a clear error with the file content context if practical
3. After parsing metadata, verify required fields exist:
   - `title`
   - `publishedAt`
   - `summary`
4. If a required field is missing, throw a clear error
5. Keep the validation shallow and minimal

### Example of the type of validation to add
- “Missing frontmatter in blog post”
- “Missing `title` in blog post frontmatter”
- “Missing `publishedAt` in blog post frontmatter”

### Keep it simple
- Do not add a schema library unless the content model grows more complex.
- Do not switch to a YAML parser unless current frontmatter format becomes too limiting.
- Minimal runtime guards are enough for now.

---

## 4) Align Open Graph fallback behavior with actual routes

### Why
In `app/blog/[slug]/page.tsx`, the fallback OG image URL is built like this:
- `${baseUrl}/og?title=...`

But the project currently has:
- `app/opengraph-image.tsx`

There is no visible `app/og/route.ts` or equivalent dynamic title image route.

That makes the fallback behavior look inconsistent with the current implementation.

### Files to review
- `app/blog/[slug]/page.tsx`
- `app/opengraph-image.tsx`

### Recommended cleanup
Choose the simplest valid approach.

### Option A: Use the existing site-level OG image everywhere
This is the simplest choice.

Use the existing Open Graph image route instead of referencing a route that may not exist.

### Option B: Add a dedicated dynamic OG route later
Only do this if dynamic post title images are truly important.

### Step-by-step
1. Open `app/blog/[slug]/page.tsx`
2. Find the fallback `ogImage` logic
3. Replace the `/og?title=...` fallback with a route that definitely exists
4. Keep the behavior consistent between:
   - metadata
   - Twitter images
   - JSON-LD image when no post image exists

### Keep it simple
- Do not build dynamic OG generation unless there is a clear need.
- A single global OG image is perfectly reasonable for a small personal site.

---

## 5) Make tiny consistency cleanups

### Why
These changes are small and optional, but they can make the codebase feel more uniform.

### Files to review
- `app/not-found.tsx`
- `app/components/nav.tsx`
- `app/components/footer.tsx`
- `app/components/posts.tsx`

### Possible cleanups

#### A. Keep formatting consistent
Example:
- `app/not-found.tsx` is slightly inconsistent in formatting style

If ESLint or your formatter handles this automatically, that is enough.

#### B. Use a simpler nav item structure
Current nav items are stored as:

```ts
const navItems = {
  "/": { name: "home" },
  "/blog": { name: "blog" },
};
```

This works, but an array may be simpler and more explicit:

```ts
const navItems = [
  { href: "/", label: "home" },
  { href: "/blog", label: "blog" },
];
```

This is optional. Only change it if it genuinely improves readability for you.

#### C. Keep export style consistent
Some components use named exports, some use default exports.

This is not a bug. If you want consistency, pick one style and use it gradually.

### Keep it simple
- Do not refactor these files just for stylistic perfection.
- Only make changes that are obvious, local, and low risk.

---

## What not to do right now

To stay aligned with KISS and YAGNI, avoid these unless a real need appears.

### Do not add a CMS
The current MDX-based content setup is enough for a small personal site.

### Do not add a date library
Native date formatting is sufficient.

### Do not add a schema library immediately
Minimal runtime checks are enough for the current scale.

### Do not over-abstract content utilities
The project is small enough that straightforward functions are easier to maintain.

### Do not redesign the blog system
The current file-based MDX flow is simple and appropriate.

---

## Minimal “done” definition

A good cleanup pass can be considered complete when:

- branding strings are consistent
- date formatting is no more complex than needed
- malformed blog posts fail with clear errors
- OG image fallback points to a real route
- minor style inconsistencies are cleaned up without broad refactors

---

## Suggested implementation checklist

- [ ] Replace `My Portfolio` with real branding
- [ ] Decide whether relative dates are needed
- [ ] Simplify `formatDate()` if they are not needed
- [ ] Add missing-frontmatter guard in `app/blog/utils.ts`
- [ ] Add required-field checks for post metadata
- [ ] Replace stale OG fallback with an existing route
- [ ] Run lint after cleanup
- [ ] Manually test homepage, blog index, one blog post, RSS, and metadata output
