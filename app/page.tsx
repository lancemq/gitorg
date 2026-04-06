import type { Metadata } from "next";
import Link from "next/link";

import { StructuredData } from "@/components/structured-data";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "GitOrg Atlas",
  description: "GitOrg Atlas 是一个双语 Git 学习网站，提供中文和英文入口，覆盖命令、工作流、原理和恢复。",
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/zh",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "GitOrg Atlas",
    description: "Choose Chinese or English to explore Git commands, workflows, internals, and recovery guides.",
    type: "website",
    url: "/",
  },
};

export default function RootPage() {
  const siteUrl = getSiteUrl();

  return (
    <main className="root-landing">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "GitOrg Atlas",
          url: `${siteUrl}/`,
          description: "Bilingual entry page for GitOrg Atlas with Chinese and English learning portals.",
          hasPart: [
            {
              "@type": "WebPage",
              name: "中文入口",
              url: `${siteUrl}/zh`,
              inLanguage: "zh-CN",
            },
            {
              "@type": "WebPage",
              name: "English Entry",
              url: `${siteUrl}/en`,
              inLanguage: "en",
            },
          ],
        }}
      />
      <div className="root-landing-shell">
        <p className="eyebrow">GitOrg Atlas</p>
        <h1>Choose Your Language</h1>
        <p className="root-landing-lead">
          Git commands, workflows, internals, and recovery guides in Chinese and English.
        </p>
        <div className="root-landing-actions">
          <Link className="button button-primary" href="/zh">
            进入中文站
          </Link>
          <Link className="button button-secondary" href="/en">
            Enter English Site
          </Link>
        </div>
      </div>
    </main>
  );
}
