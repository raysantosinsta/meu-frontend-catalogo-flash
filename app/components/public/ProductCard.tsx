import { Product } from '@/services/api';
import { MessageCircle, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  whatsapp: string;
}

export function ProductCard({ product, whatsapp }: ProductCardProps) {
  const cleanNumber = whatsapp.replace(/\D/g, '');
  const formattedPrice = Number(product.price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto: *${product.name}* (${formattedPrice}) do catálogo online. Ainda está disponível?`
  );

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200/90 flex flex-col transition hover:shadow-md">
      {/* Imagem em Largura Total */}
      <div className="relative aspect-[4/5] w-full bg-stone-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-stone-950" /> Destaque
          </span>
        )}
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

        {/* Botão de Pedido no WhatsApp em Largura Total */}
        <div className="pt-3 border-t border-stone-100">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm py-3 px-4 rounded-2xl transition shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pedir no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
