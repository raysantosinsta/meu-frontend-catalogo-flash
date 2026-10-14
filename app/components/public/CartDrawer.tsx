'use client';

import React from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

interface CartDrawerProps {
  whatsapp: string;
  storeName: string;
}

export function CartDrawer({ whatsapp, storeName }: CartDrawerProps) {
  const {
    items,
    totalCount,
    totalAmount,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!isDrawerOpen) return null;

  const cleanNumber = whatsapp.replace(/\D/g, '');

  const formattedTotal = totalAmount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;

    const itemsSummary = items
      .map((item) => {
        const itemPrice = (Number(item.product.price) * item.quantity).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        return `• ${item.quantity}x *${item.product.name}* (${itemPrice})`;
      })
      .join('\n');

    const message = [
      `Olá! Gostaria de fazer o pedido dessas peças do catálogo da *${storeName}*:`,
      '',
      itemsSummary,
      '',
      `*Total estimado:* ${formattedTotal}`,
      '',
      'Poderia me confirmar a disponibilidade e como finalizar?',
    ].join('\n');

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Conteúdo do Drawer (Bottom Sheet no Mobile, Drawer lateral no Desktop) */}
      <div className="relative z-10 w-full sm:max-w-md bg-white h-[85vh] sm:h-full mt-auto sm:mt-0 rounded-t-3xl sm:rounded-none sm:rounded-l-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
        {/* Cabeçalho */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-stone-900 text-base">Sua Sacola</h2>
              <span className="text-xs text-stone-500">
                {totalCount} {totalCount === 1 ? 'item' : 'itens'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-rose-500 font-medium px-2 py-1 rounded transition"
              >
                Limpar
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-stone-800 text-base mb-1">Sua sacola está vazia</h3>
              <p className="text-stone-500 text-xs max-w-xs mb-6">
                Navegue pelo catálogo e clique em &ldquo;+ Sacola&rdquo; nas peças que você mais gostar!
              </p>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="bg-stone-900 text-white text-xs font-bold py-2.5 px-5 rounded-xl hover:bg-stone-800 transition"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => {
              const itemTotal = (Number(product.price) * quantity).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              });

              return (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-100 items-center justify-between"
                >
                  {/* Foto Miniatura */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-20 rounded-xl object-cover bg-stone-200 shrink-0 border border-stone-200"
                  />

                  {/* Informações */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                      {product.name}
                    </h4>
                    <span className="font-extrabold text-stone-900 text-sm block mt-0.5">
                      {itemTotal}
                    </span>

                    {/* Stepper de Quantidade */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 active:bg-stone-200 transition"
                          title="Diminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-stone-800">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 active:bg-stone-200 transition"
                          title="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remover Item */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="text-stone-400 hover:text-rose-500 p-2 rounded-lg transition"
                    title="Remover da sacola"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Rodapé com Total e WhatsApp CTA */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-100 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500 font-medium">Subtotal estimado</span>
              <span className="text-lg font-black text-stone-900">{formattedTotal}</span>
            </div>

            <p className="text-[11px] text-stone-400 leading-tight">
              ⚡ Ao enviar, a loja recebe sua lista completa no WhatsApp para separar os itens e acertar frete/pagamento.
            </p>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm py-3.5 px-4 rounded-2xl transition shadow-md cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Enviar Pedido no WhatsApp ({totalCount})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
