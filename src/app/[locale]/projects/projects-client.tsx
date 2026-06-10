"use client";

import { useMemo, useState, useCallback, Suspense } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import type { WorkItem, WorkType } from "@/data/works";
import { cn } from "@/lib/utils";
import { SearchX, Sparkles } from "lucide-react";

const typeFilters: { id: WorkType | "all"; labelKey: string }[] = [
  { id: "all", labelKey: "filterAll" },
  { id: "case-study", labelKey: "caseStudies" },
  { id: "demo", labelKey: "interactiveDemos" },
];

function getUniqueCategories(items: WorkItem[]): string[] {
  return Array.from(new Set(items.map((w) => w.category))).sort();
}

function WorkCard({ item }: { item: WorkItem }) {
  if (item.type === "demo") {
    return (
      <Link
        href={`/projects/${item.slug}`}
        className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10"
      >
        <div
          className={cn(
            "relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] flex items-center justify-center bg-gradient-to-br",
            item.gradient || "from-primary to-accent",
          )}
        >
          <Sparkles className="h-16 w-16 text-white/40" />
          <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            Interactive Demo
          </span>
        </div>
        <div className="p-5">
          <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">
            {item.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {item.shortDescription}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded bg-secondary px-2 py-0.5 text-xs capitalize text-muted-foreground">
              {item.category}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${item.slug}`}
      className="group mb-6 block break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
        <SafeImage
          src={item.coverImage || "/images/default.png"}
          alt={item.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
          fallback="/images/default.png"
        />
        <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {item.category}
        </span>
      </div>
      <div className="p-5">
        <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">
          {item.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {item.shortDescription}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tech?.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ProjectsContent({ items }: { items: WorkItem[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("projectsPage");

  const initialType = (searchParams.get("type") as WorkType | null) ?? "all";
  const [typeFilter, setTypeFilter] = useState<WorkType | "all">(
    typeFilters.some((f) => f.id === initialType) ? initialType : "all",
  );

  const initialCat = searchParams.get("category") ?? "all";
  const [catFilter, setCatFilter] = useState<string>("all");

  const typeFiltered = useMemo(() => {
    if (typeFilter === "all") return items;
    return items.filter((w) => w.type === typeFilter);
  }, [typeFilter, items]);

  const categories = useMemo(() => getUniqueCategories(typeFiltered), [typeFiltered]);
  const catInitial = categories.includes(initialCat) ? initialCat : "all";
  const [categoryFilter, setCategoryFilter] = useState<string>(catInitial);

  const list = useMemo(() => {
    if (categoryFilter === "all") return typeFiltered;
    return typeFiltered.filter((w) => w.category === categoryFilter);
  }, [categoryFilter, typeFiltered]);

  const handleTypeChange = useCallback(
    (id: WorkType | "all") => {
      setTypeFilter(id);
      setCategoryFilter("all");
      const params = new URLSearchParams(searchParams.toString());
      params.delete("category");
      if (id === "all") {
        params.delete("type");
      } else {
        params.set("type", id);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const handleCategoryChange = useCallback(
    (id: string) => {
      setCategoryFilter(id);
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
            {typeFilters.map((f) => (
              <Button
                key={f.id}
                type="button"
                variant="filter"
                onClick={() => handleTypeChange(f.id)}
                className={cn(
                  typeFilter === f.id && "border-primary bg-primary/10 text-primary",
                )}
              >
                {t(f.labelKey)}
              </Button>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {list.length} {list.length === 1 ? "item" : "items"}
          </span>
        </div>

        {categories.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                categoryFilter === "all"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary",
              )}
            >
              {t("filterAll")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors",
                  categoryFilter === cat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {list.length > 0 ? (
          <div className="mt-12 columns-1 gap-6 sm:columns-2">
            {list.map((item) => (
              <WorkCard key={`${item.type}-${item.slug}`} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-sm">
              <SearchX className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">{t("emptyTitle")}</h2>
              <p className="mt-2 text-muted-foreground">
                {t("emptyDescription")}
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  handleTypeChange("all");
                  handleCategoryChange("all");
                }}
                className="mt-6"
              >
                {t("showAll")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export function ProjectsClient({ items }: { items: WorkItem[] }) {
  return (
    <Suspense>
      <ProjectsContent items={items} />
    </Suspense>
  );
}
