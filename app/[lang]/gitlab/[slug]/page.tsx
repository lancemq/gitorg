import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocTemplate } from "@/components/doc-template";
import { getDocByPath, getDocNeighbors, getDocPaths, getDocPrimer, getRelatedDocs, type DocPath } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  gitlabSlugs,
  isValidLocale,
  locales,
  type GitlabSlug,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

function getGitlabPath(slug: string) {
  return `gitlab/${slug}` as DocPath;
}

export function generateStaticParams() {
  return locales.flatMap((lang) => gitlabSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !gitlabSlugs.includes(slug as GitlabSlug)) {
    return {};
  }

  const locale = lang as Locale;
  const doc = await getDocByPath(locale, getGitlabPath(slug));

  return buildPageMetadata({
    locale,
    pathname: `/gitlab/${slug}`,
    title: doc.metadata.title,
    description: doc.metadata.summary,
  });
}

export default async function GitlabDetailPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !gitlabSlugs.includes(slug as GitlabSlug)) {
    notFound();
  }

  const locale = lang as Locale;
  const docPath = getGitlabPath(slug);

  if (!getDocPaths(locale).includes(docPath)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const doc = await getDocByPath(locale, docPath);
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
        { label: dict.commandPage.breadcrumbs.gitlab, href: `/${locale}/gitlab` },
        { label: doc.metadata.title },
      ]}
      eyebrow={dict.gitlabIndex.eyebrow}
      title={doc.metadata.title}
      summary={doc.metadata.summary}
      pathname={`/${locale}/gitlab/${slug}`}
      sourcesTitle={dict.docsIndex.sourcesTitle}
      sourceUrls={doc.metadata.sourceUrls}
      primer={primer}
      Body={DocBody}
      relatedDocs={relatedDocs}
      neighbors={neighbors}
    />
  );
}
