import { api } from '@/services/api';
import { FeaturedCarousel } from '../components/public/FeaturedCarousel';
import { ProductGrid } from '../components/public/ProductGrid';
import { CartProvider } from '../context/CartContext';
import { FloatingCartBar } from '../components/public/FloatingCartBar';
import { CartDrawer } from '../components/public/CartDrawer';
import { ExitIntentModal } from '../components/public/ExitIntentModal';
import { HeaderCartButton } from '../components/public/HeaderCartButton';
import { notFound } from 'next/navigation';

interface TenantPageProps {
  params: Promise<{ tenantSlug: string }>;
}

export default async function TenantCatalogPage({ params }: TenantPageProps) {
  const { tenantSlug } = await params;

  let tenantData;
  try {
    tenantData = await api.getTenantCatalog(tenantSlug);
  } catch {
    notFound();
  }

  const { name, logoUrl, whatsapp, featuredProducts, products } = tenantData;

  return (
    <CartProvider tenantSlug={tenantSlug}>
      <div className="min-h-screen bg-stone-100 flex flex-col items-center">
        <main className="w-full max-w-md sm:max-w-lg min-h-screen bg-stone-50 pb-24 flex flex-col shadow-sm sm:shadow-lg sm:my-4 sm:rounded-3xl border-x sm:border border-stone-200/80 overflow-hidden relative">
          {/* Header Mobile-First da Loja */}
          <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt={name} className="w-9 h-9 rounded-full object-cover border" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center text-sm">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="font-bold text-stone-900 text-sm leading-tight">{name}</h1>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  Atendimento Aberto
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <HeaderCartButton />
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-stone-100 hover:bg-stone-200 font-semibold px-2.5 py-1.5 rounded-lg text-stone-700 transition"
              >
                Falar
              </a>
            </div>
          </header>

          {/* Carrossel de Destaques (Top 10) */}
          <FeaturedCarousel products={featuredProducts} whatsapp={whatsapp} />

          {/* Grade Geral de Produtos */}
          <ProductGrid products={products} whatsapp={whatsapp} />
        </main>

        {/* Barra Flutuante de Sacola */}
        <FloatingCartBar />

        {/* Drawer com a Lista de Peças Selecionadas e Checkout WhatsApp */}
        <CartDrawer whatsapp={whatsapp} storeName={name} />

        {/* Modal de Retenção: Cupom Flash 10% OFF em Inatividade / Tentativa de Saída */}
        <ExitIntentModal whatsapp={whatsapp} storeName={name} couponCode="QUERO10" discountPercent={10} />
      </div>
    </CartProvider>
  );
}
