'use client';

import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface DemoSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  accentColor?: string;
}

export function DemoSearch({
  value,
  onChange,
  placeholder = 'Search products...',
  debounceMs = 300,
  accentColor = 'blue-500',
}: DemoSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setLocalValue(value), 0);
    return () => clearTimeout(id);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, onChange, debounceMs]);

  const focusRing = {
    'blue-500': 'focus:ring-blue-500/20',
    'cyan-500': 'focus:ring-cyan-500/20',
    'green-500': 'focus:ring-green-500/20',
    'amber-500': 'focus:ring-amber-500/20',
    'orange-500': 'focus:ring-orange-500/20',
    'rose-500': 'focus:ring-rose-500/20',
    'indigo-500': 'focus:ring-indigo-500/20',
  }[accentColor] || 'focus:ring-blue-500/20';

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 hover:border-white/20 focus:border-white/30 text-white rounded-lg transition-colors outline-none ${focusRing}`}
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
