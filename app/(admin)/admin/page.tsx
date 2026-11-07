'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api, Product } from '@/services/api';
import { normalizeImageUrl } from '@/app/context/CartContext';
import {
  Plus,
  ExternalLink,
  Trash2,
  Sparkles,
  Eye,
  EyeOff,
  LogOut,
  ChevronDown,
  Store,
  X,
  Check,
  Pencil,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMaster, setIsMaster] = useState(false);
  const [allTenants, setAllTenants] = useState<any[]>([]);
  const [showStoreSwitcher, setShowStoreSwitcher] = useState(false);
  const [showNewStoreModal, setShowNewStoreModal] = useState(false);

  // Estados para edição de produto
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIsFeatured, setEditIsFeatured] = useState(false);
  const [editIsActive, setEditIsActive] = useState(true);
  const [editNewPhoto, setEditNewPhoto] = useState<File | null>(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const editCameraInputRef = useRef<HTMLInputElement>(null);

  // Estados para criação de nova loja pelo master
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreSlug, setNewStoreSlug] = useState('');
  const [newStoreWhatsapp, setNewStoreWhatsapp] = useState('');
  const [newStoreEmail, setNewStoreEmail] = useState('santosray62@gmail.com');
  const [newStorePassword, setNewStorePassword] = useState('');
  const [showNewStorePassword, setShowNewStorePassword] = useState(false);
  const [creatingStore, setCreatingStore] = useState(false);
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('catalogoflash_token');
    const storedTenant = localStorage.getItem('catalogoflash_tenant');
    const storedUser = localStorage.getItem('catalogoflash_user');

    if (!token) {
      router.push('/login');
      return;
    }

    if (storedTenant) {
      setTenant(JSON.parse(storedTenant));
    }

    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.email?.toLowerCase() === 'santosray62@gmail.com') {
          setIsMaster(true);
          loadAllTenants(token);
        }
      } catch (e) {
        console.error(e);
      }
    }

    fetchProducts(token);
  }, []);

  const loadAllTenants = async (token: string) => {
    try {
      const data = await api.getAllTenants(token);
      setAllTenants(data);
    } catch (err: any) {
      console.warn('Aviso ao carregar lojas:', err.message);
    }
  };

  const handleSwitchStore = async (targetTenantId: string) => {
    const token = localStorage.getItem('catalogoflash_token');
    if (!token) return;

    try {
      setLoading(true);
      const res = await api.switchTenant(token, targetTenantId);
      localStorage.setItem('catalogoflash_token', res.accessToken);
      localStorage.setItem('catalogoflash_user', JSON.stringify(res.user));
      localStorage.setItem('catalogoflash_tenant', JSON.stringify(res.tenant));
      setTenant(res.tenant);
      setShowStoreSwitcher(false);
      await fetchProducts(res.accessToken);
    } catch (err: any) {
      alert(err.message || 'Erro ao trocar de vitrine.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('catalogoflash_token');
    if (!token) return;

    if (!newStorePassword || newStorePassword.trim().length < 6) {
      setModalError('A senha de acesso deve ter no mínimo 6 caracteres.');
      return;
    }

    setCreatingStore(true);
    setModalError('');

    try {
      const res = await api.register(
        {
          tenantName: newStoreName,
          tenantSlug: newStoreSlug,
          whatsapp: newStoreWhatsapp,
          email: newStoreEmail,
          password: newStorePassword,
        },
        token,
      );

      localStorage.setItem('catalogoflash_token', res.accessToken);
      localStorage.setItem('catalogoflash_user', JSON.stringify(res.user));
      localStorage.setItem('catalogoflash_tenant', JSON.stringify(res.tenant));
      setTenant(res.tenant);
      setShowNewStoreModal(false);
      setShowStoreSwitcher(false);
      setNewStoreName('');
      setNewStoreSlug('');
      setNewStoreWhatsapp('');
      setNewStorePassword('');
      await loadAllTenants(res.accessToken);
      await fetchProducts(res.accessToken);
    } catch (err: any) {
      setModalError(err.message || 'Erro ao criar vitrine virtual.');
    } finally {
      setCreatingStore(false);
    }
  };

  const fetchProducts = async (token: string) => {
    try {
      setLoading(true);
      const data = await api.getAdminProducts(token);
      setProducts(data);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('expirou') || err.message?.includes('401') || err.message?.includes('Unauthorized')) {
        localStorage.removeItem('catalogoflash_token');
        router.push('/login?expired=true');
      }
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

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setEditName(product.name || '');
    setEditPrice(String(product.price || ''));
    setEditDescription(product.description || '');
    setEditIsFeatured(Boolean(product.isFeatured));
    setEditIsActive(product.isActive !== false);
    setEditNewPhoto(null);
    setEditPhotoPreview(normalizeImageUrl(product.imageUrl));
    setEditError('');
    setEditSuccess(false);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    setEditNewPhoto(file);
    setEditPhotoPreview(URL.createObjectURL(file));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const token = localStorage.getItem('catalogoflash_token');
    if (!token) {
      router.push('/login');
      return;
    }

    setEditLoading(true);
    setEditError('');

    try {
      const formData = new FormData();
      if (editNewPhoto) {
        formData.append('file', editNewPhoto);
      }
      formData.append('name', editName.trim());
      formData.append('price', editPrice.trim());
      formData.append('description', editDescription.trim());
      formData.append('isFeatured', String(editIsFeatured));
      formData.append('isActive', String(editIsActive));

      const updated = await api.updateProduct(token, editingProduct.id, formData);
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? updated : p)));
      setEditSuccess(true);
      setTimeout(() => {
        setEditingProduct(null);
      }, 600);
    } catch (err: any) {
      setEditError(err.message || 'Erro ao atualizar produto.');
    } finally {
      setEditLoading(false);
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
            {isMaster ? (
              <button
                type="button"
                onClick={() => setShowStoreSwitcher(!showStoreSwitcher)}
                className="flex items-center gap-1.5 hover:opacity-80 transition text-left group"
                title="Alternar entre vitrines"
              >
                <div>
                  <div className="flex items-center gap-1">
                    <h1 className="font-bold text-sm text-stone-900 leading-tight">
                      {tenant?.name || 'Painel da Loja'}
                    </h1>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-600 transition" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-stone-400">/{tenant?.slug || 'loja'}</span>
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      Master
                    </span>
                  </div>
                </div>
              </button>
            ) : (
              <div>
                <h1 className="font-bold text-sm text-stone-900 leading-tight">
                  {tenant?.name || 'Painel da Loja'}
                </h1>
                <span className="text-[11px] text-stone-400">/{tenant?.slug || 'loja'}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {isMaster && (
            <button
              onClick={() => setShowNewStoreModal(true)}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition shadow-sm"
              title="Cadastrar Nova Vitrine/Loja"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span className="hidden sm:inline">Nova Vitrine</span>
            </button>
          )}

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

      {/* Menu Dropdown de Alternância de Lojas (Master Admin) */}
      {showStoreSwitcher && isMaster && (
        <div className="bg-white border-b border-stone-200 p-3 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Vitrines Cadastradas ({allTenants.length})
            </span>
            <button
              onClick={() => {
                setShowStoreSwitcher(false);
                setShowNewStoreModal(true);
              }}
              className="text-xs text-amber-600 font-bold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Criar Nova Vitrine
            </button>
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {allTenants.map((t) => {
              const isActive = t.id === tenant?.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSwitchStore(t.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                    isActive
                      ? 'bg-amber-500 text-white font-bold'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Store className="w-3.5 h-3.5" />
                    <div>
                      <div>{t.name}</div>
                      <div className={`text-[10px] ${isActive ? 'text-amber-100' : 'text-stone-400'}`}>
                        /{t.slug}
                      </div>
                    </div>
                  </div>
                  {isActive && <Check className="w-4 h-4 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal de Criação de Loja (Master) */}
      {showNewStoreModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
                <h3 className="font-bold text-sm text-stone-900">Nova Vitrine Virtual</h3>
              </div>
              <button
                onClick={() => setShowNewStoreModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {modalError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-2.5 rounded-xl mb-3">
                {modalError}
              </div>
            )}

            <form onSubmit={handleCreateStore} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Nome da Loja *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Boutique Bella"
                  value={newStoreName}
                  onChange={(e) => {
                    setNewStoreName(e.target.value);
                    if (!newStoreSlug) {
                      setNewStoreSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, '-')
                          .replace(/-+/g, '-')
                      );
                    }
                  }}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Slug do Link (ex: sua-loja) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: boutique-bella"
                  value={newStoreSlug}
                  onChange={(e) =>
                    setNewStoreSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
                  }
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  WhatsApp de Vendas *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: 5585999999999"
                  value={newStoreWhatsapp}
                  onChange={(e) => setNewStoreWhatsapp(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  E-mail de Acesso da Loja *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ex: morenaflor@gmail.com"
                  value={newStoreEmail}
                  onChange={(e) => setNewStoreEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Senha de Acesso da Loja *
                </label>
                <div className="relative">
                  <input
                    type={showNewStorePassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="Mínimo 6 caracteres (ex: Morena@123)"
                    value={newStorePassword}
                    onChange={(e) => setNewStorePassword(e.target.value)}
                    className="w-full text-xs px-3 py-2 pr-9 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewStorePassword(!showNewStorePassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
                    title={showNewStorePassword ? 'Ocultar senha' : 'Ver senha'}
                  >
                    {showNewStorePassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <span className="text-[10px] text-stone-400 mt-1 block">
                  A loja usará este e-mail e senha para fazer login e gerenciar seu catálogo.
                </span>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewStoreModal(false)}
                  className="flex-1 text-xs py-2.5 rounded-xl border border-stone-300 text-stone-600 font-medium hover:bg-stone-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creatingStore}
                  className="flex-1 text-xs py-2.5 rounded-xl bg-stone-900 text-white font-bold hover:bg-stone-800 disabled:opacity-50"
                >
                  {creatingStore ? 'Criando...' : 'Criar Vitrine'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Edição de Produto */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-stone-200 my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                  <Pencil className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900 leading-tight">Editar Peça</h3>
                  <span className="text-[11px] text-stone-400">Atualize as informações do seu produto</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {editError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl mb-4">
                {editError}
              </div>
            )}

            {editSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3 rounded-xl mb-4 flex items-center gap-2">
                <Check className="w-4 h-4" /> Produto atualizado com sucesso!
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {/* Seção da Foto */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Foto do Produto
                </label>
                <div className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-200 relative">
                    {editPhotoPreview ? (
                      <img
                        src={editPhotoPreview}
                        alt="Foto da peça"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                        Sem foto
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <span className="text-xs text-stone-600 block">
                      {editNewPhoto ? 'Nova foto selecionada' : 'Foto atual do catálogo'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => editFileInputRef.current?.click()}
                        className="text-xs bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-semibold px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition shadow-2xs"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-stone-600" />
                        Galeria
                      </button>
                      <button
                        type="button"
                        onClick={() => editCameraInputRef.current?.click()}
                        className="text-xs bg-stone-900 hover:bg-stone-800 text-white font-semibold px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition shadow-2xs"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        Câmera
                      </button>
                    </div>
                  </div>
                </div>

                <input
                  ref={editFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleEditFileChange}
                  className="hidden"
                />
                <input
                  ref={editCameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleEditFileChange}
                  className="hidden"
                />
              </div>

              {/* Nome */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nome da Peça *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Ex: Vestido Floral Linho"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Preço */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Preço de Venda (R$) *
                </label>
                <input
                  type="text"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="Ex: 89,90"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-bold"
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Descrição / Tamanhos (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Ex: Tamanhos P e M. Tecido 100% algodão."
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Opções de Destaque e Ativo */}
              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 space-y-2.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">Destaque da Semana</span>
                      <span className="text-[10px] text-stone-400">Aparece no carrossel de topo</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={editIsFeatured}
                    onChange={(e) => setEditIsFeatured(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                </label>

                <div className="border-t border-stone-200/60" />

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">Produto Ativo / Disponível</span>
                      <span className="text-[10px] text-stone-400">Desmarque se estiver esgotado</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={editIsActive}
                    onChange={(e) => setEditIsActive(e.target.checked)}
                    className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                  />
                </label>
              </div>

              {/* Ações */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  disabled={editLoading}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-2.5 rounded-xl text-xs transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-bold py-2.5 rounded-xl text-xs transition shadow flex items-center justify-center gap-1.5 disabled:opacity-60"
                >
                  {editLoading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                    src={normalizeImageUrl(p.imageUrl)}
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

                      {/* Botão Editar Peça */}
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="text-[10px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1 bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60 transition"
                        title="Editar Informações da Peça"
                      >
                        <Pencil className="w-3 h-3 text-amber-600" />
                        Editar
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
