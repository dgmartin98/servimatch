import "./globals.css";
import Link from "next/link";
import { FavoritesProvider } from "../context/FavoritesContext";
import { ServiciosProvider } from "../context/ServiciosContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <ServiciosProvider>
          <FavoritesProvider>
            {/* Header */}
            <header className="bg-blue-600 text-white p-4">
              <nav className="max-w-6xl mx-auto flex gap-6">
                <Link href="/" className="hover:underline font-semibold">
                  Home
                </Link>
                <Link href="/servicios" className="hover:underline font-semibold">
                  Servicios
                </Link>
                <Link href="/servicios/nuevo" className="hover:underline font-semibold">
                  + Agregar Servicio
                </Link>
                <Link href="/favoritos" className="hover:underline font-semibold">
                  Favoritos
                </Link>
              </nav>
            </header>

            {/* Contenido principal */}
            <main className="max-w-6xl mx-auto p-6">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-200 text-center text-sm p-4 mt-12">
              © {new Date().getFullYear()} ServiMatch — Conectando clientes y profesionales
            </footer>
          </FavoritesProvider>
        </ServiciosProvider>
      </body>
    </html>
  );
}
