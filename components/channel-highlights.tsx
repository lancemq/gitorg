import Link from "next/link";

import type { DocCard, DocTier } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type ChannelHighlightsProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  docs: DocCard[];
};

function getTierLabel(locale: Locale, tier: DocTier) {
  if (locale === "zh") {
    return tier === "core" ? "核心" : tier === "recommended" ? "推荐" : "延伸";
  }

  return tier === "core" ? "Core" : tier === "recommended" ? "Recommended" : "Extended";
}

export function ChannelHighlights({
  locale,
  eyebrow,
  title,
  description,
  docs,
}: ChannelHighlightsProps) {
  if (!docs.length) {
    return null;
  }

  return (
    <section className="panel docs-group">
      <div className="docs-group-head">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="channel-highlight-grid">
        {docs.map((doc, index) => (
          <Link className="channel-highlight-card" href={doc.href} key={doc.href}>
            <div className="channel-highlight-kickers">
              <span className="card-kicker">
                {locale === "zh" ? `代表专题 ${String(index + 1).padStart(2, "0")}` : `Spotlight ${String(index + 1).padStart(2, "0")}`}
              </span>
              <span className={`doc-tier-badge doc-tier-${doc.tier}`}>{getTierLabel(locale, doc.tier)}</span>
            </div>
            <h3>{doc.title}</h3>
            <p>{doc.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
