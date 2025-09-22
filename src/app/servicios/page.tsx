"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { useServicios } from "../../context/ServiciosContext";




type Servicio = {
  id: number;
  nombre: string;
  rubro: string;
  zona: string;
  imagen: string;
};




export default function ServiciosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroZona, setFiltroZona] = useState("");
  const [orden, setOrden] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const serviciosPorPagina = 6;
  const { servicios, loading, error } = useServicios();
  const { toggleFavorito, esFavorito } = useFavorites();

  if (loading) return <p className="p-6">Cargando servicios...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  // Filtrar por nombre/rubro y zona
  let serviciosFiltrados = servicios.filter((servicio) => {
    const coincideBusqueda =
      servicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      servicio.rubro.toLowerCase().includes(busqueda.toLowerCase());

    const coincideZona = filtroZona === "" || servicio.zona === filtroZona;

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

  // Resetear paginación al cambiar filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, filtroZona, orden]);

  // Calcular paginación
  const totalPaginas = Math.ceil(serviciosFiltrados.length / serviciosPorPagina);
  const inicio = (paginaActual - 1) * serviciosPorPagina;
  const serviciosPaginados = serviciosFiltrados.slice(
    inicio,
    inicio + serviciosPorPagina
  );

  // Limpiar filtros
  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroZona("");
    setOrden("");
  };

  // Resaltar búsqueda
  const resaltar = (texto: string) => {
    if (!busqueda) return texto;
    const regex = new RegExp(`(${busqueda})`, "gi");
    return texto.split(regex).map((parte, i) =>
      regex.test(parte) ? (
        <span key={i} className="bg-yellow-200 font-semibold">
          {parte}
        </span>
      ) : (
        parte
      )
    );
  };

  return (
    <main>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Servicios disponibles
      </h1>

      {/* Filtros */}
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
      {serviciosPaginados.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {serviciosPaginados.map((servicio) => (
            <li
              key={servicio.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition relative overflow-hidden"
            >
              {/* Favorito */}
              <button
                onClick={() => toggleFavorito(servicio)}
                className={`absolute top-3 right-3 text-2xl z-10 ${
                  esFavorito(servicio.id) ? "text-red-500" : "text-gray-400"
                }`}
                title="Agregar a favoritos"
              >
                ♥
              </button>

              {/* Imagen */}
              <img
                src={servicio.imagen}
                alt={servicio.nombre}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {resaltar(servicio.nombre)}
                </h2>
                <p className="text-gray-600">{resaltar(servicio.rubro)}</p>
                <p className="text-gray-500 text-sm">Zona: {servicio.zona}</p>
                <Link
                  href={`/servicios/${servicio.id}`}
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Ver detalle
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No se encontraron servicios.</p>
      )}

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </main>
  );
}
