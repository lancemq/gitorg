import Link from "next/link";

import type { DocCard } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type ChannelHighlightsProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  docs: DocCard[];
};

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
            <span className="card-kicker">
              {locale === "zh" ? `代表专题 ${String(index + 1).padStart(2, "0")}` : `Spotlight ${String(index + 1).padStart(2, "0")}`}
            </span>
            <h3>{doc.title}</h3>
            <p>{doc.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
