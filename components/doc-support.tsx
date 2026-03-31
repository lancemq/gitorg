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
    previous: "上一篇",
    next: "下一篇",
  },
  en: {
    related: "Related Reads",
    previous: "Previous",
    next: "Next",
  },
} as const;

export function DocSupport({ locale, relatedDocs, neighbors }: DocSupportProps) {
  const copy = labels[locale];

  if (!relatedDocs.length && !neighbors?.prev && !neighbors?.next) {
    return null;
  }

  return (
    <>
      {relatedDocs.length ? (
        <section className="panel doc-related">
          <div className="docs-group-head">
            <h2>{copy.related}</h2>
          </div>
          <div className="docs-list">
            {relatedDocs.map((doc) => (
              <Link className="docs-card" href={doc.href} key={doc.href}>
                <h3>{doc.title}</h3>
                <p>{doc.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {neighbors?.prev || neighbors?.next ? (
        <section className="panel doc-sequence">
          <div className="sequence-grid">
            {neighbors?.prev ? (
              <Link className="sequence-card" href={neighbors.prev.href}>
                <span>{copy.previous}</span>
                <strong>{neighbors.prev.title}</strong>
                <p>{neighbors.prev.summary}</p>
              </Link>
            ) : (
              <div className="sequence-card is-empty" />
            )}
            {neighbors?.next ? (
              <Link className="sequence-card" href={neighbors.next.href}>
                <span>{copy.next}</span>
                <strong>{neighbors.next.title}</strong>
                <p>{neighbors.next.summary}</p>
              </Link>
            ) : (
              <div className="sequence-card is-empty" />
            )}
          </div>
        </section>
      ) : null}
    </>
  );
}
