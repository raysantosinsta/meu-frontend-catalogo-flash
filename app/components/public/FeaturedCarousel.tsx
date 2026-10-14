'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { Product } from '@/services/api';
import { MessageCircle, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

interface FeaturedCarouselProps {
  products: Product[];
  whatsapp: string;
}

export function FeaturedCarousel({ products, whatsapp }: FeaturedCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const { addToCart, isInCart, getItemQuantity } = useCart();

  if (!products || products.length === 0) return null;

  const cleanNumber = whatsapp.replace(/\D/g, '');

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
          <span className="text-amber-500">⚡</span> Destaques da Semana
        </h2>
        <span className="text-xs text-stone-500 font-medium">{products.length} itens</span>
      </div>

      <div className="overflow-hidden px-4" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product) => {
            const formattedPrice = Number(product.price).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            });
            const whatsappMessage = encodeURIComponent(
              `Olá! Vi o destaque *${product.name}* (${formattedPrice}) no catálogo e gostaria de pedir!`
            );
            const whatsappUrl = `https://wa.me/${cleanNumber}?text=${whatsappMessage}`;
            const inCart = isInCart(product.id);
            const qty = getItemQuantity(product.id);

            return (
              <div
                key={product.id}
                className={`flex-[0_0_85%] sm:flex-[0_0_75%] max-w-[340px] bg-stone-900 text-white rounded-3xl overflow-hidden shadow-lg border flex flex-col justify-between transition ${
                  inCart ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-stone-800'
                }`}
              >
                {/* Foto em Largura Total */}
                <div className="relative aspect-[4/5] w-full bg-stone-800 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-stone-950" /> Destaque
                  </span>

                  {/* Atalho Rápido de Sacola na Imagem */}
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all active:scale-90 cursor-pointer ${
                      inCart
                        ? 'bg-emerald-500 text-stone-950 ring-2 ring-white shadow-emerald-500/30'
                        : 'bg-stone-900/80 hover:bg-stone-900 text-white'
                    }`}
                    title={inCart ? `Na sacola (${qty}) - Clique para adicionar mais um` : 'Adicionar à sacola'}
                  >
                    {inCart ? <Check className="w-4 h-4 stroke-[3]" /> : <ShoppingBag className="w-4 h-4" />}
                  </button>
                </div>

                {/* Informações Abaixo da Foto */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                        {product.name}
                      </h3>
                      <span className="text-base sm:text-lg font-black text-amber-400 shrink-0">
                        {formattedPrice}
                      </span>
                    </div>

                    {product.description && (
                      <p className="text-stone-400 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="pt-3 border-t border-stone-800 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold py-3 px-3 rounded-2xl transition active:scale-95 cursor-pointer ${
                        inCart
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-stone-800 hover:bg-stone-700 text-white border border-stone-700'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                          <span>Na Sacola ({qty})</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-stone-300" />
                          <span>+ Sacola</span>
                        </>
                      )}
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-bold text-xs sm:text-sm py-3 px-3.5 rounded-2xl transition shadow-md"
                      title="Pedir apenas este destaque no WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden xs:inline">Pedir</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
