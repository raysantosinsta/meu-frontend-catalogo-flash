import Link from 'next/link';
import { Zap, Smartphone, Sparkles, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950">
      {/* Topo / Barra de Navegação */}
      <header className="w-full border-b border-stone-800/80 bg-stone-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/20">
              ⚡
            </span>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
              Catálogo<span className="text-amber-400">Flash</span>
            </span>
          </div>

          <Link
            href="/login"
            className="text-xs sm:text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700/80 px-3.5 sm:px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-1.5"
          >
            <span>Entrar no Painel</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
          </Link>
        </div>
      </header>

      {/* Conteúdo Principal / Hero Section */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16 flex-1 flex flex-col justify-center">
        <div className="text-center max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 text-xs font-semibold mb-6 shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            <span>Venda no WhatsApp em 30 segundos</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            O catálogo digital mais rápido para <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">lojistas de moda</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-stone-400 text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 leading-relaxed max-w-xl mx-auto">
            Tire fotos das peças direto pelo celular, defina o preço e compartilhe sua vitrine exclusiva. Os pedidos chegam prontos no seu WhatsApp.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/login"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-stone-950 font-bold py-3.5 px-7 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition"
            >
              <span>Criar Catálogo Grátis</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] sm:text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Sem taxa por pedido
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Pronto para celular
            </span>
          </div>
        </div>

        {/* Grade de Funcionalidades Responsiva */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-stone-900/80 hover:bg-stone-900 p-5 rounded-2xl border border-stone-800/80 transition shadow-sm flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-200">100% no Celular</h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Sem burocracia nem cadastros pesados. Fotografe a peça e publique em segundos.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-stone-900/80 hover:bg-stone-900 p-5 rounded-2xl border border-stone-800/80 transition shadow-sm flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-200">Carrossel de Destaques</h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Exiba os lançamentos e promoções na primeira dobra para prender a atenção do cliente.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-stone-900/80 hover:bg-stone-900 p-5 rounded-2xl border border-stone-800/80 transition shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-200">Checkout no WhatsApp</h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  O cliente clica em "Eu Quero" e já abre o WhatsApp com a mensagem formatada com o nome e preço.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé Responsivo */}
      <footer className="w-full border-t border-stone-800/60 py-6 text-center text-xs text-stone-500 px-4">
        <p>CatálogoFlash &copy; {new Date().getFullYear()} — Otimizado com Cloudflare R2 e Next.js</p>
      </footer>
    </div>
  );
}
