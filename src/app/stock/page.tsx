"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { columns } from "./_components/columns";
import type { ProductRow } from "./_components/columns";
import { DataTable } from "./_components/DataTable";

export default function StockPage() {
  const { data: products, isLoading } = api.stock.getAll.useQuery();
  const router = useRouter();

  if (isLoading) return <p className="p-4">Cargando productos...</p>;

  return (
    <div className="p-6">
      <div className="mb-2">
        <Button variant="outline" onClick={() => router.push("/")}>
          ← Volver al inicio
        </Button>
      </div>
      <h1 className="h-12 text-2xl font-bold mb-4">Stock actual</h1>
      <div className="mb-4 text-right">
        <Button onClick={() => router.push("/stock/new")}>
          + Agregar producto
        </Button>
      </div>
      <DataTable<ProductRow> columns={columns} data={products ?? []} />
    </div>
  );
}
