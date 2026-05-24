import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocTemplate } from "@/components/doc-template";
import { getDocByPath, getDocLastModified, getDocNeighbors, getDocPaths, getDocPrimer, getRelatedDocs, type DocPath } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  ciCdSlugs,
  isValidLocale,
  locales,
  type CiCdSlug,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

function getCiCdPath(slug: string) {
  return `ci-cd/${slug}` as DocPath;
}

export function generateStaticParams() {
  return locales.flatMap((lang) => ciCdSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !ciCdSlugs.includes(slug as CiCdSlug)) {
    return {};
  }

  const locale = lang as Locale;
  const doc = await getDocByPath(locale, getCiCdPath(slug));

  return buildPageMetadata({
    locale,
    pathname: `/ci-cd/${slug}`,
    title: doc.metadata.title,
    description: doc.metadata.summary,
  });
}

export default async function CicdDetailPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !ciCdSlugs.includes(slug as CiCdSlug)) {
    notFound();
  }

  const locale = lang as Locale;
  const docPath = getCiCdPath(slug);

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
        { label: dict.commandPage.breadcrumbs["ci-cd"], href: `/${locale}/ci-cd` },
        { label: doc.metadata.title },
      ]}
      eyebrow={dict.ciCdIndex.eyebrow}
      title={doc.metadata.title}
      summary={doc.metadata.summary}
      pathname={`/${locale}/ci-cd/${slug}`}
      docPath={docPath}
      sourcesTitle={dict.docsIndex.sourcesTitle}
      sourceUrls={doc.metadata.sourceUrls}
      primer={primer}
      lastModified={lastModified.toISOString()}
      Body={DocBody}
      relatedDocs={relatedDocs}
      neighbors={neighbors}
    />
  );
}
