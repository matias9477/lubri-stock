"use client";

import { api } from "@/trpc/react";

interface Props {
  productId: string;
}

export const ProductEquivalents = ({ productId }: Props) => {
  const { data, isLoading, error } = api.stock.getEquivalents.useQuery({
    productId,
  });

  if (isLoading) return <div>Cargando equivalencias...</div>;
  if (error) return <div>Error al cargar equivalencias</div>;

  if (!data?.length) return <div>Sin equivalencias registradas</div>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Equivalencias</h3>
      <ul className="list-disc pl-5 space-y-1">
        {data.map((product) => (
          <li key={product.id}>
            {product.name} ({product.code})
          </li>
        ))}
      </ul>
    </div>
  );
};
