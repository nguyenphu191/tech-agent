'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import { DemoFilter } from '@/components/demos/demo-filter';
import { DemoSearch } from '@/components/demos/demo-search';
import { FASHION_PRODUCTS } from '@/data/demos';
import { useDemoFilter } from '@/hooks/use-demo-filter';

export default function FashionDemo() {
  const { filterState, filteredProducts, handleFilterChange, handleReset } = useDemoFilter({
    initialProducts: FASHION_PRODUCTS,
  });

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());
  const [quickView, setQuickView] = useState<typeof FASHION_PRODUCTS[0] | null>(null);

  const product = filteredProducts[carouselIndex] || filteredProducts[0];

  const nextProduct = () => {
    if (carouselIndex < filteredProducts.length - 1) {
      setCarouselIndex(carouselIndex + 1);
    }
  };

  const prevProduct = () => {
    if (carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    }
  };

  const toggleWishlist = (id: string) => {
    const newSet = new Set(wishlisted);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setWishlisted(newSet);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-900/20 via-gray-900 to-slate-900">
      <header className="border-b border-white/10 bg-gray-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300">
            SILK & CYBER
          </h1>
          <p className="text-gray-400 mt-3">Luxury Fashion Redefined</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {filteredProducts.length > 0 && product ? (
              <>
                <div className="relative bg-gradient-to-b from-white/5 to-white/0 backdrop-blur rounded-2xl border border-white/10 overflow-hidden aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5"></div>
                  <div className="relative z-10 text-center p-12">
                    <div className="text-6xl mb-4">{product.metadata?.emoji || '✨'}</div>
                    <p className="text-white/60 text-sm mb-2 uppercase tracking-wider font-semibold">{product.category}</p>
                    <h2 className="text-3xl font-bold text-white mb-4">{product.name}</h2>
                    <p className="text-rose-300 font-semibold">${product.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={prevProduct}
                    disabled={carouselIndex === 0}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 rounded-lg text-white transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 mx-auto" />
                  </button>
                  <span className="text-white/60 text-sm min-w-[60px] text-center">
                    {carouselIndex + 1} / {filteredProducts.length}
                  </span>
                  <button
                    onClick={nextProduct}
                    disabled={carouselIndex === filteredProducts.length - 1}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 rounded-lg text-white transition-all"
                  >
                    <ChevronRight className="w-5 h-5 mx-auto" />
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {filteredProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setCarouselIndex(idx)}
                      className={`aspect-square rounded-lg border-2 transition-all ${idx === carouselIndex ? 'border-rose-400 bg-rose-500/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
                    >
                      <span className="text-2xl">{p.metadata?.emoji || '✨'}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No items match your search</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {product && (
              <div className="bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur rounded-xl border border-white/10 p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{product.description}</p>

                {product.metadata && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    {Object.entries(product.metadata).filter(([k]) => k !== 'emoji').map(([key, value]) => {
                      const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
                      return (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-500 capitalize">{key}</span>
                          <span className="text-white font-medium">{displayValue}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-2 rounded-lg font-semibold transition-all text-sm">
                    Add to Bag
                  </button>
                  <button
                    onClick={() => product && toggleWishlist(product.id)}
                    className={`p-2 rounded-lg border transition-all ${
                      product && wishlisted.has(product.id)
                        ? 'bg-rose-600/20 border-rose-400 text-rose-400'
                        : 'border-white/10 text-gray-400 hover:text-rose-300'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={product && wishlisted.has(product.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => setQuickView(product)}
                    className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-all"
                    title="Quick View"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Search</label>
              <DemoSearch
                value={filterState.search}
                onChange={(value) => handleFilterChange({ ...filterState, search: value })}
                placeholder="Find styles..."
                accentColor="rose-500"
              />
            </div>

            <div className="bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur rounded-xl border border-white/10 p-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Refine</h4>
              <DemoFilter
                products={FASHION_PRODUCTS}
                filterState={filterState}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
                accentColor="rose-500"
              />
            </div>
          </div>
        </div>
      </div>

      {quickView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setQuickView(null)}
        >
          <div
            className="bg-gradient-to-b from-rose-900/40 via-gray-900 to-slate-900 rounded-xl p-8 max-w-md w-full border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-5xl">{quickView.metadata?.emoji || '✨'}</div>
              <button onClick={() => setQuickView(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{quickView.name}</h3>
            <p className="text-gray-300 text-sm mb-4">{quickView.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-rose-300">${quickView.price}</p>
              <button className="px-6 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold text-sm">
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
