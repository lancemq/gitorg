import Link from "next/link";

import type { DocCard } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type LearningPathMetaProps = {
  locale: Locale;
  /** 1-based step number from frontmatter. When undefined, renders nothing. */
  step?: number;
  /** Total steps in the learning path (constant 11 today). */
  total?: number;
  /** Next article in the series, from getDocNeighbors. */
  next?: DocCard;
};

const TOTAL_LEARNING_PATH_STEPS = 11;

const copy = {
  zh: {
    stepLabel: "学习路径",
    stepOf: (n: number, total: number) => `第 ${n} 步 / 共 ${total} 步`,
    nextTitle: "下一步学什么",
    finishLabel: "你已完成新手路径",
    finishBody: "接下来可以进入工作流频道，把单人操作扩展到团队协作。",
    finishCta: "前往工作流频道",
  },
  en: {
    stepLabel: "Learning Path",
    stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
    nextTitle: "What to learn next",
    finishLabel: "You finished the starter path",
    finishBody: "Move on to the workflows channel to extend solo Git into team collaboration.",
    finishCta: "Go to workflows",
  },
} as const;

/**
 * Learning-path step badge + "what's next" card.
 *
 * Rendered at the top of learning-path articles (via DocTemplate) when the
 * article's frontmatter sets `step`. The badge gives learners a sense of
 * progress (Step 3 of 11); the next-step card improves completion rate and
 * dwell time — both correlate with Google's helpful-content ranking signals.
 *
 * Returns null for non-learning-path articles (step undefined).
 */
export function LearningPathMeta({
  locale,
  step,
  total = TOTAL_LEARNING_PATH_STEPS,
  next,
}: LearningPathMetaProps) {
  if (typeof step !== "number") return null;
  const t = copy[locale];
  const isFinal = step >= total;

  return (
    <div className="learning-path-meta">
      <p className="lp-step-badge">
        <span className="lp-step-label">{t.stepLabel}</span>
        <span className="lp-step-count">{t.stepOf(step, total)}</span>
      </p>

      {isFinal ? (
        <div className="lp-next-card lp-next-card-finish">
          <strong>{t.finishLabel}</strong>
          <p>{t.finishBody}</p>
          <Link href={`/${locale}/workflows`} className="lp-next-cta">
            {t.finishCta} →
          </Link>
        </div>
      ) : next ? (
        <div className="lp-next-card">
          <p className="lp-next-title">{t.nextTitle}</p>
          <Link href={`/${locale}/learning-path/${next.slug}`} className="lp-next-link">
            <span className="lp-next-step">Step {step + 1}</span>
            <span className="lp-next-name">{next.title}</span>
            <span className="lp-next-arrow">→</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
