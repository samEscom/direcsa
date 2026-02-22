'use client';

import ContactForm from '../components/ContactForm';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                    {/* Información de contacto */}
                    <div className="bg-blue-600 p-12 text-white">
                        <h1 className="text-3xl font-bold mb-6">Hablemos de tu próximo proyecto</h1>
                        <p className="text-blue-100 mb-12">
                            Estamos listos para escucharte y diseñar la solución técnica que tu espacio necesita.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">📍</div>
                                <span>Ciudad de México, México</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">✉️</div>
                                <span>direcsa.audio@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="p-0">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
