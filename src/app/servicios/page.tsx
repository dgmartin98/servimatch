"use client";

import Link from "next/link";
import { useState } from "react";

type Servicio = {
  id: number;
  nombre: string;
  rubro: string;
  zona: string;
};

const servicios: Servicio[] = [
  { id: 1, nombre: "Juan Pérez", rubro: "Electricista", zona: "Palermo" },
  { id: 2, nombre: "María Gómez", rubro: "Plomera", zona: "Caballito" },
  { id: 3, nombre: "Carlos Ruiz", rubro: "Inmobiliaria", zona: "Recoleta" },
  { id: 4, nombre: "Ana Torres", rubro: "Gasista", zona: "Belgrano" },
  { id: 5, nombre: "Luis Fernández", rubro: "Carpintero", zona: "Almagro" },
];

export default function ServiciosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroZona, setFiltroZona] = useState("");
  const [orden, setOrden] = useState("");
  const [favoritos, setFavoritos] = useState<number[]>([]);

  // Filtrar por nombre/rubro y zona
  let serviciosFiltrados = servicios.filter((servicio) => {
    const coincideBusqueda =
      servicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      servicio.rubro.toLowerCase().includes(busqueda.toLowerCase());

    const coincideZona =
      filtroZona === "" || servicio.zona === filtroZona;

    return coincideBusqueda && coincideZona;
  });

  // Ordenar
  if (orden === "nombre") {
    serviciosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (orden === "rubro") {
    serviciosFiltrados.sort((a, b) => a.rubro.localeCompare(b.rubro));
  }

  // Zonas únicas
  const zonas = Array.from(new Set(servicios.map((s) => s.zona)));

  // Limpiar filtros
  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroZona("");
    setOrden("");
  };

  // Toggle favoritos
  const toggleFavorito = (id: number) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((fav) => fav !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  return (
    <main className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Servicios disponibles
      </h1>

      {/* Filtros y orden */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o rubro..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 p-2 border rounded"
        />

        <select
          value={filtroZona}
          onChange={(e) => setFiltroZona(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todas las zonas</option>
          {zonas.map((zona) => (
            <option key={zona} value={zona}>
              {zona}
            </option>
          ))}
        </select>

        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sin ordenar</option>
          <option value="nombre">Ordenar por nombre</option>
          <option value="rubro">Ordenar por rubro</option>
        </select>

        <button
          onClick={limpiarFiltros}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Limpiar
        </button>
      </div>

      {/* Contador */}
      <p className="mb-4 text-gray-700">
        {serviciosFiltrados.length} servicio(s) encontrado(s)
      </p>

      {/* Listado */}
      {serviciosFiltrados.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {serviciosFiltrados.map((servicio) => (
            <li
              key={servicio.id}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition relative"
            >
              <button
                onClick={() => toggleFavorito(servicio.id)}
                className={`absolute top-3 right-3 text-2xl ${
                  favoritos.includes(servicio.id)
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
                title="Agregar a favoritos"
              >
                ♥
              </button>

              <h2 className="text-xl font-semibold text-gray-800">
                {servicio.nombre}
              </h2>
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
        <p className="text-gray-600">No se encontraron servicios.</p>
      )}
    </main>
  );
}
