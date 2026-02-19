import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Detalle de Producto — Direcsa',
};

interface Product {
    id: string;
    name: string;
    description: string | null;
    sku: string;
    price: number;
    unit: string;
    isActive: boolean;
}

async function getProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products/${id}`, {
            cache: 'no-store',
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.product ?? null;
    } catch {
        return null;
    }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h1>
                <a href="/products" className="text-blue-600 hover:underline text-sm">← Volver al catálogo</a>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <a href="/products" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-8">
                ← Volver al catálogo
            </a>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <p className="text-xs text-gray-400 font-mono mb-2">{product.sku}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                {product.description && (
                    <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                )}
                <div className="flex items-end gap-2 mb-8">
                    <span className="text-4xl font-bold text-blue-700">
                        ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-gray-400 mb-1">/ {product.unit}</span>
                </div>
                <div className="border-t border-gray-100 pt-6">
                    <a
                        href="/register"
                        className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors inline-block"
                    >
                        Solicitar cotización
                    </a>
                    <p className="text-xs text-gray-400 mt-3">Regístrate para solicitar una cotización personalizada.</p>
                </div>
            </div>
        </div>
    );
}
