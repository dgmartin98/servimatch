"use client";

import Link from "next/link";
import { useFavorites } from "../../context/FavoritesContext";

export default function FavoritosPage() {
  const { favoritos } = useFavorites();

  return (
    <main>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Mis Favoritos</h1>

      {favoritos.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {favoritos.map((servicio) => (
            <li
              key={servicio.id}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{servicio.nombre}</h2>
              <p className="text-gray-600">{servicio.rubro}</p>
              <p className="text-gray-500 text-sm">Zona: {servicio.zona}</p>
              <Link
                href={`/servicios/${servicio.id}`}
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Ver detalle
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Todavía no marcaste ningún favorito ♥</p>
      )}
    </main>
  );
}
