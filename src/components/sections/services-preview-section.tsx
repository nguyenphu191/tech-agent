"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { serviceList } from "@/data/services";

export function ServicesPreviewSection() {
  const t = useTranslations("home.services");
  const tc = useTranslations("servicesPage.cards");

  return (
    <Reveal>
      <section
        id="services"
        className="scroll-mt-24 px-4 py-20 sm:px-6 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {serviceList.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.id} delay={i * 0.05}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md hover:shadow-primary/5">
                    {/* Background image effect */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-30">
                      <img
                        src={s.images[0]}
                        alt={tc(`${s.id}.title`)}
                        className="h-full w-full object-cover blur-sm"
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 backdrop-blur-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg shadow-current/20`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold">
                        {tc(`${s.id}.title`)}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {tc(`${s.id}.description`)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.tech.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground transition-colors hover:bg-secondary/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        href="/services"
                        className="mt-4 inline-flex text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
                      >
                        {t("detailLink")}
                      </Link>
                    </div>

                    {/* Image preview thumbnails */}
                    <div className="absolute bottom-0 left-0 right-0 flex gap-1 border-t border-border bg-gradient-to-t from-background/90 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {s.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="h-8 w-8 flex-shrink-0 overflow-hidden rounded border border-border bg-muted"
                        >
                          <img
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/services">{t("viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
