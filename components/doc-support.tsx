import Link from "next/link";

import type { DocCard, DocNeighbors, DocTier } from "@/lib/content";

type DocSupportProps = {
  locale: "zh" | "en";
  relatedDocs: DocCard[];
  neighbors?: DocNeighbors;
};

const labels = {
  zh: {
    related: "相关推荐",
    relatedDescription: "当前命令的延伸阅读。",
    previous: "上一篇",
    next: "下一篇",
    sequenceDescription: "按顺序继续阅读。",
    sequenceEmpty: "当前方向没有更多内容",
    jumpLabel: "查看",
    commandSection: "命令专题",
    bestPracticesSection: "最佳实践",
    workflowsSection: "工作流",
    internalsSection: "Git 原理",
    learningPathSection: "学习路径",
    recoverySection: "恢复手册",
    conceptsSection: "核心概念",
  },
  en: {
    related: "Related Reads",
    relatedDescription: "Reads connected to this command.",
    previous: "Previous",
    next: "Next",
    sequenceDescription: "Continue in order.",
    sequenceEmpty: "No more reads in this direction",
    jumpLabel: "Open",
    commandSection: "Commands",
    bestPracticesSection: "Best Practices",
    workflowsSection: "Workflows",
    internalsSection: "Git Internals",
    learningPathSection: "Learning Path",
    recoverySection: "Recovery",
    conceptsSection: "Concepts",
  },
} as const;

function getTierLabel(locale: "zh" | "en", tier: DocTier) {
  if (locale === "zh") {
    return tier === "core" ? "核心" : tier === "recommended" ? "推荐" : "延伸";
  }

  return tier === "core" ? "Core" : tier === "recommended" ? "Recommended" : "Extended";
}

function getSectionLabel(locale: "zh" | "en", section: DocCard["section"]) {
  const copy = labels[locale];

  switch (section) {
    case "commands":
      return copy.commandSection;
    case "best-practices":
      return copy.bestPracticesSection;
    case "workflows":
      return copy.workflowsSection;
    case "internals":
      return copy.internalsSection;
    case "learning-path":
      return copy.learningPathSection;
    case "recovery":
      return copy.recoverySection;
    case "concepts":
      return copy.conceptsSection;
    default:
      return copy.commandSection;
  }
}

export function DocSupport({ locale, relatedDocs, neighbors }: DocSupportProps) {
  const copy = labels[locale];

  if (!relatedDocs.length && !neighbors?.prev && !neighbors?.next) {
    return null;
  }

  return (
    <>
      {relatedDocs.length ? (
        <section className="panel doc-related">
          <div className="docs-group-head doc-support-head">
            <h2>{copy.related}</h2>
          </div>
          <div className="doc-related-grid">
            {relatedDocs.map((doc) => (
              <Link className="doc-related-card" href={doc.href} key={doc.href}>
                <div className="doc-related-tags">
                  <span className="doc-related-tag">{getSectionLabel(locale, doc.section)}</span>
                  <span className={`doc-tier-badge doc-tier-${doc.tier}`}>{getTierLabel(locale, doc.tier)}</span>
                </div>
                <strong className="doc-related-title">{doc.title}</strong>
                <span className="doc-related-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {neighbors?.prev || neighbors?.next ? (
        <section className="panel doc-sequence">
          <div className="docs-group-head doc-support-head">
            <h2>{locale === "zh" ? "上下篇" : "Previous / Next"}</h2>
          </div>
          <div className="sequence-grid">
            {neighbors?.prev ? (
              <Link className="sequence-card sequence-card-prev" href={neighbors.prev.href}>
                <span className="sequence-label">{copy.previous}</span>
                <strong>{neighbors.prev.title}</strong>
                <em>{getSectionLabel(locale, neighbors.prev.section)}</em>
                <span className="sequence-jump" aria-hidden="true">
                  ←
                </span>
              </Link>
            ) : (
              <div className="sequence-card is-empty">
                <span className="sequence-label">{copy.previous}</span>
                <strong>{copy.sequenceEmpty}</strong>
              </div>
            )}
            {neighbors?.next ? (
              <Link className="sequence-card sequence-card-next" href={neighbors.next.href}>
                <span className="sequence-label">{copy.next}</span>
                <strong>{neighbors.next.title}</strong>
                <em>{getSectionLabel(locale, neighbors.next.section)}</em>
                <span className="sequence-jump" aria-hidden="true">
                  →
                </span>
              </Link>
            ) : (
              <div className="sequence-card is-empty">
                <span className="sequence-label">{copy.next}</span>
                <strong>{copy.sequenceEmpty}</strong>
              </div>
            )}
          </div>
        </section>
      ) : null}
    </>
  );
}
