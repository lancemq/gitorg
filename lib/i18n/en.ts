import type { Dictionary } from "./index";
import {
  baseSidebar,
  buildLearningPathNavItem,
  buildWorkflowNavItem,
  buildCommandNavItem,
  buildBestPracticeNavItem,
  buildInternalsNavItem,
  buildRecoveryNavItem,
  buildPlatformsNavItem,
  buildDevopsNavItem,
  buildSecurityNavItem,
  buildPerformanceNavItem,
  buildMigrationNavItem,
  buildHostingNavItem,
  buildConceptsNavItem,
} from "./index";
import { commandSlugs } from "./slugs";

export const enDictionary: Dictionary = {
  sidebar: {
    docs: (activePath) =>
      baseSidebar("en", [
        {
          title: "Overview",
          items: [{ label: "Overview", href: "/en", active: !activePath || activePath === "overview" }],
        },
        {
          title: "Learning Path",
          items: [
            buildLearningPathNavItem("en", activePath),
            buildWorkflowNavItem("en", activePath),
            buildCommandNavItem("en", activePath),
          ],
        },
        {
          title: "Topics",
          items: [
            buildBestPracticeNavItem("en", activePath),
            buildInternalsNavItem("en", activePath),
            buildPlatformsNavItem("en", activePath),
            buildDevopsNavItem("en", activePath),
            buildSecurityNavItem("en", activePath),
            buildPerformanceNavItem("en", activePath),
            buildMigrationNavItem("en", activePath),
            buildHostingNavItem("en", activePath),
            buildConceptsNavItem("en", activePath),
            buildRecoveryNavItem("en", activePath),
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Git History",
              href: "/en/history",
              active: activePath === "concepts/git-history",
            },
            {
              label: "Changelog",
              href: "/en/updates",
              active: activePath === "updates",
            },
            {
              label: "FAQ",
              href: "/en/faq",
              active: activePath === "faq",
            },
          ],
        },
      ]),
  },
  commandIndex: {
    eyebrow: "Command Hub",
    title: "Git Command Topics",
    description: "Start from the command hub, then move into focused command details without overloading the sidebar with a flat list.",
  },
  bestPracticeIndex: {
    eyebrow: "Best Practices",
    title: "Best Practices Channel",
    description: "Study team-friendly Git habits as focused topics, from commit hygiene and topic branches to safe pushes and shared-history boundaries.",
  },
  workflowIndex: {
    eyebrow: "Workflows",
    title: "Git Workflows Channel",
    description: "Break common collaboration routines into reusable flows, including sync strategy, feature-branch teamwork, review prep, and urgent fixes.",
  },
  recoveryIndex: {
    eyebrow: "Recovery",
    title: "Git Recovery Channel",
    description: "Turn common Git mistakes into focused rescue guides covering reset, rebase, deleted branches, detached HEAD, and reflog-first recovery.",
  },
  platformsIndex: {
    eyebrow: "Platforms",
    title: "Platform Collaboration Guide",
    description: "Turn core GitHub and GitLab platform abilities into local tutorials, from GitHub Flow / GitLab Flow and PR / MR review to forks, issues / boards, groups, permissions, and CI/CD basics.",
  },
  learningPathIndex: {
    eyebrow: "Quick Start",
    title: "Git Quick Start Series",
    description: "Turn quick start into a progressive series that covers setup, staging, remote sync, and a first branch-based collaboration loop.",
  },
  internalsIndex: {
    eyebrow: "Git Internals",
    title: "Git Internals Channel",
    description: "Learn Git internals as separate topics, from the object database and refs to commit graphs and packfiles.",
  },
  devopsIndex: {
    eyebrow: "DevOps",
    title: "DevOps Tooling",
    description: "Learn how Git integrates with CI/CD pipelines and IDE/terminal tooling, including GitHub Actions, GitLab CI, Jenkins, VS Code, JetBrains, and terminal Git UIs.",
  },
  securityIndex: {
    eyebrow: "Security",
    title: "Security",
    description: "Learn SSH key management and GPG signing to secure Git authentication and commit verification.",
  },
  performanceIndex: {
    eyebrow: "Performance",
    title: "Performance",
    description: "Optimize Git for large repositories with partial clone, sparse checkout, shallow clone, and Git LFS.",
  },
  migrationIndex: {
    eyebrow: "Migration",
    title: "Migration",
    description: "Complete guides for migrating from Subversion (SVN) and Mercurial (Hg) to Git with tools, workflows, and common pitfalls.",
  },
  hostingIndex: {
    eyebrow: "Hosting",
    title: "Hosting",
    description: "Compare GitHub, GitLab, Bitbucket, and self-hosted solutions like GitLab CE and Gitea for your team's needs.",
  },
  conceptsIndex: {
    eyebrow: "Concepts",
    title: "Concepts",
    description: "Understand Git's core concepts including the three-layer model, history model, .gitignore, detached HEAD, and more.",
  },
  home: {
    hero: {
      eyebrow: "Source Control Learning Lab",
      title: "Master Git. Build Better History.",
      description:
        "A Git documentation site for collaborative developers, covering quick start, common workflows, recovery strategies, and hands-on guidance for rebase, merge, and reflog.",
      primaryAction: "Start learning",
      secondaryAction: "View references",
    },
    meta: {
      modulesTitle: "Content Channels",
      modules: 0,
      modulesLabel: "Tutorial channels currently wired into the site",
      commandCardsTitle: "Command Topics",
      commandCards: 0,
      exercisesTitle: "Total Tutorials",
      exercises: 0,
      recommendedPathTitle: "Recommended path",
      recommendedPath: "Quick Start → fetch/pull → rebase → reflog",
    },
    quickStart: {
      eyebrow: "Quick Start",
      title: "Get Started Fast",
      description: "Build intuition for branches, commits, and synchronization through a few low-risk commands.",
      cards: [
        {
          kicker: "01 / setup",
          title: "Initialize a repository",
          description: "Understand git init, git clone, identity config, and the default branch.",
          command: "git clone repo-url",
        },
        {
          kicker: "02 / stage",
          title: "Stage and commit",
          description: "Learn the three-layer model of working tree, staging area, and history.",
          command: "git add . && git commit",
        },
        {
          kicker: "03 / sync",
          title: "Sync with remote",
          description: "Master how fetch, pull, and push work with local branches.",
          command: "git fetch origin",
        },
      ],
    },
    knowledgeColumns: [
      {
        id: "best-practices",
        eyebrow: "Best Practices",
        title: "Best Practices",
        description: "Reduce history noise and conflict cost.",
        items: [
          {
            title: "Keep commits small and intentional",
            description: "One clear intent per commit makes review, rollback, and cherry-pick easier.",
          },
          {
            title: "Fetch first, then choose merge or rebase",
            description: "Fetching before you decide gives you more control than a default pull.",
          },
          {
            title: "Check reflog before risky operations",
            description: "Before reset, rebase, or force push, confirm your recovery path.",
          },
        ],
      },
      {
        id: "internals",
        eyebrow: "Git Internals",
        title: "Under the Hood",
        description: "Map command behavior back to the object model.",
        items: [
          {
            title: "The object database",
            description: "See how blob, tree, and commit objects form a trackable history graph.",
          },
          {
            title: "References and HEAD",
            description: "Branches, tags, and remote-tracking refs all point to commits.",
          },
          {
            title: "Recoverability",
            description: "Reflog and garbage collection determine when lost objects can still be restored.",
          },
        ],
      },
      {
        id: "workflows",
        eyebrow: "Workflows",
        title: "Common Workflows",
        description: "Turn collaboration routines into repeatable patterns.",
        items: [
          {
            title: "Fetch first, decide second",
            description: "Separate observation from integration for fewer surprises.",
          },
          {
            title: "Feature branch collaboration",
            description: "Isolate work on topic branches to keep main stable.",
          },
          {
            title: "Hotfix workflow",
            description: "Full lifecycle for urgent fixes: branch, patch, merge, and rollback.",
          },
        ],
      },
      {
        id: "recovery",
        eyebrow: "Recovery",
        title: "Mistake Recovery",
        description: "Find, assess, and recover from Git mishaps.",
        items: [
          {
            title: "Reflog-first recovery habit",
            description: "Always check reflog before reset, rebase, or branch deletion.",
          },
          {
            title: "Reset recovery by mode",
            description: "Know the risk and recovery path for --soft, --mixed, and --hard.",
          },
          {
            title: "Handling detached HEAD",
            description: "How to recognize and safely exit a detached HEAD state.",
          },
        ],
      },
    ],
    reference: {
      eyebrow: "Reference",
      title: "Command Learning Path",
      description: "Organize high-frequency commands into a progressive path.",
      steps: [
        { step: "01", title: "clone", description: "Create a local copy of a repository." },
        { step: "02", title: "add", description: "Move changes into the staging area." },
        { step: "03", title: "commit", description: "Create a new immutable commit." },
        { step: "04", title: "rebase", description: "Rewrite commit bases and clean history." },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common Questions",
      description: "A practical FAQ built from the Git official docs and the Pro Git book, focused on the questions people hit most often.",
      action: "View all questions",
      items: [
        {
          question: "What does `git pull` actually do, and why can the result surprise me?",
          answer:
            "`git pull` first runs fetch, then integrates the upstream branch into your current branch. The official documentation describes several integration modes, including `--ff-only`, `--rebase`, `--no-rebase`, and `--squash`, so the outcome depends on your flags and config such as `pull.rebase` and `pull.ff`. If you want fewer surprises, fetch first and choose the integration strategy explicitly.",
        },
        {
          question: "What is the real difference between `git reset --soft`, `--mixed`, and `--hard`?",
          answer:
            "The official `git reset` manual separates them cleanly: `--soft` moves HEAD only, `--mixed` resets the index but keeps working tree changes, and `--hard` resets HEAD, the index, and the working tree together. In practice, `--hard` is the one to treat as destructive because it overwrites your current file state.",
        },
        {
          question: "Can I recover after deleting a branch, resetting too far, or regretting a pull?",
          answer:
            "Often yes. The official `git reset` documentation explicitly points to `ORIG_HEAD` and related recovery flows after reset, merge, and pull. As long as the underlying objects have not been cleaned up yet, reflog is usually the first place to look before you decide whether to create a new branch or move a ref back.",
        },
        {
          question: "Why did `git stash` not include my new files?",
          answer:
            "Because stash normally records changes from tracked files in the working tree and index. The official `git stash` docs say you need `git stash push -u` to include untracked files, and `-a` if you also want ignored files. It also helps to remember that `apply` keeps the stash entry, while `pop` tries to remove it after a successful apply.",
        },
        {
          question: "What is detached HEAD, and does it mean something is broken?",
          answer:
            "Not necessarily. The official `git switch` docs describe detached HEAD as a valid state for inspecting a commit or doing temporary experiments, where HEAD points to a commit instead of a branch name. If the work you do there is worth keeping, create a branch right away so those commits have a stable name.",
        },
        {
          question: "Should I use merge or rebase?",
          answer:
            "The Pro Git book treats both as normal integration tools: merge preserves the branching structure, while rebase rewrites your commits onto a new base for a cleaner linear history. The important warning from the official book is not to rebase commits that have already left your repository and may be the basis of someone else’s work. A practical rule is rebase for local cleanup, merge for already-shared history.",
        },
        {
          question: "Why does Git block me when I try to switch branches?",
          answer:
            "The official `git switch` docs say Git aborts the operation if switching would lead to the loss of local changes. That is a safety feature, not an error condition. The usual safe options are to commit, stash, or only use `--discard-changes` when you intentionally want to throw those local changes away.",
        },
      ],
    },
    latest: {
      eyebrow: "Changelog",
      title: "Latest Updates",
      description: "Start with the most recently added or expanded teaching entries to catch up quickly.",
    },
  },
  faqPage: {
    eyebrow: "FAQ Library",
    title: "All Common Questions",
    description: "A dedicated Git FAQ page that expands the homepage highlights into a fuller reading and maintenance surface.",
    groups: [
      {
        id: "pull-sync",
        title: "pull and sync",
        description: "Separate fetch, pull, push, and remote-sync expectations so the most common surprises become easier to reason about.",
        items: [
          {
            question: "What does `git pull` actually do, and why can the result surprise me?",
            answer:
              "`git pull` first runs fetch, then integrates the upstream branch into your current branch. The official documentation describes several integration modes, including `--ff-only`, `--rebase`, `--no-rebase`, and `--squash`, so the outcome depends on your flags and config such as `pull.rebase` and `pull.ff`. If you want fewer surprises, fetch first and choose the integration strategy explicitly.",
          },
          {
            question: "Why can local and remote still feel out of sync even after I pulled?",
            answer:
              "Because pull solves only one part of the problem: fetching and integrating an upstream branch. It does not guarantee that you are on the branch you think you are on, that the upstream relationship is configured the way you assume, or that the resulting history shape matches your expectation. A steadier debugging path is to inspect `git branch -vv`, then `git log --oneline --graph --decorate --all`, and only then decide whether the mismatch is really about sync or about branch context.",
          },
          {
            question: "Why does push fail when Git says the remote is ahead of me?",
            answer:
              "The usual reason is that the remote branch already contains commits that your local branch does not. Git blocks a direct update because it would overwrite history from your point of view. The safe response is usually not to force-push immediately, but to fetch first, inspect divergence, and decide whether you need merge, rebase, or whether you are on the wrong branch entirely. Force push on a shared branch is almost never the right first move.",
          },
          {
            question: "When is `pull --ff-only` the better choice?",
            answer:
              "`--ff-only` is useful when you want one strict rule: only fast-forward this branch, and fail if real integration would be required. That makes it valuable on stable shared branches, release lines, or anywhere you want sync operations to stay explicit and unsurprising. Instead of silently creating a merge commit or taking another integration path, it stops and forces you to make the next decision consciously.",
          },
          {
            question: "Why do many teams insist on fetch-first workflows?",
            answer:
              "Because fetch separates observation from integration. You get to update your view of upstream without mutating the current branch yet. That pause gives you room to inspect whether the branch diverged, whether main moved, and whether merge, rebase, or ff-only is the right next step. For both beginners and teams, that separation usually lowers sync risk and reduces accidental history changes.",
          },
        ],
      },
      {
        id: "reset-recovery",
        title: "reset and recovery",
        description: "Clarify reset, reflog, rollback, and recovery so accidental history moves are easier to diagnose and undo.",
        items: [
          {
            question: "What is the real difference between `git reset --soft`, `--mixed`, and `--hard`?",
            answer:
              "The official `git reset` manual separates them cleanly: `--soft` moves HEAD only, `--mixed` resets the index but keeps working tree changes, and `--hard` resets HEAD, the index, and the working tree together. In practice, `--hard` is the one to treat as destructive because it overwrites your current file state.",
          },
          {
            question: "Can I recover after deleting a branch, resetting too far, or regretting a pull?",
            answer:
              "Often yes. The official `git reset` documentation explicitly points to `ORIG_HEAD` and related recovery flows after reset, merge, and pull. As long as the underlying objects have not been cleaned up yet, reflog is usually the first place to look before you decide whether to create a new branch or move a ref back.",
          },
          {
            question: "How should I choose between `git revert` and `git reset`?",
            answer:
              "A practical rule is that `revert` creates a new commit that cancels an earlier one, while `reset` moves a branch ref itself. That usually makes revert the safer tool for history that has already been shared, and reset the better tool for local cleanup, rollback, or branch reshaping before others depend on it. The real risk comes from using reset to rewrite history that other people have already pulled.",
          },
          {
            question: "What does reflog actually record, and why does it so often save recovery situations?",
            answer:
              "Reflog records ref movement history, not every action you ever took. When HEAD or a branch moves because of reset, rebase, merge, checkout-style actions, or similar operations, reflog often retains the previous positions for a while. That is why it can be so valuable: even if you moved a branch away from a commit, Git may still remember where that ref used to point, giving you a path back.",
          },
          {
            question: "Why do some commits seem recoverable at first but later disappear for real?",
            answer:
              "Because reflog entries and unreachable objects are not permanent storage. Once no ref keeps an object reachable and enough time passes for cleanup and garbage collection, Git may eventually remove it. That is why recovery is usually time-sensitive. If you suspect you lost something important, stop reshaping the repository and inspect reflog and ref state first instead of continuing with more destructive actions.",
          },
        ],
      },
      {
        id: "stash-switch",
        title: "stash, switching, and history boundaries",
        description: "Clarify stash behavior, branch switching, detached HEAD, and merge-versus-rebase decisions.",
        items: [
          {
            question: "Why did `git stash` not include my new files?",
            answer:
              "Because stash normally records changes from tracked files in the working tree and index. The official `git stash` docs say you need `git stash push -u` to include untracked files, and `-a` if you also want ignored files. It also helps to remember that `apply` keeps the stash entry, while `pop` tries to remove it after a successful apply.",
          },
          {
            question: "What is detached HEAD, and does it mean something is broken?",
            answer:
              "Not necessarily. The official `git switch` docs describe detached HEAD as a valid state for inspecting a commit or doing temporary experiments, where HEAD points to a commit instead of a branch name. If the work you do there is worth keeping, create a branch right away so those commits have a stable name.",
          },
          {
            question: "Should I use merge or rebase?",
            answer:
              "The Pro Git book treats both as normal integration tools: merge preserves the branching structure, while rebase rewrites your commits onto a new base for a cleaner linear history. The important warning from the official book is not to rebase commits that have already left your repository and may be the basis of someone else’s work. A practical rule is rebase for local cleanup, merge for already-shared history.",
          },
          {
            question: "Why does Git block me when I try to switch branches?",
            answer:
              "The official `git switch` docs say Git aborts the operation if switching would lead to the loss of local changes. That is a safety feature, not an error condition. The usual safe options are to commit, stash, or only use `--discard-changes` when you intentionally want to throw those local changes away.",
          },
          {
            question: "How should I choose between stash, a temporary commit, and a temporary branch?",
            answer:
              "If the change is short-lived and not ready to become a named part of history, stash is often the lightest option. If the change already has a clear boundary and you want to preserve context, a normal commit is usually clearer. If the work may live longer, needs a name, or could turn into a real line of work, a temporary branch is often easier to track than a growing stash stack. The real decision is not command preference but whether the work deserves a durable name and place in history.",
          },
        ],
      },
    ],
  },
  updatesPage: {
    eyebrow: "Changelog",
    title: "Changelog",
    description: "A content-focused log of what teaching material was added or expanded, with emphasis on commands, workflows, internals, and recovery topics.",
    entries: [
      {
        id: "2026-q2",
        period: "2026 Q2",
        title: "More workflow and recovery teaching material",
        summary: "Expanded real collaboration and recovery scenarios, including Gitflow, incident rollback thinking, and AI-agent-oriented worktree usage.",
        items: [
          "Added a dedicated Gitflow Workflow guide covering main, develop, feature, release, and hotfix roles plus adoption boundaries.",
          "Expanded the recovery channel with more realistic mistake-and-recovery scenarios such as undoing a pull and assessing force-push impact.",
          "Added a workflow topic focused on using git worktree with AI coding agents and parallel task isolation.",
        ],
      },
      {
        id: "2026-q1-content",
        period: "2026 Q1",
        title: "The library grew past 100 topics",
        summary: "Expanded the site into a much broader Git curriculum with deeper command, internals, workflow, and best-practice coverage.",
        items: [
          "Added many more command tutorials, including config, worktree, submodule, format-patch, show, rm, mv, reflog, bisect, and blame.",
          "Expanded the internals channel with object storage, refs, commit graphs, garbage collection, remote-tracking refs, and merge-base topics.",
          "Added more diagrams, practice labs, and risk guidance to higher-risk commands such as rebase, reset, reflog, stash, and cherry-pick.",
        ],
      },
      {
        id: "2026-q1-architecture",
        period: "2026 Q1",
        title: "The channel-based curriculum took shape",
        summary: "Grouped teaching material into clearer channels so readers could learn by topic instead of browsing isolated pages.",
        items: [
          "Built dedicated channels for commands, best practices, workflows, internals, and recovery.",
          "Split best-practices content into focused standalone lessons instead of a single oversized article.",
          "Turned Git Internals into a topic channel with dedicated pages for objects, refs, commit graphs, and storage concepts.",
        ],
      },
      {
        id: "2025-q4",
        period: "2025 Q4",
        title: "The bilingual content library began",
        summary: "Established the MDX-based content source and the first bilingual teaching set across foundational Git topics.",
        items: [
          "Moved teaching material into a unified `content/` tree backed by Markdown / MDX.",
          "Established parallel `/zh` and `/en` reading paths for core tutorials.",
          "Created the early foundational lessons such as quick start, rebase, fetch vs pull, reflog recovery, and refs / HEAD.",
        ],
      },
    ],
  },
  docsIndex: {
    eyebrow: "Docs Library",
    title: "Docs",
    description: "The homepage now hosts the full docs aggregation, while every tutorial still renders from Markdown / MDX files inside the content/ directory.",
    sourcesTitle: "References",
    sections: [
      {
        id: "learning-path",
        eyebrow: "Learning Path",
        title: "Learning Path",
        description: "A practical path for building a usable Git workflow from scratch.",
      },
      {
        id: "commands",
        eyebrow: "Commands",
        title: "Commands",
        description: "Focused deep-dives on high-frequency Git commands.",
      },
      {
        id: "best-practices",
        eyebrow: "Best Practices",
        title: "Best Practices",
        description: "Study team-friendly Git habits as focused standalone topics.",
      },
      {
        id: "workflows",
        eyebrow: "Workflows",
        title: "Workflows",
        description: "Turn recurring collaboration flows into clearer repeatable patterns.",
      },
      {
        id: "recovery",
        eyebrow: "Recovery",
        title: "Recovery",
        description: "Recover from mistakes and build a safer operating model.",
      },
      {
        id: "concepts",
        eyebrow: "Concepts",
        title: "Concepts",
        description: "Learn the foundations behind refs, HEAD, and history.",
      },
      {
        id: "devops",
        eyebrow: "DevOps",
        title: "DevOps",
        description: "Git integration with CI/CD pipelines, IDEs, and terminal tools.",
      },
      {
        id: "security",
        eyebrow: "Security",
        title: "Security",
        description: "SSH keys and GPG signing.",
      },
      {
        id: "performance",
        eyebrow: "Performance",
        title: "Performance",
        description: "Large repo optimization.",
      },
      {
        id: "migration",
        eyebrow: "Migration",
        title: "Migration",
        description: "SVN/Hg to Git migration.",
      },
      {
        id: "hosting",
        eyebrow: "Hosting",
        title: "Hosting",
        description: "Platforms and self-hosted solutions.",
      },
      {
        id: "concepts",
        eyebrow: "Concepts",
        title: "Concepts",
        description: "Learn the foundations behind refs, HEAD, and history.",
      },
    ],
  },
  commandPage: {
    eyebrow: "Command Reference",
    breadcrumbs: {
      overview: "Overview",
      commands: "Commands",
      bestPractices: "Best Practices",
      workflows: "Workflows",
      platforms: "Platforms",
      internals: "Git Internals",
      concepts: "Concepts",
      faq: "FAQ",
      learningPath: "Learning Path",
      recovery: "Recovery",
      devops: "DevOps",
      security: "Security",
      performance: "Performance",
      migration: "Migration",
      hosting: "Hosting",
    },
  },
  commandSlugs,
  commandMeta: {
    "git-init": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Initialize a new repository" },
    ],
    "git-clone": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Copy a repository locally" },
    ],
    "git-status": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Inspect working tree and index state" },
    ],
    "git-add": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Stage changes for commit" },
    ],
    "git-commit": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Create a new commit" },
    ],
    "git-diff": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Compare working tree, index, and commits" },
    ],
    "git-show": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Inspect a single commit, tag, or object" },
    ],
    "git-log": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Inspect commit history" },
    ],
    "git-rm": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Remove tracked files and stage the deletion" },
    ],
    "git-mv": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Rename or move tracked files" },
    ],
    "git-fetch": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Update remote refs without touching files" },
    ],
    "git-pull": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Fetch and integrate remote updates" },
    ],
    "git-push": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Push local branches to a remote" },
    ],
    "git-switch": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Switch or create branches" },
    ],
    "git-branch": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "List, create, rename, and delete branches" },
    ],
    "git-tag": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Mark releases and important milestones" },
    ],
    "git-remote": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Manage remotes and repository URLs" },
    ],
    "git-rebase": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Sync main branch, clean up commits" },
    ],
    "git-merge": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Join branch histories" },
    ],
    "git-cherry-pick": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Apply selected commits" },
    ],
    "git-reset": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Undo, move HEAD, unstage changes" },
    ],
    "git-stash": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Temporarily shelve local changes" },
    ],
    "git-restore": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Restore working tree or index state" },
    ],
    "git-revert": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Undo safely with a new commit" },
    ],
    "git-reflog": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Trace ref movement and recover positions" },
    ],
    "git-bisect": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Binary-search the commit that introduced a bug" },
    ],
    "git-blame": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Trace which commit last changed a line" },
    ],
    "git-checkout": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Legacy branch switching and path restore" },
    ],
    "git-clean": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Remove untracked files" },
    ],
    "git-config": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Manage repository and global configuration" },
    ],
    "git-help": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Read arguments and official guidance" },
    ],
    "git-describe": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Generate human-readable version labels" },
    ],
    "git-grep": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Search code tracked by Git" },
    ],
    "git-shortlog": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Summarize contributors and release notes" },
    ],
    "git-show-ref": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Inspect branch and tag refs" },
    ],
    "git-rev-parse": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Parse refs and paths in scripts" },
    ],
    "git-am": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Apply mailbox patch series" },
    ],
    "git-apply": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Preview or apply patch files" },
    ],
    "git-format-patch": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Generate patch series" },
    ],
    "git-send-email": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Send patch emails" },
    ],
    "git-request-pull": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Prepare maintainer pull summaries" },
    ],
    "git-archive": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Export source snapshots" },
    ],
    "git-bundle": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Transfer history offline" },
    ],
    "git-worktree": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Work on multiple branches in parallel" },
    ],
    "git-submodule": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Manage submodule repositories" },
    ],
    "git-sparse-checkout": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Narrow the working tree footprint" },
    ],
    "git-cat-file": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Inspect the object database" },
    ],
    "git-ls-files": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Inspect tracked paths in the index" },
    ],
    "git-ls-tree": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Inspect a commit snapshot structure" },
    ],
    "git-read-tree": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Perform lower-level index operations" },
    ],
    "git-update-index": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Control index state directly" },
    ],
    "git-update-ref": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Script ref updates" },
    ],
    "git-symbolic-ref": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Inspect and manage symbolic refs" },
    ],
    "git-rev-list": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Traverse and filter commit sets" },
    ],
    "git-merge-base": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Find common ancestry for branches" },
    ],
    "git-notes": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Attach metadata to commits" },
    ],
    "git-range-diff": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Compare patch series revisions" },
    ],
    "git-cherry": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Check whether commits were already integrated" },
    ],
    "git-mergetool": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Resolve conflicts with external tools" },
    ],
    "git-fsck": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Check repository integrity" },
    ],
    "git-gc": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Housekeep repository storage" },
    ],
    "git-count-objects": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Inspect object and pack counts" },
    ],
    "git-verify-pack": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Inspect pack file contents" },
    ],
    "git-verify-tag": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Verify signed tags" },
    ],
    "git-rerere": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Automatically reuse recorded conflict resolutions" },
    ],
    "git-difftool": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Compare changes with external diff tools" },
    ],
    "git-replace": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Replace objects in history without rewriting it" },
    ],
    "git-prune": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Clean up unreachable objects and stale refs" },
    ],
    "git-hash-object": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Compute content hash and store as Git object" },
    ],
    "git-interpret-trailers": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Parse and edit commit trailer fields" },
    ],
  },
};
