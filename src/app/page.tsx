"use client";

import { Button } from "@/components/ui/button";
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
        <Button onClick={() => router.push("/stock")}>Ir al stock</Button>
      </div>
    </main>
  );
}
