'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

interface DemoLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  gradient?: string; // Tailwind gradient class
}

/**
 * DemoLayout - Shared wrapper for all demo pages
 * Provides consistent header, footer, breadcrumb, and layout
 */
export function DemoLayout({
  title,
  description,
  children,
  gradient = 'from-blue-600 to-cyan-600',
}: DemoLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="sticky top-16 z-40 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-2 text-sm">
          <Link href="/demos" className="text-white/60 hover:text-white transition-colors">
            Demos
          </Link>
          <ChevronRight className="w-4 h-4 text-white/40" />
          <span className="text-white">{title}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className={`bg-gradient-to-br ${gradient} bg-opacity-10 border-b border-white/10 py-12`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-white/70 text-lg max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Demo Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
