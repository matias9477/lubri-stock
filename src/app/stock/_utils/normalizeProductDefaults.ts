import { ProductFormValues } from "../_components/ProductForm";
import { products } from "@/db/schema";

export function normalizeProductDefaults(
  product: typeof products.$inferSelect
): ProductFormValues {
  return {
    name: product.name,
    code: product.code ?? "",
    brandId: product.brandId ?? "",
    categoryId: product.categoryId ?? "",
    stockQuantity: product.stockQuantity ?? 0,
    listPrice: product.listPrice ? Number(product.listPrice) : 0,
    installedPrice: product.installedPrice ? Number(product.installedPrice) : 0,
    notes: product.notes ?? "",
    dimensions: product.dimensions ?? 0,
  };
}
