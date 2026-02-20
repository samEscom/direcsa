import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DIRECSA — Soluciones Audiovisuales',
    description: 'Diseño, venta, instalación y soporte de soluciones audiovisuales profesionales.',
};

export default function LandingPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url("/images/audio_room.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <span className="inline-block bg-blue-500/30 text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        Soluciones Tecnológicas
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                        Transformamos ideas en experiencias audiovisuales
                    </h1>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        DIRECSA es una empresa tecnológica dedicada al diseño, venta, instalación y soporte
                        de soluciones audiovisuales con compromiso, honestidad y pasión por la excelencia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/*
                        <a
                            href="/products"
                            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                        >
                            Ver catálogo
                        </a>
                        */}
                        {/* TODO: Implementar registro y login
                        <a
                            href="/register"
                            className="bg-blue-500/30 text-white font-semibold px-8 py-3 rounded-xl border border-white/30 hover:bg-blue-500/50 transition-colors"
                        >
                            Crear cuenta gratis
                        </a>
                        */}
                    </div>
                </div>
            </section>

            {/* Quienes somos */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Quiénes somos</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        DIRECSA es una empresa tecnológica dedicada al diseño, venta, instalación y soporte
                        de soluciones audiovisuales. Creamos soluciones audiovisuales que transforman ideas en
                        experiencias, con compromiso, honestidad y pasión por la excelencia.
                    </p>
                </div>
            </section>

            {/* Nuestros servicios */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Nuestros servicios
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '📐',
                                title: 'Diseño de sistemas audiovisuales',
                                desc: 'Conceptualización y planificación técnica de espacios.',
                            },
                            {
                                icon: '🛍️',
                                title: 'Venta de equipos de audio y video',
                                desc: 'Distribución de las mejores marcas del mercado.',
                            },
                            {
                                icon: '🔧',
                                title: 'Instalación y configuración profesional',
                                desc: 'Puesta en marcha garantizada por expertos.',
                            },
                            {
                                icon: '🛡️',
                                title: 'Soporte y mantenimiento',
                                desc: 'Aseguramos la operatividad continua de tus equipos.',
                            },
                            {
                                icon: '🎥',
                                title: 'Renta de equipos audiovisuales',
                                desc: 'Soluciones para eventos de todo tipo.',
                            },
                        ].map((s) => (
                            <div key={s.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <div className="text-4xl mb-4">{s.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Por qué elegirnos */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Por qué elegirnos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '🏆',
                                title: 'Experiencia comprobada',
                                desc: 'Proyectos de todos los tamaños con resultados exitosos.',
                            },
                            {
                                icon: '🎯',
                                title: 'Enfoque en soluciones',
                                desc: 'Priorizamos resolver tus necesidades, no solo vender equipos.',
                            },
                            {
                                icon: '🤝',
                                title: 'Atención personalizada',
                                desc: 'Soporte constante y trato directo en cada etapa.',
                            },
                        ].map((item) => (
                            <div key={item.title} className="text-center">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA - TODO: Habilitar cuando el sistema de registro esté listo
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
            */}
        </>
    );
}
