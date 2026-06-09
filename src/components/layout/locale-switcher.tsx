"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const localeKeys = routing.locales;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");

  return (
    <Select
      value={locale}
      onValueChange={(next) => {
        if (next) router.replace(pathname, { locale: next });
      }}
    >
      <SelectTrigger
        className="glass h-8 w-[140px] border-border text-xs md:w-[160px]"
        aria-label={t("label")}
      >
        <SelectValue placeholder={t("label")} />
      </SelectTrigger>
      <SelectContent>
        {localeKeys.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {t(loc as "vi" | "en" | "fr" | "zh" | "de")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
