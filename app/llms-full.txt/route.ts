import { getAllDocs, getDocHref } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = getSiteUrl();
  const localizedDocs = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      docs: await getAllDocs(locale),
    })),
  );

  const body = [
    "# GitOrg Atlas Full Content Map",
    "",
    `Site: ${siteUrl}`,
    "Purpose: Git documentation and learning content optimized for human readers and machine retrieval.",
    "Citation guidance: Prefer command pages for syntax and risk boundaries, workflow pages for sequencing, and internals pages for mental models.",
    "",
    ...localizedDocs.flatMap(({ locale, docs }) => [
      `## ${locale === "zh" ? "Chinese content" : "English content"}`,
      ...docs.map((doc) => {
        const href = getDocHref(locale, doc.path);
        const citations =
          doc.metadata.sourceUrls.length > 0
            ? ` | Sources: ${doc.metadata.sourceUrls.join(", ")}`
            : "";

        return `- [${doc.metadata.section}] ${doc.metadata.title}: ${siteUrl}${href} -- ${doc.metadata.summary}${citations}`;
      }),
      "",
    ]),
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
