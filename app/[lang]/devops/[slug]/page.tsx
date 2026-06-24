import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocTemplate } from "@/components/doc-template";
import { getDocByPath, getDocLastModified, getDocNeighbors, getDocPaths, getDocPrimer, getRelatedDocs, type DocPath } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  devopsSlugs,
  isValidLocale,
  locales,
  type DevopsSlug,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

function getDevopsPath(slug: string) {
  return `devops/${slug}` as DocPath;
}

export function generateStaticParams() {
  return locales.flatMap((lang) => devopsSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !devopsSlugs.includes(slug as DevopsSlug)) {
    return {};
  }

  const locale = lang as Locale;
  const doc = await getDocByPath(locale, getDevopsPath(slug));

  return buildPageMetadata({
    locale,
    pathname: `/devops/${slug}`,
    title: doc.metadata.title,
    description: doc.metadata.summary,
  });
}

export default async function DevopsDetailPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !devopsSlugs.includes(slug as DevopsSlug)) {
    notFound();
  }

  const locale = lang as Locale;
  const docPath = getDevopsPath(slug);

  if (!getDocPaths(locale).includes(docPath)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const doc = await getDocByPath(locale, docPath);
  const primer = getDocPrimer(locale, docPath);
  const [neighbors, relatedDocs, lastModified] = await Promise.all([
    getDocNeighbors(locale, docPath),
    getRelatedDocs(locale, docPath),
    getDocLastModified(locale, docPath),
  ]);
  const DocBody = doc.Component;

  return (
    <DocTemplate
      locale={locale}
      sidebar={getSidebarContent(locale, { kind: "docs", activePath: docPath })}
      breadcrumbs={[
        { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
        { label: dict.commandPage.breadcrumbs.devops, href: `/${locale}/devops` },
        { label: doc.metadata.title },
      ]}
      eyebrow={dict.devopsIndex.eyebrow}
      title={doc.metadata.title}
      summary={doc.metadata.summary}
      pathname={`/${locale}/devops/${slug}`}
      docPath={docPath}
      sourcesTitle={dict.docsIndex.sourcesTitle}
      sourceUrls={doc.metadata.sourceUrls}
      quotes={doc.metadata.quotes}
      stats={doc.metadata.stats}
      citations={doc.metadata.citations}
      primer={primer}
      lastModified={lastModified.toISOString()}
      Body={DocBody}
      relatedDocs={relatedDocs}
      neighbors={neighbors}
    />
  );
}
