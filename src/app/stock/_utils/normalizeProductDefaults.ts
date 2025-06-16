import { ProductFormValues } from "../_components/ProductForm";
import { productEquivalences, products } from "@/db/schema";

export function normalizeProductDefaults(
  product: typeof products.$inferSelect,
  equivalents: (typeof productEquivalences.$inferSelect)[]
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
    equivalentIds: equivalents.map((e) => e.equivalentProductId),
  };
}
