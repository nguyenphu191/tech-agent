'use client';

import React from 'react';

interface DemoShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  gradient?: string;
}

export function DemoShell({
  title,
  description,
  children,
  gradient = 'from-blue-600 to-cyan-600',
}: DemoShellProps) {
  return (
    <div className="flex-1">
      <div className={`bg-gradient-to-br ${gradient} border-b border-border py-16`}>
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
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
