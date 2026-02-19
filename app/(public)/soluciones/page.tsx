import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Soluciones — DIRECSA',
    description: 'Expertos en integración audiovisual para centros religiosos, entretenimiento y corporativos.',
};

export default function SolutionsPage() {
    return (
        <div className="bg-white">
            {/* Header Hero */}
            <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url("/images/live_events.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">Soluciones que Inspiran</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        En DIRECSA, no solo instalamos equipos; diseñamos experiencias que conectan a las personas.
                    </p>
                </div>
            </section>

            {/* Religious Centers */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Espacios Sagrados</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">Centros Religiosos</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Entendemos la importancia de cada palabra y cada nota en un entorno espiritual.
                            Nuestras soluciones de audio garantizan que el mensaje llegue a cada rincón con total claridad,
                            mientras que nuestros sistemas de vídeo mejoran la conexión visual con la congregación.
                        </p>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center gap-2">
                                <span className="text-blue-500 text-xl">✓</span> Refuerzo sonoro de alta fidelidad
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-blue-500 text-xl">✓</span> Sistemas de transmisión en vivo
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-blue-500 text-xl">✓</span> Iluminación arquitectónica y ambiental
                            </li>
                        </ul>
                    </div>
                    <div className="bg-gray-100 rounded-3xl aspect-video flex items-center justify-center overflow-hidden shadow-2xl">
                        <div className="text-gray-400 text-center p-8">
                            <span className="text-6xl block mb-4">⛪</span>
                            <p className="text-sm font-medium">Diseño Acústico para Templos</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Entertainment */}
            <section className="py-24 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 bg-gray-900 rounded-3xl aspect-video flex items-center justify-center overflow-hidden shadow-2xl">
                        <div className="text-blue-400 text-center p-8">
                            <span className="text-6xl block mb-4">🎭</span>
                            <p className="text-sm font-medium text-blue-200">Experiencias de Inmersión Total</p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Diversión y Adrenalina</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">Entretenimiento</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Desde auditorios y teatros hasta centros de recreación, creamos entornos donde el audio y el vídeo
                            cobran vida. Utilizamos tecnología de punta para ofrecer potencia, claridad y un control intuitivo.
                        </p>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center gap-2">
                                <span className="text-indigo-500 text-xl">✓</span> Sistemas de audio multizona
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-indigo-500 text-xl">✓</span> Pantallas LED de gran formato
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-indigo-500 text-xl">✓</span> Automatización de espacios
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Brands */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Las mejores marcas, resultados excepcionales</h2>
                    <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
                        Trabajamos exclusivamente con líderes de la industria para garantizar que tu inversión
                        tenga el rendimiento y la durabilidad que tu proyecto exige.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                        <div className="p-8 border border-gray-100 rounded-2xl grayscale hover:grayscale-0 transition-all">
                            <span className="text-xl font-bold text-gray-800">SHURE</span>
                        </div>
                        <div className="p-8 border border-gray-100 rounded-2xl grayscale hover:grayscale-0 transition-all">
                            <span className="text-xl font-bold text-gray-800">SONOS</span>
                        </div>
                        <div className="p-8 border border-gray-100 rounded-2xl grayscale hover:grayscale-0 transition-all">
                            <span className="text-xl font-bold text-gray-800">BOSE</span>
                        </div>
                        <div className="p-8 border border-gray-100 rounded-2xl grayscale hover:grayscale-0 transition-all">
                            <span className="text-xl font-bold text-gray-800">CRESTRON</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-600 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl font-bold mb-6">¿Tienes un proyecto en mente?</h2>
                    <p className="text-blue-100 mb-10 text-lg">Permítenos ayudarte a convertir tu visión en realidad con soluciones a medida.</p>
                    <a
                        href="/contacto"
                        className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                        Solicitar asesoría
                    </a>
                </div>
            </section>
        </div>
    );
}
