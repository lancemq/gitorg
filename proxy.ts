import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const BOT_USER_AGENT =
  /bot|crawler|spider|crawling|curl|wget|slurp|bingpreview|facebookexternalhit|linkedinbot/i;

const CHINESE_SPEAKING_COUNTRIES = new Set([
  "CN",
  "HK",
  "MO",
  "TW",
  "SG",
  "MY",
]);

function detectPreferredLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const country =
    request.headers.get("x-vercel-ip-country")?.toUpperCase() ??
    request.headers.get("cf-ipcountry")?.toUpperCase() ??
    "";

  if (acceptLanguage.includes("zh")) {
    return "zh";
  }

  if (CHINESE_SPEAKING_COUNTRIES.has(country)) {
    return "zh";
  }

  if (acceptLanguage.includes("en")) {
    return "en";
  }

  return "zh";
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  if (BOT_USER_AGENT.test(userAgent)) {
    return NextResponse.redirect(new URL("/zh", request.url), 307);
  }

  const locale = detectPreferredLocale(request);
  const response = NextResponse.redirect(new URL(`/${locale}`, request.url), 307);
  response.cookies.set("preferred-locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/"],
};
