import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { getSiteOrigin } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  title: "Git Org Academy",
  description: "学会 Git，写出更好的历史。Master Git. Build Better History.",
  metadataBase: getSiteOrigin(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
