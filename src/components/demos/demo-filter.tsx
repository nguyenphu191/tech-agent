'use client';

import React from 'react';
import { DemoFilterState, DemoProduct } from '@/types';
import { Button } from '@/components/ui/button';

interface DemoFilterProps {
  products: DemoProduct[];
  filterState: DemoFilterState;
  onFilterChange: (filters: DemoFilterState) => void;
  onReset?: () => void;
  accentColor?: string;
}

/**
 * DemoFilter - Product filtering component
 * Provides category, price range, and rating filters
 */
export function DemoFilter({
  products,
  filterState,
  onFilterChange,
  onReset,
  accentColor = 'blue-500',
}: DemoFilterProps) {
  const categories = Array.from(
    new Set(products.map((p) => p.category)),
  ).sort();

  const maxPrice = Math.max(...products.map((p) => p.price));
  const minPrice = Math.min(...products.map((p) => p.price));

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filterState,
      category: filterState.category === category ? undefined : category,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onFilterChange({
      ...filterState,
      maxPrice: value,
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filterState,
      minRating: filterState.minRating === rating ? undefined : rating,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filterState,
      sortBy: e.target.value as DemoFilterState['sortBy'],
    });
  };

  const accent = {
    'blue-500': { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400', accent: 'accent-blue-500' },
    'cyan-500': { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400', accent: 'accent-cyan-500' },
    'green-500': { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400', accent: 'accent-green-500' },
    'amber-500': { bg: 'bg-amber-500/20', border: 'border-amber-500/50', text: 'text-amber-400', accent: 'accent-amber-500' },
    'orange-500': { bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-400', accent: 'accent-orange-500' },
    'rose-500': { bg: 'bg-rose-500/20', border: 'border-rose-500/50', text: 'text-rose-400', accent: 'accent-rose-500' },
    'indigo-500': { bg: 'bg-indigo-500/20', border: 'border-indigo-500/50', text: 'text-indigo-400', accent: 'accent-indigo-500' },
  };
  const ac = accent[accentColor as keyof typeof accent] || accent['blue-500'];

  const hasActiveFilters =
    filterState.category ||
    filterState.minPrice ||
    filterState.maxPrice ||
    filterState.minRating;

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-white/60 hover:text-white text-xs"
          >
            Reset
          </Button>
        )}
      </div>

      {/* Sort */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-white/70">Sort</label>
        <select
          value={filterState.sortBy || 'newest'}
          onChange={handleSortChange}
          className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/20 transition-colors"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-white/70">
            Category
          </label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filterState.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className={`w-4 h-4 rounded border-white/20 bg-white/5 ${ac.accent}`}
                />
                <span className="text-sm text-white/70 group-hover:text-white transition-colors capitalize">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-white/70">
          Max Price: ${filterState.maxPrice?.toFixed(2) || maxPrice.toFixed(2)}
        </label>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={10}
          value={filterState.maxPrice || maxPrice}
          onChange={handlePriceChange}
          className={`w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer ${ac.accent}`}
        />
        <div className="flex justify-between text-xs text-white/50">
          <span>${minPrice.toFixed(2)}</span>
          <span>${maxPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-white/70">
          Minimum Rating
        </label>
        <div className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                filterState.minRating === rating
                  ? `${ac.bg} ${ac.text} border ${ac.border}`
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {rating}+ Stars ({rating === 5 ? '5 stars' : `${rating} stars & up`})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
