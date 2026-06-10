"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { navKeys, siteConfig } from "@/data/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="GitHub">
      <title>GitHub</title>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="LinkedIn">
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Facebook">
      <title>Facebook</title>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  zalo: MessageCircle,
} as const;

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid" | "submitted">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("submitted");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value && EMAIL_RE.test(e.target.value)) {
      setStatus("valid");
    } else {
      setStatus(e.target.value ? "invalid" : "idle");
    }
  };

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t("tagline")}</p>
          <form onSubmit={handleSubmit} className="mt-4">
            <label className="text-xs font-medium text-foreground">
              {t("newsletterLabel")}
            </label>
            <div className="mt-1.5 flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder={t("newsletterPlaceholder")}
                  className={`w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 ${
                    status === "invalid"
                      ? "border-destructive"
                      : status === "valid"
                        ? "border-success"
                        : "border-border focus:border-primary"
                  }`}
                />
                {status === "valid" && (
                  <CheckCircle2 className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-success" />
                )}
                {status === "invalid" && (
                  <AlertCircle className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-destructive" />
                )}
              </div>
              <button
                type="submit"
                disabled={status !== "valid"}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {status === "invalid" && (
              <p className="mt-1 text-xs text-destructive">{t("newsletterError")}</p>
            )}
            {status === "submitted" && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-success">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {t("newsletterSuccess")}
              </p>
            )}
          </form>
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
                  className="rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
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
