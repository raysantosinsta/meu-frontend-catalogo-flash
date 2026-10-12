'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CameraCapture } from '@/app/components/admin/CameraCapture';
import { api } from '@/services/api';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function NovoProdutoPage() {
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      setError('Por favor, tire ou selecione a foto do produto.');
      return;
    }

    const token = localStorage.getItem('catalogoflash_token');
    if (!token) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', photo);
      formData.append('name', name);
      formData.append('price', price);
      if (description) formData.append('description', description);
      formData.append('isFeatured', String(isFeatured));

      await api.createProduct(token, formData);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Erro ao publicar produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center">
      <div className="w-full max-w-lg sm:max-w-xl min-h-screen bg-stone-50 pb-10 shadow-sm sm:shadow-lg sm:my-4 sm:rounded-3xl border-x sm:border border-stone-200/80 overflow-hidden">
        {/* Topo */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="p-1 -ml-1 text-stone-600 hover:text-stone-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-bold text-sm text-stone-900">Novo Produto</h1>
        <div className="w-5" />
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Captura de Foto Otimizada */}
        <CameraCapture onImageCaptured={(file) => setPhoto(file)} />

        {/* Campos Rápidos */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200 space-y-3.5 shadow-sm">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Nome da Peça *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Vestido Linho Floral"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Preço de Venda (R$) *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: 89,90"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Descrição / Tamanhos (Opcional)
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Tamanhos P e M disponíveis. Tecido leve."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Destaque Toggle */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <div>
                <span className="text-xs font-bold text-stone-800 block">Peça em Destaque?</span>
                <span className="text-[11px] text-stone-400">Aparecerá no carrossel do topo</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !photo}
          className="w-full bg-stone-900 hover:bg-stone-800 active:scale-[0.98] text-white font-bold py-3.5 rounded-2xl text-sm transition shadow disabled:opacity-60"
        >
          {loading ? 'Fazendo Upload no R2...' : '⚡ Publicar no Catálogo'}
        </button>
      </form>
    </div>
  </div>
  );
}
