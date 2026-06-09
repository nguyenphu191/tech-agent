'use client';

import { useState, useMemo } from 'react';
import { DemoProduct, DemoFilterState } from '@/types';
import {
  filterByCategory,
  filterByPrice,
  filterByRating,
  searchProducts,
  sortProducts,
} from '@/data/demos';

interface UseDemoFilterOptions {
  initialProducts: DemoProduct[];
}

/**
 * useDemoFilter - Custom hook for managing product filtering and searching
 * Handles search, category, price, rating filters, and sorting
 */
export function useDemoFilter({ initialProducts }: UseDemoFilterOptions) {
  const [filterState, setFilterState] = useState<DemoFilterState>({
    search: '',
  });

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Apply search
    if (filterState.search) {
      result = searchProducts(result, filterState.search);
    }

    // Apply category filter
    if (filterState.category) {
      result = filterByCategory(result, filterState.category);
    }

    // Apply price filter
    if (filterState.minPrice !== undefined || filterState.maxPrice !== undefined) {
      const minPrice = filterState.minPrice ?? 0;
      const maxPrice = filterState.maxPrice ?? Math.max(...initialProducts.map((p) => p.price));
      result = filterByPrice(result, minPrice, maxPrice);
    }

    // Apply rating filter
    if (filterState.minRating !== undefined) {
      result = filterByRating(result, filterState.minRating);
    }

    // Apply sorting
    if (filterState.sortBy) {
      result = sortProducts(result, filterState.sortBy as any);
    }

    return result;
  }, [initialProducts, filterState]);

  const handleFilterChange = (newFilters: DemoFilterState) => {
    setFilterState(newFilters);
  };

  const handleReset = () => {
    setFilterState({
      search: '',
    });
  };

  return {
    filterState,
    filteredProducts,
    handleFilterChange,
    handleReset,
  };
}

/**
 * useDemoCart - Custom hook for managing demo shopping cart
 */
interface CartItem extends DemoProduct {
  quantity: number;
}

export function useDemoCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: DemoProduct, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  };
}

/**
 * useDemoWishlist - Custom hook for managing wishlist
 */
export function useDemoWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const addToWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
}
