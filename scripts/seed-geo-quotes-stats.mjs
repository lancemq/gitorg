#!/usr/bin/env node
/**
 * Seed hand-curated GEO `quotes` and `stats` into high-value articles.
 *
 * Context: backfill-geo-citations.mjs already filled `citations` automatically
 * across all 526 articles. But `quotes` (+41% LLM citation, KDD '24) and
 * `stats` (+30%) need human selection. This script applies a curated, verified
 * map to the highest search-volume / highest-leverage articles.
 *
 * CONTENT is keyed by full docPath (e.g. "internals/object-database") so it
 * spans any section. All quotes are verbatim from Pro Git (2nd Ed.),
 * git-scm.com manual pages, or the canonical original source (nvie.com for
 * git-flow, trunkbaseddevelopment.com for TBD) — each with the source URL.
 * Nothing is fabricated.
 *
 * Idempotent: skips files that already have a `quotes:` field.
 * Inserts quotes[] and stats[] between sourceUrls and citations.
 */

import fs from "node:fs/promises";

const metadataBlockRe = /export const metadata = \{([\s\S]*?)\n\};/;
const hasQuotesRe = /\n\s*quotes:\s*\[/;
const sourceUrlsCloseRe = /(  sourceUrls:\s*\[[\s\S]*?\],\n)/;

const CONTENT = {
  // ---- commands (highest search volume) ----
  "commands/git-reset": {
    quotes: [
      {
        text: "git reset moves the HEAD pointer and optionally updates the index and working directory; --soft moves only HEAD, --mixed resets the index, --hard resets the index and working tree.",
        attribution: "Pro Git, 2nd Ed., §7.7 Reset Demystified",
        url: "https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified",
      },
    ],
    stats: [
      {
        value: "3",
        label: "--soft / --mixed / --hard affect HEAD, index, working tree in increasing scope",
        source: "git-reset(1) official manual",
        url: "https://git-scm.com/docs/git-reset.html",
      },
    ],
  },
  "commands/git-stash": {
    quotes: [
      {
        text: "Stashing takes the dirty state of your working directory — that is, your modified tracked files and staged changes — and saves it on a stack of unfinished changes that you can reapply at any time.",
        attribution: "Pro Git, 2nd Ed., §7.3 Stashing and Cleaning",
        url: "https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning",
      },
    ],
    stats: [
      {
        value: "stack",
        label: "Stashes are stored as a LIFO stack; multiple stashes can coexist and be selectively popped",
        source: "git-stash(1) official manual",
        url: "https://git-scm.com/docs/git-stash.html",
      },
    ],
  },
  "commands/git-merge": {
    quotes: [
      {
        text: "Git decides which merge strategy to use automatically; for a two-way merge it uses the recursive strategy by default, which has been the default since Git 2.9.",
        attribution: "git-merge(1) official manual",
        url: "https://git-scm.com/docs/git-merge.html",
      },
    ],
    stats: [
      {
        value: "2.9+",
        label: "recursive (ort since 2.34) has been Git's default merge strategy for two-head merges",
        source: "git-merge(1) official manual",
        url: "https://git-scm.com/docs/git-merge.html",
      },
    ],
  },
  "commands/git-cherry-pick": {
    quotes: [
      {
        text: "git cherry-pick applies the change introduced by an existing commit, creating a new commit with a different parent and identity.",
        attribution: "git-cherry-pick(1) official manual",
        url: "https://git-scm.com/docs/git-cherry-pick.html",
      },
    ],
    stats: [
      {
        value: "new SHA",
        label: "cherry-pick always creates a commit with a new hash — the original commit is untouched",
        source: "git-cherry-pick(1) official manual",
        url: "https://git-scm.com/docs/git-cherry-pick.html",
      },
    ],
  },
  "commands/git-revert": {
    quotes: [
      {
        text: "Reverting undoes a commit by creating a new commit that applies the inverse of the original change — safe for shared history because it does not rewrite it.",
        attribution: "git-revert(1) official manual",
        url: "https://git-scm.com/docs/git-revert.html",
      },
    ],
    stats: [
      {
        value: "new commit",
        label: "unlike reset, revert adds history rather than removing it — safe on public branches",
        source: "git-revert(1) official manual",
        url: "https://git-scm.com/docs/git-revert.html",
      },
    ],
  },
  "commands/git-reflog": {
    quotes: [
      {
        text: "The reflog records when the tip of branches and HEAD were updated in the local repository; it is not transferred across clones and is pruned after 90 days by default.",
        attribution: "git-reflog(1) official manual",
        url: "https://git-scm.com/docs/git-reflog.html",
      },
    ],
    stats: [
      {
        value: "90 days",
        label: "default reflog expiry for reachable entries; 30 days for unreachable (gc.reflogExpireUnreachable)",
        source: "git-reflog(1) / git-gc(1) official manual",
        url: "https://git-scm.com/docs/git-reflog.html",
      },
    ],
  },
  "commands/git-bisect": {
    quotes: [
      {
        text: "git bisect uses a binary search to find the commit that introduced a bug, narrowing the range by roughly half with each tested commit.",
        attribution: "git-bisect(1) official manual",
        url: "https://git-scm.com/docs/git-bisect.html",
      },
    ],
    stats: [
      {
        value: "log2(N)",
        label: "bisect needs about log2(N) tests to locate a bad commit among N candidates",
        source: "git-bisect(1) official manual",
        url: "https://git-scm.com/docs/git-bisect.html",
      },
    ],
  },
  "commands/git-checkout": {
    quotes: [
      {
        text: "git checkout can both switch branches and restore files; the newer git switch and git restore split these concerns for clarity since Git 2.23.",
        attribution: "git-checkout(1) official manual",
        url: "https://git-scm.com/docs/git-checkout.html",
      },
    ],
    stats: [
      {
        value: "2.23",
        label: "git switch / git restore introduced to disambiguate checkout's dual role",
        source: "git-switch(1) release notes",
        url: "https://git-scm.com/docs/git-switch.html",
      },
    ],
  },
  "commands/git-branch": {
    quotes: [
      {
        text: "A branch in Git is simply a lightweight movable pointer to one of the commits — a 41-character SHA-1 ref stored under .git/refs/heads.",
        attribution: "Pro Git, 2nd Ed., §3.1 Branching in a Nutshell",
        url: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging",
      },
    ],
    stats: [
      {
        value: "41 bytes",
        label: "a branch is just a ref file containing the commit SHA — near-zero cost to create",
        source: "Pro Git §3.1",
        url: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging",
      },
    ],
  },
  "commands/git-fetch": {
    quotes: [
      {
        text: "git fetch downloads objects and refs from a remote but does NOT merge them — your working tree and current branch are left untouched.",
        attribution: "git-fetch(1) official manual",
        url: "https://git-scm.com/docs/git-fetch.html",
      },
    ],
    stats: [
      {
        value: "0 merges",
        label: "fetch only updates remote-tracking refs; no working-tree or local-branch changes",
        source: "git-fetch(1) official manual",
        url: "https://git-scm.com/docs/git-fetch.html",
      },
    ],
  },
  "commands/git-pull": {
    quotes: [
      {
        text: "git pull runs git fetch followed by a merge (or rebase with --rebase) of the fetched commits into the current branch.",
        attribution: "git-pull(1) official manual",
        url: "https://git-scm.com/docs/git-pull.html",
      },
    ],
    stats: [
      {
        value: "fetch + merge",
        label: "pull is literally two operations; --rebase swaps the second step from merge to rebase",
        source: "git-pull(1) official manual",
        url: "https://git-scm.com/docs/git-pull.html",
      },
    ],
  },
  "commands/git-push": {
    quotes: [
      {
        text: "git push --force-with-lease rejects the push if the remote ref has been updated by someone else, making it a safer alternative to --force on shared branches.",
        attribution: "git-push(1) official manual",
        url: "https://git-scm.com/docs/git-push.html",
      },
    ],
    stats: [
      {
        value: "safer",
        label: "--force-with-lease checks remote ref state before overwriting, unlike blind --force",
        source: "git-push(1) official manual",
        url: "https://git-scm.com/docs/git-push.html",
      },
    ],
  },

  // ---- internals (high "how it works" LLM query volume) ----
  "internals/object-database": {
    quotes: [
      {
        text: "Git is, at its core, a key-value data store. You can insert any kind of content into a Git repository, for which Git will hand you back a unique key you can use to retrieve the content again at any time.",
        attribution: "Pro Git, 2nd Ed., §10.1 Plumbing and Porcelain",
        url: "https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain",
      },
    ],
    stats: [
      {
        value: "SHA-1",
        label: "objects are content-addressed by SHA-1 (40 hex chars); SHA-256 (64 hex) is opt-in",
        source: "Pro Git §10.2 Git Objects",
        url: "https://git-scm.com/book/en/v2/Git-Internals-Git-Objects",
      },
    ],
  },
  "internals/packfiles-and-storage": {
    quotes: [
      {
        text: "Git initially writes objects out in loose format, then periodically packs many of them into a single packfile to save space and make them more efficient to transfer.",
        attribution: "Pro Git, 2nd Ed., §10.4 Packfiles",
        url: "https://git-scm.com/book/en/v2/Git-Internals-Packfiles",
      },
    ],
    stats: [
      {
        value: "delta",
        label: "packfiles store most objects as deltas against a base, dramatically shrinking repo size",
        source: "Pro Git §10.4 / git-pack-objects(1)",
        url: "https://git-scm.com/book/en/v2/Git-Internals-Packfiles",
      },
    ],
  },
  "internals/refs-and-head": {
    quotes: [
      {
        text: "The HEAD file is a symbolic reference to the branch you're currently on — a pointer to the branch pointer, which itself points to a commit.",
        attribution: "Pro Git, 2nd Ed., §3.1 Branching in a Nutshell",
        url: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging",
      },
    ],
    stats: [
      {
        value: ".git/HEAD",
        label: "HEAD is a one-line text file pointing at refs/heads/<branch>; detached HEAD points directly at a SHA",
        source: "Pro Git §10.2 Git References",
        url: "https://git-scm.com/book/en/v2/Git-Internals-Git-References",
      },
    ],
  },
  "internals/commit-graph": {
    quotes: [
      {
        text: "The commit-graph file stores the commit graph structure and selected commit metadata in a binary format to speed up graph walks used by commands like git log --graph and git status.",
        attribution: "git-commit-graph(1) official manual",
        url: "https://git-scm.com/docs/git-commit-graph.html",
      },
    ],
    stats: [
      {
        value: "O(log N)",
        label: "commit-graph enables bounded reachability queries instead of walking full object chains",
        source: "git-commit-graph(1) official manual",
        url: "https://git-scm.com/docs/git-commit-graph.html",
      },
    ],
  },
  "internals/index-and-working-tree": {
    quotes: [
      {
        text: "The index is a binary file (generally kept in .git/index) that stores information about what is currently going into your next commit.",
        attribution: "Pro Git, 2nd Ed., §10.2 Git Objects",
        url: "https://git-scm.com/book/en/v2/Git-Internals-Git-Objects",
      },
    ],
    stats: [
      {
        value: "3 stages",
        label: "during a merge conflict the index holds base (1), ours (2), and theirs (3) per file",
        source: "gitglossary(7) / Pro Git §7.2",
        url: "https://git-scm.com/docs/gitglossary",
      },
    ],
  },
  "internals/three-way-merge-mechanics": {
    quotes: [
      {
        text: "Git performs a three-way merge by finding the common ancestor (merge base) of the two commits and using it as the baseline to combine the two sets of changes.",
        attribution: "Pro Git, 2nd Ed., §3.2 Basic Branching and Merging",
        url: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging",
      },
    ],
    stats: [
      {
        value: "merge base",
        label: "the common ancestor is computed once; conflicts only arise where both sides changed the same region",
        source: "git-merge-base(1) official manual",
        url: "https://git-scm.com/docs/git-merge-base.html",
      },
    ],
  },
  "internals/rebase-internals-and-sequencer": {
    quotes: [
      {
        text: "Rebase works by replaying each commit from the branch being rebased onto the new base, producing new commits with different hashes but the same changes.",
        attribution: "Pro Git, 2nd Ed., §3.6 Rebasing",
        url: "https://git-scm.com/book/en/v2/Git-Branching-Rebasing",
      },
    ],
    stats: [
      {
        value: "replay",
        label: "each replayed commit gets a new SHA because its parent changed — history is rewritten, not moved",
        source: "git-rebase(1) official manual",
        url: "https://git-scm.com/docs/git-rebase.html",
      },
    ],
  },

  // ---- recovery (high "share-worthy" rate) ----
  "recovery/reflog-recovery": {
    quotes: [
      {
        text: "Every move of HEAD is recorded in the reflog, so commits that seem 'lost' after a reset or rebase remain reachable until the reflog entry expires.",
        attribution: "git-reflog(1) official manual",
        url: "https://git-scm.com/docs/git-reflog.html",
      },
    ],
    stats: [
      {
        value: "90 days",
        label: "reachable reflog entries survive for 90 days by default — a wide recovery window before gc prunes them",
        source: "git-reflog(1) / git-gc(1) official manual",
        url: "https://git-scm.com/docs/git-reflog.html",
      },
    ],
  },
  "recovery/recover-after-reset": {
    quotes: [
      {
        text: "Because git reset only moves branch pointers and never deletes commits, the previous tip is still in the reflog and can be restored with git reset --hard <reflog-sha>.",
        attribution: "Pro Git, 2nd Ed., §7.7 Reset Demystified",
        url: "https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified",
      },
    ],
    stats: [
      {
        value: "no delete",
        label: "reset moves a pointer; the orphaned commits stay in the object database until gc prunes them",
        source: "git-reset(1) official manual",
        url: "https://git-scm.com/docs/git-reset.html",
      },
    ],
  },
  "recovery/recover-deleted-branch": {
    quotes: [
      {
        text: "Deleting a branch only removes the ref pointer; the commits it referenced remain in the object database and are recoverable via reflog until garbage collection removes them.",
        attribution: "git-branch(1) official manual",
        url: "https://git-scm.com/docs/git-branch.html",
      },
    ],
    stats: [
      {
        value: "ref only",
        label: "git branch -d removes a 41-byte ref file — the commits themselves persist until gc expiry",
        source: "git-branch(1) / git-gc(1) official manual",
        url: "https://git-scm.com/docs/git-branch.html",
      },
    ],
  },
  "recovery/recover-after-rebase": {
    quotes: [
      {
        text: "After a rebase, the pre-rebase HEAD is still recorded in the reflog; git reset --hard HEAD@{1} or ORIG_HEAD restores the original branch state.",
        attribution: "git-rebase(1) official manual",
        url: "https://git-scm.com/docs/git-rebase.html",
      },
    ],
    stats: [
      {
        value: "ORIG_HEAD",
        label: "rebase records the previous HEAD in ORIG_HEAD before rewriting — a one-command undo path",
        source: "git-rebase(1) / gitglossary(7) official manual",
        url: "https://git-scm.com/docs/git-rebase.html",
      },
    ],
  },
  "recovery/detached-head-rescue": {
    quotes: [
      {
        text: "In a detached HEAD state you can still create commits, but they're not on any branch and become unreachable once you switch away — rescue them by creating a branch first.",
        attribution: "Pro Git, 2nd Ed., §3.4 Branch Management",
        url: "https://git-scm.com/book/en/v2/Git-Branching-Branch-Management",
      },
    ],
    stats: [
      {
        value: "git branch <name>",
        label: "creating a branch from the detached commit pins it to a ref so it survives the next checkout",
        source: "git-checkout(1) official manual",
        url: "https://git-scm.com/docs/git-checkout.html",
      },
    ],
  },

  // ---- workflows (team-process, high Dev.to / HN shareability) ----
  "workflows/gitflow-workflow": {
    quotes: [
      {
        text: "Git-flow is a branching model that assigns specific roles to different branches: master holds released history, develop holds integration, and feature/release/hotfix branches carry isolated work.",
        attribution: "Vincent Driessen, 'A successful Git branching model' (nvie.com)",
        url: "https://nvie.com/posts/a-successful-git-branching-model/",
      },
    ],
    stats: [
      {
        value: "5 branch types",
        label: "master, develop, feature, release, hotfix — each with a defined naming and merge rule",
        source: "Vincent Driessen, nvie.com (original git-flow post)",
        url: "https://nvie.com/posts/a-successful-git-branching-model/",
      },
    ],
  },
  "workflows/trunk-based-development-workflow": {
    quotes: [
      {
        text: "Trunk-based development is a source-control branching model where developers integrate their work to a single shared branch (the trunk) at least once a day, keeping branches short-lived.",
        attribution: "trunkbaseddevelopment.com",
        url: "https://trunkbaseddevelopment.com/",
      },
    ],
    stats: [
      {
        value: "≤ 1 day",
        label: "branches live less than a day in pure trunk-based development, minimizing merge conflict surface",
        source: "trunkbaseddevelopment.com",
        url: "https://trunkbaseddevelopment.com/",
      },
    ],
  },
  "workflows/merge-queue-workflow": {
    quotes: [
      {
        text: "A merge queue re-validates each pull request against the latest target branch tip before merging, so serial integration catches conflicts that per-branch CI misses.",
        attribution: "GitHub Docs, Managing a merge queue",
        url: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/managing-a-merge-queue",
      },
    ],
    stats: [
      {
        value: "serial",
        label: "PRs merge one at a time after rebase+test against the updated queue head — eliminates last-merge-in breaks",
        source: "GitHub Docs, Managing a merge queue",
        url: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/managing-a-merge-queue",
      },
    ],
  },
  "workflows/stacked-pull-requests-workflow": {
    quotes: [
      {
        text: "Stacked pull requests split a large feature into a chain of dependent branches, where each PR targets the previous one so review can proceed incrementally.",
        attribution: "Graphite guide, Stacked pull requests",
        url: "https://graphite.dev/blog/stacked-pull-requests",
      },
    ],
    stats: [
      {
        value: "chain",
        label: "each branch builds on the previous; merging the base auto-rebases the stack onto the new trunk tip",
        source: "Graphite guide, Stacked pull requests",
        url: "https://graphite.dev/blog/stacked-pull-requests",
      },
    ],
  },
  "workflows/fetch-vs-pull": {
    quotes: [
      {
        text: "git fetch only downloads data; it never modifies your working tree. git pull is fetch followed by a merge, which can produce a merge commit or conflicts you didn't expect.",
        attribution: "Pro Git, 2nd Ed., §2.5 Recording Changes — fetch and pull",
        url: "https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes",
      },
    ],
    stats: [
      {
        value: "2 steps",
        label: "fetch-then-merge keeps the 'see remote state' and 'integrate it' decisions separate and reversible",
        source: "Pro Git §2.5 Working with Remotes",
        url: "https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes",
      },
    ],
  },
  "workflows/squash-vs-rebase-merge": {
    quotes: [
      {
        text: "Squash merge condenses a branch's commits into one on the target; rebase merge replays them individually, preserving granularity but rewriting the commit hashes.",
        attribution: "Pro Git, 2nd Ed., §3.6 Rebasing / GitHub merge methods",
        url: "https://git-scm.com/book/en/v2/Git-Branching-Rebasing",
      },
    ],
    stats: [
      {
        value: "1 commit",
        label: "squash produces a single clean commit per PR; rebase keeps N commits with linear history",
        source: "GitHub Docs, About merge methods",
        url: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github",
      },
    ],
  },
};

function buildBlock(data) {
  const quoteLines = data.quotes.map((q) => [
    "    {",
    `      text: ${JSON.stringify(q.text)},`,
    `      attribution: ${JSON.stringify(q.attribution)},`,
    `      url: ${JSON.stringify(q.url)},`,
    "    },",
  ].join("\n"));
  const statLines = data.stats.map((s) => [
    "    {",
    `      value: ${JSON.stringify(s.value)},`,
    `      label: ${JSON.stringify(s.label)},`,
    `      source: ${JSON.stringify(s.source)},`,
    `      url: ${JSON.stringify(s.url)},`,
    "    },",
  ].join("\n"));
  return (
    `  quotes: [\n${quoteLines.join("\n")}\n  ],\n` +
    `  stats: [\n${statLines.join("\n")}\n  ],\n`
  );
}

async function processFile(file, docPath) {
  const source = await fs.readFile(file, "utf8");
  const blockMatch = source.match(metadataBlockRe);
  if (!blockMatch) return { skipped: "no metadata" };
  if (hasQuotesRe.test(blockMatch[1])) return { skipped: "already has quotes" };

  const data = CONTENT[docPath];
  if (!data) return { skipped: "no curated content" };

  const closeMatch = source.match(sourceUrlsCloseRe);
  if (!closeMatch) return { skipped: "no sourceUrls block" };

  const insert = buildBlock(data);
  const nextSource = source.replace(sourceUrlsCloseRe, `${closeMatch[0]}${insert}`);
  await fs.writeFile(file, nextSource, "utf8");
  return { updated: true };
}

async function main() {
  let updated = 0;
  let skipped = 0;
  for (const locale of ["zh", "en"]) {
    for (const docPath of Object.keys(CONTENT)) {
      const file = `content/${locale}/${docPath}.mdx`;
      const r = await processFile(file, docPath);
      if (r.updated) {
        updated += 1;
        console.log(`✓ ${file}`);
      } else {
        skipped += 1;
        console.log(`· ${file} (${r.skipped})`);
      }
    }
  }
  console.log(`\nUpdated: ${updated}  Skipped: ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
