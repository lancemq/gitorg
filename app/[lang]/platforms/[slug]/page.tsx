import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocTemplate } from "@/components/doc-template";
import { getDocByPath, getDocLastModified, getDocNeighbors, getDocPaths, type DocPath } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  platformsSlugs,
  isValidLocale,
  locales,
  type PlatformsSlug,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

function getPlatformsPath(slug: string) {
  return `platforms/${slug}` as DocPath;
}

export function generateStaticParams() {
  return locales.flatMap((lang) => platformsSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !platformsSlugs.includes(slug as PlatformsSlug)) {
    return {};
  }

  const locale = lang as Locale;
  let doc;
  try {
    doc = await getDocByPath(locale, getPlatformsPath(slug));
  } catch {
    notFound();
  }

  return buildPageMetadata({
    locale,
    pathname: `/platforms/${slug}`,
    title: doc.metadata.title,
    description: doc.metadata.summary,
  });
}

export default async function PlatformsDetailPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !platformsSlugs.includes(slug as PlatformsSlug)) {
    notFound();
  }

  const locale = lang as Locale;
  const docPath = getPlatformsPath(slug);

  if (!getDocPaths(locale).includes(docPath)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const doc = await getDocByPath(locale, docPath);
  const [neighbors, lastModified] = await Promise.all([
    getDocNeighbors(locale, docPath),
    getDocLastModified(locale, docPath),
  ]);
  const DocBody = doc.Component;

  return (
    <DocTemplate
      locale={locale}
      sidebar={getSidebarContent(locale, { kind: "docs", activePath: docPath })}
      breadcrumbs={[
        { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
        { label: dict.commandPage.breadcrumbs.platforms, href: `/${locale}/platforms` },
        { label: doc.metadata.title },
      ]}
      eyebrow={dict.platformsIndex.eyebrow}
      title={doc.metadata.title}
      summary={doc.metadata.summary}
      pathname={`/${locale}/platforms/${slug}`}
      docPath={docPath}
      sourcesTitle={dict.docsIndex.sourcesTitle}
      sourceUrls={doc.metadata.sourceUrls}
      quotes={doc.metadata.quotes}
      stats={doc.metadata.stats}
      citations={doc.metadata.citations}
      authorSlug={doc.metadata.author}
      step={doc.metadata.step}
      lastModified={lastModified.toISOString()}
      Body={DocBody}
      neighbors={neighbors}
    />
  );
}
