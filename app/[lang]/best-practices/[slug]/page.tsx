import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocTemplate } from "@/components/doc-template";
import { getDocByPath, getDocNeighbors, getDocPaths, getRelatedDocs, type DocPath } from "@/lib/content";
import {
  bestPracticeSlugs,
  getDictionary,
  getSidebarContent,
  isValidLocale,
  locales,
  type BestPracticeSlug,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

function getBestPracticePath(slug: string) {
  return `best-practices/${slug}` as DocPath;
}

export function generateStaticParams() {
  return locales.flatMap((lang) => bestPracticeSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !bestPracticeSlugs.includes(slug as BestPracticeSlug)) {
    return {};
  }

  const locale = lang as Locale;
  const doc = await getDocByPath(locale, getBestPracticePath(slug));

  return buildPageMetadata({
    locale,
    pathname: `/best-practices/${slug}`,
    title: doc.metadata.title,
    description: doc.metadata.summary,
  });
}

export default async function BestPracticeDetailPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !bestPracticeSlugs.includes(slug as BestPracticeSlug)) {
    notFound();
  }

  const locale = lang as Locale;
  const docPath = getBestPracticePath(slug);

  if (!getDocPaths(locale).includes(docPath)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const doc = await getDocByPath(locale, docPath);
  const [neighbors, relatedDocs] = await Promise.all([
    getDocNeighbors(locale, docPath),
    getRelatedDocs(locale, docPath),
  ]);
  const DocBody = doc.Component;

  return (
    <DocTemplate
      locale={locale}
      sidebar={getSidebarContent(locale, { kind: "docs", activePath: docPath })}
      breadcrumbs={[
        { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
        { label: dict.commandPage.breadcrumbs.bestPractices, href: `/${locale}/best-practices` },
        { label: doc.metadata.title },
      ]}
      eyebrow={dict.bestPracticeIndex.eyebrow}
      title={doc.metadata.title}
      summary={doc.metadata.summary}
      sourcesTitle={dict.docsIndex.sourcesTitle}
      sourceUrls={doc.metadata.sourceUrls}
      Body={DocBody}
      relatedDocs={relatedDocs}
      neighbors={neighbors}
    />
  );
}
