export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

export type CommandSlug =
  | "git-rebase"
  | "git-merge"
  | "git-cherry-pick"
  | "git-reset"
  | "git-stash"
  | "git-fetch"
  | "git-restore"
  | "git-revert"
  | "git-switch"
  | "git-branch"
  | "git-checkout";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
  children?: NavItem[];
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
    docs: (activePath?: string) => SidebarContent;
    command: (activeSlug: CommandSlug) => SidebarContent;
    faq: SidebarContent;
  };
  commandIndex: {
    eyebrow: string;
    title: string;
    description: string;
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
      action: string;
      items: ReadonlyArray<FaqItem>;
    };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      action: string;
    };
  };
  faqPage: {
    eyebrow: string;
    title: string;
    description: string;
  };
  docsIndex: {
    eyebrow: string;
    title: string;
    description: string;
    sourcesTitle: string;
    sections: ReadonlyArray<{
      id: DocsSectionId;
      sourceIds?: ReadonlyArray<DocsSectionId>;
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
    brandLabel: "Git Org Academy",
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
  "git-fetch",
  "git-restore",
  "git-revert",
  "git-switch",
  "git-branch",
  "git-checkout",
] as const;

const zhDictionary: Dictionary = {
  sidebar: {
    home: baseSidebar("zh", [
      {
        title: "Learning Path",
        items: [
          { label: "总览", href: "/zh#overview", active: true },
          { label: "快速开始", href: "/zh#quick-start" },
          { label: "最佳实践", href: "/zh/best-practices" },
          {
            label: "Git 命令",
            href: "/zh/commands",
            children: [
              { label: "git fetch", href: "/zh/commands/git-fetch" },
              { label: "git switch", href: "/zh/commands/git-switch" },
              { label: "git branch", href: "/zh/commands/git-branch" },
              { label: "git restore", href: "/zh/commands/git-restore" },
              { label: "git stash", href: "/zh/commands/git-stash" },
              { label: "git checkout", href: "/zh/commands/git-checkout" },
              { label: "git rebase", href: "/zh/commands/git-rebase" },
              { label: "git merge", href: "/zh/commands/git-merge" },
              { label: "git cherry-pick", href: "/zh/commands/git-cherry-pick" },
              { label: "git reset", href: "/zh/commands/git-reset" },
              { label: "git revert", href: "/zh/commands/git-revert" },
            ],
          },
        ],
      },
      {
        title: "Special Topics",
        items: [
          { label: "Git 原理", href: "/zh/internals" },
          { label: "Git 历史", href: "/zh/history" },
        ],
      },
      {
        title: "Resources",
        items: [
          { label: "文档库", href: "/zh/docs" },
          { label: "常见问题", href: "/zh/faq" },
        ],
      },
    ]),
    docs: (activePath) =>
      baseSidebar("zh", [
        {
          title: "Learning Path",
          items: [
            { label: "全部文档", href: "/zh/docs", active: activePath === "index" },
            {
              label: "快速上手",
              href: "/zh/docs/learning-path/quick-start",
              active: activePath === "learning-path/quick-start",
            },
            {
              label: "最佳实践",
              href: "/zh/best-practices",
              active: activePath === "workflows/git-best-practices",
            },
            {
              label: "Git 命令",
              href: "/zh/commands",
              active: activePath === "commands-index",
              children: [
                {
                  label: "git fetch",
                  href: "/zh/commands/git-fetch",
                  active: activePath === "commands/git-fetch",
                },
                {
                  label: "git switch",
                  href: "/zh/commands/git-switch",
                  active: activePath === "commands/git-switch",
                },
                {
                  label: "git branch",
                  href: "/zh/commands/git-branch",
                  active: activePath === "commands/git-branch",
                },
                {
                  label: "git restore",
                  href: "/zh/commands/git-restore",
                  active: activePath === "commands/git-restore",
                },
                {
                  label: "git stash",
                  href: "/zh/commands/git-stash",
                  active: activePath === "commands/git-stash",
                },
                {
                  label: "git checkout",
                  href: "/zh/commands/git-checkout",
                  active: activePath === "commands/git-checkout",
                },
                {
                  label: "git rebase",
                  href: "/zh/commands/git-rebase",
                  active: activePath === "commands/git-rebase",
                },
                {
                  label: "git merge",
                  href: "/zh/commands/git-merge",
                  active: activePath === "commands/git-merge",
                },
                {
                  label: "git cherry-pick",
                  href: "/zh/commands/git-cherry-pick",
                  active: activePath === "commands/git-cherry-pick",
                },
                {
                  label: "git reset",
                  href: "/zh/commands/git-reset",
                  active: activePath === "commands/git-reset",
                },
                {
                  label: "git revert",
                  href: "/zh/commands/git-revert",
                  active: activePath === "commands/git-revert",
                },
              ],
            },
          ],
        },
        {
          title: "Concepts",
          items: [
            {
              label: "Git 历史",
              href: "/zh/history",
              active: activePath === "concepts/git-history",
            },
            {
              label: "引用与 HEAD",
              href: "/zh/docs/concepts/refs-and-head",
              active: activePath === "concepts/refs-and-head",
            },
            {
              label: "Git 原理",
              href: "/zh/internals",
              active: activePath === "concepts/git-internals",
            },
          ],
        },
        {
          title: "Recovery",
          items: [
            {
              label: "恢复手册",
              href: "/zh/docs/recovery/reflog-recovery",
              active: activePath === "recovery/reflog-recovery",
            },
          ],
        },
      ]),
    faq: baseSidebar("zh", [
      {
        title: "Resources",
        items: [
          { label: "文档库", href: "/zh/docs" },
          { label: "Git 历史", href: "/zh/history" },
          { label: "常见问题", href: "/zh/faq", active: true },
        ],
      },
      {
        title: "FAQ Topics",
        items: [
          { label: "pull 与同步", href: "/zh/faq#pull-sync" },
          { label: "reset 与恢复", href: "/zh/faq#reset-recovery" },
          { label: "stash 与切换", href: "/zh/faq#stash-switch" },
        ],
      },
    ]),
    command: (activeSlug) =>
      baseSidebar("zh", [
        {
          title: "Learning Path",
          items: [
            { label: "全部文档", href: "/zh/docs" },
            { label: "快速上手", href: "/zh/docs/learning-path/quick-start" },
            { label: "最佳实践", href: "/zh/best-practices" },
            {
              label: "Git 命令",
              href: "/zh/commands",
              children: [
                { label: "git fetch", href: "/zh/commands/git-fetch", active: activeSlug === "git-fetch" },
                { label: "git switch", href: "/zh/commands/git-switch", active: activeSlug === "git-switch" },
                { label: "git branch", href: "/zh/commands/git-branch", active: activeSlug === "git-branch" },
                { label: "git restore", href: "/zh/commands/git-restore", active: activeSlug === "git-restore" },
                { label: "git stash", href: "/zh/commands/git-stash", active: activeSlug === "git-stash" },
                { label: "git checkout", href: "/zh/commands/git-checkout", active: activeSlug === "git-checkout" },
                { label: "git rebase", href: "/zh/commands/git-rebase", active: activeSlug === "git-rebase" },
                { label: "git merge", href: "/zh/commands/git-merge", active: activeSlug === "git-merge" },
                { label: "git cherry-pick", href: "/zh/commands/git-cherry-pick", active: activeSlug === "git-cherry-pick" },
                { label: "git reset", href: "/zh/commands/git-reset", active: activeSlug === "git-reset" },
                { label: "git revert", href: "/zh/commands/git-revert", active: activeSlug === "git-revert" },
              ],
            },
          ],
        },
        {
          title: "Related Topics",
          items: [
            { label: "最佳实践", href: "/zh/best-practices" },
            { label: "fetch vs pull", href: "/zh/docs/workflows/fetch-vs-pull" },
            { label: "恢复手册", href: "/zh/docs/recovery/reflog-recovery" },
          ],
        },
      ]),
  },
  commandIndex: {
    eyebrow: "Command Hub",
    title: "Git 命令专题",
    description: "先进入命令聚合页，再按学习路径选择具体命令详情，避免在左侧菜单里直接平铺过长列表。",
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
      commandCards: 16,
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
      description: "基于 Git 官方文档与官方书中的高频问题整理出一组上手最常见的答疑。",
      action: "查看全部问题",
      items: [
        {
          question: "`git pull` 到底做了什么，为什么结果有时和我预期不同？",
          answer:
            "`git pull` 会先执行 fetch，再把上游分支整合进当前分支。官方文档说明它可以走 `--ff-only`、`--rebase`、`--no-rebase` 或 `--squash` 等不同路径，所以结果取决于你的命令参数和 `pull.rebase`、`pull.ff` 等配置。想减少意外，最稳妥的习惯仍然是先 fetch，再明确决定是 merge 还是 rebase。",
        },
        {
          question: "`git reset --soft`、`--mixed`、`--hard` 有什么本质区别？",
          answer:
            "官方手册把区别讲得很明确：`--soft` 只移动 HEAD，保留暂存区和工作区；`--mixed` 会把暂存区重置到目标提交，但保留工作区改动；`--hard` 会同时改写 HEAD、暂存区和工作区。也就是说，真正危险的是 `--hard`，因为它会直接覆盖当前文件状态。",
        },
        {
          question: "误删分支、reset 过头，或者 pull 之后后悔了，还能找回吗？",
          answer:
            "很多时候可以。Git 官方在 `git reset` 文档里专门说明了 `ORIG_HEAD` 和 reflog 的用途：reset、merge、pull 这类操作通常会留下可回溯的引用。只要对象还没被垃圾回收清理掉，通常都能先通过 reflog 找到原来的提交，再决定是新建分支还是回退引用。",
        },
        {
          question: "为什么 `git stash` 没有把我的新文件一起存起来？",
          answer:
            "因为 stash 默认保存的是已跟踪文件在工作区和暂存区中的改动。官方文档说明，如果你还想把未跟踪文件一起收进去，需要用 `git stash push -u`；如果连忽略文件也要一起处理，则使用 `-a`。另外，`git stash apply` 会保留 stash，而 `git stash pop` 会在成功应用后尝试把它移出列表。",
        },
        {
          question: "什么是 detached HEAD，遇到它是不是就出问题了？",
          answer:
            "不一定。官方 `git switch` 文档把 detached HEAD 描述成一种用于检查历史提交或做临时实验的状态，此时 HEAD 指向的是某个提交而不是分支名。它本身不是错误；如果你在这个状态下做出的提交值得保留，只要立刻新建一个分支把它接住就可以。",
        },
        {
          question: "我到底该用 merge 还是 rebase？",
          answer:
            "Git 官方书把两者都视为整合历史的正常方式：merge 会保留分叉结构，rebase 会把你的提交重新放到新的基底上，让历史更线性。但官方书也特别强调，不要 rebase 那些已经离开你本地仓库、并且别人可能已经基于它继续工作的提交。简单说，个人本地整理历史常用 rebase，已共享历史默认更安全的是 merge。",
        },
        {
          question: "为什么切换分支时 Git 拒绝我继续操作？",
          answer:
            "官方 `git switch` 文档说明，当切换分支会导致本地改动丢失时，Git 会直接中止操作。这不是故障，而是保护机制。通常你有三种稳妥处理方式：先提交、先 stash，或者在你确认可以丢弃本地改动时再显式使用 `--discard-changes`。",
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
  faqPage: {
    eyebrow: "FAQ Library",
    title: "全部常见问题",
    description: "把首页里的高频问答整理成一页更完整的 Git FAQ，方便集中阅读和后续持续扩充。",
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
    "git-fetch": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "同步远端引用，不改动工作区" },
      { label: "内容来源", value: "MDX / 官方资料提炼" },
    ],
    "git-restore": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "恢复工作区或暂存区文件" },
      { label: "内容来源", value: "MDX / 官方资料提炼" },
    ],
    "git-revert": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "通过新提交安全撤销变更" },
      { label: "内容来源", value: "MDX / 官方资料提炼" },
    ],
    "git-switch": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "切换或创建分支" },
      { label: "内容来源", value: "MDX / 官方资料提炼" },
    ],
    "git-branch": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "查看、创建、重命名分支" },
      { label: "内容来源", value: "MDX / 官方资料提炼" },
    ],
    "git-checkout": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "旧式切分支或恢复路径" },
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
          { label: "Best Practices", href: "/en/best-practices" },
          {
            label: "Git Commands",
            href: "/en/commands",
            children: [
              { label: "git fetch", href: "/en/commands/git-fetch" },
              { label: "git switch", href: "/en/commands/git-switch" },
              { label: "git branch", href: "/en/commands/git-branch" },
              { label: "git restore", href: "/en/commands/git-restore" },
              { label: "git stash", href: "/en/commands/git-stash" },
              { label: "git checkout", href: "/en/commands/git-checkout" },
              { label: "git rebase", href: "/en/commands/git-rebase" },
              { label: "git merge", href: "/en/commands/git-merge" },
              { label: "git cherry-pick", href: "/en/commands/git-cherry-pick" },
              { label: "git reset", href: "/en/commands/git-reset" },
              { label: "git revert", href: "/en/commands/git-revert" },
            ],
          },
        ],
      },
      {
        title: "Special Topics",
        items: [
          { label: "Git Internals", href: "/en/internals" },
          { label: "Git History", href: "/en/history" },
        ],
      },
      {
        title: "Resources",
        items: [
          { label: "Docs Library", href: "/en/docs" },
          { label: "FAQ", href: "/en/faq" },
        ],
      },
    ]),
    docs: (activePath) =>
      baseSidebar("en", [
        {
          title: "Learning Path",
          items: [
            { label: "All Docs", href: "/en/docs", active: activePath === "index" },
            {
              label: "Quick Start",
              href: "/en/docs/learning-path/quick-start",
              active: activePath === "learning-path/quick-start",
            },
            {
              label: "Best Practices",
              href: "/en/best-practices",
              active: activePath === "workflows/git-best-practices",
            },
            {
              label: "Git Commands",
              href: "/en/commands",
              active: activePath === "commands-index",
              children: [
                { label: "git fetch", href: "/en/commands/git-fetch", active: activePath === "commands/git-fetch" },
                { label: "git switch", href: "/en/commands/git-switch", active: activePath === "commands/git-switch" },
                { label: "git branch", href: "/en/commands/git-branch", active: activePath === "commands/git-branch" },
                { label: "git restore", href: "/en/commands/git-restore", active: activePath === "commands/git-restore" },
                { label: "git stash", href: "/en/commands/git-stash", active: activePath === "commands/git-stash" },
                { label: "git checkout", href: "/en/commands/git-checkout", active: activePath === "commands/git-checkout" },
                { label: "git rebase", href: "/en/commands/git-rebase", active: activePath === "commands/git-rebase" },
                { label: "git merge", href: "/en/commands/git-merge", active: activePath === "commands/git-merge" },
                { label: "git cherry-pick", href: "/en/commands/git-cherry-pick", active: activePath === "commands/git-cherry-pick" },
                { label: "git reset", href: "/en/commands/git-reset", active: activePath === "commands/git-reset" },
                { label: "git revert", href: "/en/commands/git-revert", active: activePath === "commands/git-revert" },
              ],
            },
          ],
        },
        {
          title: "Concepts",
          items: [
            {
              label: "Git History",
              href: "/en/history",
              active: activePath === "concepts/git-history",
            },
            {
              label: "References and HEAD",
              href: "/en/docs/concepts/refs-and-head",
              active: activePath === "concepts/refs-and-head",
            },
            {
              label: "Git Internals",
              href: "/en/internals",
              active: activePath === "concepts/git-internals",
            },
          ],
        },
        {
          title: "Recovery",
          items: [
            {
              label: "Reflog Recovery",
              href: "/en/docs/recovery/reflog-recovery",
              active: activePath === "recovery/reflog-recovery",
            },
          ],
        },
      ]),
    faq: baseSidebar("en", [
      {
        title: "Resources",
        items: [
          { label: "Docs Library", href: "/en/docs" },
          { label: "Git History", href: "/en/history" },
          { label: "FAQ", href: "/en/faq", active: true },
        ],
      },
      {
        title: "FAQ Topics",
        items: [
          { label: "pull and sync", href: "/en/faq#pull-sync" },
          { label: "reset and recovery", href: "/en/faq#reset-recovery" },
          { label: "stash and switching", href: "/en/faq#stash-switch" },
        ],
      },
    ]),
    command: (activeSlug) =>
      baseSidebar("en", [
        {
          title: "Learning Path",
          items: [
            { label: "All Docs", href: "/en/docs" },
            { label: "Quick Start", href: "/en/docs/learning-path/quick-start" },
            { label: "Best Practices", href: "/en/best-practices" },
            {
              label: "Git Commands",
              href: "/en/commands",
              children: [
                { label: "git fetch", href: "/en/commands/git-fetch", active: activeSlug === "git-fetch" },
                { label: "git switch", href: "/en/commands/git-switch", active: activeSlug === "git-switch" },
                { label: "git branch", href: "/en/commands/git-branch", active: activeSlug === "git-branch" },
                { label: "git restore", href: "/en/commands/git-restore", active: activeSlug === "git-restore" },
                { label: "git stash", href: "/en/commands/git-stash", active: activeSlug === "git-stash" },
                { label: "git checkout", href: "/en/commands/git-checkout", active: activeSlug === "git-checkout" },
                { label: "git rebase", href: "/en/commands/git-rebase", active: activeSlug === "git-rebase" },
                { label: "git merge", href: "/en/commands/git-merge", active: activeSlug === "git-merge" },
                { label: "git cherry-pick", href: "/en/commands/git-cherry-pick", active: activeSlug === "git-cherry-pick" },
                { label: "git reset", href: "/en/commands/git-reset", active: activeSlug === "git-reset" },
                { label: "git revert", href: "/en/commands/git-revert", active: activeSlug === "git-revert" },
              ],
            },
          ],
        },
        {
          title: "Related Topics",
          items: [
            { label: "Best Practices", href: "/en/best-practices" },
            { label: "fetch vs pull", href: "/en/docs/workflows/fetch-vs-pull" },
            { label: "reflog recovery", href: "/en/docs/recovery/reflog-recovery" },
          ],
        },
      ]),
  },
  commandIndex: {
    eyebrow: "Command Hub",
    title: "Git Command Topics",
    description: "Enter a dedicated command hub first, then move from the grouped overview into each command detail page.",
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
      commandCards: 16,
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
    cta: {
      eyebrow: "Git Docs",
      title: "The content library now renders directly from MDX.",
      description: "Browse the docs library, or keep expanding the same content pipeline with more Git topics.",
      action: "Open docs library",
    },
  },
  faqPage: {
    eyebrow: "FAQ Library",
    title: "All Common Questions",
    description: "A dedicated Git FAQ page that expands the homepage highlights into a fuller reading and maintenance surface.",
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
    "git-fetch": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Update remote refs without touching files" },
      { label: "Content source", value: "MDX / distilled from official docs" },
    ],
    "git-restore": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Restore working tree or index state" },
      { label: "Content source", value: "MDX / distilled from official docs" },
    ],
    "git-revert": [
      { label: "Complexity", value: "Medium to high" },
      { label: "Typical use", value: "Undo safely with a new commit" },
      { label: "Content source", value: "MDX / distilled from official docs" },
    ],
    "git-switch": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Switch or create branches" },
      { label: "Content source", value: "MDX / distilled from official docs" },
    ],
    "git-branch": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "List, create, rename, and delete branches" },
      { label: "Content source", value: "MDX / distilled from official docs" },
    ],
    "git-checkout": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Legacy branch switching and path restore" },
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
