'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Product } from '@/services/api';
import { normalizeImageUrl, formatWhatsAppNumber } from '@/lib/format';

export { normalizeImageUrl, formatWhatsAppNumber };

export interface CartItem {
  product: Product;
  quantity: number;
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
  catalogProducts?: Product[];
}

export function CartProvider({ children, tenantSlug, catalogProducts }: CartProviderProps) {
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

  // Sincronizar itens do carrinho com os dados mais recentes do catálogo
  useEffect(() => {
    if (!catalogProducts || catalogProducts.length === 0 || !isHydrated) return;
    setItems((prev) => {
      let changed = false;
      const updated = prev.map((item) => {
        const fresh = catalogProducts.find((p) => p.id === item.product.id);
        if (fresh) {
          const freshImg = normalizeImageUrl(fresh.imageUrl);
          const currentImg = normalizeImageUrl(item.product.imageUrl);
          if (
            freshImg !== currentImg ||
            fresh.name !== item.product.name ||
            Number(fresh.price) !== Number(item.product.price)
          ) {
            changed = true;
            return {
              ...item,
              product: {
                ...item.product,
                name: fresh.name,
                price: fresh.price,
                imageUrl: freshImg,
              },
            };
          }
        }
        return item;
      });
      return changed ? updated : prev;
    });
  }, [catalogProducts, isHydrated]);

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
