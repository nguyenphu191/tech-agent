"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

const stepIds = ["discovery", "design", "development", "deployment"] as const;

export function ProcessSection() {
  const t = useTranslations("home.process");
  const tSteps = useTranslations("home.process.steps");

  return (
    <Reveal>
      <section className="px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stepIds.map((id, i) => (
              <Reveal key={id} delay={i * 0.05}>
                <div className="relative h-full rounded-2xl border border-border bg-card shadow-sm p-6">
                  <span className="text-4xl font-black text-muted-foreground/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">
                    {tSteps(`${id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tSteps(`${id}.description`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
