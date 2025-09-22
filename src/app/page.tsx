import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Bienvenido a ServiMatch
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        La plataforma donde conectamos a profesionales y clientes.
        Encontrá el servicio que necesitás de forma rápida y sencilla.
      </p>
      <Link
        href="/servicios"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
      >
        Ver servicios
      </Link>
    </main>
  );
}
