import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Business Analytics',
  description: 'Financial Analysis Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 text-gray-800">
        {/* Навигационная панель */}
        <nav className="bg-gray-900 text-white shadow-md">
          <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="font-bold text-xl tracking-tight">Business Analytics Dashboard</div>
            <div className="flex gap-6 font-medium">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                NPV Analysis
              </Link>
              <Link href="/sales" className="hover:text-blue-400 transition-colors">
                Sales forecast
              </Link>
              <Link href="/about" className="hover:text-blue-400 transition-colors">
                About
              </Link>
            </div>
          </div>
        </nav>

        {/* Здесь будут рендериться сами страницы */}
        <main>{children}</main>
      </body>
    </html>
  );
}