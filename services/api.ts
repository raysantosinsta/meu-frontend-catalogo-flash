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

  async register(data: {
    email: string;
    password: string;
    tenantName: string;
    tenantSlug: string;
    whatsapp: string;
  }): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao criar conta.');
    }
    return res.json();
  },

  // Admin Produtos (requer token)
  async getAdminProducts(token: string): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Erro ao listar produtos.');
    return res.json();
  },

  async createProduct(token: string, formData: FormData): Promise<Product> {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Erro ao cadastrar produto.');
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
    if (!res.ok) throw new Error('Erro ao atualizar status do produto.');
    return res.json();
  },

  async deleteProduct(token: string, id: string): Promise<void> {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Erro ao deletar produto.');
  },
};
