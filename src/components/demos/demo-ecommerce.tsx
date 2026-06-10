'use client';

import React, { useState } from 'react';
import { DemoFilter } from './demo-filter';
import { DemoSearch } from './demo-search';
import { MARKETPLACE_VENDORS, MARKETPLACE_PRODUCTS } from '@/data/demos';
import { useDemoFilter, useDemoCart } from '@/hooks/use-demo-filter';
import { Star, Users, ShoppingCart, Truck, Store } from 'lucide-react';

function MarketplaceCard({ product, onViewDetails, onAddToCart }: {
  product: typeof MARKETPLACE_PRODUCTS[0];
  onViewDetails: (p: typeof MARKETPLACE_PRODUCTS[0]) => void;
  onAddToCart: (p: typeof MARKETPLACE_PRODUCTS[0]) => void;
}) {
  return (
    <div className="group bg-card hover:bg-muted/50 border border-border hover:border-primary/30 rounded-xl overflow-hidden transition-all duration-300">
      <div className="relative h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <div className="text-4xl">{product.metadata?.emoji || '📦'}</div>
        {product.badge && <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">{product.badge}</span>}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{product.metadata?.vendorName || 'Unknown Vendor'}</span>
          {product.rating && <span className="flex items-center gap-1 text-xs text-yellow-400"><Star className="w-3 h-3 fill-current" /> {product.rating}</span>}
        </div>
        <h3 className="text-foreground font-semibold text-sm mb-1 line-clamp-1 hover:text-primary transition-colors cursor-pointer" onClick={() => onViewDetails(product)}>{product.name}</h3>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-1">{product.description}</p>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
          {product.metadata?.shipping && <div className="flex items-center gap-1"><Truck className="w-3 h-3" /> {product.metadata.shipping}</div>}
          {product.metadata?.shipsFrom && <div className="flex items-center gap-1"><Store className="w-3 h-3" /> {product.metadata.shipsFrom}</div>}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
          <button onClick={() => onAddToCart(product)} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-xs font-semibold transition-colors"><ShoppingCart className="w-3.5 h-3.5" /> Add</button>
        </div>
      </div>
    </div>
  );
}

export function DemoEcommerce() {
  const { filterState, filteredProducts, handleFilterChange, handleReset } = useDemoFilter({
    initialProducts: MARKETPLACE_PRODUCTS,
  });
  const { addToCart } = useDemoCart();
  const [selectedProduct, setSelectedProduct] = useState<typeof MARKETPLACE_PRODUCTS[0] | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<typeof MARKETPLACE_VENDORS[0] | null>(null);

  return (
    <div>
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Featured Vendors</h2>
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKETPLACE_VENDORS.map((vendor) => (
            <button key={vendor.id} onClick={() => setSelectedVendor(vendor)} className={`text-left p-6 rounded-xl border transition-all ${selectedVendor?.id === vendor.id ? 'bg-primary/20 border-primary/50' : 'bg-card border-border hover:border-muted-foreground/30'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{vendor.avatar}</div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${vendor.rating >= 4.8 ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'}`}>
                  <Star className="w-3 h-3 fill-current" />{vendor.rating}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{vendor.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{vendor.description}</p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">📦 {vendor.products} products</div>
                <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {vendor.followers.toLocaleString()} followers</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedVendor && (
        <div className="bg-card border border-border rounded-xl p-8 mb-16">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{selectedVendor.name}</h3>
              <p className="text-muted-foreground">{selectedVendor.description}</p>
            </div>
            <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">Follow Vendor</button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-4 border border-primary/20">
              <p className="text-muted-foreground text-sm mb-2">Products</p>
              <p className="text-2xl font-bold text-primary">{selectedVendor.products}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/20">
              <p className="text-muted-foreground text-sm mb-2">Rating</p>
              <p className="text-2xl font-bold text-blue-400">{selectedVendor.rating.toFixed(1)}/5</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/20">
              <p className="text-muted-foreground text-sm mb-2">Followers</p>
              <p className="text-2xl font-bold text-purple-400">{(selectedVendor.followers / 1000).toFixed(1)}K</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-8">Marketplace Products</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <DemoFilter products={MARKETPLACE_PRODUCTS} filterState={filterState} onFilterChange={handleFilterChange} onReset={handleReset} accentColor="amber-500" />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="mb-8">
              <DemoSearch value={filterState.search} onChange={(value) => handleFilterChange({ ...filterState, search: value })} placeholder="Search products from all vendors..." accentColor="amber-500" />
            </div>
            <p className="text-muted-foreground text-sm mb-6">Showing {filteredProducts.length} of {MARKETPLACE_PRODUCTS.length} products</p>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <MarketplaceCard key={product.id} product={product} onViewDetails={setSelectedProduct} onAddToCart={addToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found</p>
                <button onClick={handleReset} className="mt-4 text-primary hover:text-primary/80 transition-colors">Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-card border border-border rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{selectedProduct.metadata?.vendorName || 'Vendor'}</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{selectedProduct.name}</h3>
            <p className="text-muted-foreground mb-6">{selectedProduct.description}</p>
            {selectedProduct.metadata && (
              <div className="space-y-4 mb-6">
                <h4 className="text-foreground font-semibold">Product Details:</h4>
                <ul className="space-y-2">
                  {Object.entries(selectedProduct.metadata).filter(([k]) => !['vendor', 'vendorName', 'emoji'].includes(k)).map(([key, value]) => (
                    <li key={key} className="text-muted-foreground text-sm"><span className="font-medium text-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {Array.isArray(value) ? value.join(', ') : String(value)}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-border pt-6">
              <p className="text-3xl font-bold text-foreground">${selectedProduct.price.toFixed(2)}</p>
              <div className="flex gap-3">
                <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium">Add to Cart</button>
                <button onClick={() => setSelectedProduct(null)} className="px-6 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-foreground transition-colors">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
