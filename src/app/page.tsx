"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Bienvenido a Lubri Stock</h1>
      <p>
        Accedé a <code>/stock</code> para ver el inventario.
      </p>
      <button
        onClick={() => router.push("/stock")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Ir al stock
      </button>
    </main>
  );
}
