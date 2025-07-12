"use client";

import Link from "next/link";
import {
  Button,
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { ProductEquivalents } from "../_components/ProductEquivalents";
import { MovementHistory } from "../_components/MovementHistory";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id?.toString() ?? "";

  // const { data: product, isLoading } = api.stock.getById.useQuery({ id });

  const { data, isLoading } = api.stock.getByIdWithEquivalents.useQuery({ id });

  const { product, equivalents } = data ?? {};

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 3 }}>
        <Typography variant="h4" color="error">
          Producto no encontrado
        </Typography>
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
    </Container>
  );
}
