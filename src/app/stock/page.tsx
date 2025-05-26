"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.code}</TableCell>
              <TableCell>{product.stockQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
