'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface DemoLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  gradient?: string;
}

/**
 * DemoLayout - Shared wrapper for all demo pages
 * Provides consistent breadcrumb, hero, and layout
 * Header/footer are rendered by [locale]/layout.tsx
 */
export function DemoLayout({
  title,
  description,
  children,
  gradient = 'from-blue-600 to-cyan-600',
}: DemoLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Breadcrumb */}
      <div className="sticky top-16 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-7xl items-center gap-2 px-4 text-sm sm:px-6 lg:px-8">
          <Link href="/demos" className="text-muted-foreground transition-colors hover:text-foreground">
            Demos
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
          <span className="text-foreground">{title}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className={`bg-gradient-to-br ${gradient} border-b border-border py-12`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Demo Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
