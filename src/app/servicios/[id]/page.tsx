import { notFound } from "next/navigation";

type Servicio = {
  id: number;
  nombre: string;
  rubro: string;
  zona: string;
  descripcion: string;
  contacto: string;
};

const servicios: Servicio[] = [
  {
    id: 1,
    nombre: "Juan Pérez",
    rubro: "Electricista",
    zona: "Palermo",
    descripcion:
      "Especialista en instalaciones eléctricas domiciliarias y comerciales. 10 años de experiencia.",
    contacto: "juanperez@example.com",
  },
  {
    id: 2,
    nombre: "María Gómez",
    rubro: "Plomera",
    zona: "Caballito",
    descripcion:
      "Reparaciones rápidas y eficientes. Servicio garantizado las 24 horas.",
    contacto: "mariagomez@example.com",
  },
  {
    id: 3,
    nombre: "Carlos Ruiz",
    rubro: "Inmobiliaria",
    zona: "Recoleta",
    descripcion:
      "Asesoramiento profesional en compra, venta y alquiler de propiedades.",
    contacto: "carlosruiz@example.com",
  },
];

export default function ServicioDetalle({
  params,
}: {
  params: { id: string };
}) {
  const servicio = servicios.find((s) => s.id === Number(params.id));

  if (!servicio) {
    notFound(); // Muestra la página 404 si no existe
  }

  return (
    <main className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          {servicio?.nombre}
        </h1>
        <p className="text-gray-700 text-lg mb-2">
          <strong>Rubro:</strong> {servicio?.rubro}
        </p>
        <p className="text-gray-700 text-lg mb-2">
          <strong>Zona:</strong> {servicio?.zona}
        </p>
        <p className="text-gray-600 mb-4">{servicio?.descripcion}</p>
        <p className="text-gray-700">
          <strong>Contacto:</strong>{" "}
          <a
            href={`mailto:${servicio?.contacto}`}
            className="text-blue-600 hover:underline"
          >
            {servicio?.contacto}
          </a>
        </p>
      </div>
    </main>
  );
}
