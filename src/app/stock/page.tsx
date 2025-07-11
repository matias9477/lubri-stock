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
import { useState } from "react";

export default function StockPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data: productsData, isLoading } = api.stock.getAll.useQuery({
    page,
    pageSize,
    sortBy: "name",
    sortOrder: "asc",
  });

  const router = useRouter();

  if (isLoading)
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Container>
    );

  const products = productsData?.data ?? [];
  const pagination = productsData?.pagination;

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

      <DataTable<ProductRow>
        columns={columns}
        data={products}
        pagination={{
          page,
          pageSize,
          rowCount: pagination?.total ?? 0,
          onPageChange: (newPage) => setPage(newPage),
          onPageSizeChange: (newPageSize) => {
            setPageSize(newPageSize);
            setPage(0);
          },
        }}
      />
    </Container>
  );
}
