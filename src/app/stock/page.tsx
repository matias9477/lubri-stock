"use client";

import { api } from "@/trpc/react";

export default function StockPage() {
  const { data: products, isLoading } = api.stock.getAll.useQuery();

  if (isLoading) return <p className="p-4">Cargando productos...</p>;

  return (
    <div className="p-6">
      <h1 className="h-12 text-2xl font-bold mb-4">Stock actual</h1>
      <table className="w-full border-collapse border border-red-300">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Código</th>
            <th className="border p-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.code}</td>
              <td className="border p-2">{product.stockQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
