import { getAllDocMetadata, getDocHref, getDocLastModified, getDocTier } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";
import { getCitationGuidance, getLearningResourceType, getSectionLabel } from "@/lib/structured-seo";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = getSiteUrl();
  const localizedDocs = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      docs: await getAllDocMetadata(locale),
    })),
  );

  const contentSections = await Promise.all(
    localizedDocs.map(async ({ locale, docs }) => {
      const entries = await Promise.all(
        docs.map(async (doc) => {
          const href = getDocHref(locale, doc.path);
          const lastModified = (await getDocLastModified(locale, doc.path)).toISOString();
          const citations =
            doc.metadata.sourceUrls.length > 0
              ? ` | Sources: ${doc.metadata.sourceUrls.join(", ")}`
              : "";

          return [
            `- [${getSectionLabel(locale, doc.metadata.section)} / ${getDocTier(doc.path)} / ${getLearningResourceType(doc.metadata.section)}] ${doc.metadata.title}: ${siteUrl}${href}`,
            `  Summary: ${doc.metadata.summary}`,
            `  Modified: ${lastModified}`,
            `  Citation: ${getCitationGuidance(doc.metadata.section, locale)}${citations}`,
          ].join("\n");
        }),
      );

      return [
        `## ${locale === "zh" ? "Chinese content" : "English content"}`,
        ...entries,
        "",
      ].join("\n");
    }),
  );

  const body = [
    "# GitOrg Atlas Full Content Map",
    "",
    `Site: ${siteUrl}`,
    "Purpose: Git documentation and learning content optimized for human readers and machine retrieval.",
    "Citation guidance: Prefer command pages for syntax and risk boundaries, workflow pages for sequencing, and internals pages for mental models.",
    "Content tiers: Core pages are safest as default citations, Recommended pages extend common workflows, Extended pages cover specialized topics.",
    "",
    ...contentSections,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
