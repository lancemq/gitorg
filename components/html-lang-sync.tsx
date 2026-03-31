"use client";

import { useEffect } from "react";

import { getLocaleLang } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

type HtmlLangSyncProps = {
  locale: Locale;
};

export function HtmlLangSync({ locale }: HtmlLangSyncProps) {
  useEffect(() => {
    document.documentElement.lang = getLocaleLang(locale);
  }, [locale]);

  return null;
}
