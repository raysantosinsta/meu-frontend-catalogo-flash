'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

export function FloatingCartBar() {
  const { totalCount, totalAmount, toggleDrawer } = useCart();

  if (totalCount === 0) return null;

  const formattedTotal = totalAmount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <aside
      aria-label="Sacola de compras"
      className="fixed bottom-4 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="w-full max-w-md bg-stone-900/95 backdrop-blur-md text-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-800 flex items-center justify-between gap-3 pointer-events-auto">
        {/* Info de Itens e Valor */}
        <button
          type="button"
          onClick={toggleDrawer}
          className="flex items-center gap-3 text-left pl-1 sm:pl-2 group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-stone-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
              {totalCount}
            </span>
          </div>

          <div>
            <div className="text-xs font-semibold text-stone-300">
              {totalCount} {totalCount === 1 ? 'peça escolhida' : 'peças escolhidas'}
            </div>
            <div className="text-sm sm:text-base font-black text-white">
              {formattedTotal}
            </div>
          </div>
        </button>

        {/* Botão Ver Sacola */}
        <button
          type="button"
          onClick={toggleDrawer}
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl sm:rounded-2xl transition cursor-pointer shadow-md shrink-0"
        >
          <span>Ver Sacola</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
