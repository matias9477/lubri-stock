"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Lubri Stock</h1>
        <p className="text-gray-600 mb-6">
          Bienvenido al sistema de gestión de stock para El Lubri de Barto.
        </p>
        <button
          onClick={() => router.push("/stock")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
        >
          Ir al stock
        </button>
      </div>
    </main>
  );
}
