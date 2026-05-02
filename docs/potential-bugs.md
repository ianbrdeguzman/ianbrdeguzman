# Potential Bugs and Risk Areas

This document lists the most likely bugs or weak spots in the current codebase.

The focus is on practical issues that matter for a small personal site.

It intentionally avoids speculative architecture changes in order to respect:

- **KISS**: keep solutions simple
- **YAGNI**: do not add complexity before it is needed

---

## Severity guide

- **High**: likely to break builds, pages, or metadata
- **Medium**: may cause incorrect output or brittle behavior
- **Low**: polish or consistency issue, unlikely to break core behavior

---

## 1) Fragile frontmatter parsing

- **Severity:** High
- **File:** `app/blog/utils.ts`

### What is happening
Frontmatter is parsed with a regex and this non-null assertion:

```ts
let frontMatterBlock = match![1];
```

This assumes every MDX file has valid frontmatter.

### Why this is risky
If a blog post is missing frontmatter or is malformed:
- the parser can throw
- the build can fail
- the error may not be very clear

### Example failure cases
- a post file starts without `---`
- frontmatter is incomplete
- someone accidentally edits the opening/closing delimiters

### Simple mitigation
- check whether `match` exists before reading `match[1]`
- throw a clear error when frontmatter is missing

### KISS/YAGNI recommendation
Keep the custom parser for now, but add minimal guards.

---

## 2) Frontmatter line splitting is limited

- **Severity:** Medium
- **File:** `app/blog/utils.ts`

### What is happening
Each frontmatter line is parsed using:

```ts
line.split(": ")
```

### Why this is risky
This is fine for very simple key/value lines, but it can become fragile if the content grows more complex.

Examples that may be awkward:
- values with unusual formatting
- multiline values
- richer YAML structures

### Current reality
For this project, the current frontmatter format is simple and controlled.
That means this is not necessarily a problem today.

### Simple mitigation
- keep frontmatter format strict and simple
- document the expected format
- only replace the parser if you actually outgrow it

### KISS/YAGNI recommendation
Do not add a YAML parsing dependency yet unless content editing becomes more complex.

---

## 3) Missing metadata validation for posts

- **Severity:** High
- **File:** `app/blog/utils.ts`

### What is happening
The parser returns metadata as:

```ts
metadata as Metadata
```

This is a type assertion, not runtime validation.

### Why this is risky
A post can appear to be valid to TypeScript while still missing required fields at runtime.

Possible outcomes:
- blank titles
- invalid dates
- bad RSS output
- broken metadata on blog detail pages

### Simple mitigation
After parsing, check that required fields exist:
- `title`
- `publishedAt`
- `summary`

### KISS/YAGNI recommendation
Add a few runtime checks. Do not introduce a schema library yet.

---

## 4) OG fallback route may not match actual implementation

- **Severity:** Medium
- **File:** `app/blog/[slug]/page.tsx`

### What is happening
When a post has no custom image, this fallback is used:

```ts
`${baseUrl}/og?title=${encodeURIComponent(title)}`
```

### Why this is risky
The project currently includes:
- `app/opengraph-image.tsx`

But there is no obvious matching dynamic `/og` route in the current structure.

This can lead to:
- metadata pointing to a route that does not exist
- social previews showing broken images

### Important note
If a dedicated `/og` route is added later, this may no longer be a bug.
But based on the current visible files, the fallback looks inconsistent.

### Simple mitigation
Use an image route that definitely exists.

### KISS/YAGNI recommendation
Use the current site-wide Open Graph image unless dynamic per-post images are truly needed.

---

## 5) Date formatting logic is more complex than necessary

- **Severity:** Medium
- **File:** `app/blog/utils.ts`

### What is happening
`formatDate()` supports relative date display.

### Why this is risky
The manual calculations are simplistic:
- year difference
- month difference
- day difference

This can produce awkward or inaccurate relative results around:
- month boundaries
- year boundaries
- dates later in the month than the current date

### Current impact
If the app mostly uses absolute dates, the risk is limited.

### Simple mitigation
If relative dates are not used in the UI, remove that feature and keep only absolute formatting.

### KISS/YAGNI recommendation
Prefer a single simple date formatter over a feature-rich utility that is not needed.

---

## 6) Sort comparator does not handle equality explicitly

- **Severity:** Low
- **Files:**
  - `app/components/posts.tsx`
  - `app/rss/route.ts`

### What is happening
Sorting uses this pattern:

```ts
if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
  return -1;
}
return 1;
```

### Why this is risky
If two dates are equal, the comparator still returns `1` instead of `0`.

### Possible impact
- unstable ordering when two posts share the same publish date
- small correctness issue, not usually user-visible

### Simple mitigation
Use a comparator that returns:
- negative when `a` should come first
- positive when `b` should come first
- `0` when equal

### KISS/YAGNI recommendation
Small local fix if you touch that code. No broader refactor needed.

---

## 7) RSS route should be verified with static export

- **Severity:** Medium
- **File:** `app/rss/route.ts`
- **Related file:** `next.config.mjs`

### What is happening
The project uses:

```ts
output: "export"
```

It also includes an RSS route handler:
- `app/rss/route.ts`

### Why this is worth checking
Static export behavior and route handler support can vary by framework version and route type.

Even though the route is marked:

```ts
export const dynamic = "force-static";
```

it is still worth confirming that `/rss` is correctly emitted in the exported output.

### Possible impact
- RSS may work in dev but not in exported production output
- or it may export correctly, depending on current Next.js behavior

### Simple mitigation
Run a production build/export and verify the generated RSS artifact exists and is reachable.

### KISS/YAGNI recommendation
Do not redesign RSS generation unless testing proves it is broken.

---

## 8) Blog content loading depends on Node `fs`

- **Severity:** Low to Medium
- **File:** `app/blog/utils.ts`

### What is happening
Blog posts are read from disk using:
- `fs`
- `path`

### Why this matters
This is totally fine for build-time/static generation, but it assumes:
- the files exist in the expected location
- they are available during build

### Risk
If the content folder structure changes, pages depending on those files can break.

### Simple mitigation
Keep the content path stable and avoid overcomplicating content loading.

### KISS/YAGNI recommendation
Current approach is appropriate. Just keep the path assumptions obvious.

---

## 9) JSON-LD contains template branding

- **Severity:** Low
- **File:** `app/blog/[slug]/page.tsx`

### What is happening
Structured data uses:

```ts
name: "My Portfolio"
```

### Why this matters
This is not a runtime bug, but it is inaccurate metadata.

### Possible impact
- weaker SEO polish
- inconsistent branding in metadata

### Simple mitigation
Replace with the real name or canonical site identity.

### KISS/YAGNI recommendation
Simple string cleanup only.

---

## 10) Metadata title template is unusual

- **Severity:** Low
- **File:** `app/layout.tsx`

### What is happening
Metadata uses:

```ts
title: {
  default: "Ian D Guzman | Father of Two",
  template: "",
}
```

### Why this may be worth reviewing
An empty template is unusual and may not add value.

### Possible impact
- confusing intent for future maintenance
- possibly unnecessary configuration

### Simple mitigation
If no title template is needed, keep metadata simpler.

### KISS/YAGNI recommendation
Use the minimum metadata configuration required for desired page titles.

---

## 11) Minor code-style inconsistency

- **Severity:** Low
- **File:** `app/not-found.tsx`

### What is happening
There is a small formatting/style inconsistency compared with the rest of the project.

### Why this matters
Not a functional bug.
This only affects consistency and readability.

### Simple mitigation
Let linting/formatting normalize it.

### KISS/YAGNI recommendation
Do not spend much time here.

---

## Prioritized action list

If you want the smallest set of high-value fixes, do these first:

1. Add guards for missing or malformed frontmatter
2. Validate required post metadata fields
3. Verify or simplify OG image fallback behavior
4. Decide whether relative date logic should be removed
5. Confirm `/rss` works in production export output

---

## Things that are probably fine as-is

These parts seem reasonable for a small site and do not need immediate change:

- MDX files stored in the repo
- local filesystem content loading
- simple navbar/footer components
- Tailwind-based styling
- static export setup for a mostly content-driven site

---

## Summary

The codebase is small and generally straightforward.

The biggest risks are not architectural. They are mostly:
- brittle content parsing
- metadata inconsistencies
- a few places where behavior should be verified against the current routing/output setup

The best path forward is a small cleanup pass with minimal code changes, not a rewrite.
