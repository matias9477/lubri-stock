"use client";

import Link from "next/link";
import {
  Button,
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { ProductEquivalents } from "../_components/ProductEquivalents";
import { MovementHistory } from "../_components/MovementHistory";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id?.toString() ?? "";

  const { data, isLoading, isFetching, isError, error } =
    api.stock.getByIdWithEquivalents.useQuery(
      { id },
      {
        staleTime: 2 * 60 * 1000,
        enabled: !!id,
        // @ts-expect-error: keepPreviousData is a TanStack Query option
        keepPreviousData: true,
      }
    );

  const { product, equivalents } = data ?? {};

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container sx={{ py: 3 }}>
        <Alert severity="error">
          Error al cargar producto:{" "}
          {error instanceof Error ? error.message : "Error desconocido"}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button component={Link} href="/stock" variant="contained">
          ← Volver al stock
        </Button>
        <Button
          component={Link}
          href={`/stock/edit/${product.id}`}
          variant="contained"
        >
          Editar producto
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          {product.name}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1" color="text.secondary">
            Código: {product.code}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Stock: {product.stockQuantity}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Precio lista: ${product.listPrice}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Precio colocado: ${product.installedPrice}
          </Typography>
        </Box>
      </Paper>

      <ProductEquivalents
        equivalents={equivalents ?? []}
        currentProductId={id}
      />

      <Paper sx={{ p: 3, mt: 3 }}>
        <MovementHistory
          productId={product.id}
          productName={product.name}
          currentStock={Number(product.stockQuantity) || 0}
        />
      </Paper>

      {/* Show background loading indicator */}
      {isFetching && !isLoading && (
        <Box sx={{ position: "fixed", top: 16, right: 16 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Container>
  );
}
