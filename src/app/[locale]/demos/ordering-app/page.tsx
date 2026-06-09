'use client';

import React, { useState } from 'react';
import { MobileFrame } from '@/components/demos/MobileFrame';
import { DemoLayout } from '@/components/demos/demo-layout';
import { DemoFilter } from '@/components/demos/demo-filter';
import { DemoSearch } from '@/components/demos/demo-search';
import { ORDERING_PRODUCTS, getDemoBySlug } from '@/data/demos';
import { useDemoFilter, useDemoCart } from '@/hooks/use-demo-filter';
import { Search, ShoppingBag, Star, Clock, MapPin, Plus, Flame, Wheat } from 'lucide-react';


function FoodCard({ product, onAddToCart }: {
  product: typeof ORDERING_PRODUCTS[0];
  onAddToCart: (p: typeof ORDERING_PRODUCTS[0]) => void;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-[2rem] p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0 flex items-center justify-center text-white text-3xl">
        {product.metadata?.emoji || '🍽️'}
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="font-bold text-sm mb-1">{product.name}</h3>
          <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-yellow-400 text-yellow-400" /> {product.rating}
              </div>
            )}
            {product.metadata?.prep && (
              <div className="flex items-center gap-1">
                <Clock size={10} /> {product.metadata.prep}
              </div>
            )}
            {product.metadata?.calories && (
              <div className="flex items-center gap-1">
                <Flame size={10} className="text-orange-400" /> {product.metadata.calories}
              </div>
            )}
            {product.metadata?.vegan && (
              <div className="flex items-center gap-1">
                <Wheat size={10} className="text-green-500" /> Vegan
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-black text-orange-500">${product.price.toFixed(2)}</span>
          {product.badge && (
            <span className="text-[10px] font-bold text-orange-400 bg-orange-50 px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
          <button
            onClick={() => onAddToCart(product)}
            className="bg-black text-white p-2 rounded-xl hover:scale-110 transition-transform"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function FoodCardDesktop({ product, onAddToCart }: {
  product: typeof ORDERING_PRODUCTS[0];
  onAddToCart: (p: typeof ORDERING_PRODUCTS[0]) => void;
}) {
  return (
    <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-xl overflow-hidden transition-all duration-300">
      <div className="h-44 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center relative">
        <div className="text-5xl">{product.metadata?.emoji || '🍽️'}</div>
        {product.badge && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-1">{product.name}</h3>
        <p className="text-white/60 text-xs mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" /> {product.rating}
            </div>
          )}
          {product.metadata?.prep && (
            <div className="flex items-center gap-1">
              <Clock size={12} /> {product.metadata.prep}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-lg font-bold text-orange-400">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrderingAppDemo() {
  const demo = getDemoBySlug('ordering-app');
  const { filterState, filteredProducts, handleFilterChange, handleReset } = useDemoFilter({
    initialProducts: ORDERING_PRODUCTS,
  });
  const { cart, addToCart } = useDemoCart();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('mobile');

  if (!demo) return null;

  const renderMobileContent = () => (
    <MobileFrame title="Swift Order">
      <div className="px-6 py-4 space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Delivery to</p>
            <div className="flex items-center gap-1 font-bold text-sm">
              <MapPin size={14} className="text-orange-500" /> Tokyo, Shinjuku
            </div>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center relative">
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">
                {cart.length}
              </div>
            )}
          </div>
        </header>

        <h1 className="text-2xl font-black">
          What would you like <br />
          <span className="text-orange-500">to eat today?</span>
        </h1>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search food..."
            value={filterState.search}
            onChange={(e) => handleFilterChange({ ...filterState, search: e.target.value })}
            className="w-full bg-gray-100 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 ring-orange-500/20 outline-none"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'burgers', 'pizza', 'salads', 'desserts'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange({ ...filterState, category: cat === 'All' ? undefined : cat })}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                (cat === 'All' && !filterState.category) || filterState.category === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <FoodCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No items found</p>
          </div>
        )}
      </div>
    </MobileFrame>
  );

  return (
    <DemoLayout
      title={demo.title}
      description={demo.description}
      gradient={demo.gradient}
    >
      <div className="flex gap-4 mb-8 justify-center">
        <button
          onClick={() => setViewMode('mobile')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            viewMode === 'mobile'
              ? 'bg-orange-500 text-white'
              : 'bg-white/5 text-white/70 hover:bg-white/10'
          }`}
        >
          📱 Mobile View
        </button>
        <button
          onClick={() => setViewMode('desktop')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            viewMode === 'desktop'
              ? 'bg-orange-500 text-white'
              : 'bg-white/5 text-white/70 hover:bg-white/10'
          }`}
        >
          🖥️ Desktop View
        </button>
      </div>

      {viewMode === 'mobile' ? (
        <div className="flex justify-center">
          {renderMobileContent()}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <DemoFilter
                products={ORDERING_PRODUCTS}
                filterState={filterState}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
                accentColor="orange-500"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-8">
              <DemoSearch
                value={filterState.search}
                onChange={(value) => handleFilterChange({ ...filterState, search: value })}
                placeholder="Search menu items..."
                accentColor="orange-500"
              />
            </div>

            <p className="text-white/60 text-sm mb-6">
              Showing {filteredProducts.length} of {ORDERING_PRODUCTS.length} items
            </p>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <FoodCardDesktop key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">No menu items found</p>
                <button onClick={handleReset} className="mt-4 text-orange-400 hover:text-orange-300 transition-colors">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </DemoLayout>
  );
}
