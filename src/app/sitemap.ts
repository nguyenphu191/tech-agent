import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllProjectSlugs } from "@/data/projects";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

const staticPaths = ["", "/services", "/projects", "/about", "/contact"];

function pathForLocale(locale: string, path: string) {
  if (locale === routing.defaultLocale) {
    return path === "" ? "/" : path;
  }
  return path === "" ? `/${locale}` : `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}${pathForLocale(locale, path)}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    }
    for (const slug of getAllProjectSlugs()) {
      entries.push({
        url: `${base}${pathForLocale(locale, `/projects/${slug}`)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
