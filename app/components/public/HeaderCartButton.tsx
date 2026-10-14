'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

export function HeaderCartButton() {
  const { totalCount, toggleDrawer } = useCart();

  if (totalCount === 0) return null;

  return (
    <button
      type="button"
      onClick={toggleDrawer}
      className="relative p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition active:scale-95 cursor-pointer flex items-center justify-center"
      title="Ver sacola"
    >
      <ShoppingBag className="w-4 h-4" />
      <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
        {totalCount}
      </span>
    </button>
  );
}
