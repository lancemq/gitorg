# Performance Roadmap

This file tracks performance work that is **planned** but not yet landed.
The currently-merged optimizations live in commit history.

## Landed

### PR #2 — AdSense `lazyOnload` + IntersectionObserver `AdSlot`

Removed `beforeInteractive` AdSense load (LCP/INP killer) and shipped
a viewport-gated push wrapper. See `components/ad-slot.tsx`.

### PR #6 — `content-visibility: auto` on long sections

`.doc-content`, `.command-doc-content`, and `.geo-block` skip layout/paint
when off-screen, with an `1200px` intrinsic-size hint. Measured impact
should be largest on long MDX pages (commands top + workflows tier).

### PR #6 — `WebVitalsReporter`

Reports field LCP/INP/CLS/FCP/TTFB to Vercel Analytics as custom events
via `next/web-vitals`. Without this, only the aggregate Speed Insights
panel is available; with it we can break down INP by route after
labeling.

## Planned (not in any PR yet)

### Code-block syntax highlighting at build time

Currently MDX code fences render unstyled (or via a tiny runtime
highlighter, depending on the MDX components). For long Git articles
that's fine, but if/when we add interactive highlighting it must run
in a rehype plugin at build time — not on the client.

Suggested toolchain: `shiki` + `rehype-pretty-code`. Configure in
`next.config.mjs` under the `withMDX` options:

```js
import rehypePrettyCode from "rehype-pretty-code";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
  },
});
```

Why deferred: changes every code block in 526 articles, needs visual QA.
Worth a dedicated PR.

### `@next/bundle-analyzer` in CI

Wrap `next.config.mjs` with `withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })`
and upload the analyzer HTML as a CI artifact. Lets us catch First-Load JS
regressions on every PR.

### Sidebar DOM compression

`SiteShell` currently renders every nav group fully expanded. On a long
sidebar this contributes 100+ DOM nodes per page even when the user
hasn't opened that group. Two options:

- Collapse non-active groups by default (CSS `<details>` is enough).
- Render only the active group server-side and load others on hover.

Risk: nav discoverability. Run a click-tracking experiment before changing.

### Per-article OG image

`opengraph-image.tsx` is currently a single static OG. Move to
`app/[lang]/[section]/[slug]/opengraph-image.tsx` (Next supports per-route
OG via @vercel/og). Yields better social-preview CTR and is a recommended
field in BlogPosting JSON-LD `image[]` (already wired in `lib/structured-seo.ts`,
just pointing to the static OG for now).

### Server-render route labels for vitals

`WebVitalsReporter` currently sends raw metrics. To break down INP by
route in Vercel Analytics, add a `route` attribute derived from
`usePathname()` and pass it in the `data` payload. This unblocks the
"INP-by-route" view in Analytics.

## Measurement targets (6-month)

| Metric | Today (estimate) | Target |
|---|---|---|
| INP p75 (long articles) | >300ms | ≤200ms |
| LCP p75 | 2.5-3.5s | ≤2.5s |
| CLS p75 | ~0 (already good) | maintain |
| First Load JS (route avg) | unknown | <100KB |
