"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const reduce = useReducedMotion();
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-10 sm:px-6 sm:pt-14 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
        <div>
          <motion.p
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {t("badge")}
          </motion.p>
          <motion.h1
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {t("titleBefore")}{" "}
            <span className="text-gradient">{t("titleHighlight")}</span>{" "}
            {t("titleAfter")}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg text-muted-foreground"
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Button
              asChild
              size="lg"
              variant="cta"
            >
              <Link href="/contact">
                {t("primaryCta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full"
            >
              <Link href="/projects">{t("secondaryCta")}</Link>
            </Button>
          </motion.div>
        </div>

        <HeroVisual reduceMotion={!!reduce} />
      </div>
    </section>
  );
}

function HeroVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const t = useTranslations("home.hero");
  return (
    <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
      <div className="relative aspect-square max-h-[420px] sm:aspect-[4/3]">
        <div className="absolute inset-0 rounded-3xl border border-border bg-gradient-to-br from-card via-card/80 to-primary/5 shadow-2xl shadow-primary/5" />
        <motion.div
          className="absolute left-[8%] top-[12%] w-[55%] rounded-2xl border border-border bg-muted/80 p-4 shadow-xl backdrop-blur-md"
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -10, 0], rotate: [-1, 0.5, -1] }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-3/4 rounded bg-border" />
            <div className="h-2 w-1/2 rounded bg-border/50" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-16 rounded-lg bg-primary/20" />
              <div className="h-16 rounded-lg bg-accent/20" />
              <div className="h-16 rounded-lg bg-muted-foreground/20" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-[14%] right-[6%] w-[48%] rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/25 to-accent/20 p-4 shadow-xl backdrop-blur-md"
          animate={
            reduceMotion ? undefined : { y: [0, 12, 0], rotate: [1, -0.5, 1] }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <p className="text-xs font-medium text-foreground">
            {t("perfLabel")}
          </p>
          <p className="mt-1 text-2xl font-bold text-foreground">{t("perfScore")}</p>
          <p className="text-xs text-muted-foreground">{t("perfHint")}</p>
        </motion.div>
      </div>
    </div>
  );
}
