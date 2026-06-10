'use client';

import React, { useState } from 'react';
import { MobileFrame } from './MobileFrame';
import { DemoFilter } from './demo-filter';
import { DemoSearch } from './demo-search';
import { ORDERING_PRODUCTS } from '@/data/demos';
import { useDemoFilter, useDemoCart } from '@/hooks/use-demo-filter';
import { Search, ShoppingBag, Star, Clock, MapPin, Plus, Flame, Wheat } from 'lucide-react';

function FoodCard({ product, onAddToCart }: { product: typeof ORDERING_PRODUCTS[0]; onAddToCart: (p: typeof ORDERING_PRODUCTS[0]) => void }) {
  return (
    <div className="bg-background border border-border rounded-[2rem] p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0 flex items-center justify-center text-white text-3xl">{product.metadata?.emoji || '🍽️'}</div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="font-bold text-sm mb-1">{product.name}</h3>
          <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground">
            {product.rating && <div className="flex items-center gap-1"><Star size={10} className="fill-yellow-400 text-yellow-400" /> {product.rating}</div>}
            {product.metadata?.prep && <div className="flex items-center gap-1"><Clock size={10} /> {product.metadata.prep}</div>}
            {product.metadata?.calories && <div className="flex items-center gap-1"><Flame size={10} className="text-orange-400" /> {product.metadata.calories}</div>}
            {product.metadata?.vegan && <div className="flex items-center gap-1"><Wheat size={10} className="text-green-500" /> Vegan</div>}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-black text-orange-500">${product.price.toFixed(2)}</span>
          {product.badge && <span className="text-[10px] font-bold text-orange-400 bg-orange-50 px-2 py-0.5 rounded-full">{product.badge}</span>}
          <button onClick={() => onAddToCart(product)} className="bg-foreground text-background p-2 rounded-xl hover:scale-110 transition-transform"><Plus size={16} /></button>
        </div>
      </div>
    </div>
  );
}

function FoodCardDesktop({ product, onAddToCart }: { product: typeof ORDERING_PRODUCTS[0]; onAddToCart: (p: typeof ORDERING_PRODUCTS[0]) => void }) {
  return (
    <div className="group bg-card hover:bg-muted/50 border border-border hover:border-primary/30 rounded-xl overflow-hidden transition-all duration-300">
      <div className="h-44 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
        <div className="text-5xl">{product.metadata?.emoji || '🍽️'}</div>
        {product.badge && <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">{product.badge}</span>}
      </div>
      <div className="p-4">
        <h3 className="text-foreground font-semibold text-sm mb-1">{product.name}</h3>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          {product.rating && <div className="flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400" /> {product.rating}</div>}
          {product.metadata?.prep && <div className="flex items-center gap-1"><Clock size={12} /> {product.metadata.prep}</div>}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          <button onClick={() => onAddToCart(product)} className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-xs font-semibold transition-colors">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export function DemoOrderingApp() {
  const { filterState, filteredProducts, handleFilterChange, handleReset } = useDemoFilter({
    initialProducts: ORDERING_PRODUCTS,
  });
  const { cart, addToCart } = useDemoCart();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('mobile');

  const renderMobileContent = () => (
    <MobileFrame title="Swift Order">
      <div className="px-6 py-4 space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-tight">Delivery to</p>
            <div className="flex items-center gap-1 font-bold text-sm"><MapPin size={14} className="text-orange-500" /> Tokyo, Shinjuku</div>
          </div>
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center relative">
            <ShoppingBag size={20} />
            {cart.length > 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">{cart.length}</div>}
          </div>
        </header>
        <h1 className="text-2xl font-black">What would you like <br /><span className="text-orange-500">to eat today?</span></h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input type="text" placeholder="Search food..." value={filterState.search} onChange={(e) => handleFilterChange({ ...filterState, search: e.target.value })} className="w-full bg-muted border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 ring-orange-500/20 outline-none" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'burgers', 'pizza', 'salads', 'desserts'].map((cat) => (
            <button key={cat} onClick={() => handleFilterChange({ ...filterState, category: cat === 'All' ? undefined : cat })} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${(cat === 'All' && !filterState.category) || filterState.category === cat ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{cat}</button>
          ))}
        </div>
        {filteredProducts.length > 0 ? (
          <div className="space-y-4">{filteredProducts.map((product) => (<FoodCard key={product.id} product={product} onAddToCart={addToCart} />))}</div>
        ) : (
          <div className="text-center py-8"><p className="text-muted-foreground text-sm">No items found</p></div>
        )}
      </div>
    </MobileFrame>
  );

  return (
    <div>
      <div className="flex gap-4 mb-8 justify-center">
        <button onClick={() => setViewMode('mobile')} className={`px-6 py-2 rounded-lg font-medium transition-colors ${viewMode === 'mobile' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-muted'}`}>📱 Mobile View</button>
        <button onClick={() => setViewMode('desktop')} className={`px-6 py-2 rounded-lg font-medium transition-colors ${viewMode === 'desktop' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-muted'}`}>🖥️ Desktop View</button>
      </div>
      {viewMode === 'mobile' ? (
        <div className="flex justify-center">{renderMobileContent()}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-20"><DemoFilter products={ORDERING_PRODUCTS} filterState={filterState} onFilterChange={handleFilterChange} onReset={handleReset} accentColor="orange-500" /></div>
          </div>
          <div className="lg:col-span-3">
            <div className="mb-8"><DemoSearch value={filterState.search} onChange={(value) => handleFilterChange({ ...filterState, search: value })} placeholder="Search menu items..." accentColor="orange-500" /></div>
            <p className="text-muted-foreground text-sm mb-6">Showing {filteredProducts.length} of {ORDERING_PRODUCTS.length} items</p>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredProducts.map((product) => (<FoodCardDesktop key={product.id} product={product} onAddToCart={addToCart} />))}</div>
            ) : (
              <div className="text-center py-12"><p className="text-muted-foreground text-lg">No menu items found</p><button onClick={handleReset} className="mt-4 text-primary hover:text-primary/80 transition-colors">Clear filters</button></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
