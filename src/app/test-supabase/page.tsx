"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TestSupabasePage() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      const { data, error } = await supabase.from("servicios").select("*");
      if (error) {
        setError(error.message);
      } else {
        setData(data || []);
      }
    };
    cargar();
  }, []);

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test conexión Supabase</h1>
      {data.length > 0 ? (
        <ul className="list-disc pl-6">
          {data.map((item) => (
            <li key={item.id}>
              {item.nombre} — {item.rubro} — {item.zona}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay servicios cargados en la tabla.</p>
      )}
    </main>
  );
}
