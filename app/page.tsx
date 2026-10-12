'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Smartphone,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Camera,
  Share2,
  MessageCircle,
  TrendingUp,
  Check,
  X,
  ChevronDown,
  Star,
  Clock,
} from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Preciso de um computador para usar o CatálogoFlash?',
      a: 'Não! O CatálogoFlash foi projetado 100% mobile-first. Você tira as fotos direto da câmera do celular, cadastra o preço na arara da loja e publica em segundos.',
    },
    {
      q: 'Existe alguma taxa ou porcentagem sobre as minhas vendas?',
      a: 'Zero taxas por pedido. Todas as vendas são fechadas diretamente no seu WhatsApp pessoal ou comercial, e o dinheiro do cliente cai 100% direto na sua conta ou chave PIX.',
    },
    {
      q: 'Como os clientes recebem o catálogo?',
      a: 'Você recebe um link exclusivo e personalizado (ex: catalogoflash.com/sua-loja). Basta colar na bio do seu Instagram, mandar em listas de transmissão ou nos grupos VIP de clientes.',
    },
    {
      q: 'As fotos demoram para carregar no celular dos clientes?',
      a: 'Não! Usamos compressão inteligente de última geração em WebP aliada à rede global de entrega ultra-rápida do Cloudflare R2. As peças carregam instantaneamente até no 4G.',
    },
    {
      q: 'O que acontece quando uma peça esgota?',
      a: 'Você entra no seu painel com 1 toque no celular e marca a peça como "Esgotado". Ela deixa de receber pedidos na vitrine pública imediatamente, evitando frustração de clientes.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950 overflow-x-hidden">
      {/* Background Glow Efeitos Ambientais */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Topo / Barra de Navegação */}
      <header className="w-full border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 font-black shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform duration-200">
              ⚡
            </span>
            <span className="font-black text-xl tracking-tight text-white">
              Catálogo<span className="text-amber-400">Flash</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold text-stone-300 hover:text-white px-3 py-2 rounded-xl transition hover:bg-stone-900/60"
            >
              Já tenho loja
            </Link>
            <Link
              href="/login"
              className="text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 px-4 sm:px-5 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
            >
              <span>Criar Catálogo</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Coluna Texto / Copywriting de Alta Conversão */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/15 to-amber-500/5 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 text-xs font-bold mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>A ferramenta definitiva para lojistas de moda</span>
          </div>

          {/* Headline Poderosa */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            Chega de fotos perdidas no WhatsApp. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              Venda suas peças em 30 segundos.
            </span>
          </h1>

          {/* Subheadline Focada na Solução */}
          <p className="text-stone-300 text-sm sm:text-base lg:text-lg mt-5 sm:mt-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Tire foto da arara com o próprio celular, defina o valor e envie um catálogo digital impecável na bio e nos grupos. Seu cliente escolhe e envia o pedido pronto no seu WhatsApp.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
            <Link
              href="/login"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-stone-950 font-extrabold py-4 px-8 rounded-2xl text-base flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 transition duration-200"
            >
              <span>Criar Meu Catálogo Grátis</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 text-stone-200 font-semibold py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 transition"
            >
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Ver Como Funciona</span>
            </Link>
          </div>

          {/* Micro-bullets de Confiança */}
          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-stone-400">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% no celular
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero taxa sobre vendas
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sem apps para o cliente baixar
            </span>
          </div>
        </div>

        {/* Coluna Visual: Mockup Interativo do Smartphone */}
        <div className="flex-1 w-full max-w-sm sm:max-w-md relative">
          <div className="relative mx-auto rounded-[2.5rem] p-3 bg-gradient-to-b from-stone-700/60 to-stone-900/90 border border-stone-700/50 shadow-2xl shadow-black/80">
            {/* Tela do Celular */}
            <div className="bg-stone-900 rounded-[2rem] overflow-hidden border border-stone-800 text-stone-100 flex flex-col shadow-inner">
              {/* Header do App Simulado */}
              <div className="bg-stone-950/90 px-4 py-3 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                    B
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-none">Boutique Bella</p>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Atendimento Aberto
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-stone-800 text-stone-300 font-semibold px-2 py-1 rounded-md">
                  Vitrine Oficial
                </span>
              </div>

              {/* Card de Produto Exemplo no Mockup */}
              <div className="p-3.5 space-y-3 bg-stone-900/60">
                <div className="bg-stone-950 rounded-2xl overflow-hidden border border-stone-800">
                  <div className="relative aspect-[4/5] bg-stone-800 flex items-center justify-center overflow-hidden">
                    {/* Imagem de Demonstração / Ilustração Premium */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-amber-950/20 to-stone-800 flex flex-col items-center justify-center text-center p-4">
                      <span className="text-5xl mb-2">👗</span>
                      <span className="text-xs font-semibold text-stone-300">Vestido Canelado Midi</span>
                      <span className="text-[10px] text-amber-400 font-medium">Tecido Premium • Cores P e M</span>
                    </div>
                    <span className="absolute top-2.5 left-2.5 bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                      Destaque ⚡
                    </span>
                  </div>

                  <div className="p-3 bg-stone-950">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">Vestido Canelado Midi</h4>
                      <span className="text-xs font-black text-amber-400">R$ 129,90</span>
                    </div>
                    <p className="text-[10px] text-stone-400 mt-1 line-clamp-1">
                      Caimento acinturado perfeito para eventos ou dia a dia.
                    </p>

                    <div className="mt-2.5 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] py-2 rounded-xl flex items-center justify-center gap-1.5 shadow">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Pedir no WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notificação Flutuante Simulada do WhatsApp */}
              <div className="p-3 bg-stone-950/80 border-t border-stone-800/80">
                <div className="bg-emerald-950/70 border border-emerald-500/30 p-2.5 rounded-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-stone-950 font-bold shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-emerald-300 truncate">Novo pedido recebido!</p>
                    <p className="text-[9px] text-stone-300 truncate">
                      "Olá! Vi o *Vestido Canelado Midi* (R$ 129,90) e gostaria de pedir!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo: O Caos do WhatsApp vs. CatálogoFlash */}
      <section className="relative z-10 w-full bg-stone-900/60 border-y border-stone-800/80 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest">
              Por que mudar hoje?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 leading-tight">
              A diferença entre perder clientes e dobrar suas conversões
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-3">
              Vender pelo WhatsApp não precisa ser uma maratona cansativa de responder as mesmas perguntas o dia todo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* O Jeito Tradicional / Ruim */}
            <div className="bg-stone-950/80 border border-rose-900/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-400 text-xs font-bold px-3 py-1 rounded-full mb-5">
                  <X className="w-3.5 h-3.5" /> Jeito Antigo e Cansativo
                </div>
                <h3 className="text-lg font-bold text-stone-200 mb-4">Fotos soltas e clientes desistindo</h3>

                <ul className="space-y-3.5 text-xs sm:text-sm text-stone-400">
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Disparar 40 fotos no grupo ou status e travar o celular do cliente.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Ter que responder "quanto custa?" e "qual o tamanho?" 50 vezes por dia.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Cliente quer uma peça que já esgotou e fica frustrado.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Conversas perdidas no meio de dezenas de mensagens sem fechar a venda.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-900 text-[11px] text-stone-500 italic">
                Resultado: Horas perdidas de atendimento e poucas vendas fechadas.
              </div>
            </div>

            {/* O Jeito CatálogoFlash */}
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-amber-500/5">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Com o CatálogoFlash
                </div>
                <h3 className="text-lg font-bold text-white mb-4">Experiência ágil de boutique moderna</h3>

                <ul className="space-y-3.5 text-xs sm:text-sm text-stone-200">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Um único link organizado, leve e visualmente irresistível.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Preço, tamanhos e fotos em alta definição com carregamento em milissegundos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Controle de "Ativo / Esgotado" com 1 toque no painel do celular.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>O cliente já chega no WhatsApp com o pedido pronto: foto, nome e preço.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-800 text-[11px] text-amber-400 font-semibold">
                Resultado: Atendimento em 10 segundos e fechamento imediato no PIX.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona em 3 Passos */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest">
            Simples assim
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
            Como funciona em 3 passos
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-3">
            Você não precisa de designers, nem de computadores ou configurações complicadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-stone-900/60 p-6 sm:p-7 rounded-3xl border border-stone-800/80 relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-black text-lg mb-5">
              1
            </div>
            <h3 className="text-base font-bold text-white mb-2">Tire a Foto na Arara</h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Abra a câmera direto pelo painel no celular. O CatálogoFlash comprime e otimiza a foto automaticamente sem perder qualidade.
            </p>
          </div>

          <div className="bg-stone-900/60 p-6 sm:p-7 rounded-3xl border border-stone-800/80 relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-black text-lg mb-5">
              2
            </div>
            <h3 className="text-base font-bold text-white mb-2">Compartilhe Seu Link</h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Coloque o link da sua loja no Instagram e mande para seus contatos. Sua vitrine fica online 24h sem cair e sem travar.
            </p>
          </div>

          <div className="bg-stone-900/60 p-6 sm:p-7 rounded-3xl border border-stone-800/80 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-black text-lg mb-5">
              3
            </div>
            <h3 className="text-base font-bold text-white mb-2">Receba Pedidos Prontos</h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              O cliente clica em "Pedir no WhatsApp" e você recebe uma mensagem formatada com o produto desejado e o valor total.
            </p>
          </div>
        </div>
      </section>

      {/* Dúvidas Frequentes (FAQ) */}
      <section className="relative z-10 w-full bg-stone-900/40 border-t border-stone-800/80 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest">
              Tire suas dúvidas
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-stone-900/80 border border-stone-800 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-stone-200 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-400 leading-relaxed border-t border-stone-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 font-black text-xl mx-auto mb-4 shadow-lg shadow-amber-500/20">
            ⚡
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Pronto para profissionalizar o catálogo da sua loja?
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto mt-3">
            Crie sua conta em 1 minuto. Comece a cadastrar suas peças hoje mesmo e transforme seus seguidores em pedidos no WhatsApp.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/login"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-black text-base py-4 px-9 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 transition"
            >
              <span>Criar Minha Loja Agora</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="w-full border-t border-stone-800/80 py-8 text-center text-xs text-stone-500 px-4 bg-stone-950">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-bold">⚡ CatálogoFlash</span>
            <span>— A vitrine digital mobile-first</span>
          </div>
          <p>&copy; {new Date().getFullYear()} CatálogoFlash. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
