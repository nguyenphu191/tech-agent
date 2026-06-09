"use client";

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

export function ServicesFaq({ items }: { items: FaqItem[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mt-8 w-full space-y-2"
    >
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          value={`item-${i}`}
          className="rounded-xl border border-white/10 bg-card/30 px-4"
        >
          <AccordionHeader>
            <AccordionTrigger
              className={cn(
                "group flex w-full items-center justify-between py-4 text-left text-sm font-medium outline-none",
                "hover:text-primary data-[state=open]:text-primary",
              )}
            >
              {item.q}
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent className="overflow-hidden pb-4 text-sm leading-relaxed text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
