import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Direcsa — Catálogo B2B',
    description: 'Plataforma de cotizaciones y catálogo de productos para empresas',
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <a href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">D</span>
                            </div>
                            <span className="font-bold text-gray-900 text-lg">Direcsa</span>
                        </a>
                        <nav className="flex items-center gap-6">
                            <a href="/products" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
                                Catálogo
                            </a>
                            <a href="/login" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
                                Iniciar sesión
                            </a>
                            <a
                                href="/register"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                Registrarse
                            </a>
                        </nav>
                    </div>
                </div>
            </header>
            <main>{children}</main>
            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Direcsa. Plataforma B2B de cotizaciones.
                </div>
            </footer>
        </div>
    );
}
