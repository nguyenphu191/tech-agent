import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFoundPage() {
  const t = useTranslations("meta");

  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <span className="text-8xl font-bold text-gradient">404</span>
        <h1 className="mt-4 text-2xl font-bold">{t("notFound")}</h1>
        <p className="mt-3 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
