import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Acceso — Direcsa',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <a href="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">D</span>
                        </div>
                        <span className="font-bold text-gray-900 text-xl">Direcsa</span>
                    </a>
                </div>
                {children}
            </div>
        </div>
    );
}
