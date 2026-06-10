"use client";

import { useEffect, useState } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navKeys, siteConfig } from "@/data/site";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { theme, toggle } = useTheme();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-border bg-background/70 backdrop-blur-xl supports-backdrop-filter:bg-background/55"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-foreground"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-xs font-bold text-white shadow-lg shadow-primary/25">
            SD
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {tNav(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <LocaleSwitcher />
          <Button
            asChild
            variant="cta"
            className="hidden md:inline-flex"
          >
            <Link href="/contact">{tHeader("cta")}</Link>
          </Button>

          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "glass md:hidden",
              )}
              aria-label={tHeader("openMenuAria")}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="glass w-[min(100%,320px)] border-border"
            >
              <SheetHeader>
                <SheetTitle>{tHeader("menuTitle")}</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {navKeys.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-foreground"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                ))}
                <div className="pt-2 flex items-center gap-3">
                  <LocaleSwitcher />
                  <button
                    type="button"
                    onClick={toggle}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  >
                    {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </button>
                </div>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "cta", className: "mt-4" }),
                  )}
                >
                  {tHeader("cta")}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
