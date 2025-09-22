import "./globals.css";
import { ServiciosProvider } from "../context/ServiciosContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { AuthProvider } from "../context/AuthContext";
import Header from "../components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <ServiciosProvider>
            <FavoritesProvider>
              <Header />   {/* 👈 ahora siempre visible */}
              <main className="p-6">{children}</main>
            </FavoritesProvider>
          </ServiciosProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
