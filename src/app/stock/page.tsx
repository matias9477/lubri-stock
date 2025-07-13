"use client";

import {
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
  TextField,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { columns } from "./_components/columns";
import type { ProductRow } from "./_components/columns";
import { DataTable } from "./_components/DataTable";
import { useState, useEffect } from "react";

// Custom debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function StockPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data: productsData,
    isLoading,
    isFetching,
    isError,
    error,
  } = api.stock.getAll.useQuery(
    {
      page,
      pageSize,
      sortBy: "name",
      sortOrder: "asc",
      search: debouncedSearchTerm || undefined,
    },
    {
      // @ts-expect-error: keepPreviousData is a TanStack Query option
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000,
      enabled: page >= 0 && pageSize > 0,
      onError: (error: unknown) => {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch products:", error);
      },
    }
  );

  const router = useRouter();

  const products = productsData?.data ?? [];
  const pagination = productsData?.pagination;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // No need to invalidate, TanStack Query will refetch automatically
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    // No need to invalidate
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Alert severity="error">
          Error al cargar productos:{" "}
          {error instanceof Error ? error.message : "Error desconocido"}
        </Alert>
      </Container>
    );
  }

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

      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flex: 1 }}>
          <TextField
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          {debouncedSearchTerm && (
            <Typography variant="body2" color="text.secondary">
              Incluye equivalencias
            </Typography>
          )}
        </Box>
        <Button variant="contained" onClick={() => router.push("/stock/new")}>
          + Agregar producto
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable<ProductRow>
          columns={columns}
          data={products}
          pagination={{
            page,
            pageSize,
            rowCount: pagination?.total ?? 0,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
          }}
        />
      )}

      {/* Show background loading indicator */}
      {isFetching && !isLoading && (
        <Box sx={{ position: "fixed", top: 16, right: 16 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Container>
  );
}
