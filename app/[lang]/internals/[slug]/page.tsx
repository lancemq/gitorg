import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocTemplate } from "@/components/doc-template";
import { getDocNeighbors, getDocPaths, getDocPrimer, getInternalDoc, getRelatedDocs, type DocPath } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  internalsSlugs,
  isValidLocale,
  locales,
  type InternalsSlug,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

function getInternalPath(slug: string) {
  return `internals/${slug}` as DocPath;
}

export function generateStaticParams() {
  return locales.flatMap((lang) => internalsSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !internalsSlugs.includes(slug as InternalsSlug)) {
    return {};
  }

  const locale = lang as Locale;
  const doc = await getInternalDoc(locale, slug as InternalsSlug);

  return buildPageMetadata({
    locale,
    pathname: `/internals/${slug}`,
    title: doc.metadata.title,
    description: doc.metadata.summary,
  });
}

export default async function InternalDetailPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !internalsSlugs.includes(slug as InternalsSlug)) {
    notFound();
  }

  const locale = lang as Locale;
  const docPath = getInternalPath(slug);

  if (!getDocPaths(locale).includes(docPath)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const doc = await getInternalDoc(locale, slug as InternalsSlug);
  const primer = getDocPrimer(locale, docPath);
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
        { label: dict.commandPage.breadcrumbs.internals, href: `/${locale}/internals` },
        { label: doc.metadata.title },
      ]}
      eyebrow={dict.internalsIndex.eyebrow}
      title={doc.metadata.title}
      summary={doc.metadata.summary}
      pathname={`/${locale}/internals/${slug}`}
      sourcesTitle={dict.docsIndex.sourcesTitle}
      sourceUrls={doc.metadata.sourceUrls}
      primer={primer}
      Body={DocBody}
      relatedDocs={relatedDocs}
      neighbors={neighbors}
    />
  );
}
