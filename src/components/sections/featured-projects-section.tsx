"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";

type Props = { projects: Project[] };

export function FeaturedProjectsSection({ projects }: Props) {
  const t = useTranslations("home.projects");
  const tCat = useTranslations("categories");

  return (
    <Reveal>
      <section
        id="projects"
        className="scroll-mt-24 bg-muted/30 px-4 py-20 sm:px-6 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
            </div>
            <Button asChild variant="outline" className="shrink-0 rounded-full">
              <Link href="/projects">{t("viewAll")}</Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                    <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                      {tCat(p.category)}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {p.shortDescription}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {t("timeline", { time: p.timeline })}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
