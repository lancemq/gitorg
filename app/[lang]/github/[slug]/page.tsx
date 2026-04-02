import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocTemplate } from "@/components/doc-template";
import { getDocByPath, getDocNeighbors, getDocPaths, getDocPrimer, getRelatedDocs, type DocPath } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  githubSlugs,
  isValidLocale,
  locales,
  type GithubSlug,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

function getGithubPath(slug: string) {
  return `github/${slug}` as DocPath;
}

export function generateStaticParams() {
  return locales.flatMap((lang) => githubSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !githubSlugs.includes(slug as GithubSlug)) {
    return {};
  }

  const locale = lang as Locale;
  const doc = await getDocByPath(locale, getGithubPath(slug));

  return buildPageMetadata({
    locale,
    pathname: `/github/${slug}`,
    title: doc.metadata.title,
    description: doc.metadata.summary,
  });
}

export default async function GithubDetailPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang) || !githubSlugs.includes(slug as GithubSlug)) {
    notFound();
  }

  const locale = lang as Locale;
  const docPath = getGithubPath(slug);

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
        { label: dict.commandPage.breadcrumbs.github, href: `/${locale}/github` },
        { label: doc.metadata.title },
      ]}
      eyebrow={dict.githubIndex.eyebrow}
      title={doc.metadata.title}
      summary={doc.metadata.summary}
      pathname={`/${locale}/github/${slug}`}
      sourcesTitle={dict.docsIndex.sourcesTitle}
      sourceUrls={doc.metadata.sourceUrls}
      primer={primer}
      Body={DocBody}
      relatedDocs={relatedDocs}
      neighbors={neighbors}
    />
  );
}
