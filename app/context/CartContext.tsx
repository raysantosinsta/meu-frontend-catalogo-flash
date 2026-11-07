'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Product } from '@/services/api';

export interface CartItem {
  product: Product;
  quantity: number;
}

export function normalizeImageUrl(url?: string): string {
  if (!url) return '';
  // Converte URLs privadas antigas do R2 para a URL pública pub-xxx.r2.dev
  if (url.includes('.r2.cloudflarestorage.com')) {
    return url.replace(
      /https:\/\/[^/]+\.r2\.cloudflarestorage\.com/g,
      'https://pub-26ae5bdf8e824fa9b97c006a492c69b4.r2.dev'
    );
  }
  return url;
}

interface CartContextData {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
  totalCount: number;
  totalAmount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
  tenantSlug: string;
}

export function CartProvider({ children, tenantSlug }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const storageKey = `catalogo_cart_${tenantSlug}`;

  // Carregar do localStorage na montagem
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        const normalized = parsed.map((item) => ({
          ...item,
          product: {
            ...item.product,
            imageUrl: normalizeImageUrl(item.product?.imageUrl),
          },
        }));
        setItems(normalized);
      }
    } catch {
      // Ignorar erros de storage (ex: navegação anônima com restrição)
    } finally {
      setIsHydrated(true);
    }
  }, [storageKey]);

  // Persistir alterações no localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // Falha silenciosa de quota
    }
  }, [items, isHydrated, storageKey]);

  const addToCart = (product: Product) => {
    const cleanProduct: Product = {
      ...product,
      imageUrl: normalizeImageUrl(product.imageUrl),
    };
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === cleanProduct.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === cleanProduct.id
            ? { ...item, product: cleanProduct, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product: cleanProduct, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  const getItemQuantity = (productId: string) => {
    return items.find((item) => item.product.id === productId)?.quantity || 0;
  };

  const totalCount = useMemo(() => {
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [items]);

  const totalAmount = useMemo(() => {
    return items.reduce((acc, curr) => {
      const price = Number(curr.product.price) || 0;
      return acc + price * curr.quantity;
    }, 0);
  }, [items]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
        totalCount,
        totalAmount,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser utilizado dentro de um CartProvider');
  }
  return context;
}
