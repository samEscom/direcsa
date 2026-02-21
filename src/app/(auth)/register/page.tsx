'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'register', ...form }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Error al registrarse');
            // Auto-login after register
            const loginRes = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', email: form.email, password: form.password }),
            });
            if (loginRes.ok) {
                router.push('/dashboard');
            } else {
                router.push('/login');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Crear cuenta</h1>
            <p className="text-gray-500 text-sm mb-8">Regístrate para acceder al catálogo y cotizaciones</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre completo</label>
                    <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Juan García"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="tu@empresa.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
                    <input
                        type="password"
                        required
                        minLength={6}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Mínimo 6 caracteres"
                    />
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                ¿Ya tienes cuenta?{' '}
                <a href="/login" className="text-blue-600 font-medium hover:underline">
                    Iniciar sesión
                </a>
            </p>
        </div>
    );
}
