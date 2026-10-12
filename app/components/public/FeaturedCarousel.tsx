'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { Product } from '@/services/api';
import { MessageCircle, Sparkles } from 'lucide-react';

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

            return (
              <div
                key={product.id}
                className="flex-[0_0_85%] sm:flex-[0_0_75%] max-w-[340px] bg-stone-900 text-white rounded-3xl overflow-hidden shadow-lg border border-stone-800 flex flex-col justify-between"
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

                  <div className="pt-3 border-t border-stone-800">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-stone-950 font-bold text-sm py-3 px-4 rounded-2xl transition shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Pedir no WhatsApp</span>
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
