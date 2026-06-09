"use client";

import { useMemo, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormFeedback, useToast } from "@/components/ui/form-feedback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  website?: string;
};

const STORAGE_KEY = "contact_form_draft";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | undefined>(undefined);
  const { addToast } = useToast();
  const t = useTranslations("form");

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("errors.name")),
        email: z.string().email(t("errors.email")),
        phone: z.string().min(8, t("errors.phone")),
        projectType: z.string().min(1, t("errors.projectType")),
        budget: z.string().min(1, t("errors.budget")),
        timeline: z.string().min(1, t("errors.timeline")),
        message: z.string().min(10, t("errors.message")),
        website: z.string().max(0).optional(),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectType: "",
      budget: "",
      timeline: "",
      website: "",
    },
  });

  // Load form from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        Object.keys(data).forEach((key) => {
          const input = document.querySelector(`[name="${key}"]`) as HTMLInputElement;
          if (input) {
            input.value = data[key];
          }
        });
      }
    } catch (e) {
      console.error("Failed to load form from localStorage");
    }
  }, []);

  // Save form to localStorage on change (debounced)
  useEffect(() => {
    const subscription = watch((data) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save form to localStorage");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  async function onSubmit(data: FormValues) {
    setStatus("loading");
    setFeedback(undefined);
    
    // Honeypot check
    if (data.website) {
      setStatus("success");
      setFeedback(t("success"));
      addToast(t("success"), "success", 5000);
      reset();
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error("fail");
      
      setStatus("success");
      setFeedback(t("success"));
      addToast(t("success"), "success", 5000);
      reset();
      localStorage.removeItem(STORAGE_KEY);
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      const errorMsg = t("error");
      setFeedback(errorMsg);
      addToast(errorMsg, "error", 5000);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
        {...register("website")}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("name")} *</Label>
          <Input id="name" {...register("name")} className="bg-background/50" />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")} *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="bg-background/50"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("phone")} *</Label>
        <Input id="phone" {...register("phone")} className="bg-background/50" />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>{t("projectType")} *</Label>
          <Controller
            name="projectType"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(v) => {
                  if (v) field.onChange(v);
                }}
              >
                <SelectTrigger className="w-full bg-background/50">
                  <SelectValue placeholder={t("selectPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">{t("projectTypes.web")}</SelectItem>
                  <SelectItem value="mobile">{t("projectTypes.mobile")}</SelectItem>
                  <SelectItem value="uiux">{t("projectTypes.uiux")}</SelectItem>
                  <SelectItem value="backend">
                    {t("projectTypes.backend")}
                  </SelectItem>
                  <SelectItem value="other">{t("projectTypes.other")}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.projectType && (
            <p className="text-xs text-destructive">
              {errors.projectType.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label>{t("budget")} *</Label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(v) => {
                  if (v) field.onChange(v);
                }}
              >
                <SelectTrigger className="w-full bg-background/50">
                  <SelectValue placeholder={t("selectPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under15">{t("budgets.under15")}</SelectItem>
                  <SelectItem value="15-45">{t("budgets.15-45")}</SelectItem>
                  <SelectItem value="45-100">{t("budgets.45-100")}</SelectItem>
                  <SelectItem value="100+">{t("budgets.100+")}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.budget && (
            <p className="text-xs text-destructive">{errors.budget.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t("timeline")} *</Label>
        <Controller
          name="timeline"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(v) => {
                if (v) field.onChange(v);
              }}
            >
              <SelectTrigger className="w-full bg-background/50">
                <SelectValue placeholder={t("selectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">{t("timelines.asap")}</SelectItem>
                <SelectItem value="1m">{t("timelines.1m")}</SelectItem>
                <SelectItem value="2-3m">{t("timelines.2-3m")}</SelectItem>
                <SelectItem value="flex">{t("timelines.flex")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.timeline && (
          <p className="text-xs text-destructive">{errors.timeline.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("message")} *</Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          className="min-h-[120px] resize-y bg-background/50"
          placeholder={t("placeholderMessage")}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <FormFeedback status={status} message={feedback} />

      <Button
        type="submit"
        disabled={isSubmitting || status === "loading" || status === "success"}
        className="w-full rounded-full sm:w-auto"
      >
        {status === "loading" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
