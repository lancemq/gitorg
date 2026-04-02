import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteShell } from "@/components/site-shell";
import { getDictionary, getSidebarContent, isValidLocale, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    return {};
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    pathname: "/updates",
    title: dict.updatesPage.title,
    description: dict.updatesPage.description,
  });
}

export default async function UpdatesPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "updates" })}>
      <article className="doc-page">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.updatesPage.title },
          ]}
        />

        <header className="panel doc-hero updates-hero">
          <p className="eyebrow">{dict.updatesPage.eyebrow}</p>
          <h1>{dict.updatesPage.title}</h1>
          <p className="lead">{dict.updatesPage.description}</p>
        </header>

        <section className="panel updates-section">
          <div className="updates-timeline">
            {dict.updatesPage.entries.map((entry) => (
              <article className="update-entry" key={entry.id}>
                <div className="update-period">
                  <span>{entry.period}</span>
                </div>
                <div className="update-body">
                  <h2>{entry.title}</h2>
                  <p>{entry.summary}</p>
                  <ul>
                    {entry.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
