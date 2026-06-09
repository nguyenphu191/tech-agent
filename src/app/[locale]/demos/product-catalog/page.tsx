'use client';

import React, { useState } from 'react';
import { DemoLayout } from '@/components/demos/demo-layout';
import { DemoFilter } from '@/components/demos/demo-filter';
import { DemoSearch } from '@/components/demos/demo-search';
import { CATALOG_PRODUCTS, getDemoBySlug } from '@/data/demos';
import { useDemoFilter, useDemoCart } from '@/hooks/use-demo-filter';
import { Star, ShoppingCart } from 'lucide-react';

function CatalogCard({ product, onViewDetails, onAddToCart }: {
  product: typeof CATALOG_PRODUCTS[0];
  onViewDetails: (p: typeof CATALOG_PRODUCTS[0]) => void;
  onAddToCart: (p: typeof CATALOG_PRODUCTS[0]) => void;
}) {
  return (
    <div className="group h-full flex flex-col bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/30 rounded-xl overflow-hidden transition-all duration-300">
      <div className="relative w-full h-48 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center overflow-hidden">
        <div className="text-6xl opacity-40 group-hover:opacity-60 transition-opacity">
          {product.metadata?.emoji || '📦'}
        </div>
        {product.badge && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.badge}
          </div>
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <p className="text-white/50 text-sm mb-2 capitalize">{product.category}</p>
        <h3
          className="text-white font-semibold text-base mb-2 line-clamp-2 hover:text-green-400 transition-colors cursor-pointer"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>

        {product.rating !== undefined && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-white/70 text-sm">({product.reviews || 0})</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <p className="text-2xl font-bold text-white">${product.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductCatalogDemo() {
  const demo = getDemoBySlug('product-catalog');
  const { filterState, filteredProducts, handleFilterChange, handleReset } = useDemoFilter({
    initialProducts: CATALOG_PRODUCTS,
  });
  const { addToCart } = useDemoCart();
  const [selectedProduct, setSelectedProduct] = useState<typeof CATALOG_PRODUCTS[0] | null>(null);

  if (!demo) return null;

  return (
    <DemoLayout
      title={demo.title}
      description={demo.description}
      gradient={demo.gradient}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <DemoFilter
              products={CATALOG_PRODUCTS}
              filterState={filterState}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              accentColor="green-500"
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-8">
            <DemoSearch
              value={filterState.search}
              onChange={(value) => handleFilterChange({ ...filterState, search: value })}
              placeholder="Search products..."
              accentColor="green-500"
            />
          </div>

          <p className="text-white/60 text-sm mb-6">
            Showing {filteredProducts.length} of {CATALOG_PRODUCTS.length} products
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <CatalogCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No products found matching your criteria</p>
              <button onClick={handleReset} className="mt-4 text-green-400 hover:text-green-300 transition-colors">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white/10 border border-white/20 rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-4">{selectedProduct.name}</h3>
            <p className="text-white/70 mb-6">{selectedProduct.description}</p>

            {selectedProduct.metadata && (
              <div className="space-y-4 mb-6">
                <h4 className="text-white font-semibold">Specifications:</h4>
                <ul className="space-y-2">
                  {Object.entries(selectedProduct.metadata).filter(([k]) => k !== 'emoji').map(([key, value]) => (
                    <li key={key} className="text-white/60 text-sm">
                      <span className="font-medium text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>{' '}
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <p className="text-3xl font-bold text-white">${selectedProduct.price.toFixed(2)}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DemoLayout>
  );
}
