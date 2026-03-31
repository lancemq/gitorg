import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DocSupport } from "@/components/doc-support";
import { SiteShell } from "@/components/site-shell";
import { StructuredData } from "@/components/structured-data";
import { getCommandDoc, getDocNeighbors, getRelatedDocs } from "@/lib/content";
import {
  commandSlugs,
  getDictionary,
  getSidebarContent,
  isValidLocale,
  locales,
  type CommandSlug,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    commandSlugs.map((slug) => ({ lang, slug })),
  ) as Array<{ lang: Locale; slug: CommandSlug }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    return {};
  }

  const locale = lang as Locale;
  if (!commandSlugs.includes(slug as CommandSlug)) {
    return {};
  }

  const doc = await getCommandDoc(locale, slug as CommandSlug);

  return buildPageMetadata({
    locale,
    pathname: `/commands/${slug}`,
    title: doc.metadata.title,
    description: doc.metadata.summary,
  });
}

export default async function CommandPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  if (!dict.commandSlugs.includes(slug as CommandSlug)) {
    notFound();
  }

  const commandSlug = slug as CommandSlug;
  const doc = await getCommandDoc(locale, commandSlug);
  const docPath = `commands/${commandSlug}` as const;
  const [neighbors, relatedDocs] = await Promise.all([
    getDocNeighbors(locale, docPath),
    getRelatedDocs(locale, docPath),
  ]);
  const DocBody = doc.Component;
  const siteUrl = getSiteUrl();
  const inLanguage = locale === "zh" ? "zh-CN" : "en";

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: `commands/${commandSlug}` })}>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: doc.metadata.title,
          description: doc.metadata.summary,
          inLanguage,
          url: `${siteUrl}/${locale}/commands/${commandSlug}`,
          isPartOf: {
            "@type": "CollectionPage",
            name: `${dict.commandPage.breadcrumbs.commands} | Git Org Academy`,
            url: `${siteUrl}/${locale}/commands`,
          },
          citation: doc.metadata.sourceUrls,
          about: ["Git", commandSlug],
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href={`/${locale}`}>{dict.commandPage.breadcrumbs.overview}</Link>
        <span>/</span>
        <Link href={`/${locale}/commands`}>{dict.commandPage.breadcrumbs.commands}</Link>
        <span>/</span>
        <strong>{doc.metadata.title}</strong>
      </nav>

      <section className="command-hero">
        <div className="command-copy">
          <p className="eyebrow">{dict.commandPage.eyebrow}</p>
          <h1>{doc.metadata.title}</h1>
          <p className="lead">{doc.metadata.summary}</p>
        </div>

        <aside className="command-meta panel">
          {dict.commandMeta[commandSlug].map((item) => (
            <div className="meta-row" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </aside>
      </section>

      <section className="panel doc-content command-doc-content">
        <div className="mdx-content">
          <DocBody />
        </div>
      </section>

      <DocSupport locale={locale} relatedDocs={relatedDocs} neighbors={neighbors} />
    </SiteShell>
  );
}
