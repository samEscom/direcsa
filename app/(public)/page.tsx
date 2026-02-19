import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Direcsa — Soluciones B2B',
    description: 'Plataforma de catálogo y cotizaciones para empresas',
};

export default function LandingPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-blue-500/30 text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        Plataforma B2B
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                        Catálogo y cotizaciones<br />para tu empresa
                    </h1>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Explora nuestro catálogo de productos, solicita cotizaciones personalizadas
                        y gestiona tus pedidos en un solo lugar.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/products"
                            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                        >
                            Ver catálogo
                        </a>
                        <a
                            href="/register"
                            className="bg-blue-500/30 text-white font-semibold px-8 py-3 rounded-xl border border-white/30 hover:bg-blue-500/50 transition-colors"
                        >
                            Crear cuenta gratis
                        </a>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Todo lo que necesitas para cotizar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '📦',
                                title: 'Catálogo completo',
                                desc: 'Accede a todos nuestros productos con precios, descripciones y disponibilidad.',
                            },
                            {
                                icon: '📋',
                                title: 'Cotizaciones rápidas',
                                desc: 'Solicita cotizaciones en minutos. Nuestro equipo las revisa y responde a la brevedad.',
                            },
                            {
                                icon: '📊',
                                title: 'Dashboard propio',
                                desc: 'Gestiona tus cotizaciones y da seguimiento a cada solicitud desde tu cuenta.',
                            },
                        ].map((f) => (
                            <div key={f.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                                <div className="text-4xl mb-4">{f.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-900 text-white py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
                    <p className="text-gray-400 mb-8">Crea tu cuenta y empieza a cotizar hoy mismo.</p>
                    <a
                        href="/register"
                        className="bg-blue-600 text-white font-semibold px-10 py-3 rounded-xl hover:bg-blue-700 transition-colors inline-block"
                    >
                        Registrarse gratis
                    </a>
                </div>
            </section>
        </>
    );
}
