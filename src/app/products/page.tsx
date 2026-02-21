import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Catálogo de Productos — Direcsa',
    description: 'Explora nuestro catálogo completo de productos B2B',
};

interface Product {
    id: string;
    name: string;
    description: string | null;
    sku: string;
    price: number;
    unit: string;
}

async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?active=true`, {
            cache: 'no-store',
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.products ?? [];
    } catch {
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de productos</h1>
                <p className="text-gray-600">Encuentra los productos que necesitas y solicita una cotización.</p>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <div className="text-5xl mb-4">📦</div>
                    <p className="text-lg font-medium">No hay productos disponibles aún</p>
                    <p className="text-sm mt-2">Vuelve pronto o contacta a nuestro equipo.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <a
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all group"
                        >
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                                <span className="text-2xl">📦</span>
                            </div>
                            <p className="text-xs text-gray-400 font-mono mb-1">{product.sku}</p>
                            <h2 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h2>
                            {product.description && (
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.description}</p>
                            )}
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-lg font-bold text-blue-700">
                                    ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </span>
                                <span className="text-xs text-gray-400">/ {product.unit}</span>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
