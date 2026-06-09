"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Briefcase, GitBranch, MessageCircle, Share2 } from "lucide-react";
import { navKeys, siteConfig } from "@/data/site";

const socialIcons = {
  github: GitBranch,
  linkedin: Briefcase,
  facebook: Share2,
  zalo: MessageCircle,
} as const;

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t("tagline")}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{t("linksTitle")}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                {t("home")}
              </Link>
            </li>
            {navKeys.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-foreground">
                  {tNav(l.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {t("contactTitle")}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-foreground"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="hover:text-foreground"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>{t("locationValue")}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            {(
              Object.entries(siteConfig.social) as [
                keyof typeof socialIcons,
                string,
              ][]
            ).map(([key, href]) => {
              const Icon = socialIcons[key];
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary bg-card"
                  aria-label={key}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
