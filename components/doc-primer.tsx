import type { DocPrimer } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type DocPrimerProps = {
  locale: Locale;
  primer: DocPrimer;
};

const copy = {
  zh: {
    audience: "适合谁看",
    prerequisites: "前置知识",
    risks: "常见风险",
  },
  en: {
    audience: "Who This Is For",
    prerequisites: "Prerequisites",
    risks: "Common Risks",
  },
} as const;

export function DocPrimer({ locale, primer }: DocPrimerProps) {
  const labels = copy[locale];

  return (
    <section className="panel doc-primer" aria-label={locale === "zh" ? "阅读判断入口" : "Reading primer"}>
      <article className="doc-primer-card">
        <span className="doc-primer-label">{labels.audience}</span>
        <ul>
          {primer.audience.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
      <article className="doc-primer-card">
        <span className="doc-primer-label">{labels.prerequisites}</span>
        <ul>
          {primer.prerequisites.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
      <article className="doc-primer-card">
        <span className="doc-primer-label">{labels.risks}</span>
        <ul>
          {primer.risks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
