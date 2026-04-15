import { getAllDocMetadata, getDocHref, getDocLastModified, getDocTier } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";
import { getCitationGuidance, getLearningResourceType, getSectionLabel } from "@/lib/structured-seo";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = getSiteUrl();

  const localesContent = await Promise.all(
    locales.map(async (locale) => {
      const docs = await getAllDocMetadata(locale);
      const entries = await Promise.all(
        docs.map(async (doc) => ({
          locale,
          language: locale === "zh" ? "zh-CN" : "en",
          section: doc.metadata.section,
          sectionLabel: getSectionLabel(locale, doc.metadata.section),
          slug: doc.metadata.slug,
          path: doc.path,
          tier: getDocTier(doc.path),
          learningResourceType: getLearningResourceType(doc.metadata.section),
          title: doc.metadata.title,
          summary: doc.metadata.summary,
          url: `${siteUrl}${getDocHref(locale, doc.path)}`,
          alternateUrl: `${siteUrl}${getDocHref((locale === "zh" ? "en" : "zh") as Locale, doc.path)}`,
          lastModified: (await getDocLastModified(locale, doc.path)).toISOString(),
          sourceUrls: doc.metadata.sourceUrls,
          citationGuidance: getCitationGuidance(doc.metadata.section, locale),
        })),
      );

      return {
        locale,
        count: entries.length,
        entries,
      };
    }),
  );

  return Response.json(
    {
      site: "GitOrg Atlas",
      url: siteUrl,
      description: "Bilingual Git learning content index for search engines, AI retrieval, and citation-aware discovery.",
      generatedAt: new Date().toISOString(),
      machineReadableResources: {
        llms: `${siteUrl}/llms.txt`,
        llmsFull: `${siteUrl}/llms-full.txt`,
        sitemap: `${siteUrl}/sitemap.xml`,
      },
      locales: localesContent,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  );
}
