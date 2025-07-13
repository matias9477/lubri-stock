"use client";

import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import {
  ProductForm,
  ProductFormValues,
} from "@/app/stock/_components/ProductForm";
import {
  Button,
  Box,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function NewProductPage() {
  const router = useRouter();

  const createProduct = api.stock.create.useMutation({
    onSuccess: () => {
      router.push("/stock");
    },
  });

  const {
    data: brands = [],
    isLoading: isLoadingBrands,
    isError: isErrorBrands,
    error: errorBrands,
    isFetching: isFetchingBrands,
  } = api.stock.getBrands.useQuery(undefined, {
    staleTime: 2 * 60 * 1000,
    // @ts-expect-error: keepPreviousData is a TanStack Query option
    keepPreviousData: true,
  });
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
    isFetching: isFetchingCategories,
  } = api.stock.getCategories.useQuery(undefined, {
    staleTime: 2 * 60 * 1000,
    // @ts-expect-error: keepPreviousData is a TanStack Query option
    keepPreviousData: true,
  });

  const handleSubmit = (values: ProductFormValues) => {
    createProduct.mutate(values);
  };

  if (isLoadingBrands || isLoadingCategories) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isErrorBrands || isErrorCategories) {
    return (
      <Container sx={{ py: 3 }}>
        <Alert severity="error">
          Error al cargar datos:{" "}
          {errorBrands instanceof Error ? errorBrands.message : ""}{" "}
          {errorCategories instanceof Error ? errorCategories.message : ""}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Nuevo Producto
      </Typography>

      <ProductForm
        onSubmit={handleSubmit}
        brands={brands}
        categories={categories}
        mode="create"
        defaultValues={{
          name: "",
          code: "",
          brandId: "",
          categoryId: "",
          stockQuantity: 0,
          listPrice: 0,
          installedPrice: 0,
        }}
        isSubmitting={createProduct.isPending}
        submitLabel="Crear producto"
      />

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={() => router.push("/stock")}>
          Volver
        </Button>
      </Box>

      {/* Show background loading indicator */}
      {(isFetchingBrands || isFetchingCategories) &&
        !isLoadingBrands &&
        !isLoadingCategories && (
          <Box sx={{ position: "fixed", top: 16, right: 16 }}>
            <CircularProgress size={24} />
          </Box>
        )}
    </Container>
  );
}
