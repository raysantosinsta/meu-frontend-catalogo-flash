const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number | string;
  imageUrl: string;
  imageKey?: string;
  isFeatured: boolean;
  isActive: boolean;
  tenantId: string;
  createdAt: string;
}

export interface TenantPublicData {
  id: string;
  name: string;
  slug: string;
  whatsapp: string;
  logoUrl?: string;
  featuredProducts: Product[];
  products: Product[];
}

export interface AuthResponse {
  accessToken: string;
  user: { id: string; email: string };
  tenant: { id: string; name: string; slug: string; whatsapp: string; logoUrl?: string };
}

export const api = {
  // Públicos
  async getTenantCatalog(slug: string): Promise<TenantPublicData> {
    const res = await fetch(`${API_URL}/tenants/${slug}`, {
      next: { revalidate: 10 }, // Revalidação ISR rápida
    });
    if (!res.ok) {
      throw new Error('Loja não encontrada');
    }
    return res.json();
  },

  // Auth
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao realizar login.');
    }
    return res.json();
  },

  async register(
    data: {
      email: string;
      password: string;
      tenantName: string;
      tenantSlug: string;
      whatsapp: string;
    },
    token?: string,
  ): Promise<AuthResponse> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const authToken =
      token || (typeof window !== 'undefined' ? localStorage.getItem('catalogoflash_token') : null);
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao criar conta.');
    }
    return res.json();
  },

  async createStoreAsMaster(
    token: string,
    data: {
      email: string;
      password: string;
      tenantName: string;
      tenantSlug: string;
      whatsapp: string;
    },
  ): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/admin/create-store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao cadastrar nova loja.');
    }
    return res.json();
  },

  async getAllTenants(token: string): Promise<any[]> {
    const res = await fetch(`${API_URL}/tenants`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao buscar lojas.');
    }
    return res.json();
  },

  async switchTenant(token: string, tenantId: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/switch-tenant/${tenantId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao alternar de loja.');
    }
    return res.json();
  },

  // Admin Produtos (requer token)
  async getAdminProducts(token: string): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      if (res.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('catalogoflash_token');
          window.location.href = '/login?expired=true';
        }
        throw new Error('Sua sessão expirou. Redirecionando para login...');
      }
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || `Erro ao listar produtos (${res.status}).`);
    }
    return res.json();
  },

  async createProduct(token: string, formData: FormData): Promise<Product> {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) {
      if (res.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('catalogoflash_token');
        window.location.href = '/login?expired=true';
      }
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao cadastrar produto.');
    }
    return res.json();
  },

  async updateProduct(token: string, id: string, formData: FormData): Promise<Product> {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) {
      if (res.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('catalogoflash_token');
        window.location.href = '/login?expired=true';
      }
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao atualizar produto.');
    }
    return res.json();
  },

  async updateProductStatus(
    token: string,
    id: string,
    status: { isFeatured?: boolean; isActive?: boolean },
  ): Promise<Product> {
    const res = await fetch(`${API_URL}/products/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(status),
    });
    if (!res.ok) {
      if (res.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('catalogoflash_token');
        window.location.href = '/login?expired=true';
      }
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao atualizar status do produto.');
    }
    return res.json();
  },

  async deleteProduct(token: string, id: string): Promise<void> {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      if (res.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('catalogoflash_token');
        window.location.href = '/login?expired=true';
      }
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao deletar produto.');
    }
  },
};
