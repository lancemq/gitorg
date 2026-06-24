import type { DocQuote, DocStat, DocCitation } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type GeoBlockProps = {
  locale: Locale;
  quotes?: DocQuote[];
  stats?: DocStat[];
  citations?: DocCitation[];
};

const labels = {
  zh: {
    quotes: "关键引语",
    stats: "数据 / 性能事实",
    citations: "引用与延伸阅读",
    sourceLabel: "出处",
    kindLabels: {
      official: "官方",
      book: "书籍",
      discussion: "讨论",
      blog: "博客",
      paper: "论文",
    },
  },
  en: {
    quotes: "Key Quotes",
    stats: "Data & Performance",
    citations: "Citations & Further Reading",
    sourceLabel: "Source",
    kindLabels: {
      official: "Official",
      book: "Book",
      discussion: "Discussion",
      blog: "Blog",
      paper: "Paper",
    },
  },
} as const;

/**
 * GEO (Generative Engine Optimization) block.
 *
 * Rendered above the article body. Surfaces structured quotes, stats, and
 * citations that the KDD '24 GEO paper (arXiv 2311.09735) identifies as the
 * highest-leverage signals for being cited by LLMs:
 *
 *   - Direct quotations: +41%
 *   - Statistics: +30%
 *   - Fluency: +28%
 *   - Cited sources: +27%
 *
 * Important properties for LLM scrapers:
 *   - <blockquote cite="..."> uses HTML semantic citation attribute
 *   - Citation list is plain <ol>/<a> with explicit text (no JS-rendered URLs)
 *   - All three sections are stable string output (no client interactivity)
 *
 * Returns null when all three arrays are empty — older articles render
 * exactly as before until they're backfilled.
 */
export function GeoBlock({ locale, quotes, stats, citations }: GeoBlockProps) {
  const hasQuotes = quotes && quotes.length > 0;
  const hasStats = stats && stats.length > 0;
  const hasCitations = citations && citations.length > 0;

  if (!hasQuotes && !hasStats && !hasCitations) {
    return null;
  }

  const t = labels[locale];

  return (
    <section className="geo-block" aria-label="Citations and source data">
      {hasStats ? (
        <div className="geo-stats">
          <h2 className="geo-block-title">{t.stats}</h2>
          <ul className="geo-stat-list">
            {stats!.map((stat, i) => (
              <li className="geo-stat" key={`${stat.value}-${i}`}>
                <strong className="geo-stat-value">{stat.value}</strong>
                <span className="geo-stat-label">{stat.label}</span>
                <span className="geo-stat-source">
                  {t.sourceLabel}:{" "}
                  {stat.url ? (
                    <a href={stat.url} rel="noopener nofollow">
                      {stat.source}
                    </a>
                  ) : (
                    stat.source
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {hasQuotes ? (
        <div className="geo-quotes">
          <h2 className="geo-block-title">{t.quotes}</h2>
          {quotes!.map((quote, i) => (
            <blockquote
              className="geo-quote"
              key={`${quote.attribution}-${i}`}
              {...(quote.url ? { cite: quote.url } : {})}
            >
              <p>{quote.text}</p>
              <footer>
                — {quote.url ? (
                  <a href={quote.url} rel="noopener nofollow">
                    {quote.attribution}
                  </a>
                ) : (
                  quote.attribution
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      ) : null}

      {hasCitations ? (
        <div className="geo-citations">
          <h2 className="geo-block-title">{t.citations}</h2>
          <ol className="geo-citation-list">
            {citations!.map((cite, i) => (
              <li className="geo-citation" key={`${cite.url}-${i}`}>
                <a href={cite.url} rel="noopener nofollow">
                  {cite.title}
                </a>{" "}
                <span className="geo-citation-kind">[{t.kindLabels[cite.kind]}]</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
