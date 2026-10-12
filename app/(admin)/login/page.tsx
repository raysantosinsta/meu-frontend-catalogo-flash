'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tenantName, setTenantName] = useState('');
  const [tenantSlug, setTenantSlug] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let res;
      if (isRegister) {
        res = await api.register({
          email,
          password,
          tenantName,
          tenantSlug,
          whatsapp,
        });
      } else {
        res = await api.login(email, password);
      }

      localStorage.setItem('catalogoflash_token', res.accessToken);
      localStorage.setItem('catalogoflash_user', JSON.stringify(res.user));
      localStorage.setItem('catalogoflash_tenant', JSON.stringify(res.tenant));

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Erro ao processar login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-stone-100 p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200/80">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500 text-white rounded-2xl font-black text-xl mb-2 shadow">
            ⚡
          </div>
          <h1 className="text-xl font-bold text-stone-900">CatálogoFlash</h1>
          <p className="text-xs text-stone-500 mt-1">
            {isRegister ? 'Crie sua loja e comece a vender em minutos' : 'Acesse o painel da sua loja'}
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nome da Loja</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Boutique Bella"
                  value={tenantName}
                  onChange={(e) => {
                    setTenantName(e.target.value);
                    if (!tenantSlug) {
                      setTenantSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, '-')
                          .replace(/-+/g, '-')
                      );
                    }
                  }}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Link / Slug da Vitrine
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: boutique-bella"
                  value={tenantSlug}
                  onChange={(e) => setTenantSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp de Vendas</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: 5585999999999"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">E-mail</label>
            <input
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 pr-10 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 transition"
                title={showPassword ? 'Ocultar senha' : 'Ver senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 hover:bg-stone-800 active:scale-[0.98] text-white font-semibold py-3 rounded-xl text-sm transition mt-2 shadow-sm disabled:opacity-60"
          >
            {loading ? 'Processando...' : isRegister ? 'Criar Loja Grátis' : 'Entrar no Painel'}
          </button>
        </form>

        <div className="text-center mt-5">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-xs text-stone-600 hover:text-stone-900 font-medium"
          >
            {isRegister
              ? 'Já tem uma conta? Clique aqui para entrar'
              : 'Não tem uma loja? Crie seu catálogo em 1 minuto'}
          </button>
        </div>
      </div>
    </div>
  );
}
