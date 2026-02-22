'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok) setStatus('success');
            else setStatus('error');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl shadow-sm">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">
                    ✓
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h2>
                <p className="text-gray-600">Nos pondremos en contacto contigo lo antes posible.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-blue-600 font-medium hover:underline"
                >
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-12 rounded-3xl shadow-sm">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input
                    required
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
                    placeholder="Tu nombre"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                    <input
                        required
                        name="email"
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
                        placeholder="correo@ejemplo.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                        name="phone"
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
                        placeholder="55 1234 5678"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                    required
                    name="description"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-black"
                    placeholder="Cuéntanos un poco sobre tu necesidad..."
                ></textarea>
            </div>
            {status === 'error' && (
                <p className="text-red-500 text-sm">Hubo un error al enviar el mensaje. Inténtalo de nuevo.</p>
            )}
            <button
                disabled={status === 'loading'}
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50"
            >
                {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
            </button>
        </form>
    );
}
