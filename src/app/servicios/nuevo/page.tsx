"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useServicios } from "../../../context/ServiciosContext";

export default function NuevoServicioPage() {
  const [nombre, setNombre] = useState("");
  const [rubro, setRubro] = useState("");
  const [zona, setZona] = useState("");
  const [imagen, setImagen] = useState("https://i.pravatar.cc/150");

  const router = useRouter();
  const { agregarServicio } = useServicios();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoServicio = {
      id: Date.now(),
      nombre,
      rubro,
      zona,
      imagen,
    };

    agregarServicio(nuevoServicio);
    router.push("/servicios");
  };

  return (
    <main className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        Agregar nuevo servicio
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Rubro"
          value={rubro}
          onChange={(e) => setRubro(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Zona"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL de imagen (opcional)"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </form>
    </main>
  );
}
