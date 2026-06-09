import {
  Building2,
  Sparkles,
  Zap,
  ShoppingCart,
  MapPin,
  BookOpen,
  Store,
  Globe,
} from 'lucide-react';
import { Demo, DemoProduct } from '@/types';

// Import individual demo data
import { CORPORATE_PRODUCTS, CORPORATE_USERS, CORPORATE_ORDERS } from './demos/corporate';
import { FASHION_PRODUCTS, FASHION_USERS, FASHION_ORDERS } from './demos/fashion';
import { ORDERING_PRODUCTS, ORDERING_USERS, ORDERING_ORDERS } from './demos/ordering-app';
import { CATALOG_PRODUCTS, CATALOG_USERS, CATALOG_ORDERS } from './demos/product-catalog';
import { DRIVER_DRIVERS, DRIVER_RIDES } from './demos/driver-app';
import { NOTES_FOLDERS, NOTES_ITEMS } from './demos/note-app';
import { MARKETPLACE_VENDORS, MARKETPLACE_PRODUCTS, MARKETPLACE_ORDERS } from './demos/ecommerce';
import { LANGUAGE_COURSES } from './demos/language-app';

// Re-export individual data
export { CORPORATE_PRODUCTS, CORPORATE_USERS, CORPORATE_ORDERS } from './demos/corporate';
export { FASHION_PRODUCTS, FASHION_USERS, FASHION_ORDERS } from './demos/fashion';
export { ORDERING_PRODUCTS, ORDERING_USERS, ORDERING_ORDERS } from './demos/ordering-app';
export { CATALOG_PRODUCTS, CATALOG_USERS, CATALOG_ORDERS } from './demos/product-catalog';
export { DRIVER_DRIVERS, DRIVER_RIDES } from './demos/driver-app';
export { NOTES_FOLDERS, NOTES_ITEMS } from './demos/note-app';
export { MARKETPLACE_VENDORS, MARKETPLACE_PRODUCTS, MARKETPLACE_ORDERS } from './demos/ecommerce';
export { LANGUAGE_COURSES } from './demos/language-app';

// ============================================================================
// DEMO CATALOG (metadata for overview page)
// ============================================================================

export const DEMO_CATALOG: Demo[] = [
  {
    slug: 'corporate',
    title: 'Corporate Identity',
    description: 'Enterprise SaaS platform showcase with analytics and integrations',
    category: 'enterprise',
    icon: Building2,
    gradient: 'from-blue-600 to-cyan-600',
    color: 'text-blue-500',
    href: '/demos/corporate',
  },
  {
    slug: 'fashion',
    title: 'Aura Fashion',
    description: 'Luxury fashion brand with curated collections and premium experience',
    category: 'lifestyle',
    icon: Sparkles,
    gradient: 'from-purple-600 to-pink-600',
    color: 'text-purple-500',
    href: '/demos/fashion',
  },
  {
    slug: 'ordering-app',
    title: 'Swift Order',
    description: 'Mobile food ordering app with real-time tracking and payment integration',
    category: 'mobile',
    icon: Zap,
    gradient: 'from-orange-600 to-red-600',
    color: 'text-orange-500',
    href: '/demos/ordering-app',
  },
  {
    slug: 'product-catalog',
    title: 'Product Catalog',
    description: 'Advanced e-commerce with filtering, sorting, and product recommendations',
    category: 'ecommerce',
    icon: ShoppingCart,
    gradient: 'from-green-600 to-emerald-600',
    color: 'text-green-500',
    href: '/demos/product-catalog',
  },
  {
    slug: 'driver-app',
    title: 'DriveConnect',
    description: 'Ride-hailing app for drivers with earnings dashboard and live tracking',
    category: 'mobile',
    icon: MapPin,
    gradient: 'from-red-600 to-rose-600',
    color: 'text-red-500',
    href: '/demos/driver-app',
  },
  {
    slug: 'note-app',
    title: 'Nexus Notes',
    description: 'Productivity app for note-taking with organization, tagging, and search',
    category: 'productivity',
    icon: BookOpen,
    gradient: 'from-indigo-600 to-purple-600',
    color: 'text-indigo-500',
    href: '/demos/note-app',
  },
  {
    slug: 'ecommerce',
    title: 'MarketSphere',
    description: 'Marketplace connecting multiple vendors with unified checkout experience',
    category: 'marketplace',
    icon: Store,
    gradient: 'from-amber-600 to-orange-600',
    color: 'text-amber-500',
    href: '/demos/ecommerce',
  },
  {
    slug: 'language-app',
    title: 'LingoPulse',
    description: 'Language learning platform with interactive lessons and progress tracking',
    category: 'learning',
    icon: Globe,
    gradient: 'from-cyan-600 to-blue-600',
    color: 'text-cyan-500',
    href: '/demos/language-app',
  },
];

// ============================================================================
// UNIFIED DEMO DATA MAP
// ============================================================================

export const DEMO_DATA = {
  corporate: {
    products: CORPORATE_PRODUCTS,
    users: CORPORATE_USERS,
    orders: CORPORATE_ORDERS,
  },
  fashion: {
    products: FASHION_PRODUCTS,
    users: FASHION_USERS,
    orders: FASHION_ORDERS,
  },
  'ordering-app': {
    products: ORDERING_PRODUCTS,
    users: ORDERING_USERS,
    orders: ORDERING_ORDERS,
  },
  'product-catalog': {
    products: CATALOG_PRODUCTS,
    users: CATALOG_USERS,
    orders: CATALOG_ORDERS,
  },
  'driver-app': {
    drivers: DRIVER_DRIVERS,
    rides: DRIVER_RIDES,
  },
  'note-app': {
    notes: NOTES_ITEMS,
    folders: NOTES_FOLDERS,
  },
  ecommerce: {
    vendors: MARKETPLACE_VENDORS,
    products: MARKETPLACE_PRODUCTS,
    orders: MARKETPLACE_ORDERS,
  },
  'language-app': {
    courses: LANGUAGE_COURSES,
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function getDemoBySlug(slug: string): Demo | undefined {
  return DEMO_CATALOG.find((demo) => demo.slug === slug);
}

export function getDemoProducts(demoSlug: string): DemoProduct[] {
  const data = DEMO_DATA[demoSlug as keyof typeof DEMO_DATA];
  return (data && 'products' in data ? data.products : []) || [];
}

export function filterByPrice(
  products: DemoProduct[],
  minPrice: number,
  maxPrice: number,
): DemoProduct[] {
  return products.filter((p) => p.price >= minPrice && p.price <= maxPrice);
}

export function filterByCategory(
  products: DemoProduct[],
  category: string,
): DemoProduct[] {
  return products.filter((p) => p.category === category);
}

export function filterByRating(
  products: DemoProduct[],
  minRating: number,
): DemoProduct[] {
  return products.filter((p) => (p.rating || 0) >= minRating);
}

export function searchProducts(
  products: DemoProduct[],
  query: string,
): DemoProduct[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery),
  );
}

export function sortProducts(
  products: DemoProduct[],
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'name' = 'newest',
): DemoProduct[] {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
    default:
      return sorted;
  }
}
