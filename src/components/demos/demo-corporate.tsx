'use client';

import React, { useState } from 'react';
import { DemoFilter } from './demo-filter';
import { DemoSearch } from './demo-search';
import { CORPORATE_PRODUCTS } from '@/data/demos';
import { useDemoFilter } from '@/hooks/use-demo-filter';
import { Shield, Zap, Cpu, BarChart3, X, Check } from 'lucide-react';

function CorporateCard({ product, onViewDetails }: { product: typeof CORPORATE_PRODUCTS[0], onViewDetails: (p: typeof CORPORATE_PRODUCTS[0]) => void }) {
  const features = product.metadata ? Object.entries(product.metadata).filter(([k]) => k !== 'specs').slice(0, 3) : [];

  return (
    <div className="group bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">{product.category}</p>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{product.name}</h3>
          </div>
          {product.badge && (
            <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/30">{product.badge}</span>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="space-y-2 mb-6">
          {features.map(([key, value]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
              <span className="text-gray-300 font-medium">{String(value)}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-xs text-gray-500">Starting at</p>
            <p className="text-2xl font-bold text-white">${product.price}<span className="text-sm text-gray-500 font-normal">/mo</span></p>
          </div>
          <button onClick={() => onViewDetails(product)} className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-sm font-semibold transition-all">View Details</button>
        </div>
      </div>
    </div>
  );
}

export function DemoCorporate() {
  const { filterState, filteredProducts, handleFilterChange, handleReset } = useDemoFilter({
    initialProducts: CORPORATE_PRODUCTS,
  });
  const [selectedProduct, setSelectedProduct] = useState<typeof CORPORATE_PRODUCTS[0] | null>(null);

  const stats = [
    { icon: Shield, label: 'Security', value: '99.99%' },
    { icon: Zap, label: 'Performance', value: 'Enterprise' },
    { icon: Cpu, label: 'Scalability', value: 'Unlimited' },
    { icon: BarChart3, label: 'Uptime', value: '∞' },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="group bg-card border border-border rounded-lg p-4 transition-all">
            <Icon className="w-5 h-5 text-primary mb-3" />
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{label}</p>
            <p className="text-xl font-bold text-foreground mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <DemoSearch value={filterState.search} onChange={(value) => handleFilterChange({ ...filterState, search: value })} placeholder="Search solutions..." accentColor="cyan-500" />
        </div>
        <button onClick={handleReset} className="px-6 py-2 rounded-lg border border-border text-foreground hover:border-primary/30 hover:bg-card transition-all text-sm font-medium">Reset Filters</button>
      </div>

      <div className="flex gap-8">
        <div className="w-56 flex-shrink-0 max-h-fit sticky top-32">
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Filters</h3>
            <DemoFilter products={CORPORATE_PRODUCTS} filterState={filterState} onFilterChange={handleFilterChange} onReset={handleReset} accentColor="cyan-500" />
          </div>
        </div>

        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <CorporateCard key={product.id} product={product} onViewDetails={setSelectedProduct} />
                ))}
              </div>
              <div className="mt-8 text-center text-xs text-muted-foreground">Showing {filteredProducts.length} of {CORPORATE_PRODUCTS.length} solutions</div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">No solutions match your criteria</p>
              <button onClick={handleReset} className="text-primary hover:text-primary/80 transition-colors text-sm">Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-card border border-border rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold text-foreground">{selectedProduct.name}</h3>
                <p className="text-primary text-sm mt-2 font-medium">{selectedProduct.category}</p>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="text-muted-foreground hover:text-foreground transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">{selectedProduct.description}</p>
            <div className="bg-muted/30 rounded-lg p-6 mb-8 border border-border">
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-4">Technical Specifications</p>
              <p className="text-foreground text-sm leading-relaxed">{selectedProduct.metadata?.specs || selectedProduct.description}</p>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold transition-all">Deploy Solution</button>
              <button onClick={() => setSelectedProduct(null)} className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-3 rounded-lg font-medium transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
