import { Product } from '@/services/api';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  whatsapp: string;
}

export function ProductGrid({ products, whatsapp }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-stone-400 text-sm">Nenhum produto cadastrado no momento.</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-12">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-stone-900">Todas as Peças</h2>
        <span className="text-xs text-stone-500 font-medium">{products.length} itens</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} whatsapp={whatsapp} />
        ))}
      </div>
    </div>
  );
}
