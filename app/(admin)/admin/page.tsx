'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Product } from '@/services/api';
import { Plus, ExternalLink, Trash2, Sparkles, Eye, EyeOff, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('catalogoflash_token');
    const storedTenant = localStorage.getItem('catalogoflash_tenant');

    if (!token) {
      router.push('/login');
      return;
    }

    if (storedTenant) {
      setTenant(JSON.parse(storedTenant));
    }

    fetchProducts(token);
  }, []);

  const fetchProducts = async (token: string) => {
    try {
      setLoading(true);
      const data = await api.getAdminProducts(token);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    const token = localStorage.getItem('catalogoflash_token');
    if (!token) return;

    try {
      const updated = await api.updateProductStatus(token, product.id, {
        isFeatured: !product.isFeatured,
      });
      setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (product: Product) => {
    const token = localStorage.getItem('catalogoflash_token');
    if (!token) return;

    try {
      const updated = await api.updateProductStatus(token, product.id, {
        isActive: !product.isActive,
      });
      setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir esta peça do catálogo?')) return;
    const token = localStorage.getItem('catalogoflash_token');
    if (!token) return;

    try {
      await api.deleteProduct(token, id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center">
      <div className="w-full max-w-lg sm:max-w-xl min-h-screen bg-stone-50 pb-24 shadow-sm sm:shadow-lg sm:my-4 sm:rounded-3xl border-x sm:border border-stone-200/80 overflow-hidden relative">
        {/* Topo do Painel */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-amber-500 font-black text-lg">⚡</span>
          <div>
            <h1 className="font-bold text-sm text-stone-900 leading-tight">
              {tenant?.name || 'Painel da Loja'}
            </h1>
            <span className="text-[11px] text-stone-400">/{tenant?.slug || 'loja'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {tenant?.slug && (
            <Link
              href={`/${tenant.slug}`}
              target="_blank"
              className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition"
              title="Abrir Vitrine"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Banner de Ação Rápida */}
        <div className="flex items-center justify-between bg-stone-900 text-white p-4 rounded-3xl shadow-sm mb-4">
          <div>
            <h2 className="text-sm font-bold">Gerenciar Estoque</h2>
            <p className="text-xs text-stone-400 mt-0.5">{products.length} peças cadastradas</p>
          </div>
          <Link
            href="/admin/novo"
            className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 text-xs font-bold px-3.5 py-2.5 rounded-2xl flex items-center gap-1.5 transition shadow"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Adicionar
          </Link>
        </div>

        {/* Lista de Peças com Toggles Rápidos */}
        {loading ? (
          <div className="text-center py-12 text-stone-400 text-xs">Carregando catálogo...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-3xl border border-stone-200">
            <span className="text-3xl mb-2 block">👗</span>
            <p className="text-sm font-bold text-stone-800">Nenhuma peça cadastrada ainda</p>
            <p className="text-xs text-stone-400 mt-1 mb-4">
              Tire fotos das suas peças e comece a compartilhar seu link!
            </p>
            <Link
              href="/admin/novo"
              className="inline-flex items-center gap-1.5 bg-stone-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow"
            >
              <Plus className="w-4 h-4" /> Cadastrar Primeira Peça
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((p) => {
              const formattedPrice = Number(p.price).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              });

              return (
                <div
                  key={p.id}
                  className={`bg-white p-3 rounded-2xl border transition shadow-sm flex items-center gap-3 ${
                    p.isActive ? 'border-stone-200' : 'border-stone-200 opacity-60 bg-stone-100/60'
                  }`}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-16 h-20 object-cover rounded-xl bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-xs text-stone-900 truncate">{p.name}</h3>
                      {p.isFeatured && (
                        <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                          ⚡ Top
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-stone-900 block mt-0.5">
                      {formattedPrice}
                    </span>

                    {/* Toggles Rápidos */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`text-[10px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1 transition ${
                          p.isFeatured
                            ? 'bg-amber-500 text-white'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        {p.isFeatured ? 'Destaque' : 'Destacar'}
                      </button>

                      <button
                        onClick={() => handleToggleActive(p)}
                        className={`text-[10px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1 transition ${
                          p.isActive
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {p.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {p.isActive ? 'Ativo' : 'Esgotado'}
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-[10px] p-1 text-stone-400 hover:text-rose-600 ml-auto transition"
                        title="Excluir"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) Mobile */}
      <div className="fixed bottom-4 left-0 right-0 max-w-lg sm:max-w-xl mx-auto px-4 z-30 pointer-events-none">
        <Link
          href="/admin/novo"
          className="pointer-events-auto w-full bg-stone-900 hover:bg-stone-800 active:scale-[0.98] text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Cadastrar Nova Peça
        </Link>
      </div>
    </div>
  </div>
  );
}
