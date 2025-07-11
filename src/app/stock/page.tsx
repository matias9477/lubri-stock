"use client";

import {
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { columns } from "./_components/columns";
import type { ProductRow } from "./_components/columns";
import { DataTable } from "./_components/DataTable";

export default function StockPage() {
  const { data: products, isLoading } = api.stock.getAll.useQuery();
  const router = useRouter();

  if (isLoading)
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Container>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => router.push("/")}>
          ← Volver al inicio
        </Button>
      </Box>

      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Stock actual
      </Typography>

      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => router.push("/stock/new")}>
          + Agregar producto
        </Button>
      </Box>

      <DataTable<ProductRow> columns={columns} data={products ?? []} />
    </Container>
  );
}
