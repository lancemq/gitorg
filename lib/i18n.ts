export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

export type CommandSlug =
  | "git-init"
  | "git-clone"
  | "git-status"
  | "git-add"
  | "git-commit"
  | "git-diff"
  | "git-show"
  | "git-log"
  | "git-rm"
  | "git-mv"
  | "git-pull"
  | "git-push"
  | "git-tag"
  | "git-remote"
  | "git-clean"
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
  | "git-checkout"
  | "git-reflog"
  | "git-bisect"
  | "git-blame";

export type BestPracticeSlug =
  | "commit-hygiene"
  | "topic-branches"
  | "fetch-first-sync"
  | "shared-history-boundaries"
  | "review-and-safe-push";

export type WorkflowSlug =
  | "fetch-vs-pull"
  | "feature-branch-collaboration"
  | "sync-before-review"
  | "hotfix-and-urgent-fixes";

export type InternalsSlug =
  | "object-database"
  | "index-and-working-tree"
  | "refs-and-head"
  | "remote-tracking-refs"
  | "commit-graph"
  | "packfiles-and-storage"
  | "reachability-and-garbage-collection";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
  children?: NavItem[];
  childGroups?: Array<{
    title: string;
    items: NavItem[];
  }>;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type SidebarContent = {
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

export type DocsSectionId =
  | "learning-path"
  | "commands"
  | "best-practices"
  | "workflows"
  | "internals"
  | "recovery"
  | "concepts";

type Dictionary = {
  sidebar: {
    docs: (activePath?: string) => SidebarContent;
  };
  commandIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  bestPracticeIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  workflowIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  internalsIndex: {
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
      overview: string;
      commands: string;
      bestPractices: string;
      workflows: string;
      internals: string;
      concepts: string;
      faq: string;
      learningPath: string;
      recovery: string;
    };
  };
  commandSlugs: readonly CommandSlug[];
  commandMeta: Record<CommandSlug, ReadonlyArray<{ label: string; value: string }>>;
};

export type SidebarSelection = { kind: "docs"; activePath?: string };

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

function buildBestPracticeNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "best-practices-index" ||
    bestPracticeSlugs.some((slug) => activePath === `best-practices/${slug}`);

  return {
    label: locale === "zh" ? "最佳实践" : "Best Practices",
    href: `/${locale}/best-practices`,
    active: parentActive,
  };
}

function buildWorkflowNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "workflows-index" ||
    workflowSlugs.some((slug) => activePath === `workflows/${slug}`);

  return {
    label: locale === "zh" ? "工作流" : "Workflows",
    href: `/${locale}/workflows`,
    active: parentActive,
  };
}

function buildInternalsNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "internals-index" ||
    internalsSlugs.some((slug) => activePath === `internals/${slug}`);

  return {
    label: locale === "zh" ? "Git 原理" : "Git Internals",
    href: `/${locale}/internals`,
    active: parentActive,
  };
}

function buildCommandNavItem(
  locale: Locale,
  activePath?: string,
): NavItem {
  const baseHref = `/${locale}/commands`;
  const isActive =
    activePath === "commands-index" ||
    commandSlugs.some((slug) => activePath === `commands/${slug}`) ||
    activePath === "recovery/reflog-recovery";

  return {
    label: locale === "zh" ? "Git 命令" : "Git Commands",
    href: baseHref,
    active: isActive,
  };
}

export const commandSlugs = [
  "git-init",
  "git-clone",
  "git-status",
  "git-add",
  "git-commit",
  "git-diff",
  "git-show",
  "git-log",
  "git-rm",
  "git-mv",
  "git-fetch",
  "git-pull",
  "git-push",
  "git-switch",
  "git-branch",
  "git-tag",
  "git-remote",
  "git-rebase",
  "git-merge",
  "git-cherry-pick",
  "git-reset",
  "git-stash",
  "git-restore",
  "git-revert",
  "git-reflog",
  "git-bisect",
  "git-blame",
  "git-checkout",
  "git-clean",
] as const;

export const basicCommandSlugs = [
  "git-init",
  "git-clone",
  "git-status",
  "git-add",
  "git-commit",
  "git-diff",
  "git-show",
  "git-log",
  "git-rm",
  "git-mv",
  "git-fetch",
  "git-pull",
  "git-push",
  "git-switch",
  "git-branch",
  "git-tag",
  "git-remote",
] as const satisfies readonly CommandSlug[];

export const advancedCommandSlugs = [
  "git-restore",
  "git-stash",
  "git-checkout",
  "git-rebase",
  "git-merge",
  "git-cherry-pick",
  "git-reset",
  "git-revert",
  "git-reflog",
  "git-bisect",
  "git-blame",
  "git-clean",
] as const satisfies readonly CommandSlug[];

export const bestPracticeSlugs = [
  "commit-hygiene",
  "topic-branches",
  "fetch-first-sync",
  "shared-history-boundaries",
  "review-and-safe-push",
] as const satisfies readonly BestPracticeSlug[];

export const workflowSlugs = [
  "fetch-vs-pull",
  "feature-branch-collaboration",
  "sync-before-review",
  "hotfix-and-urgent-fixes",
] as const satisfies readonly WorkflowSlug[];

export const internalsSlugs = [
  "object-database",
  "index-and-working-tree",
  "refs-and-head",
  "remote-tracking-refs",
  "commit-graph",
  "packfiles-and-storage",
  "reachability-and-garbage-collection",
] as const satisfies readonly InternalsSlug[];

const zhDictionary: Dictionary = {
  sidebar: {
    docs: (activePath) =>
      baseSidebar("zh", [
        {
          title: "Overview",
          items: [{ label: "总览", href: "/zh", active: !activePath || activePath === "overview" }],
        },
        {
          title: "Learning Path",
          items: [
            {
              label: "快速上手",
              href: "/zh/docs/learning-path/quick-start",
              active: activePath === "learning-path/quick-start",
            },
            buildBestPracticeNavItem("zh", activePath),
            buildWorkflowNavItem("zh", activePath),
            buildCommandNavItem("zh", activePath),
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
            buildInternalsNavItem("zh", activePath),
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "常见问题",
              href: "/zh/faq",
              active: activePath === "faq",
            },
          ],
        },
      ]),
  },
  commandIndex: {
    eyebrow: "Command Hub",
    title: "Git 命令专题",
    description: "先进入命令聚合页，再按学习路径选择具体命令详情，避免在左侧菜单里直接平铺过长列表。",
  },
  bestPracticeIndex: {
    eyebrow: "Best Practices",
    title: "Git 最佳实践频道",
    description: "把协作习惯拆成多个可独立阅读的专题，从提交质量、主题分支、同步策略，到共享历史边界与安全推送。",
  },
  workflowIndex: {
    eyebrow: "Workflows",
    title: "Git 工作流频道",
    description: "把日常协作中的关键流程拆成多个专题，包括同步策略、功能分支协作、评审前同步，以及紧急修复场景。",
  },
  internalsIndex: {
    eyebrow: "Git Internals",
    title: "Git 原理频道",
    description: "把 Git 原理拆成多个原理点专题，从对象数据库、引用与 HEAD，到提交图与 packfiles，帮助你建立更稳定的底层心智模型。",
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
      modulesTitle: "内容频道",
      modules: 0,
      modulesLabel: "当前已接入的教程频道",
      commandCardsTitle: "命令专题",
      commandCards: 0,
      exercisesTitle: "教程总数",
      exercises: 0,
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
  },
  faqPage: {
    eyebrow: "FAQ Library",
    title: "全部常见问题",
    description: "把首页里的高频问答整理成一页更完整的 Git FAQ，方便集中阅读和后续持续扩充。",
  },
  docsIndex: {
    eyebrow: "Docs Library",
    title: "文档",
    description: "首页已经直接承载全部文档聚合内容，所有教程仍然来自 content/ 目录下的 Markdown / MDX 文件。",
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
        id: "best-practices",
        eyebrow: "Best Practices",
        title: "最佳实践",
        description: "把团队协作中的高频习惯拆成多个专题单独学习。",
      },
      {
        id: "workflows",
        eyebrow: "Workflows",
        title: "工作流",
        description: "围绕日常协作流程拆出更适合团队落地的专题。",
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
      overview: "总揽",
      commands: "命令",
      bestPractices: "最佳实践",
      workflows: "工作流",
      internals: "Git 原理",
      concepts: "概念",
      faq: "常见问题",
      learningPath: "学习路径",
      recovery: "恢复手册",
    },
  },
  commandSlugs,
  commandMeta: {
    "git-rebase": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "同步主分支、整理提交" },
    ],
    "git-merge": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "整合分支历史" },
    ],
    "git-cherry-pick": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "挑选特定提交" },
    ],
    "git-reset": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "撤销、回退、取消暂存" },
    ],
    "git-stash": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "临时保存未提交改动" },
    ],
    "git-fetch": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "同步远端引用，不改动工作区" },
    ],
    "git-restore": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "恢复工作区或暂存区文件" },
    ],
    "git-revert": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "通过新提交安全撤销变更" },
    ],
    "git-reflog": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "定位引用移动历史并恢复位置" },
    ],
    "git-bisect": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "二分查找引入问题的提交" },
    ],
    "git-blame": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "追踪某行代码来自哪个提交" },
    ],
    "git-switch": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "切换或创建分支" },
    ],
    "git-branch": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "查看、创建、重命名分支" },
    ],
    "git-checkout": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "旧式切分支或恢复路径" },
    ],
    "git-init": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "初始化新仓库" },
    ],
    "git-clone": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "复制远端仓库" },
    ],
    "git-status": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "查看工作区和暂存区状态" },
    ],
    "git-add": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "把改动加入暂存区" },
    ],
    "git-commit": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "生成提交记录" },
    ],
    "git-diff": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "比较工作区、暂存区和提交差异" },
    ],
    "git-show": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "查看单个提交、标签或对象详情" },
    ],
    "git-log": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "查看提交历史" },
    ],
    "git-rm": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "删除已跟踪文件并同步删除记录" },
    ],
    "git-mv": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "重命名或移动已跟踪文件" },
    ],
    "git-pull": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "抓取并整合远端更新" },
    ],
    "git-push": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "推送本地分支到远端" },
    ],
    "git-tag": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "标记版本或发布点" },
    ],
    "git-remote": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "管理远端仓库地址" },
    ],
    "git-clean": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "清理未跟踪文件和目录" },
    ],
  },
};

const enDictionary: Dictionary = {
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
            {
              label: "Quick Start",
              href: "/en/docs/learning-path/quick-start",
              active: activePath === "learning-path/quick-start",
            },
            buildBestPracticeNavItem("en", activePath),
            buildWorkflowNavItem("en", activePath),
            buildCommandNavItem("en", activePath),
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
            buildInternalsNavItem("en", activePath),
          ],
        },
        {
          title: "Resources",
          items: [
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
    description: "Enter a dedicated command hub first, then move from the grouped overview into each command detail page.",
  },
  bestPracticeIndex: {
    eyebrow: "Best Practices",
    title: "Git Best Practices Channel",
    description: "Split collaboration habits into standalone reads covering commit quality, topic branches, sync strategy, shared-history boundaries, and safer push flows.",
  },
  workflowIndex: {
    eyebrow: "Workflows",
    title: "Git Workflows Channel",
    description: "Break collaboration flows into dedicated reads covering sync strategy, feature-branch teamwork, pre-review sync, and urgent-fix workflows.",
  },
  internalsIndex: {
    eyebrow: "Git Internals",
    title: "Git Internals Channel",
    description: "Break Git internals into focused topics spanning the object database, refs and HEAD, commit graphs, and packfiles so the model stays practical.",
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
  },
  faqPage: {
    eyebrow: "FAQ Library",
    title: "All Common Questions",
    description: "A dedicated Git FAQ page that expands the homepage highlights into a fuller reading and maintenance surface.",
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
    ],
  },
  commandPage: {
    eyebrow: "Command Reference",
    breadcrumbs: {
      overview: "Overview",
      commands: "Commands",
      bestPractices: "Best Practices",
      workflows: "Workflows",
      internals: "Git Internals",
      concepts: "Concepts",
      faq: "FAQ",
      learningPath: "Learning Path",
      recovery: "Recovery",
    },
  },
  commandSlugs,
  commandMeta: {
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
    "git-fetch": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Update remote refs without touching files" },
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
    "git-switch": [
      { label: "Complexity", value: "Basic" },
      { label: "Typical use", value: "Switch or create branches" },
    ],
    "git-branch": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "List, create, rename, and delete branches" },
    ],
    "git-checkout": [
      { label: "Complexity", value: "Medium" },
      { label: "Typical use", value: "Legacy branch switching and path restore" },
    ],
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
    "git-pull": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Fetch and integrate remote updates" },
    ],
    "git-push": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Publish local branches to a remote" },
    ],
    "git-tag": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Mark releases or named points in history" },
    ],
    "git-remote": [
      { label: "Complexity", value: "Basic to medium" },
      { label: "Typical use", value: "Manage remote repository definitions" },
    ],
    "git-clean": [
      { label: "Complexity", value: "High" },
      { label: "Typical use", value: "Remove untracked files and directories" },
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

export function getSidebarContent(locale: Locale, selection: SidebarSelection): SidebarContent {
  const dictionary = getDictionary(locale);
  return dictionary.sidebar.docs(selection.activePath);
}

export function getDocsSectionTitle(locale: Locale, sectionId: DocsSectionId) {
  const dictionary = getDictionary(locale);
  return dictionary.docsIndex.sections.find((section) => section.id === sectionId)?.title ?? "";
}
