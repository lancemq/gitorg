#!/usr/bin/env node
/**
 * Fix templated teaching blocks + duplicate reading sections.
 *
 * Passes (default: all):
 *   --pass=dup        remove duplicate mid-article reading sections
 *                     (zh: first "## 延伸阅读" when it appears twice;
 *                      en: "## Related reading" when "## Further reading"
 *                      also exists, or "Further reading" twice)
 *   --pass=goals      rebuild "学完这篇你会掌握什么" / "What you will learn"
 *                     by dropping title-echo boilerplate bullets and adding
 *                     content-derived ones
 *   --pass=problem    rewrite boilerplate "先想一个问题" / "Start with a
 *                     problem" with article-specific copy
 *   --pass=exercises  rewrite template "给你的练习" / "Try it yourself"
 *
 * Every rewrite is deterministic (hash-picked variants) and anchored to
 * article content: the real git command(s), the real section headings,
 * the one-liner summary. No cross-article identical blocks remain.
 *
 * Usage:
 *   node scripts/fix-teaching-blocks.mjs             # apply all passes
 *   node scripts/fix-teaching-blocks.mjs --dry-run   # preview only
 *   node scripts/fix-teaching-blocks.mjs --pass=dup  # single pass
 */

import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const DRY_RUN = process.argv.includes("--dry-run");
const passArg = process.argv.find((a) => a.startsWith("--pass="));
const passes = passArg
  ? new Set(passArg.split("=")[1].split(","))
  : new Set(["dup", "goals", "problem", "exercises"]);

const CONTENT_DIR = path.join(root, "content");

// ---------------------------------------------------------------------------
// Section heading vocabulary
// ---------------------------------------------------------------------------
const H = {
  zh: {
    goals: "学完这篇你会掌握什么",
    problem: "先想一个问题",
    oneliner: "一句话理解",
    exercises: "给你的练习",
    reading: "延伸阅读",
  },
  en: {
    goals: "What you will learn",
    problem: "Start with a problem",
    oneliner: "The short version",
    exercises: "Try it yourself",
    reading: "Further reading",
  },
};
const RELATED_READING = "Related reading";
const GENERIC_HEADINGS = new Set([
  ...Object.values(H.zh),
  ...Object.values(H.en),
  RELATED_READING,
  "跟着做一遍",
  "图例理解",
  "Diagram view",
  "Walk through it",
]);

// ---------------------------------------------------------------------------
// Boilerplate detectors (exact-ish phrase anchors)
// ---------------------------------------------------------------------------
const ZH_PROBLEM_BOILERPLATE = [
  "你正在 Git 仓库里工作，遇到了一个具体的操作需求",
  "你和团队正在协作一个项目，分支越来越多",
  "你的团队在 Git 使用上积累了一些习惯",
  "你每天都在用 Git 命令，但偶尔会遇到一些 '奇怪' 的行为",
  "你每天都在用 Git 命令，但偶尔会遇到一些 '奇怪' 的行为",
  "你在使用 Git 的过程中遇到了一个概念问题",
  "你刚刚在 Git 里做了一个操作",
  "你已经在用 GitHub 或 GitLab 托管代码",
  "你的团队正在引入 CI/CD，或者你正在配置 IDE 中的 Git 集成",
  "你的 Git 仓库越来越大，clone 越来越慢",
  "你的团队正在从其他版本控制系统迁移到 Git",
  "你担心 Git 仓库的安全",
  "你在选择或配置 Git 托管方案",
  "When you're new to Git, the hardest part",
];
const EN_PROBLEM_BOILERPLATE = [
  "You're working in a Git repository and need to perform a specific task",
  "Your team is collaborating on a project, branches are growing",
  "Your team has developed some Git habits over time",
  "You use Git commands daily, but occasionally encounter 'strange' behavior",
  "You've encountered a conceptual question while using Git",
  "You just ran a Git command and the result wasn't what you expected",
  "You're already using GitHub or GitLab to host code",
  "Your team is adopting CI/CD pipelines",
  "Your Git repository keeps growing, clones are getting slower",
  "Your team is migrating from another version control system",
  "You're concerned about Git repository security",
  "You're choosing or configuring a Git hosting solution",
  "When you're new to Git, the hardest part",
];

const ZH_EXERCISE_ANCHORS = [
  "在一个测试仓库中练习该命令的基本用法",
  "尝试该命令的不同参数选项",
  "模拟一个需要使用该命令的实际场景",
];
const EN_EXERCISE_ANCHORS = [
  "in a test repository and observe state changes",
  "Experiment with different options and compare the output",
  "Simulate a real scenario where you would need to use this",
];

const ZH_GOAL_BOILERPLATE_RE = [
  /^- (?:理解|掌握) .*(?:的核心作用和适用场景|的基本用法和常用参数)$/,
  /^- (?:理解|知道) (?:什么时候|在什么场景|什么场景)/,
  /^- (?:理解|掌握) (?:基本示例|图例理解) 相关/,
  /^- 知道在什么场景下使用该命令，什么场景下避免使用$/,
  /^- (?:理解|解释) .*教程 的/,
];
const EN_GOAL_BOILERPLATE_RE = [
  /^- Understand the core purpose of .+ Tutorial$/i,
  /^- Master the basic usage and common options of .+ Tutorial$/i,
  /^- Know when to use this feature and when to avoid it$/i,
  /^- Understand key concepts: /i,
  /^- Understand (?:key concepts|when it is a good fit)/i,
  /^- Master .* related operations$/i,
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  return h;
}
const pick = (arr, seed) => arr[hash(seed) % arr.length];

function splitHead(source) {
  const m = source.match(/export const metadata = \{[\s\S]*?\n\};/);
  if (!m) return null;
  return { head: source.slice(0, m[0].length), body: source.slice(m[0].length) };
}

function metaField(head, key) {
  return head.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1] ?? "";
}

/** Split body into {h2|null, lines[]} segments in order. */
function segmentBody(body) {
  const lines = body.split("\n");
  const segments = [];
  let current = { heading: null, lines: [] };
  for (const line of lines) {
    const m = line.match(/^## (.+?)\s*$/);
    if (m) {
      segments.push(current);
      current = { heading: m[1], lines: [line] };
    } else {
      current.lines.push(line);
    }
  }
  segments.push(current);
  return segments;
}

function segmentText(seg) {
  return seg.lines.join("\n").trim();
}

function rebuildSegments(segments) {
  // Join verbatim — never strip leading newlines or we glue `};` to the H1.
  return segments.map((s) => s.lines.join("\n")).join("\n");
}

// CJK–space–CJK looks wrong in Chinese prose; drop the space when both
// sides are CJK (topic names pasted into generated sentences).
function tidyCjkSpacing(text) {
  return text.replace(/([\u4e00-\u9fff]) ([\u4e00-\u9fff])/g, "$1$2");
}

const INJECT_MARKER = "{/* internal-links:auto */}";

function extractOneLiner(segments, locale) {
  const seg = segments.find((s) => s.heading === H[locale].oneliner);
  if (!seg) return "";
  const text = segmentText(seg)
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#") && !l.startsWith("<"))
    .join(" ")
    .replace(/[#*`>[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  // First sentence-ish chunk
  const m = text.match(/^(.{10,90}?[。.!])/);
  return m ? m[1] : text.slice(0, 80);
}

function extractGitCommands(body, slug) {
  const counts = new Map();
  for (const m of body.matchAll(/git\s+([a-z][a-z0-9-]*)/g)) {
    const cmd = m[1];
    if (["config", "--global", "version", "status", "log"].includes(cmd)) continue;
    counts.set(cmd, (counts.get(cmd) ?? 0) + 1);
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 3).map(([c]) => `git ${c}`);
}

function contentHeadings(segments) {
  return segments
    .map((s) => s.heading)
    .filter((h) => h && !GENERIC_HEADINGS.has(h));
}

function misconceptionHeading(headings, locale) {
  const names =
    locale === "zh"
      ? ["常见误区", "最常见的误区", "常见误解"]
      : ["Common misconceptions", "What to watch most closely", "Common mistakes"];
  return headings.find((h) => names.some((n) => h.includes(n)));
}

// ---------------------------------------------------------------------------
// Content generators (locale-aware, article-anchored, variant-rotated)
// ---------------------------------------------------------------------------
function buildGoals(article) {
  const { locale, topic, cmd, headings, seed } = article;
  if (locale === "zh") {
    const sets = [
      [
        `- 说清 ${topic} 解决的实际问题和适用边界`,
        cmd
          ? `- 跟着正文把 \`${cmd}\` 的关键用法完整跑一遍，理解每一步改动了什么`
          : `- 跟着正文的${headings[0] ? "「" + headings[0] + "」" : "核心部分"}动手走一遍，理解每一步改动了什么`,
        `- 知道 ${topic} 最容易踩的误区，以及出问题时的第一步排查动作`,
      ],
      [
        `- 建立 ${topic} 的完整心智模型，而不是只记住零散命令`,
        `- 在测试仓库里亲手复现正文里的核心场景，观察前后状态差异`,
        `- 能用自己的话讲清楚什么时候该用 ${topic}、什么时候不该`,
      ],
      [
        `- 理解 ${topic} 在日常 Git 工作流里的位置和作用`,
        headings[1]
          ? `- 对照正文把「${headings[0]}」和「${headings[1]}」两个部分各操作一遍`
          : `- 对照正文把核心章节操作一遍，观察前后状态差异`,
        `- 遇到 ${topic} 相关的报错或异常输出时，知道从哪里开始排查`,
      ],
    ];
    return pick(sets, seed).join("\n");
  }
  const sets = [
    [
      `- Explain what problem ${topic} solves and where it applies`,
      cmd
        ? `- Walk through the key usages of \`${cmd}\` and understand what each step changes`
        : `- Walk through the core scenario hands-on and observe state changes`,
      `- Recognize the most common pitfalls with ${topic} and the first thing to check when something goes wrong`,
    ],
    [
      `- Build a complete mental model of ${topic} instead of memorizing commands`,
      `- Reproduce the core scenario in a test repository and compare before/after state`,
      `- Explain in your own words when ${topic} is the right tool and when it is not`,
    ],
    [
      `- Understand where ${topic} fits in the daily Git workflow`,
      headings[1]
        ? `- Work through both "${headings[0]}" and "${headings[1]}" sections hands-on`
        : `- Work through the core section hands-on and compare before/after state`,
      `- Know where to start debugging when ${topic} produces unexpected output`,
    ],
  ];
  return pick(sets, seed).join("\n");
}

function buildProblem(article) {
  const { locale, topic, section, cmd, seed } = article;
  if (locale === "zh") {
    const bySection = {
      commands: [
        `下次在终端里准备敲 \`${cmd ?? "git ..."}\` 之前，先停一秒：这条命令会碰到工作区、暂存区，还是直接改写历史？如果它的输出和你预期的不一样，第一步该检查什么？——这篇就是帮你把 ${topic} 的边界和风险想清楚，再动手。`,
        `很多 Git 事故复盘到最后，发现根源都是"对 ${topic} 一知半解就上了手"。你真的说得清 \`${cmd ?? topic}\` 会改变什么、不会改变什么吗？如果不确定，先花几分钟把这篇看完。`,
      ],
      workflows: [
        `想象一个场景：团队里每个人处理 ${topic} 的方式都不一样——有人凭经验，有人照着老 Wiki，有人直接问群里。出了问题时没人说得清哪一步出了偏差。这篇要解决的就是这个：把 ${topic} 变成全团队可复用的固定节奏。`,
        `你照着网上的教程做过一次 ${topic}，当时没问题；换了个项目、多了几个同事之后，同样的流程开始频繁出岔子。问题不在教程，而在于你没有把 ${topic} 的适用前提和边界条件想清楚——这篇帮你补上这一块。`,
      ],
      recovery: [
        `手滑已经发生了：命令敲完，终端输出和你预期完全不一样。这时候最怕的不是损失本身，而是慌乱中再补一刀，把能恢复的现场也毁了。这篇帮你提前想清楚 ${topic} 场景下的恢复路径——先做什么、再做什么、绝对不要做什么。`,
        `有人把 ${topic} 搞砸后顺利恢复了，有人同样的问题却丢了一周的提交——差别只在于前者知道 Git 在本地留了哪些"后悔药"。你属于哪一种？看完这篇再回答。`,
      ],
      internals: [
        `你每天都在用 Git，但如果面试官问"Git 在 ${topic} 这一层到底做了什么"，你能答上来吗？大多数人的理解停留在"能跑通就行"。这篇往下挖一层，把 ${topic} 的机制讲透——理解了机制，那些"奇怪的行为"就都不奇怪了。`,
      ],
    };
    const generic = [
      `关于 ${topic}，你的理解可能停留在"知道怎么操作"，但说不清它为什么这样设计、边界在哪里。恰恰是这些说不清的地方，最容易在关键时刻出问题。这篇把 ${topic} 从"会用"推进到"理解"。`,
      `你或者你的团队可能已经在用 ${topic} 了——但用法对不对？有没有踩在边界上？这篇带你把 ${topic} 的前提、边界和常见误用重新过一遍，很多隐患在变成事故之前就能排掉。`,
    ];
    return pick(bySection[section] ?? generic, seed);
  }
  const bySection = {
    commands: [
      `Next time you're about to type \`${cmd ?? "git ..."}\`, pause for a second: does this command touch the working tree, the index, or rewrite history? If the output surprises you, what do you check first? This article clears up the boundaries and risks of ${topic} before you act.`,
      `Many Git incident post-mortems trace back to "using ${topic} with half an understanding". Can you clearly state what \`${cmd ?? topic}\` changes and what it leaves untouched? If not, spend a few minutes here first.`,
    ],
    workflows: [
      `Picture this: everyone on the team handles ${topic} differently — some by gut feeling, some by an old wiki page, some by asking in chat. When something breaks, nobody can pinpoint which step went wrong. This article turns ${topic} into a rhythm the whole team can reuse.`,
    ],
    recovery: [
      `The mistake already happened: the command ran, the output looks wrong. The real danger isn't the loss itself — it's panic-follow-ups that destroy the recoverable state. This article walks the recovery path for ${topic} ahead of time: what to do first, what next, and what never to do.`,
    ],
    internals: [
      `You use Git every day — but could you explain what Git actually does at the ${topic} layer? Most people stop at "it works". This article digs one level deeper; once you understand the mechanics, the "weird behaviors" stop being weird.`,
    ],
  };
  const generic = [
    `Your understanding of ${topic} may stop at "I know how to run it" — but not why it's designed this way or where its boundaries are. Those blurry spots are exactly where things break. This article moves you from "can use" to "understands" ${topic}.`,
  ];
  return pick(bySection[section] ?? generic, seed);
}

function buildExercises(article) {
  const { locale, topic, cmd, seed, miscHeading } = article;
  const miscRef = miscHeading
    ? locale === "zh"
      ? `（参考「${miscHeading}」一节）`
      : ` (see the "${miscHeading}" section)`
    : "";
  if (locale === "zh") {
    const sets = [
      [
        `1. 在测试仓库里把${cmd ? `\`${cmd}\`` : topic}的核心用法完整跑一遍，每一步前后用 \`git status\` 和 \`git log\` 对照状态变化`,
        `2. 故意制造一次文中提到的典型失误${miscRef}，再按正文思路把现场恢复回去`,
        `3. 把 ${topic} 的"适用 / 不适用"场景写成不超过 5 条的笔记，放进你的团队 Wiki`,
      ],
      [
        `1. 不看正文，凭记忆在测试仓库里完成${cmd ? `\`${cmd}\`` : topic}的主流程，再对照正文找漏掉的步骤`,
        `2. 针对文中提到的风险场景做一次演练${miscRef}，记录你实际遇到的输出和正文的差异`,
        `3. 下次团队里有人踩到 ${topic} 相关的坑，试着用这篇的内容帮他排查一次`,
      ],
      [
        `1. 按正文把${cmd ? `\`${cmd}\`` : topic}在测试仓库里走一遍，重点观察它对工作区、暂存区和历史分别做了什么`,
        `2. 把 ${topic} 和它最容易混淆的相邻命令做一次对比实验，用 \`git log --graph\` 记录两者的差异`,
        `3. 写一段 3 句话的总结，讲清 ${topic} 最关键的一条安全边界，存进你的片段库`,
      ],
    ];
    return pick(sets, seed).join("\n");
  }
  const sets = [
    [
      `1. Run the core usage of ${cmd ? `\`${cmd}\`` : topic} in a test repository, checking \`git status\` and \`git log\` before and after every step`,
      `2. Deliberately trigger one of the mistakes described in the article${miscRef}, then recover following the article's steps`,
      `3. Write a five-bullet note on when ${topic} applies and when it doesn't, and add it to your team wiki`,
    ],
    [
      `1. Without looking at the article, complete the main ${cmd ? `\`${cmd}\`` : topic} flow from memory, then compare against the article for missed steps`,
      `2. Rehearse one of the risk scenarios${miscRef} and note where your actual output differs from what the article describes`,
      `3. Next time a teammate hits a ${topic} issue, walk them through the diagnosis using this article`,
    ],
    [
      `1. Walk through ${cmd ? `\`${cmd}\`` : topic} in a test repository, paying attention to what it changes in the working tree, the index, and history respectively`,
      `2. Run a comparison experiment between ${topic} and its most easily confused neighbor command, recording the difference with \`git log --graph\``,
      `3. Write a three-sentence summary of the single most important safety boundary of ${topic}`,
    ],
  ];
  return pick(sets, seed).join("\n");
}

// ---------------------------------------------------------------------------
// Pass implementations
// ---------------------------------------------------------------------------
function fixDuplicateReading(body, locale) {
  const segments = segmentBody(body);
  const headingNames = segments.map((s) => s.heading);
  const reading = H[locale].reading;
  const readingCount = headingNames.filter((h) => h === reading).length;
  const relatedCount = headingNames.filter((h) => h === RELATED_READING).length;

  let removeIdx = -1;
  if (locale === "zh" && readingCount > 1) {
    removeIdx = headingNames.indexOf(reading);
  } else if (locale === "en") {
    if (readingCount > 1) {
      removeIdx = headingNames.indexOf(reading);
    } else if (relatedCount > 0 && readingCount > 0) {
      removeIdx = headingNames.indexOf(RELATED_READING);
    }
  }
  if (removeIdx === -1) return { body, removed: false };

  const removed = segments[removeIdx];
  segments.splice(removeIdx, 1);
  return { body: rebuildSegments(segments), removed: true, preview: segmentText(removed).slice(0, 120) };
}

function rewriteSection(segments, headingName, newContent) {
  const idx = segments.findIndex((s) => s.heading === headingName);
  if (idx === -1) return false;
  segments[idx].lines = [`## ${headingName}`, "", newContent, ""];
  return true;
}

function fixGoals(body, locale, article) {
  const segments = segmentBody(body);
  const seg = segments.find((s) => s.heading === H[locale].goals);
  if (!seg) return { body, changed: false };
  const bullets = segmentText(seg)
    .split("\n")
    .filter((l) => l.trim().startsWith("-"));
  const regexes = locale === "zh" ? ZH_GOAL_BOILERPLATE_RE : EN_GOAL_BOILERPLATE_RE;
  const kept = bullets.filter((b) => !regexes.some((re) => re.test(b.trim())));
  if (kept.length === bullets.length) return { body, changed: false };
  let final = kept;
  if (final.length < 3) {
    const generated = buildGoals(article).split("\n");
    final = [...final, ...generated].slice(0, Math.max(3, kept.length + 1));
  }
  // Dedupe, keep order
  final = [...new Set(final)];
  rewriteSection(segments, H[locale].goals, final.join("\n"));
  return { body: rebuildSegments(segments), changed: true };
}

function fixProblem(body, locale, article) {
  const segments = segmentBody(body);
  const seg = segments.find((s) => s.heading === H[locale].problem);
  if (!seg) return { body, changed: false };
  const text = segmentText(seg);
  const anchors = locale === "zh" ? ZH_PROBLEM_BOILERPLATE : EN_PROBLEM_BOILERPLATE;
  const isBoilerplate = anchors.some((a) => text.includes(a));
  if (!isBoilerplate) return { body, changed: false };
  rewriteSection(segments, H[locale].problem, tidyCjkSpacing(buildProblem(article)));
  return { body: rebuildSegments(segments), changed: true };
}

function fixExercises(body, locale, article) {
  const segments = segmentBody(body);
  const seg = segments.find((s) => s.heading === H[locale].exercises);
  if (!seg) return { body, changed: false };
  const text = segmentText(seg);
  const anchors = locale === "zh" ? ZH_EXERCISE_ANCHORS : EN_EXERCISE_ANCHORS;
  const hits = anchors.filter((a) => text.includes(a)).length;
  if (hits < 2) return { body, changed: false };
  // Preserve the internal-links:auto marker if it lives inside this section
  // (it usually sits right after the exercise list, before the next heading).
  const hadMarker = seg.lines.join("\n").includes(INJECT_MARKER);
  let content = tidyCjkSpacing(buildExercises(article));
  if (hadMarker) content += `\n\n${INJECT_MARKER}`;
  rewriteSection(segments, H[locale].exercises, content);
  return { body: rebuildSegments(segments), changed: true };
}

// ---------------------------------------------------------------------------
// Driver
// ---------------------------------------------------------------------------
async function collectMdxFiles() {
  const files = [];
  for (const locale of ["zh", "en"]) {
    const localeRoot = path.join(CONTENT_DIR, locale);
    async function walk(dir) {
      for (const e of await fs.readdir(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) await walk(full);
        else if (e.name.endsWith(".mdx")) files.push({ locale, file: full });
      }
    }
    await walk(localeRoot);
  }
  return files;
}

const stats = { dup: 0, goals: 0, problem: 0, exercises: 0, total: 0 };

for (const { locale, file } of await collectMdxFiles()) {
  let source = await fs.readFile(file, "utf8");
  const parts = splitHead(source);
  if (!parts) continue;
  const original = source;
  const { head } = parts;
  let body = parts.body;

  const title = metaField(head, "title");
  const section = metaField(head, "section");
  const slug = metaField(head, "slug");
  const topic = title
    .replace(/\s*(教程|Tutorial|深入|Deep Dive)\s*$/i, "")
    .replace(/git-/, "git ")
    .trim();
  const seed = `${locale}/${slug}`;

  const preSegments = segmentBody(body);
  const article = {
    locale,
    section,
    slug,
    topic,
    cmd: extractGitCommands(body, slug)[0],
    headings: contentHeadings(preSegments),
    miscHeading: misconceptionHeading(contentHeadings(preSegments), locale),
    seed,
  };

  const log = [];

  if (passes.has("dup")) {
    const r = fixDuplicateReading(body, locale);
    if (r.removed) {
      body = r.body;
      stats.dup += 1;
      log.push(`dup-reading removed: ${r.preview}…`);
    }
  }

  if (passes.has("goals")) {
    const r = fixGoals(body, locale, article);
    if (r.changed) {
      body = r.body;
      stats.goals += 1;
      log.push("goals rewritten");
    }
  }

  if (passes.has("problem")) {
    const r = fixProblem(body, locale, article);
    if (r.changed) {
      body = r.body;
      stats.problem += 1;
      log.push("problem rewritten");
    }
  }

  if (passes.has("exercises")) {
    const r = fixExercises(body, locale, article);
    if (r.changed) {
      body = r.body;
      stats.exercises += 1;
      log.push("exercises rewritten");
    }
  }

  if (log.length > 0) {
    stats.total += 1;
    const next = head + body;
    const rel = path.relative(root, file);
    console.log(`[${locale}] ${rel}`);
    for (const l of log) console.log(`   - ${l}`);
    if (!DRY_RUN) {
      await fs.writeFile(file, next, "utf8");
    }
  }
  void original;
}

console.log("\nSummary" + (DRY_RUN ? " (dry-run)" : "") + ":");
for (const k of ["dup", "goals", "problem", "exercises"]) {
  console.log(`  ${k}: ${stats[k]}`);
}
console.log(`  files touched: ${stats.total}`);
