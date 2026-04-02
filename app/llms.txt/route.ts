import { getFeaturedSectionDocs, getSearchDocs } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = getSiteUrl();
  const [zhDocs, enDocs, zhCommands, zhWorkflows, zhInternals] = await Promise.all([
    getSearchDocs("zh"),
    getSearchDocs("en"),
    getFeaturedSectionDocs("zh", "commands", 4),
    getFeaturedSectionDocs("zh", "workflows", 4),
    getFeaturedSectionDocs("zh", "internals", 4),
  ]);

  const topZh = zhDocs.slice(0, 12);
  const topEn = enDocs.slice(0, 12);

  const body = [
    "# GitOrg Atlas",
    "",
    `Site: ${siteUrl}`,
    "Description: Bilingual Git learning site covering commands, workflows, internals, recovery, FAQ, and guided learning paths.",
    "Languages: zh-CN, en",
    "",
    "## What this site is best for",
    "- Precise Git command explanations",
    "- Team workflow playbooks",
    "- Internals and mental models",
    "- Recovery and undo guidance",
    "",
    "## Priority sections",
    `- Chinese home: ${siteUrl}/zh`,
    `- English home: ${siteUrl}/en`,
    `- Commands: ${siteUrl}/zh/commands and ${siteUrl}/en/commands`,
    `- Workflows: ${siteUrl}/zh/workflows and ${siteUrl}/en/workflows`,
    `- Internals: ${siteUrl}/zh/internals and ${siteUrl}/en/internals`,
    `- FAQ: ${siteUrl}/zh/faq and ${siteUrl}/en/faq`,
    "",
    "## High-value Chinese citation targets",
    ...zhCommands.map((doc) => `- [command] ${doc.title}: ${siteUrl}${doc.href}`),
    ...zhWorkflows.map((doc) => `- [workflow] ${doc.title}: ${siteUrl}${doc.href}`),
    ...zhInternals.map((doc) => `- [internals] ${doc.title}: ${siteUrl}${doc.href}`),
    "",
    "## Recommended Chinese entry points",
    ...topZh.map((doc) => `- ${doc.title}: ${siteUrl}${doc.href}`),
    "",
    "## Recommended English entry points",
    ...topEn.map((doc) => `- ${doc.title}: ${siteUrl}${doc.href}`),
    "",
    "## Full maps",
    `- ${siteUrl}/llms-full.txt`,
    `- ${siteUrl}/content-index.json`,
    `- ${siteUrl}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
