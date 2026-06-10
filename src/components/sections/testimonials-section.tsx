"use client";

import { useState, useEffect, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

const itemIds = ["a", "b", "c"] as const;
const INTERVAL = 5000;

export function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const ti = useTranslations("home.testimonials.items");
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % itemIds.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + itemIds.length) % itemIds.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  return (
    <Reveal>
      <section className="px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                {t("subtitle")}
              </p>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative mt-12 min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-sm"
              >
                <Quote className="h-8 w-8 text-primary/60" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{ti(`${itemIds[current]}.quote`)}&rdquo;
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-semibold">
                    {ti(`${itemIds[current]}.author`)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ti(`${itemIds[current]}.role`)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {itemIds.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
