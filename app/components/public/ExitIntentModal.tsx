'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { X, Sparkles, Copy, Check, MessageCircle, Flame } from 'lucide-react';

const TWO_MINUTES_MS = 2 * 60 * 1000; // 2 minutos (120.000 ms)

interface ExitIntentModalProps {
  whatsapp: string;
  storeName: string;
  couponCode?: string;
  discountPercent?: number;
}

export function ExitIntentModal({
  whatsapp,
  storeName,
  couponCode = 'QUERO10',
  discountPercent = 10,
}: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const mountTimeRef = useRef<number>(Date.now());
  const cleanNumber = whatsapp.replace(/\D/g, '');
  const storageKey = `flash_exit_intent_${storeName.toLowerCase().replace(/\s+/g, '_')}`;

  const triggerModal = useCallback(() => {
    // Só permitir a exibição após pelo menos 2 minutos de permanência na página
    if (Date.now() - mountTimeRef.current < TWO_MINUTES_MS) {
      return;
    }

    // Verificar se já foi exibido nesta sessão
    if (typeof window !== 'undefined' && sessionStorage.getItem(storageKey)) {
      return;
    }
    setIsOpen(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(storageKey, 'true');
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (sessionStorage.getItem(storageKey)) return;

    // 1. Detecção para Desktop: Movimento do cursor para fora do topo da janela (após 2 minutos)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        triggerModal();
      }
    };

    // 2. Exibição automática do cupom após 2 minutos no catálogo
    const timer = setTimeout(() => {
      triggerModal();
    }, TWO_MINUTES_MS);

    // 3. Detecção Mobile via Histórico (Back Button)
    let historyTrapArmed = false;
    const handleFirstScroll = () => {
      if (!historyTrapArmed && window.scrollY > 150) {
        historyTrapArmed = true;
        window.history.pushState({ modalArmed: true }, '', window.location.href);
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (historyTrapArmed) {
        e.preventDefault?.();
        triggerModal();
        historyTrapArmed = false;
      }
    };

    window.addEventListener('scroll', handleFirstScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleFirstScroll);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [triggerModal, storageKey]);

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppWithCoupon = () => {
    const text = encodeURIComponent(
      `Olá! Peguei o cupom especial *${couponCode}* (${discountPercent}% OFF) no catálogo da *${storeName}* e gostaria de aproveitá-lo no meu pedido!`
    );
    window.open(`https://wa.me/+55${cleanNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-stone-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        {/* Botão Fechar */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ícone Chamativo */}
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
          <Flame className="w-8 h-8 fill-amber-500 animate-pulse" />
        </div>

        {/* Badge */}
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3 h-3 fill-amber-700" /> Oferta Relâmpago
        </span>

        {/* Título e Texto */}
        <h3 className="text-xl font-black text-stone-900 leading-tight">
          Espere! Não vá embora de mãos vazias...
        </h3>
        <p className="text-xs text-stone-500 mt-2 mb-4 leading-relaxed">
          Gostou de algum produto? Liberamos um presente exclusivo de{' '}
          <strong className="text-stone-900 font-bold">{discountPercent}% OFF</strong> para o seu
          primeiro pedido agora!
        </p>

        {/* Box do Cupom */}
        <div className="w-full bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl p-3.5 mb-4 flex items-center justify-between gap-2">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
              Seu cupom exclusivo
            </span>
            <span className="text-lg font-black tracking-widest text-emerald-600 font-mono">
              {couponCode}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-700 font-bold text-xs py-2 px-3 rounded-xl border border-stone-200 shadow-2xs transition active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Botão de Conversão WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsAppWithCoupon}
          className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm py-3.5 px-4 rounded-2xl transition shadow-md cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Garantir {discountPercent}% OFF no WhatsApp</span>
        </button>

        {/* Link dispensar */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-xs text-stone-400 hover:text-stone-600 font-medium mt-3 transition cursor-pointer"
        >
          Continuar olhando o catálogo
        </button>
      </div>
    </div>
  );
}
