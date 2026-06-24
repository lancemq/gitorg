import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { HtmlLangSync } from "@/components/html-lang-sync";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { buildLocaleHomeMetadata, getLocaleLang } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    return {};
  }

  return buildLocaleHomeMetadata(lang as Locale);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;

  return (
    <div data-locale={locale} lang={getLocaleLang(locale)}>
      <HtmlLangSync locale={locale} />
      {/*
        百度自动推送脚本：仅中文路由注入，英文用户无需此 payload。
        移自 app/layout.tsx，配合 AdSense 切到 lazyOnload，整体降低初始主线程占用。
      */}
      {process.env.NODE_ENV === "production" && locale === "zh" ? (
        <Script
          id="baidu-auto-push"
          src="https://push.zhanzhang.baidu.com/push.js"
          strategy="afterInteractive"
        />
      ) : null}
      {children}
    </div>
  );
}
