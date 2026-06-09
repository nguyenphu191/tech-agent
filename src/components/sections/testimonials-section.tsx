"use client";

import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

const itemIds = ["a", "b", "c"] as const;

export function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const ti = useTranslations("home.testimonials.items");

  return (
    <Reveal>
      <section className="px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {itemIds.map((id, i) => (
              <Reveal key={id} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card shadow-sm p-6">
                  <Quote className="h-8 w-8 text-primary/60" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    “{ti(`${id}.quote`)}”
                  </p>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-semibold">{ti(`${id}.author`)}</p>
                    <p className="text-xs text-muted-foreground">
                      {ti(`${id}.role`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
