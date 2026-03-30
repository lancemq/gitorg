export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

export type CommandSlug =
  | "git-rebase"
  | "git-merge"
  | "git-cherry-pick"
  | "git-reset"
  | "git-stash";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarContent = {
  brandLabel: string;
  searchLabel: string;
  footerTitle: string;
  footerText: string;
  localeLabel: string;
  localeNames: Record<Locale, string>;
  groups: NavGroup[];
};

type FaqItem = {
  question: string;
  answer: string;
};

type DocsSectionId =
  | "learning-path"
  | "commands"
  | "workflows"
  | "recovery"
  | "concepts";

type Dictionary = {
  sidebar: {
    home: SidebarContent;
    docs: SidebarContent;
    command: (activeSlug: CommandSlug) => SidebarContent;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryAction: string;
      secondaryAction: string;
    };
    meta: {
      modulesTitle: string;
      modules: number;
      modulesLabel: string;
      commandCardsTitle: string;
      commandCards: number;
      exercisesTitle: string;
      exercises: number;
      recommendedPathTitle: string;
      recommendedPath: string;
    };
    quickStart: {
      eyebrow: string;
      title: string;
      description: string;
      cards: ReadonlyArray<{
        kicker: string;
        title: string;
        description: string;
        command: string;
      }>;
    };
    knowledgeColumns: ReadonlyArray<{
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      items: ReadonlyArray<{
        title: string;
        description: string;
      }>;
    }>;
    reference: {
      eyebrow: string;
      title: string;
      description: string;
      steps: ReadonlyArray<{
        step: string;
        title: string;
        description: string;
      }>;
    };
    faq: {
      eyebrow: string;
      title: string;
      description: string;
      items: ReadonlyArray<FaqItem>;
    };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      action: string;
    };
  };
  docsIndex: {
    eyebrow: string;
    title: string;
    description: string;
    sourcesTitle: string;
    sections: ReadonlyArray<{
      id: DocsSectionId;
      eyebrow: string;
      title: string;
      description: string;
    }>;
  };
  commandPage: {
    eyebrow: string;
    breadcrumbs: {
      docs: string;
      commands: string;
    };
  };
  commandSlugs: readonly CommandSlug[];
  commandMeta: Record<CommandSlug, ReadonlyArray<{ label: string; value: string }>>;
};

function baseSidebar(locale: Locale, groups: NavGroup[]): SidebarContent {
  return {
    brandLabel: "Git Academy",
    searchLabel: locale === "zh" ? "搜索文档" : "Search docs",
    footerTitle: "Auto Doc",
    footerText: locale === "zh" ? "内容驱动文档站" : "Content-driven docs",
    localeLabel: locale === "zh" ? "语言" : "Language",
    localeNames: {
      zh: locale === "zh" ? "中文" : "Chinese",
      en: locale === "zh" ? "英文" : "English",
    },
    groups,
  };
}

export const commandSlugs = [
  "git-rebase",
  "git-merge",
  "git-cherry-pick",
  "git-reset",
  "git-stash",
] as const;

const zhDictionary: Dictionary = {
  sidebar: {
    home: baseSidebar("zh", [
      {
        title: "Learning Path",
        items: [
          { label: "总览", href: "/zh#overview", active: true },
          { label: "快速开始", href: "/zh#quick-start" },
          { label: "最佳实践", href: "/zh#best-practices" },
          { label: "Git 原理", href: "/zh#internals" },
        ],
      },
      {
        title: "Resources",
        items: [
            { label: "文档库", href: "/zh/docs" },
            { label: "常见问题", href: "/zh#faq" },
          ],
      },
    ]),
    docs: baseSidebar("zh", [
      {
        title: "Docs",
        items: [
          { label: "全部文档", href: "/zh/docs", active: true },
          { label: "快速上手", href: "/zh/docs/learning-path/quick-start" },
          { label: "git rebase", href: "/zh/commands/git-rebase" },
          { label: "git merge", href: "/zh/commands/git-merge" },
          { label: "git cherry-pick", href: "/zh/commands/git-cherry-pick" },
          { label: "git reset", href: "/zh/commands/git-reset" },
          { label: "git stash", href: "/zh/commands/git-stash" },
          { label: "恢复手册", href: "/zh/docs/recovery/reflog-recovery" },
        ],
      },
    ]),
    command: (activeSlug) =>
      baseSidebar("zh", [
        {
          title: "Command Docs",
          items: [
            { label: "全部文档", href: "/zh/docs" },
            {
              label: "git rebase",
              href: "/zh/commands/git-rebase",
              active: activeSlug === "git-rebase",
            },
            {
              label: "git merge",
              href: "/zh/commands/git-merge",
              active: activeSlug === "git-merge",
            },
            {
              label: "git cherry-pick",
              href: "/zh/commands/git-cherry-pick",
              active: activeSlug === "git-cherry-pick",
            },
            {
              label: "git reset",
              href: "/zh/commands/git-reset",
              active: activeSlug === "git-reset",
            },
            {
              label: "git stash",
              href: "/zh/commands/git-stash",
              active: activeSlug === "git-stash",
            },
            { label: "fetch vs pull", href: "/zh/docs/workflows/fetch-vs-pull" },
            { label: "reflog 恢复", href: "/zh/docs/recovery/reflog-recovery" },
          ],
        },
      ]),
  },
  home: {
    hero: {
      eyebrow: "Source Control Learning Lab",
      title: "从提交、commit 到理解对象模型，系统学习 Git 的使用与原理。",
      description:
        "面向协作开发者的 Git 文档站，覆盖快速上手、常见工作流、风险操作恢复，以及 rebase、merge、reflog 等核心命令的实战说明。",
      primaryAction: "开始学习",
      secondaryAction: "查看参考资料",
    },
    meta: {
      modulesTitle: "核心模块",
      modules: 5,
      modulesLabel: "从工作流到恢复手册",
      commandCardsTitle: "文档专题",
      commandCards: 14,
      exercisesTitle: "双语页面",
      exercises: 4,
      recommendedPathTitle: "Recommended path",
      recommendedPath: "Quick Start → fetch/pull → rebase → reflog",
    },
    quickStart: {
      eyebrow: "Quick Start",
      title: "快速开始",
      description: "先用几个低风险命令建立对分支、提交和同步的直觉。",
      cards: [
        {
          kicker: "01 / setup",
          title: "初始化仓库",
          description: "了解 git init、git clone、身份配置和默认分支。",
          command: "git clone repo-url",
        },
        {
          kicker: "02 / stage",
          title: "暂存与提交",
          description: "理解工作区、暂存区和提交历史的三层关系。",
          command: "git add . && git commit",
        },
        {
          kicker: "03 / sync",
          title: "同步远端",
          description: "掌握 fetch、pull、push 与本地分支的协同方式。",
          command: "git fetch origin",
        },
      ],
    },
    knowledgeColumns: [
      {
        id: "best-practices",
        eyebrow: "Best Practices",
        title: "最佳实践",
        description: "减少历史污染和冲突成本。",
        items: [
          {
            title: "保持提交小而明确",
            description: "每次提交只表达一个意图，便于 review、回滚和 cherry-pick。",
          },
          {
            title: "优先 fetch，再决定 merge 或 rebase",
            description: "先获取远端状态，再显式选择同步策略，比默认 pull 更可控。",
          },
          {
            title: "危险操作前先看 reflog",
            description: "reset、rebase、force push 之前确认可恢复路径，降低误操作损失。",
          },
        ],
      },
      {
        id: "internals",
        eyebrow: "Git Internals",
        title: "底层原理",
        description: "把命令行为和对象模型对应起来。",
        items: [
          {
            title: "对象数据库",
            description: "blob、tree、commit 如何组合成可追踪的历史图。",
          },
          {
            title: "引用与 HEAD",
            description: "分支、本地标签、远端跟踪分支都是指向提交的引用。",
          },
          {
            title: "可恢复性",
            description: "reflog 与 gc 机制决定对象什么时候还能被找回。",
          },
        ],
      },
    ],
    reference: {
      eyebrow: "Reference",
      title: "命令参考路线",
      description: "把高频命令整理成渐进式学习路径。",
      steps: [
        { step: "01", title: "clone", description: "拉取仓库并建立本地副本。" },
        { step: "02", title: "add", description: "把改动加入暂存区。" },
        { step: "03", title: "commit", description: "生成新的提交对象。" },
        { step: "04", title: "rebase", description: "重写提交基底并整理历史。" },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "常见问题",
      description: "把最容易踩坑的 Git 问题讲清楚。",
      items: [
        {
          question: "`git pull` 为什么会产生我不想要的 merge commit？",
          answer:
            "因为 pull 默认会在 fetch 之后直接 merge。你可以先 fetch，再显式选择 merge 或 rebase。",
        },
        {
          question: "误删分支或 reset 之后还能找回吗？",
          answer: "多数情况下可以。只要对象还没被清理，git reflog 往往能帮你定位历史引用并恢复。",
        },
      ],
    },
    cta: {
      eyebrow: "Git Docs",
      title: "教程材料已经进入 content/ 内容源。",
      description: "继续浏览文档库，或者把更多 Git 主题接进同一套 MDX 渲染体系。",
      action: "浏览文档库",
    },
  },
  docsIndex: {
    eyebrow: "Docs Library",
    title: "内容文档库",
    description: "所有教程都从 content/ 目录下的 Markdown / MDX 文件渲染而来。",
    sourcesTitle: "参考来源",
    sections: [
      {
        id: "learning-path",
        eyebrow: "Learning Path",
        title: "学习路径",
        description: "适合从零开始构建 Git 使用闭环。",
      },
      {
        id: "commands",
        eyebrow: "Commands",
        title: "命令专题",
        description: "围绕高频命令提供结构化教程。",
      },
      {
        id: "workflows",
        eyebrow: "Workflows",
        title: "工作流",
        description: "帮助你区分相似命令和日常协作策略。",
      },
      {
        id: "recovery",
        eyebrow: "Recovery",
        title: "恢复手册",
        description: "误操作后的定位与恢复思路。",
      },
      {
        id: "concepts",
        eyebrow: "Concepts",
        title: "概念基础",
        description: "理解 Git 的对象、引用和 HEAD。",
      },
    ],
  },
  commandPage: {
    eyebrow: "Command Reference",
    breadcrumbs: {
      docs: "文档",
      commands: "命令",
    },
  },
  commandSlugs,
  commandMeta: {
    "git-rebase": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "同步主分支、整理提交" },
      { label: "内容来源", value: "MDX / 官方资料提炼" },
    ],
    "git-merge": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "整合分支历史" },
      { label: "内容来源", value: "MDX / 官方资料提炼" },
    ],
    "git-cherry-pick": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "挑选特定提交" },
      { label: "内容来源", value: "MDX / 官方资料提炼" },
    ],
    "git-reset": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "撤销、回退、取消暂存" },
      { label: "内容来源", value: "MDX / 官方资料提炼" },
    ],
    "git-stash": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "临时保存未提交改动" },
      { label: "内容来源", value: "MDX / 官方资料提炼" },
    ],
  },
};

const enDictionary: Dictionary = {
  sidebar: {
    home: baseSidebar("en", [
      {
        title: "Learning Path",
        items: [
          { label: "Overview", href: "/en#overview", active: true },
          { label: "Quick Start", href: "/en#quick-start" },
          { label: "Best Practices", href: "/en#best-practices" },
          { label: "Git Internals", href: "/en#internals" },
        ],
      },
      {
        title: "Resources",
        items: [
          { label: "Docs Library", href: "/en/docs" },
          { label: "FAQ", href: "/en#faq" },
        ],
      },
    ]),
    docs: baseSidebar("en", [
      {
        title: "Docs",
        items: [
          { label: "All Docs", href: "/en/docs", active: true },
          { label: "Quick Start", href: "/en/docs/learning-path/quick-start" },
          { label: "git rebase", href: "/en/commands/git-rebase" },
          { label: "git merge", href: "/en/commands/git-merge" },
          { label: "git cherry-pick", href: "/en/commands/git-cherry-pick" },
          { label: "git reset", href: "/en/commands/git-reset" },
          { label: "git stash", href: "/en/commands/git-stash" },
          { label: "Reflog Recovery", href: "/en/docs/recovery/reflog-recovery" },
        ],
      },
    ]),
    command: (activeSlug) =>
      baseSidebar("en", [
        {
          title: "Command Docs",
          items: [
            { label: "All Docs", href: "/en/docs" },
            {
              label: "git rebase",
              href: "/en/commands/git-rebase",
              active: activeSlug === "git-rebase",
            },
            {
              label: "git merge",
              href: "/en/commands/git-merge",
              active: activeSlug === "git-merge",
            },
            {
              label: "git cherry-pick",
              href: "/en/commands/git-cherry-pick",
              active: activeSlug === "git-cherry-pick",
            },
            {
              label: "git reset",
              href: "/en/commands/git-reset",
              active: activeSlug === "git-reset",
            },
            {
              label: "git stash",
              href: "/en/commands/git-stash",
              active: activeSlug === "git-stash",
            },
            { label: "fetch vs pull", href: "/en/docs/workflows/fetch-vs-pull" },
            { label: "reflog recovery", href: "/en/docs/recovery/reflog-recovery" },
          ],
        },
      ]),
  },
  home: {
    hero: {
      eyebrow: "Source Control Learning Lab",
      title: "Learn Git from commits to the object model, with both workflow and internals.",
      description:
        "A Git documentation site for collaborative developers, covering quick start, common workflows, recovery strategies, and hands-on guidance for rebase, merge, and reflog.",
      primaryAction: "Start learning",
      secondaryAction: "View references",
    },
    meta: {
      modulesTitle: "Core Modules",
      modules: 5,
      modulesLabel: "From workflow to recovery",
      commandCardsTitle: "Doc Topics",
      commandCards: 14,
      exercisesTitle: "Bilingual Pages",
      exercises: 4,
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
      description: "Explain the Git pitfalls that confuse people most often.",
      items: [
        {
          question: "Why does `git pull` create a merge commit I did not want?",
          answer: "Because pull defaults to fetch plus merge. Fetch first if you want to decide the integration strategy explicitly.",
        },
        {
          question: "Can I recover after deleting a branch or running reset?",
          answer: "Often yes. If the objects have not been cleaned up yet, git reflog can usually help you recover the previous reference.",
        },
      ],
    },
    cta: {
      eyebrow: "Git Docs",
      title: "The content library now renders directly from MDX.",
      description: "Browse the docs library, or keep expanding the same content pipeline with more Git topics.",
      action: "Open docs library",
    },
  },
  docsIndex: {
    eyebrow: "Docs Library",
    title: "Content Library",
    description: "Every tutorial on this page is rendered from Markdown / MDX files inside the content/ directory.",
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
        id: "workflows",
        eyebrow: "Workflows",
        title: "Workflows",
        description: "Understand the tradeoffs behind similar commands and team habits.",
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
    ],
  },
  commandPage: {
    eyebrow: "Command Reference",
    breadcrumbs: {
      docs: "Docs",
      commands: "Commands",
    },
  },
  commandSlugs,
  commandMeta: {
    "git-rebase": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Sync main branch, clean up commits" },
      { label: "Content source", value: "MDX / distilled from official docs" },
    ],
    "git-merge": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Join branch histories" },
      { label: "Content source", value: "MDX / distilled from official docs" },
    ],
    "git-cherry-pick": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Apply selected commits" },
      { label: "Content source", value: "MDX / distilled from official docs" },
    ],
    "git-reset": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Undo, move HEAD, unstage changes" },
      { label: "Content source", value: "MDX / distilled from official docs" },
    ],
    "git-stash": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Temporarily shelve local changes" },
      { label: "Content source", value: "MDX / distilled from official docs" },
    ],
  },
};

const dictionaries: Record<Locale, Dictionary> = {
  zh: zhDictionary,
  en: enDictionary,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
