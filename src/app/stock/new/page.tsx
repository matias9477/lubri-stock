"use client";

import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import {
  ProductForm,
  ProductFormValues,
} from "@/app/stock/_components/ProductForm";
import { Button, Box, Typography, Container } from "@mui/material";

export default function NewProductPage() {
  const router = useRouter();
  const utils = api.useUtils();

  const createProduct = api.stock.create.useMutation({
    onSuccess: () => {
      utils.stock.getAll.invalidate();
      router.push("/stock");
    },
  });

  const { data: brands = [] } = api.stock.getBrands.useQuery();
  const { data: categories = [] } = api.stock.getCategories.useQuery();

  const handleSubmit = (values: ProductFormValues) => {
    createProduct.mutate(values);
  };

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
    </Container>
  );
}
