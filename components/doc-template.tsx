import Link from "next/link";
import type { ComponentType } from "react";

import { SiteShell } from "@/components/site-shell";
import type { Locale, SidebarContent } from "@/lib/i18n";

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
  sourcesTitle: string;
  sourceUrls: string[];
  Body: ComponentType;
  showSources?: boolean;
};

export function DocTemplate({
  locale,
  sidebar,
  breadcrumbs,
  eyebrow,
  title,
  summary,
  sourcesTitle,
  sourceUrls,
  Body,
  showSources = false,
}: DocTemplateProps) {
  return (
    <SiteShell locale={locale} sidebar={sidebar}>
      <article className="doc-page">
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

        <section className="panel doc-content">
          <div className="mdx-content">
            <Body />
          </div>
        </section>

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
