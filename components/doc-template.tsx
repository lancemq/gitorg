import type { ComponentType } from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { DocPrimer } from "@/components/doc-primer";
import { DocSupport } from "@/components/doc-support";
import { GeoBlock } from "@/components/geo-block";
import { SiteShell } from "@/components/site-shell";
import { buildBreadcrumbData, StructuredData } from "@/components/structured-data";
import { buildDocStructuredData } from "@/lib/structured-seo";
import type { Locale, SidebarContent } from "@/lib/i18n";
import {
  getDocTier,
  type DocCard,
  type DocCitation,
  type DocNeighbors,
  type DocPath,
  type DocPrimer as DocPrimerType,
  type DocQuote,
  type DocSection,
  type DocStat,
} from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

type DocTemplateProps = {
  locale: Locale;
  sidebar: SidebarContent;
  breadcrumbs: Array<{
    label: string;
    href?: string;
  }>;
  eyebrow: string;
  title: string;
  summary: string;
  pathname: string;
  docPath: DocPath;
  sourcesTitle: string;
  sourceUrls: string[];
  lastModified?: string;
  Body: ComponentType;
  primer?: DocPrimerType;
  showSources?: boolean;
  relatedDocs?: DocCard[];
  neighbors?: DocNeighbors;
  /** GEO signals from MDX frontmatter — all optional, see lib/content.ts. */
  quotes?: DocQuote[];
  stats?: DocStat[];
  citations?: DocCitation[];
};

export function DocTemplate({
  locale,
  sidebar,
  breadcrumbs,
  eyebrow,
  title,
  summary,
  pathname,
  docPath,
  sourcesTitle,
  sourceUrls,
  lastModified,
  Body,
  primer,
  showSources = false,
  relatedDocs = [],
  neighbors,
  quotes,
  stats,
  citations,
}: DocTemplateProps) {
  const siteUrl = getSiteUrl();
  const breadcrumbItems = breadcrumbs.map((item) => ({
    name: item.label,
    url: `${siteUrl}${item.href ?? pathname}`,
  }));
  const metadata = {
    title,
    slug: docPath.split("/").at(-1) ?? title,
    locale,
    summary,
    section: docPath.split("/")[0] as DocSection,
    sourceUrls,
    quotes,
    stats,
    citations,
  };

  return (
    <SiteShell locale={locale} sidebar={sidebar}>
      <article className="doc-page">
        <StructuredData
          data={[
            buildDocStructuredData({
              locale,
              metadata,
              docPath,
              tier: getDocTier(docPath),
              pageUrl: `${siteUrl}${pathname}`,
              siteUrl,
              lastModified,
              breadcrumbs: breadcrumbs.map((item) => item.label),
            }),
            buildBreadcrumbData(breadcrumbItems),
          ]}
        />
        <Breadcrumbs items={breadcrumbs} />

        <header className="panel doc-hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{summary}</p>
        </header>

        {primer ? <DocPrimer locale={locale} primer={primer} /> : null}

        {/*
          GEO block: rendered between primer and body so quotes/stats/citations
          appear high on the page where LLM scrapers and Google snippet pickers
          both look. Returns null when no GEO frontmatter is present, so older
          articles render unchanged until backfilled.
        */}
        <GeoBlock
          locale={locale}
          quotes={quotes}
          stats={stats}
          citations={citations}
        />

        <section className="panel doc-content">
          <div className="mdx-content">
            <Body />
          </div>
        </section>

        <div className="doc-support-stack">
          <DocSupport locale={locale} relatedDocs={relatedDocs} neighbors={neighbors} />
        </div>

        {showSources ? (
          <section className="panel doc-sources">
            <h2>{sourcesTitle}</h2>
            <ul>
              {sourceUrls.map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </SiteShell>
  );
}
