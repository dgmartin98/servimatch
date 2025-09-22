"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Servicio = {
  id: number;
  nombre: string;
  rubro: string;
  zona: string;
};

type FavoritesContextType = {
  favoritos: Servicio[];
  toggleFavorito: (servicio: Servicio) => void;
  esFavorito: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoritos, setFavoritos] = useState<Servicio[]>([]);

  // Cargar favoritos al iniciar
  useEffect(() => {
    const data = localStorage.getItem("favoritos");
    if (data) {
      setFavoritos(JSON.parse(data));
    }
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (servicio: Servicio) => {
    setFavoritos((prev) =>
      prev.some((fav) => fav.id === servicio.id)
        ? prev.filter((fav) => fav.id !== servicio.id)
        : [...prev, servicio]
    );
  };

  const esFavorito = (id: number) => favoritos.some((fav) => fav.id === id);

  return (
    <FavoritesContext.Provider value={{ favoritos, toggleFavorito, esFavorito }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  }
  return context;
}
