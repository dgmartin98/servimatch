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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const creado = await agregarServicio({ nombre, rubro, zona, imagen });
    if (!creado) {
      alert("Error al agregar servicio");
      return;
    }

    router.push("/servicios");
  };

  return (
    <main className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Agregar nuevo servicio</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input className="p-2 border rounded" required placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input className="p-2 border rounded" required placeholder="Rubro" value={rubro} onChange={(e) => setRubro(e.target.value)} />
        <input className="p-2 border rounded" required placeholder="Zona" value={zona} onChange={(e) => setZona(e.target.value)} />
        <input className="p-2 border rounded" placeholder="URL de imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Guardar
        </button>
      </form>
    </main>
  );
}
