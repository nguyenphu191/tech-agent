"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { techLogos } from "@/data/tech-stack";

const statKeys = [
  { value: "20+", labelKey: "projects" as const },
  { value: "3+", labelKey: "experience" as const },
  { value: "100%", labelKey: "responsive" as const },
  { value: "Fast", labelKey: "delivery" as const },
];

export function SocialProofSection() {
  const t = useTranslations("home.stats");

  return (
    <Reveal>
      <section className="border-y border-border bg-muted/30 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {statKeys.map((s) => (
              <div key={s.labelKey} className="text-center lg:text-left">
                <p className="text-3xl font-bold text-gradient">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(s.labelKey)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-between">
            {techLogos.map((name) => (
              <span
                key={name}
                className="rounded-full border border-border bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
