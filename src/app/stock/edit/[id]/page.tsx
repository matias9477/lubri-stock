"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import {
  ProductForm,
  ProductFormValues,
} from "@/app/stock/_components/ProductForm";
import { Button } from "@/components/ui/button";
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
  const { data: allProducts = [] } = api.stock.getAll.useQuery();
  const addEquivalents = api.stock.addEquivalents.useMutation();

  const updateProduct = api.stock.update.useMutation({
    onSuccess: () => {
      utils.stock.getAll.invalidate();
      router.push("/stock");
    },
  });

  if (isLoading || !productWithEquivalents?.product) {
    return <p className="p-4">Cargando producto...</p>;
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
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
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
        allProducts={allProducts.filter((p) => p.id !== id)}
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
