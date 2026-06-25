# Distribution Playbook

How GitOrg Atlas content gets in front of readers, beyond Google + Baidu.
Each section captures a channel's rules and the safe cadence — based on
the deep-research findings synthesized into commits b180bf5..present.

## Channel priority

| Priority | Channel | Why |
|---|---|---|
| **P0** | Google + Baidu SEO | Already the primary surface — covered by other PRs (#1 schema, #3 GEO, #4 .md mirror, #5 authors, #6 perf). |
| **P0** | LLM citations (ChatGPT / Claude / Perplexity / Gemini) | `/llms.txt` + `.md` mirrors (PR #4) + GEO content (PR #3). Lower-ranked sites see the largest GEO lift (KDD '24, rank-5 +115%). |
| **P1** | Dev.to | English mid-career developers, plays well with `canonical_url`. See "Dev.to" below. |
| **P1** | 掘金 / 知乎 / CSDN | Chinese practitioner audience. Each platform has its own canonical-equivalent (we set the source URL in the body, not headers). |
| **P2** | Hacker News (Show HN) | Single-shot bursts, must be original artifact, not "another tutorial". See "Hacker News" below. |
| **P2** | Reddit (r/git, r/programming) | Small but well-targeted. Self-promotion ratio is enforced. |
| **P3** | Twitter/X, B 站 | Optional, only when a strong visual hook exists (rebase failure recovery; reflog rescue). |

## Dev.to

**Rule that makes this work**: Dev.to honors a front matter
`canonical_url:` field and emits `<link rel="canonical">` back to the
source URL. That means cross-posting does NOT split SEO authority — the
original article continues to rank, and Dev.to becomes pure distribution.
(Verified against dev.to/p/editor_guide.)

**Workflow**:

1. `node scripts/export-to-devto.mjs` regenerates `content/_devto/*.md`
   from the curated list in that script.
2. Open each generated file. Edit if needed — Dev.to renders most JSX as
   plain text, so callouts (`<TipBox>`, `<WarningBox>`) degrade visually.
   Either replace with `>` blockquotes or leave the JSX inline as-is.
3. Paste into Dev.to's editor. Toggle `published: true` in the front
   matter UI (the export sets `false` so you have a draft step).
4. Submit. Done — `canonical_url` is preserved automatically.

**Do NOT automate publishing.** Dev.to's spam heuristics treat burst
publishing as abuse; manual cadence is 1-3 articles per week, ideally
matched to article freshness (publish/update on source first, then
mirror within 24-48h).

**Tag strategy**: Dev.to allows up to 4 tags, lowercase, no spaces. The
export script has a `TAG_OVERRIDES` map for high-traffic articles —
extend it as needed. Default fallback is `git, tutorial, beginners`.

## Hacker News

**Critical rule** (from `news.ycombinator.com/newsguidelines.html`):

> Don't solicit upvotes, comments, or submissions.
> It's ok to post your own stuff part of the time, but the primary use
> of the site should be for curiosity.

**Operational implications**:

- No coordinated upvote rings, no DM rallies, no "please upvote".
- Self-submission ratio: small minority of any account's activity.
- Comments on unrelated submissions to build account standing **first**;
  Show HN only after.

**What gets traction on HN**:

- Original artifacts, not yet-another-git-tutorial. Examples that would
  qualify: an interactive packfile visualizer, a CRDT-style merge
  resolution demo, a benchmark of `git gc` vs `git maintenance` on
  large repos.
- Show HN for tools, Ask HN for thoughtful questions. Tutorials per se
  rarely break out on HN unless they have a strong novel angle.

**What does NOT work**:

- "I built a Git tutorial site" — too generic, will be flagged.
- Reposting old articles. HN frowns on republishing without substantial
  new material.

## Reddit

- r/git: ~30k subs. Very practical, very tolerant of well-written
  walkthroughs. **Allowed** to share own content if it's *useful*.
- r/programming: ~6M subs. Mod team is strict. Cross-post must follow
  the 9:1 rule (engage with others 9 of every 10 actions).
- r/devops, r/learnprogramming: niche audiences for specific articles
  (CI/CD workflows, beginner learning path).

**Pre-flight**: read each sub's rules in their wiki *before* posting.
Some subs ban link posts without text-body context.

## Chinese platforms

- **掘金 (juejin.cn)**: Highest-quality Chinese dev platform.
  Manual paste. End the article with: "本文首发于 GitOrg Atlas:
  https://gitorg.xyz/zh/..."
- **CSDN**: Larger but lower quality. Same pattern.
- **知乎专栏**: Long-form audience, do well with internals / concepts.
  Same first-publish attribution.

**Key risk**: 知乎/掘金 do not honor `<link rel="canonical">`. The
"首发于" footer is the equivalent — Baidu treats it as the canonical
indicator for duplicate-content de-duplication.

## Cadence

| Week | Action |
|---|---|
| Every week | Publish 1-2 new articles on source site |
| Every week | Mirror 1 to Dev.to (canonical-tagged) |
| Every 2 weeks | Mirror 1 to 掘金 + 知乎 + CSDN trio (中文) |
| Every 2 months | Consider 1 HN Show submission (only if you have a genuine artifact) |
| Every quarter | Audit Vercel Analytics → pick the top-2 indexed but low-CTR articles → improve title + summary → re-publish update |

## Measurement

Vercel Analytics segments by `referrer`. After mirroring an article,
watch the source-site traffic from the mirror domain (dev.to,
juejin.cn, zhihu.com) over the next 30 days. A mirror is "worth it"
when it brings ≥50 referral visits in that window; below that, the
manual time spent isn't paying off — re-evaluate which articles to
mirror next.
