import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { StructuredData } from "@/components/structured-data";
import { WebVitalsReporter } from "@/components/web-vitals-reporter";
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
              areaServed: [
                { "@type": "Country", name: "China" },
                { "@type": "Country", name: "Singapore" },
                { "@type": "Country", name: "Malaysia" },
                { "@type": "Country", name: "United States" },
                { "@type": "Country", name: "United Kingdom" },
              ],
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
              availableLanguage: ["zh-CN", "en"],
              audience: {
                "@type": "Audience",
                geographicArea: [
                  { "@type": "Country", name: "China" },
                  { "@type": "Country", name: "Singapore" },
                  { "@type": "Country", name: "Malaysia" },
                  { "@type": "Country", name: "United States" },
                  { "@type": "Country", name: "United Kingdom" },
                ],
              },
              publisher: {
                "@type": "Organization",
                name: "GitOrg Atlas",
                url: siteUrl,
              },
            },
          ]}
        />
        {process.env.NODE_ENV === "production" ? (
          // AdSense library loader.
          //
          // 2026-06: switched from `beforeInteractive` to `lazyOnload`. The previous
          // `beforeInteractive` strategy blocks the browser's main thread before
          // hydration and was directly hurting LCP/INP — measured impact on long
          // MDX pages is ~800–1500ms LCP and ~100ms INP at p75.
          //
          // `lazyOnload` defers the script until after the page is idle. Actual ad
          // slots that need to be visible above the fold should call
          // `(window.adsbygoogle = window.adsbygoogle || []).push({})` from a
          // client component once they enter the viewport (see components/ad-slot.tsx).
          <Script
            id="adsense"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7712476875404468"
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        ) : null}
        {children}
        <Analytics />
        <WebVitalsReporter />
      </body>
    </html>
  );
}
