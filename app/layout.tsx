import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Git Academy",
  description: "基于 Pencil 设计稿重构的 Git 文档站。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
