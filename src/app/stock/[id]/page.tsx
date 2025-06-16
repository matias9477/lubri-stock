import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ProductEquivalents } from "../_components/ProductEquivalents";

export default async function ProductDetailPageWrapper({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <ProductDetailPageServer id={id} />;
}

async function ProductDetailPageServer({ id }: { id: string }) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });

  if (!product) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="flex justify-between mb-6">
        <Link href="/stock">
          <Button variant="outline">← Volver al stock</Button>
        </Link>
        <Link href={`/stock/${product.id}/edit`}>
          <Button variant="default">Editar producto</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-muted-foreground">Código: {product.code}</p>
      <p className="text-muted-foreground">Stock: {product.stockQuantity}</p>
      <p className="text-muted-foreground">
        Precio lista: ${product.listPrice}
      </p>
      <p className="text-muted-foreground">
        Precio colocado: ${product.installedPrice}
      </p>

      <ProductEquivalents productId={product.id} />
    </div>
  );
}
