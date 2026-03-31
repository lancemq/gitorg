import Link from "next/link";

import type { DocCard, DocNeighbors } from "@/lib/content";

type DocSupportProps = {
  locale: "zh" | "en";
  relatedDocs: DocCard[];
  neighbors?: DocNeighbors;
};

const labels = {
  zh: {
    related: "相关推荐",
    relatedEyebrow: "Command Radar",
    relatedDescription: "从当前命令往外扩一圈，先补最容易和它一起出现的操作与概念。",
    previous: "上一篇",
    next: "下一篇",
    sequenceEyebrow: "Reading Route",
    sequenceDescription: "按顺序继续读，理解前后命令之间的边界、衔接和节奏。",
    sequenceEmpty: "当前方向没有更多内容",
    jumpLabel: "继续阅读",
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
    relatedEyebrow: "Command Radar",
    relatedDescription: "Expand one ring outward from the current command and pick up the operations and concepts that usually travel with it.",
    previous: "Previous",
    next: "Next",
    sequenceEyebrow: "Reading Route",
    sequenceDescription: "Keep moving in sequence so the boundary and rhythm between commands stays clear.",
    sequenceEmpty: "No more reads in this direction",
    jumpLabel: "Continue",
    commandSection: "Commands",
    bestPracticesSection: "Best Practices",
    workflowsSection: "Workflows",
    internalsSection: "Git Internals",
    learningPathSection: "Learning Path",
    recoverySection: "Recovery",
    conceptsSection: "Concepts",
  },
} as const;

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
            <p className="eyebrow">{copy.relatedEyebrow}</p>
            <h2>{copy.related}</h2>
            <p>{copy.relatedDescription}</p>
          </div>
          <div className="doc-related-grid">
            {relatedDocs.map((doc, index) => (
              <Link className="doc-related-card" href={doc.href} key={doc.href}>
                <div className="doc-related-topline">
                  <span className="doc-related-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="doc-related-tag">{getSectionLabel(locale, doc.section)}</span>
                </div>
                <div className="doc-related-copy">
                  <h3>{doc.title}</h3>
                  <p>{doc.summary}</p>
                </div>
                <span className="doc-related-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {neighbors?.prev || neighbors?.next ? (
        <section className="panel doc-sequence">
          <div className="docs-group-head doc-support-head">
            <p className="eyebrow">{copy.sequenceEyebrow}</p>
            <h2>{locale === "zh" ? "上下篇路线" : "Previous / Next Route"}</h2>
            <p>{copy.sequenceDescription}</p>
          </div>
          <div className="sequence-grid">
            {neighbors?.prev ? (
              <Link className="sequence-card sequence-card-prev" href={neighbors.prev.href}>
                <div className="sequence-head">
                  <span>{copy.previous}</span>
                  <em>{getSectionLabel(locale, neighbors.prev.section)}</em>
                </div>
                <strong>{neighbors.prev.title}</strong>
                <p>{neighbors.prev.summary}</p>
                <span className="sequence-jump">{copy.jumpLabel} →</span>
              </Link>
            ) : (
              <div className="sequence-card is-empty">
                <span>{copy.previous}</span>
                <strong>{copy.sequenceEmpty}</strong>
              </div>
            )}
            {neighbors?.next ? (
              <Link className="sequence-card sequence-card-next" href={neighbors.next.href}>
                <div className="sequence-head">
                  <span>{copy.next}</span>
                  <em>{getSectionLabel(locale, neighbors.next.section)}</em>
                </div>
                <strong>{neighbors.next.title}</strong>
                <p>{neighbors.next.summary}</p>
                <span className="sequence-jump">{copy.jumpLabel} →</span>
              </Link>
            ) : (
              <div className="sequence-card is-empty">
                <span>{copy.next}</span>
                <strong>{copy.sequenceEmpty}</strong>
              </div>
            )}
          </div>
        </section>
      ) : null}
    </>
  );
}
