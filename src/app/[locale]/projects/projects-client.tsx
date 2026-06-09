"use client";

import { useMemo, useState, useCallback, Suspense } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Project, ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

const filterIds: { id: ProjectCategory | "all"; labelKey: string }[] = [
  { id: "all", labelKey: "filterAll" },
  { id: "web", labelKey: "web" },
  { id: "mobile", labelKey: "mobile" },
  { id: "uiux", labelKey: "uiux" },
  { id: "dashboard", labelKey: "dashboard" },
];

function ProjectsContent({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("projectsPage");
  const tCat = useTranslations("categories");

  const initialFilter = (searchParams.get("category") as ProjectCategory | null) ?? "all";
  const [filter, setFilter] = useState<ProjectCategory | "all">(
    filterIds.some((f) => f.id === initialFilter) ? initialFilter : "all",
  );

  const list = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  const handleFilterChange = useCallback(
    (id: ProjectCategory | "all") => {
      setFilter(id);
      const params = new URLSearchParams(searchParams.toString());
      if (id === "all") {
        params.delete("category");
      } else {
        params.set("category", id);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  return (
    <main className="flex-1 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filterIds.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFilterChange(f.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  filter === f.id
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20",
                )}
              >
                {f.id === "all" ? t("filterAll") : tCat(f.id)}
              </button>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {list.length} {list.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {list.length > 0 ? (
          <div className="mt-12 columns-1 gap-6 sm:columns-2">
            {list.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group mb-6 block break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-card/30 transition-all hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {tCat(p.category)}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">
                    {p.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {p.shortDescription}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-white/5 px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-sm">
              <span className="text-5xl">🔍</span>
              <h2 className="mt-4 text-xl font-semibold">No projects found</h2>
              <p className="mt-2 text-muted-foreground">
                No projects match the selected category. Try a different filter.
              </p>
              <button
                type="button"
                onClick={() => handleFilterChange("all")}
                className="mt-6 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium transition-colors hover:border-white/20"
              >
                Show all projects
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export function ProjectsClient({ projects }: { projects: Project[] }) {
  return (
    <Suspense>
      <ProjectsContent projects={projects} />
    </Suspense>
  );
}
