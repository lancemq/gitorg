import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { StructuredData } from "@/components/structured-data";
import { getSiteOrigin } from "@/lib/site";

import "./globals.css";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const baiduVerification = process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: "GitOrg Atlas",
  description: "学会 Git，写出更好的历史。Master Git. Build Better History.",
  metadataBase: getSiteOrigin(),
  authors: [{ name: "GitOrg Atlas" }],
  creator: "GitOrg Atlas",
  publisher: "GitOrg Atlas",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(baiduVerification
      ? {
          other: {
            "baidu-site-verification": baiduVerification,
          },
        }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteOrigin().toString();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StructuredData
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GitOrg Atlas",
              url: siteUrl,
              logo: `${siteUrl}/opengraph-image`,
              sameAs: [
                "https://gitorg.xyz",
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GitOrg Atlas",
              alternateName: ["GitOrg Atlas", "GitOrg 图谱"],
              url: siteUrl,
              inLanguage: ["zh-CN", "en"],
              publisher: {
                "@type": "Organization",
                name: "GitOrg Atlas",
                url: siteUrl,
              },
            },
          ]}
        />
        {process.env.NODE_ENV === "production" ? (
          <Script
            id="baidu-auto-push"
            src="https://push.zhanzhang.baidu.com/push.js"
            strategy="afterInteractive"
          />
        ) : null}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
