import { NextResponse } from "next/server";

import { getSearchDocs } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-static";

function isLocale(value: string): value is Locale {
  return value === "zh" || value === "en";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 404 });
  }

  const docs = await getSearchDocs(locale);

  return NextResponse.json(docs, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
