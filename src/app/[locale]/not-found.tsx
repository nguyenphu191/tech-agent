import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ParticleNetwork } from "@/components/animations/ParticleNetwork";

export default function NotFoundPage() {
  const t = useTranslations("meta");

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4">
      <ParticleNetwork variant="light" />
      <div className="relative z-10 mx-auto max-w-md text-center">
        <svg className="mx-auto h-32 w-32 text-muted-foreground/30" viewBox="0 0 128 128" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="64" cy="64" r="56" strokeDasharray="8 4" />
          <path d="M48 48 L80 80 M80 48 L48 80" strokeLinecap="round" />
          <circle cx="64" cy="64" r="40" strokeDasharray="4 6" opacity="0.5" />
        </svg>
        <h1 className="mt-6 text-7xl font-bold text-gradient">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="cta">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
