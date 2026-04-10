import type { Locale } from "@/lib/site-content";

export const locales = ["zh", "en"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "zh";

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const tokens = acceptLanguage
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);

  for (const token of tokens) {
    if (token.startsWith("zh")) {
      return "zh";
    }

    if (token.startsWith("en")) {
      return "en";
    }
  }

  return defaultLocale;
}

export function getHtmlLang(locale: Locale) {
  return locale === "zh" ? "zh-CN" : "en";
}

export function getLocalizedHref(locale: Locale, path = "/") {
  const normalizedPath = normalizeLocalizedPath(path);
  return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`;
}

function normalizeLocalizedPath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pathWithoutLocale = normalizedPath.replace(/^\/(zh|en)(?=\/|$)/, "");

  return pathWithoutLocale || "/";
}
