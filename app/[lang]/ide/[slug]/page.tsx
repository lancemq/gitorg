import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocTemplate } from "@/components/doc-template";
import { getDocByPath, getDocLastModified, getDocNeighbors, getDocPaths, getDocPrimer, getRelatedDocs, type DocPath } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  ideSlugs,
  isValidLocale,
  locales,
  type IdeSlug,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

function getIdePath(slug: string) {
  return `ide/${slug}` as DocPath;
}

export function generateStaticParams() {
  return locales.flatMap((lang) => ideSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !ideSlugs.includes(slug as IdeSlug)) {
    return {};
  }

  const locale = lang as Locale;
  const doc = await getDocByPath(locale, getIdePath(slug));

  return buildPageMetadata({
    locale,
    pathname: `/ide/${slug}`,
    title: doc.metadata.title,
    description: doc.metadata.summary,
  });
}

export default async function IdeDetailPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !ideSlugs.includes(slug as IdeSlug)) {
    notFound();
  }

  const locale = lang as Locale;
  const docPath = getIdePath(slug);

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
        { label: dict.commandPage.breadcrumbs.ide, href: `/${locale}/ide` },
        { label: doc.metadata.title },
      ]}
      eyebrow={dict.ideIndex.eyebrow}
      title={doc.metadata.title}
      summary={doc.metadata.summary}
      pathname={`/${locale}/ide/${slug}`}
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
