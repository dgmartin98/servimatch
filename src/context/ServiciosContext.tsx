"use client";

import { createContext, useContext, useState } from "react";

type Servicio = {
  id: number;
  nombre: string;
  rubro: string;
  zona: string;
  imagen: string;
};

type ServiciosContextType = {
  servicios: Servicio[];
  agregarServicio: (servicio: Servicio) => void;
};

const ServiciosContext = createContext<ServiciosContextType | undefined>(
  undefined
);

const serviciosIniciales: Servicio[] = [
  { id: 1, nombre: "Juan Pérez", rubro: "Electricista", zona: "Palermo", imagen: "https://i.pravatar.cc/150?img=1" },
  { id: 2, nombre: "María Gómez", rubro: "Plomera", zona: "Caballito", imagen: "https://i.pravatar.cc/150?img=2" },
  { id: 3, nombre: "Carlos Ruiz", rubro: "Inmobiliaria", zona: "Recoleta", imagen: "https://i.pravatar.cc/150?img=3" },
  { id: 4, nombre: "Ana Torres", rubro: "Gasista", zona: "Belgrano", imagen: "https://i.pravatar.cc/150?img=4" },
  { id: 5, nombre: "Luis Fernández", rubro: "Carpintero", zona: "Almagro", imagen: "https://i.pravatar.cc/150?img=5" },
  { id: 6, nombre: "Claudia Díaz", rubro: "Contadora", zona: "Microcentro", imagen: "https://i.pravatar.cc/150?img=6" },
  { id: 7, nombre: "Pedro Sánchez", rubro: "Abogado", zona: "San Isidro", imagen: "https://i.pravatar.cc/150?img=7" },
  { id: 8, nombre: "Florencia López", rubro: "Diseñadora Gráfica", zona: "Villa Urquiza", imagen: "https://i.pravatar.cc/150?img=8" },
  { id: 9, nombre: "Martín Castro", rubro: "Profesor de Inglés", zona: "Lanús", imagen: "https://i.pravatar.cc/150?img=9" },
  { id: 10, nombre: "Soledad Romero", rubro: "Psicóloga", zona: "Cañitas", imagen: "https://i.pravatar.cc/150?img=10" },
];

export function ServiciosProvider({ children }: { children: React.ReactNode }) {
  const [servicios, setServicios] = useState<Servicio[]>(serviciosIniciales);

  const agregarServicio = (servicio: Servicio) => {
    setServicios((prev) => [...prev, servicio]);
  };

  return (
    <ServiciosContext.Provider value={{ servicios, agregarServicio }}>
      {children}
    </ServiciosContext.Provider>
  );
}

export function useServicios() {
  const context = useContext(ServiciosContext);
  if (!context) {
    throw new Error("useServicios debe usarse dentro de ServiciosProvider");
  }
  return context;
}
