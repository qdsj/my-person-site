import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, getPreferredLocale, hasLocale } from "@/lib/i18n";

const PASSTHROUGH_PREFIXES = ["/api", "/debug", "/demo", "/_next"];
const PASSTHROUGH_FILES = new Set(["/favicon.ico", "/robots.txt", "/sitemap.xml"]);

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  if (
    PASSTHROUGH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)) ||
    PASSTHROUGH_FILES.has(pathname) ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && hasLocale(firstSegment)) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request.headers.get("accept-language"));
  const localizedPath = pathname === "/" ? `/${locale}/` : `/${locale}${pathname}`;
  const redirectUrl = new URL(request.url);

  redirectUrl.pathname = `${nextUrl.basePath}${localizedPath}`;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
