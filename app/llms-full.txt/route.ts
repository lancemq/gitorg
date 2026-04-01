import { getSearchDocs } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

function buildSectionBlock(
  title: string,
  docs: Awaited<ReturnType<typeof getSearchDocs>>,
  siteUrl: string,
) {
  return [
    `## ${title}`,
    ...docs.map((doc) => `- [${doc.section}] ${doc.title}: ${siteUrl}${doc.href} -- ${doc.summary}`),
  ];
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const [zhDocs, enDocs] = await Promise.all([
    getSearchDocs("zh"),
    getSearchDocs("en"),
  ]);

  const body = [
    "# GitOrg Atlas Full Content Map",
    "",
    `Site: ${siteUrl}`,
    "Purpose: Git documentation and learning content optimized for human readers and machine retrieval.",
    "",
    ...buildSectionBlock("Chinese content", zhDocs, siteUrl),
    "",
    ...buildSectionBlock("English content", enDocs, siteUrl),
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
