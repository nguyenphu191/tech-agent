"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { techLogos } from "@/data/tech-stack";

const stats = [
  { to: 20, suffix: "+", labelKey: "projects" as const },
  { to: 3, suffix: "+", labelKey: "experience" as const },
  { to: 100, suffix: "%", labelKey: "responsive" as const },
  { to: 0, labelKey: "delivery" as const, textValue: "Fast" },
];

export function SocialProofSection() {
  const t = useTranslations("home.stats");

  return (
    <Reveal>
      <section className="border-y border-border bg-muted/30 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.labelKey} className="text-center lg:text-left">
                <p className="text-3xl font-bold text-gradient">
                  {s.textValue ?? <AnimatedCounter from={0} to={s.to} suffix={s.suffix} />}
                </p>
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
