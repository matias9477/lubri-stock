"use client";
import { ColumnDef } from "@tanstack/react-table";

export type ProductRow = {
  id: string;
  name: string;
  code: string | null;
  //   brandName: string | null;
  //   categoryName: string | null;
  stockQuantity: number | null;
  listPrice: string | null;
};

export const columns: ColumnDef<ProductRow>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "code", header: "Código" },
  //   { accessorKey: "brandName", header: "Marca" },
  //   { accessorKey: "categoryName", header: "Categoría" },
  { accessorKey: "stockQuantity", header: "Stock" },
  { accessorKey: "listPrice", header: "Precio" },
];
