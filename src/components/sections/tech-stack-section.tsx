"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  techStackByGroup,
  techStackGroupIds,
} from "@/data/tech-stack";

export function TechStackSection() {
  const reduce = useReducedMotion();
  const t = useTranslations("home.tech");
  const tGroups = useTranslations("home.tech.groups");

  const row = techStackGroupIds.flatMap((id) =>
    techStackByGroup[id].map((item) => `${tGroups(id)}: ${item}`),
  );
  const doubled = [...row, ...row];

  return (
    <section className="overflow-hidden border-y border-border py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {t("eyebrow")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-2xl font-bold tracking-tight">
          {t("title")}
        </p>
      </div>
      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          className="flex gap-4"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduce
              ? undefined
              : { duration: 28, repeat: Infinity, ease: "linear" }
          }
        >
          {doubled.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="shrink-0 rounded-full border border-border bg-secondary px-5 py-2 text-sm text-secondary-foreground"
            >
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
