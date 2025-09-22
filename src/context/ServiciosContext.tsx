"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type Servicio = {
  id: number;
  nombre: string;
  rubro: string;
  zona: string;
  imagen: string;
  created_at: string;
};

type ServiciosContextType = {
  servicios: Servicio[];
  cargarServicios: () => Promise<void>;
  agregarServicio: (nuevo: Omit<Servicio, "id" | "created_at">) => Promise<Servicio | null>;
  loading: boolean;
  error: string | null;
};

const ServiciosContext = createContext<ServiciosContextType | undefined>(undefined);

export function ServiciosProvider({ children }: { children: React.ReactNode }) {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarServicios = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("servicios")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setServicios((data ?? []) as Servicio[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  const agregarServicio = async (nuevo: Omit<Servicio, "id" | "created_at">) => {
    const { data, error } = await supabase
      .from("servicios")
      .insert([nuevo])
      .select()
      .single();

    if (error) {
      setError(error.message);
      return null;
    }
    const creado = data as Servicio;
    setServicios((prev) => [creado, ...prev]); // lo agregamos a la lista actual
    return creado;
  };

  return (
    <ServiciosContext.Provider
      value={{ servicios, cargarServicios, agregarServicio, loading, error }}
    >
      {children}
    </ServiciosContext.Provider>
  );
}

export function useServicios() {
  const ctx = useContext(ServiciosContext);
  if (!ctx) throw new Error("useServicios debe usarse dentro de ServiciosProvider");
  return ctx;
}
