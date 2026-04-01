import Link from "next/link";
import type { ComponentType } from "react";

import { DocPrimer } from "@/components/doc-primer";
import { DocSupport } from "@/components/doc-support";
import { SiteShell } from "@/components/site-shell";
import { buildBreadcrumbData, StructuredData } from "@/components/structured-data";
import type { Locale, SidebarContent } from "@/lib/i18n";
import type { DocCard, DocNeighbors, DocPrimer as DocPrimerType } from "@/lib/content";
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
  sourcesTitle: string;
  sourceUrls: string[];
  lastModified?: string;
  Body: ComponentType;
  primer?: DocPrimerType;
  showSources?: boolean;
  relatedDocs?: DocCard[];
  neighbors?: DocNeighbors;
};

export function DocTemplate({
  locale,
  sidebar,
  breadcrumbs,
  eyebrow,
  title,
  summary,
  pathname,
  sourcesTitle,
  sourceUrls,
  lastModified,
  Body,
  primer,
  showSources = false,
  relatedDocs = [],
  neighbors,
}: DocTemplateProps) {
  const siteUrl = getSiteUrl();
  const inLanguage = locale === "zh" ? "zh-CN" : "en";
  const breadcrumbItems = breadcrumbs.map((item) => ({
    name: item.label,
    url: `${siteUrl}${item.href ?? pathname}`,
  }));

  return (
    <SiteShell locale={locale} sidebar={sidebar}>
      <article className="doc-page">
        <StructuredData
          data={[
            {
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: title,
              description: summary,
              inLanguage,
              url: `${siteUrl}${pathname}`,
              dateModified: lastModified,
              isPartOf: {
                "@type": "WebSite",
                name: "GitOrg Atlas",
                url: `${siteUrl}/${locale}`,
              },
              about: breadcrumbs.map((item) => item.label),
              citation: sourceUrls,
            },
            buildBreadcrumbData(breadcrumbItems),
          ]}
        />
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((item, index) => (
            <span key={`${item.label}-${index}`}>
              {index > 0 ? <span>/</span> : null}
              {item.href ? <Link href={item.href}>{item.label}</Link> : <strong>{item.label}</strong>}
            </span>
          ))}
        </nav>

        <header className="panel doc-hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{summary}</p>
        </header>

        {primer ? <DocPrimer locale={locale} primer={primer} /> : null}

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
