"use client";

import { useParams, useRouter } from "next/navigation";
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
  CircularProgress,
} from "@mui/material";
import { normalizeProductDefaults } from "@/app/stock/_utils/normalizeProductDefaults";

export default function EditProductPage() {
  const router = useRouter();
  const utils = api.useUtils();
  const clientParams = useParams();
  const id = clientParams.id?.toString() ?? "";

  const { data: productWithEquivalents, isLoading } =
    api.stock.getByIdWithEquivalents.useQuery({ id });
  const { data: brands = [] } = api.stock.getBrands.useQuery();
  const { data: categories = [] } = api.stock.getCategories.useQuery();
  const { data: allProductsResponse } = api.stock.getAll.useQuery();
  const addEquivalents = api.stock.addEquivalents.useMutation();

  const updateProduct = api.stock.update.useMutation({
    onSuccess: () => {
      utils.stock.getAll.invalidate();
      router.push("/stock");
    },
  });

  if (isLoading || !productWithEquivalents?.product) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  const handleSubmit = (values: ProductFormValues) => {
    const payload = {
      id,
      name: values.name,
      code: values.code,
      brandId: values.brandId,
      categoryId: values.categoryId,
      stockQuantity: values.stockQuantity,
      listPrice: values.listPrice,
      installedPrice: values.installedPrice,
      notes: values.notes,
      dimensions: values.dimensions,
    };
    updateProduct.mutate(payload, {
      onSuccess: () => {
        // Si hay equivalencias nuevas, actualizalas
        if (values.equivalentIds && values.equivalentIds.length > 0) {
          addEquivalents.mutate({
            productId: id,
            equivalentIds: values.equivalentIds,
          });
        }
      },
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Editar Producto
      </Typography>

      <ProductForm
        onSubmit={handleSubmit}
        brands={brands}
        categories={categories}
        defaultValues={normalizeProductDefaults(
          productWithEquivalents?.product,
          productWithEquivalents?.equivalents ?? []
        )}
        isSubmitting={updateProduct.isPending}
        submitLabel="Guardar cambios"
        mode="edit"
        allProducts={(allProductsResponse?.data ?? []).filter(
          (p) => p.id !== id
        )}
      />

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={() => router.push("/stock")}>
          Volver
        </Button>
      </Box>
    </Container>
  );
}
