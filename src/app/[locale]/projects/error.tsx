"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <span className="text-6xl font-bold text-gradient">!</span>
        <h1 className="mt-4 text-2xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">
          We couldn&apos;t load the projects. Please try again.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button variant="outline" className="rounded-full" onClick={reset}>
            Try again
          </Button>
          <Button className="rounded-full" onClick={() => window.location.href = "/"}>
            Go home
          </Button>
        </div>
      </div>
    </main>
  );
}
