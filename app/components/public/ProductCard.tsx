'use client';

import { Product } from '@/services/api';
import { MessageCircle, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

interface ProductCardProps {
  product: Product;
  whatsapp: string;
}

export function ProductCard({ product, whatsapp }: ProductCardProps) {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const cleanNumber = whatsapp.replace(/\D/g, '');
  const inCart = isInCart(product.id);
  const qty = getItemQuantity(product.id);

  const formattedPrice = Number(product.price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto: *${product.name}* (${formattedPrice}) do catálogo online. Ainda está disponível?`
  );

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${whatsappMessage}`;

  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden shadow-sm border transition flex flex-col ${
        inCart ? 'border-emerald-500/80 ring-2 ring-emerald-500/20' : 'border-stone-200/90 hover:shadow-md'
      }`}
    >
      {/* Imagem em Largura Total */}
      <div className="relative aspect-[4/5] w-full bg-stone-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badge de Destaque */}
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-stone-950" /> Destaque
          </span>
        )}

        {/* Botão de Atalho Rápido para Adicionar à Sacola */}
        <button
          type="button"
          onClick={() => addToCart(product)}
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all active:scale-90 cursor-pointer ${
            inCart
              ? 'bg-emerald-600 text-white ring-2 ring-white shadow-emerald-600/30'
              : 'bg-white/90 hover:bg-white text-stone-700'
          }`}
          title={inCart ? `Na sacola (${qty}) - Clique para adicionar mais um` : 'Adicionar à sacola'}
        >
          {inCart ? <Check className="w-4 h-4 stroke-[3]" /> : <ShoppingBag className="w-4 h-4" />}
        </button>
      </div>

      {/* Informações Abaixo da Imagem */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-stone-900 text-base sm:text-lg leading-snug">
              {product.name}
            </h3>
            <span className="text-base sm:text-lg font-black text-stone-900 shrink-0">
              {formattedPrice}
            </span>
          </div>

          {product.description && (
            <p className="text-stone-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Ações: Sacola Multipeças + WhatsApp Direto */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
          {/* Botão Sacola */}
          <button
            type="button"
            onClick={() => addToCart(product)}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold py-3 px-3 rounded-2xl transition active:scale-95 cursor-pointer ${
              inCart
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200/80'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Na Sacola ({qty})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-stone-600" />
                <span>+ Sacola</span>
              </>
            )}
          </button>

          {/* Botão Pedido Direto no WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs sm:text-sm py-3 px-3.5 rounded-2xl transition shadow-sm"
            title="Pedir apenas esta peça agora no WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden xs:inline">Pedir</span>
          </a>
        </div>
      </div>
    </div>
  );
}
