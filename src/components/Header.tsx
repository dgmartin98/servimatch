"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="p-4 bg-gray-100 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        ServiMatch
      </Link>

      <nav className="flex gap-4 items-center">
        <Link href="/servicios" className="text-gray-700 hover:text-blue-600">
          Servicios
        </Link>
        <Link href="/servicios/nuevo" className="text-gray-700 hover:text-blue-600">
          Publicar
        </Link>

        {user ? (
          <>
            <span className="text-gray-600">{user.email}</span>
            <button
              onClick={signOut}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-blue-600 hover:underline">
              Ingresar
            </Link>
            <Link href="/registro" className="text-green-600 hover:underline">
              Registrarme
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
