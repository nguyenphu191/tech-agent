"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  const t = useTranslations("home.cta");

  return (
    <Reveal>
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl border border-primary/25 bg-[var(--gradient-cta)] p-10 text-center shadow-xl shadow-primary/10 sm:p-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
            <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="cta"
            >
              <Link href="/contact">{t("primary")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full"
            >
              <Link href="/contact">{t("secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
