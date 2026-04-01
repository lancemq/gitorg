import { getAllDocs, getDocHref, getDocLastModified } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = getSiteUrl();

  const localesContent = await Promise.all(
    locales.map(async (locale) => {
      const docs = await getAllDocs(locale);
      const entries = await Promise.all(
        docs.map(async (doc) => ({
          locale,
          section: doc.metadata.section,
          slug: doc.metadata.slug,
          title: doc.metadata.title,
          summary: doc.metadata.summary,
          url: `${siteUrl}${getDocHref(locale, doc.path)}`,
          lastModified: (await getDocLastModified(locale, doc.path)).toISOString(),
          sourceUrls: doc.metadata.sourceUrls,
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
      generatedAt: new Date().toISOString(),
      locales: localesContent,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  );
}
