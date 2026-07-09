'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Restaurant, CartItem } from '@/types';
import { MOCK_RESTAURANTS } from '@/utils/mockDb';

interface AppContextType {
  restaurants: Restaurant[];
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (restaurantId: string) => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [restaurants] = useState<Restaurant[]>(MOCK_RESTAURANTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('zb_cart');
      const savedWishlist = localStorage.getItem('zb_wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (_) {}
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('zb_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('zb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItem.id === newItem.menuItem.id);
      if (existing) {
        return prev.map(i =>
          i.menuItem.id === newItem.menuItem.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(i => (i.menuItem.id === itemId ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (restaurantId: string) => {
    setWishlist(prev =>
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        restaurants,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
