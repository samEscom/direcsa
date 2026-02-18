import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Direcsa — Plataforma B2B',
  description: 'Catálogo de productos y cotizaciones para empresas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
