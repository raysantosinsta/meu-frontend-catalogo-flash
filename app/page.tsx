'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  MessageCircle,
  Share2,
  ShoppingBag,
  Sparkles,
  Zap,
} from 'lucide-react';

interface MockProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  badge?: string;
  photoEmoji: string;
  photoBg: string;
}

const mockProducts: MockProduct[] = [
  {
    id: '1',
    name: 'Vestido Midi Canelado',
    category: 'Moda Feminina',
    price: 149.9,
    description: 'Malha encorpada com caimento estruturado e acabamento impecável.',
    badge: 'Mais Vendido',
    photoEmoji: '👗',
    photoBg: 'bg-stone-200 text-stone-800',
  },
  {
    id: '2',
    name: 'Fone Bluetooth Pro Wireless',
    category: 'Eletrônicos & Acessórios',
    price: 189.0,
    description: 'Cancelamento ativo de ruído, bateria de 24h e estojo de recarga rápida.',
    badge: 'Destaque',
    photoEmoji: '🎧',
    photoBg: 'bg-indigo-100 text-indigo-950',
  },
  {
    id: '3',
    name: 'Vela Aromática Artesanal',
    category: 'Casa & Presentes',
    price: 79.5,
    description: 'Cera 100% vegetal com essência pura de lavanda e baunilha suave.',
    badge: 'Pronta Entrega',
    photoEmoji: '🕯️',
    photoBg: 'bg-amber-100 text-amber-950',
  },
];

export default function Home() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [simulatedCartCount, setSimulatedCartCount] = useState(1);
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<'storefront' | 'whatsapp' | 'admin'>('storefront');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const currentProduct = mockProducts[selectedProductIndex];

  const formattedPrice = currentProduct.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const faqs = [
    {
      q: 'Preciso de computador para gerenciar o catálogo?',
      a: 'Não. Todo o CatálogoFlash foi pensado para a rotina da loja: você tira a foto do produto com a própria câmera do celular, digita o nome e o preço, e ele já vai para o ar.',
    },
    {
      q: 'Vocês cobram comissão sobre as minhas vendas?',
      a: 'Nenhuma comissão. O cliente fecha a compra diretamente no seu WhatsApp pessoal ou profissional. O pagamento cai direto na sua conta bancária via PIX ou máquina de cartão.',
    },
    {
      q: 'Como os clientes chegam até a minha vitrine?',
      a: 'Você ganha um link exclusivo (ex: catalogoflash.com/sua-loja). Basta colar na bio do seu Instagram, nos Stories ou enviar em listas de transmissão e grupos de clientes.',
    },
    {
      q: 'As fotos demoram para carregar no celular do cliente?',
      a: 'Não. Usamos compressão WebP em milissegundos e distribuição via Cloudflare. A vitrine abre em menos de 1 segundo, mesmo em conexões móveis 4G oscilantes.',
    },
    {
      q: 'Como aviso quando um produto do estoque esgotou?',
      a: 'Basta um toque no painel do celular para desativar o produto. Ele some da vitrine imediatamente, evitando que clientes peçam itens esgotados.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#18181B] flex flex-col font-sans selection:bg-[#E7E2DA] selection:text-[#18181B]">
      {/* Barra de Navegação */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-stone-900 text-stone-100 flex items-center justify-center font-bold text-base shadow-xs">
              ⚡
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-stone-900 leading-none">
                CatálogoFlash
              </span>
              <span className="text-[11px] text-stone-500 font-medium">para lojistas e comércio local</span>
            </div>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2 rounded-xl transition"
            >
              Já tenho conta
            </Link>
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-stone-50 px-4 sm:px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              <span>Criar vitrine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero: Editorial & Prova Visual Imediata */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Lado Esquerdo: Mensagem Forte e Sem Clichês */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-stone-200/70 text-stone-800 text-xs font-semibold px-3 py-1 rounded-full mb-6">
              <span>Vitrine digital em 30 segundos por produto</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 leading-[1.12] max-w-2xl">
              Seus produtos merecem mais do que fotos perdidas em mensagens soltas.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg mt-5 leading-relaxed max-w-xl">
              Fotografe seus produtos pelo celular, defina o preço e compartilhe uma vitrine digital
              impecável na bio do Instagram. O cliente escolhe os itens e você recebe o pedido pronto
              no WhatsApp com sacola calculada.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link
                href="/login"
                className="bg-stone-900 hover:bg-stone-800 text-stone-50 font-bold py-3.5 px-7 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition"
              >
                <span>Criar catálogo da minha loja</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#simulador"
                className="bg-white hover:bg-stone-100 text-stone-700 font-semibold py-3.5 px-6 rounded-xl text-sm border border-stone-200 text-center transition"
              >
                Ver demonstração abaixo
              </a>
            </div>

            {/* Fatos Práticos */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-stone-900 stroke-[3]" /> Funciona 100% no celular
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-stone-900 stroke-[3]" /> Sem taxas sobre pedidos
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-stone-900 stroke-[3]" /> O cliente não precisa baixar aplicativo
              </span>
            </div>
          </div>

          {/* Lado Direito: Simulador Visual Interativo da Boutique */}
          <div id="simulador" className="lg:col-span-5 w-full">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden p-4 sm:p-5">
              {/* Controles do Simulador */}
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 mb-4">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Demonstração da Experiência
                </span>

                {/* Alternador de visualização */}
                <div className="flex bg-stone-100 p-0.5 rounded-lg text-[11px] font-semibold text-stone-600">
                  <button
                    type="button"
                    onClick={() => setActiveSimulatorTab('storefront')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      activeSimulatorTab === 'storefront' ? 'bg-white text-stone-900 shadow-2xs font-bold' : ''
                    }`}
                  >
                    Vitrine
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSimulatorTab('whatsapp')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      activeSimulatorTab === 'whatsapp' ? 'bg-white text-stone-900 shadow-2xs font-bold' : ''
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSimulatorTab('admin')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      activeSimulatorTab === 'admin' ? 'bg-white text-stone-900 shadow-2xs font-bold' : ''
                    }`}
                  >
                    Painel 30s
                  </button>
                </div>
              </div>

              {/* Seletor de Produtos */}
              <div className="mb-4">
                <span className="text-[11px] font-medium text-stone-500 block mb-2">
                  Escolha um produto para testar a experiência:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {mockProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProductIndex(idx)}
                      className={`text-left p-2 rounded-xl border text-xs transition cursor-pointer ${
                        selectedProductIndex === idx
                          ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50'
                      }`}
                    >
                      <div className="text-base mb-1">{p.photoEmoji}</div>
                      <div className="truncate font-medium">{p.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conteúdo Dinâmico por Aba */}
              {activeSimulatorTab === 'storefront' && (
                <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 flex flex-col">
                  {/* Card Simulado da Loja */}
                  <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
                    <div
                      className={`aspect-4/3 w-full ${currentProduct.photoBg} flex flex-col items-center justify-center p-4 relative`}
                    >
                      <span className="text-5xl">{currentProduct.photoEmoji}</span>
                      {currentProduct.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-stone-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          {currentProduct.badge}
                        </span>
                      )}
                      <span className="absolute bottom-2 right-2 bg-white/90 text-stone-900 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                        {currentProduct.category}
                      </span>
                    </div>

                    <div className="p-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-stone-900 text-sm">{currentProduct.name}</h4>
                        <span className="font-extrabold text-stone-900 text-sm shrink-0">
                          {formattedPrice}
                        </span>
                      </div>
                      <p className="text-stone-500 text-xs mt-1 leading-snug line-clamp-2">
                        {currentProduct.description}
                      </p>

                      <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSimulatedCartCount((prev) => prev + 1)}
                          className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-stone-700" />
                          <span>+ Sacola ({simulatedCartCount})</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveSimulatorTab('whatsapp')}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1 shadow-2xs transition active:scale-95 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Pedir</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Pílula de Sacola Flutuante Simulada */}
                  <div className="mt-3 bg-stone-900 text-white p-2.5 rounded-xl flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-2 pl-1">
                      <ShoppingBag className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold">
                        {simulatedCartCount} {simulatedCartCount === 1 ? 'item na sacola' : 'itens na sacola'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSimulatorTab('whatsapp')}
                      className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold px-3 py-1 rounded-lg transition"
                    >
                      Enviar no Whats
                    </button>
                  </div>
                </div>
              )}

              {activeSimulatorTab === 'whatsapp' && (
                <div className="bg-[#EFEAE2] rounded-2xl p-4 border border-stone-200 flex flex-col gap-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-300/60">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      W
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900 leading-none">
                        Atendimento da Sua Loja
                      </p>
                      <span className="text-[10px] text-stone-500">Mensagem que você recebe pronta</span>
                    </div>
                  </div>

                  {/* Balão de Mensagem do WhatsApp */}
                  <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-2xs border border-stone-200/80 text-xs text-stone-800 space-y-1.5 self-start max-w-[90%]">
                    <p className="font-medium">Olá! Gostaria de pedir estes itens do catálogo online:</p>
                    <div className="bg-stone-50 p-2 rounded-lg border border-stone-100 font-mono text-[11px] text-stone-700">
                      • 1x <strong>{currentProduct.name}</strong> ({formattedPrice})
                      <br />
                      • 1x <strong>Garrafa Térmica Inox</strong> (R$ 79,90)
                    </div>
                    <p className="font-bold text-stone-900 pt-0.5">Total estimado: R$ 229,80</p>
                    <p className="text-[10px] text-stone-500 pt-1">
                      Você aceita PIX? Tem entrega rápida para hoje?
                    </p>
                    <span className="text-[9px] text-stone-400 block text-right pt-1">14:32 ✓✓</span>
                  </div>

                  <p className="text-[11px] text-stone-600 italic">
                    ⚡ Sem perder tempo explicando preços ou mandando fotos repetidas. Você só confirma a disponibilidade e passa a chave PIX.
                  </p>
                </div>
              )}

              {activeSimulatorTab === 'admin' && (
                <div className="bg-stone-900 text-white rounded-2xl p-4 border border-stone-800 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" />
                      Cadastro em 30 Segundos
                    </span>
                    <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded">
                      Mobile Only
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/60 flex items-center justify-between">
                      <span className="text-stone-300">1. Foto direta da câmera</span>
                      <span className="text-emerald-400 font-bold text-[11px]">✓ Otimizada WebP</span>
                    </div>
                    <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/60 flex items-center justify-between">
                      <span className="text-stone-300">2. Nome e Preço</span>
                      <span className="text-white font-mono font-bold text-[11px]">{currentProduct.name} • {formattedPrice}</span>
                    </div>
                    <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/60 flex items-center justify-between">
                      <span className="text-stone-300">3. Destaque na vitrine</span>
                      <span className="text-amber-400 font-bold text-[11px]">⚡ Ativo no Topo</span>
                    </div>
                  </div>

                  <div className="bg-emerald-950/60 border border-emerald-500/30 p-2.5 rounded-xl text-center">
                    <span className="text-xs font-bold text-emerald-300">
                      Publicado na vitrine da sua loja!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Contraste Real: O Fim do Atendimento Cansativo */}
      <section className="w-full bg-white border-y border-stone-200/80 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-stone-500">Comparativo prático</span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-1.5">
              Por que mandar fotos soltas no WhatsApp custa caro para a sua loja
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-3">
              Lojistas perdem em média 3 horas por dia respondendo as mesmas perguntas. Uma
              vitrine digital limpa inverte essa lógica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* O Jeito Tradicional */}
            <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-stone-900 text-lg mb-4">
                  O caos das fotos soltas no feed e status
                </h3>

                <ul className="space-y-4 text-xs sm:text-sm text-stone-600">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">—</span>
                    <span>Disparo de dezenas de fotos em grupos que ninguém baixa e que enchem a memória do celular do cliente.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">—</span>
                    <span>Ter que responder &ldquo;qual o valor?&rdquo; e &ldquo;ainda tem disponível?&rdquo; dezenas de vezes para o mesmo item.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">—</span>
                    <span>Cliente se interessa por um produto que já esgotou ontem e fica frustrado.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">—</span>
                    <span>Conversas perdidas no meio do WhatsApp antes de mandar o PIX.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 text-xs text-stone-500 font-medium">
                Atendimento demorado e vendas perdidas por falta de agilidade.
              </div>
            </div>

            {/* Com o CatálogoFlash */}
            <div className="bg-[#18181B] text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 flex flex-col justify-between shadow-md">
              <div>
                <h3 className="font-bold text-white text-lg mb-4">
                  Com o CatálogoFlash
                </h3>

                <ul className="space-y-4 text-xs sm:text-sm text-stone-300">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Um único link na bio do Instagram com catálogo moderno e rápido.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Fotos nítidas que carregam em menos de 1 segundo mesmo no 4G.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Sacola multiprodutos: o cliente escolhe vários itens e envia tudo de uma vez.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Retenção automática com cupom de desconto em caso de inatividade.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-800 text-xs text-amber-300 font-semibold">
                O cliente já chega decidido com o pedido montado no seu WhatsApp.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona em 3 Etapas Simples */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-xl mb-12">
          <span className="text-xs font-semibold text-stone-500">Sem burocracia</span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-1.5">
            Do produto ao pedido no WhatsApp em 3 passos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200">
            <span className="text-xs font-mono font-bold text-stone-400 block mb-3">01</span>
            <h3 className="font-bold text-stone-900 text-base mb-1.5">Fotografe seus produtos</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Abra o painel pelo celular. Você tira a foto do produto com a câmera, preenche o
              nome e o preço. A compressão para WebP é feita na hora.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200">
            <span className="text-xs font-mono font-bold text-stone-400 block mb-3">02</span>
            <h3 className="font-bold text-stone-900 text-base mb-1.5">Cole o link na bio</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Sua vitrine ganha um endereço próprio (ex: catalogoflash.com/sua-loja) que você divulga
              nos Stories, grupos VIP e perfil do Instagram.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200">
            <span className="text-xs font-mono font-bold text-stone-400 block mb-3">03</span>
            <h3 className="font-bold text-stone-900 text-base mb-1.5">Receba pedidos prontos</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              O cliente navega, salva produtos na sacola e envia a lista formatada direto no seu
              WhatsApp. Você apenas passa a chave PIX e combina a entrega.
            </p>
          </div>
        </div>
      </section>

      {/* Dúvidas Frequentes (FAQ) */}
      <section className="w-full bg-white border-t border-stone-200/80 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Perguntas frequentes
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Tudo o que você precisa saber para começar a usar hoje mesmo.
            </p>
          </div>

          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-stone-900 hover:text-stone-600 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-stone-900' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed pr-8">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chamada Final */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="bg-[#18181B] text-white rounded-3xl p-8 sm:p-14 shadow-xl">
          <span className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-black text-lg inline-flex items-center justify-center mb-4">
            ⚡
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white max-w-lg mx-auto">
            Pronto para profissionalizar a vitrine da sua loja?
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto mt-3 leading-relaxed">
            Cadastre sua loja em menos de um minuto. Fotografe os produtos do seu estoque e comece a
            receber pedidos organizados hoje.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/login"
              className="bg-white hover:bg-stone-100 text-stone-900 font-bold text-sm sm:text-base py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <span>Criar minha vitrine grátis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rodapé Minimalista */}
      <footer className="w-full border-t border-stone-200/80 py-8 text-xs text-stone-500 px-4 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900">CatálogoFlash</span>
            <span>— Vitrine digital mobile-first para lojistas e comércio local</span>
          </div>
          <p>&copy; {new Date().getFullYear()} CatálogoFlash. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
