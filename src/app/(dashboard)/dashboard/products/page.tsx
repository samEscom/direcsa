'use client';

import { useState, useEffect, useCallback } from 'react';

interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    unit: string;
    description: string | null;
    isActive: boolean;
}

const emptyForm = { name: '', sku: '', price: '', unit: 'pza', description: '' };

export default function DashboardProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data.products ?? []);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    function openCreate() {
        setForm(emptyForm);
        setEditId(null);
        setError('');
        setShowForm(true);
    }

    function openEdit(p: Product) {
        setForm({ name: p.name, sku: p.sku, price: String(p.price), unit: p.unit, description: p.description ?? '' });
        setEditId(p.id);
        setError('');
        setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setSaving(true);
        try {
            const payload = { ...form, price: parseFloat(form.price) };
            const res = await fetch(editId ? `/api/products/${editId}` : '/api/products', {
                method: editId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Error al guardar');
            setShowForm(false);
            fetchProducts();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('¿Eliminar este producto?')) return;
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
    }

    async function toggleActive(p: Product) {
        await fetch(`/api/products/${p.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive: !p.isActive }),
        });
        fetchProducts();
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
                    <p className="text-gray-500 text-sm mt-1">Gestiona el catálogo de productos</p>
                </div>
                <button
                    onClick={openCreate}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <span>+</span> Nuevo producto
                </button>
            </div>

            {/* Form modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            {editId ? 'Editar producto' : 'Nuevo producto'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                                    <input
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nombre del producto"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                                    <input
                                        required
                                        value={form.sku}
                                        onChange={(e) => setForm({ ...form, sku: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="PROD-001"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                                    <input
                                        value={form.unit}
                                        onChange={(e) => setForm({ ...form, unit: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="pza, kg, lt..."
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <textarea
                                        rows={3}
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        placeholder="Descripción opcional del producto"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {saving ? 'Guardando...' : editId ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Products table */}
            {loading ? (
                <div className="text-center py-20 text-gray-400">Cargando productos...</div>
            ) : products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                    <div className="text-5xl mb-4">📦</div>
                    <p className="text-gray-500 font-medium">No hay productos aún</p>
                    <button onClick={openCreate} className="mt-4 text-blue-600 text-sm hover:underline">
                        Crear el primero →
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Producto</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">SKU</th>
                                <th className="text-right px-6 py-4 font-semibold text-gray-600">Precio</th>
                                <th className="text-center px-6 py-4 font-semibold text-gray-600">Estado</th>
                                <th className="text-right px-6 py-4 font-semibold text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{p.name}</p>
                                        {p.description && <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{p.description}</p>}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-gray-500">{p.sku}</td>
                                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                                        ${p.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                        <span className="text-gray-400 font-normal text-xs ml-1">/{p.unit}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => toggleActive(p)}
                                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${p.isActive
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                }`}
                                        >
                                            {p.isActive ? 'Activo' : 'Inactivo'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEdit(p)}
                                                className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="text-red-500 hover:text-red-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
