"use client";

import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import {
  ProductForm,
  ProductFormValues,
} from "@/app/stock/_components/ProductForm";
import { Button } from "@/components/ui/button";

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
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nuevo Producto</h1>
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
      <Button
        variant="outline"
        type="button"
        className="mt-4"
        onClick={() => router.push("/stock")}
      >
        Volver
      </Button>
    </main>
  );
}
