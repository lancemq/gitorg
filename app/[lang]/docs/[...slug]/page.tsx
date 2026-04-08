import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { DocTemplate } from "@/components/doc-template";
import { getDocByPath, getDocHref, getDocLastModified, getDocNeighbors, getDocPathFromSlugParts, getDocPaths, getDocPrimer, getRelatedDocs } from "@/lib/content";
import {
  getDictionary,
  getDocsSectionTitle,
  getSidebarContent,
  isValidLocale,
  locales,
  type DocsSectionId,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    lang: string;
    slug: string[];
  }>;
};

function isCanonicalDocsPath(locale: Locale, docPath: string) {
  return getDocHref(locale, docPath as ReturnType<typeof getDocPathFromSlugParts>).startsWith(`/${locale}/docs/`);
}

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    getDocPaths(lang)
      .filter((docPath) => isCanonicalDocsPath(lang, docPath))
      .map((docPath) => ({
        lang,
        slug: docPath.split("/"),
      })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    return {};
  }

  const locale = lang as Locale;
  const docPath = getDocPathFromSlugParts(slug);

  if (!getDocPaths(locale).includes(docPath)) {
    return {};
  }

  const doc = await getDocByPath(locale, docPath);

  return buildPageMetadata({
    locale,
    pathname: `/docs/${docPath}`,
    title: doc.metadata.title,
    description: doc.metadata.summary,
  });
}

export default async function DocDetailPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const rawDocPath = slug.join("/");
  const docPath = getDocPathFromSlugParts(slug);

  if (rawDocPath === "concepts/git-internals") {
    permanentRedirect(`/${locale}/internals`);
  }

  if (rawDocPath === "concepts/refs-and-head") {
    permanentRedirect(`/${locale}/internals/refs-and-head`);
  }

  if (rawDocPath === "learning-path/quick-start") {
    permanentRedirect(`/${locale}/learning-path`);
  }

  if (rawDocPath.startsWith("recovery/")) {
    permanentRedirect(`/${locale}/recovery/${rawDocPath.replace("recovery/", "")}`);
  }

  const sectionId = docPath.split("/")[0] as DocsSectionId;

  if (!getDocPaths(locale).includes(docPath)) {
    notFound();
  }

  const doc = await getDocByPath(locale, docPath);
  const primer = getDocPrimer(locale, docPath);
  const [neighbors, relatedDocs, lastModified] = await Promise.all([
    getDocNeighbors(locale, docPath),
    getRelatedDocs(locale, docPath),
    getDocLastModified(locale, docPath),
  ]);
  const DocBody = doc.Component;
  const breadcrumbs =
    docPath === "learning-path/quick-start"
      ? [
          { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
          { label: doc.metadata.title },
        ]
      : [
          { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
          {
            label: getDocsSectionTitle(locale, sectionId),
            href: sectionId === "learning-path" ? `/${locale}/learning-path` : undefined,
          },
          { label: doc.metadata.title },
        ];

  return (
    <DocTemplate
      locale={locale}
      sidebar={getSidebarContent(locale, { kind: "docs", activePath: docPath })}
      breadcrumbs={breadcrumbs}
      eyebrow={dict.docsIndex.eyebrow}
      title={doc.metadata.title}
      summary={doc.metadata.summary}
      pathname={getDocHref(locale, docPath)}
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
