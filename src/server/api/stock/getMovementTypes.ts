import { publicProcedure } from "../trpc";

export type MovementType = {
  value: string;
  label: string;
  description: string;
  isPositive: boolean;
};

export const getMovementTypes = publicProcedure.query(async () => {
  const movementTypes: MovementType[] = [
    {
      value: "purchase",
      label: "Compra",
      description: "Compra de stock a proveedor",
      isPositive: true,
    },
    {
      value: "sale",
      label: "Venta",
      description: "Venta de producto",
      isPositive: false,
    },
    {
      value: "adjustment",
      label: "Ajuste",
      description: "Ajuste manual de inventario",
      isPositive: true, // Can be positive or negative based on quantity
    },
    {
      value: "return",
      label: "Devolución",
      description: "Devolución de cliente",
      isPositive: true,
    },
    {
      value: "transfer",
      label: "Transferencia",
      description: "Transferencia entre ubicaciones",
      isPositive: true, // Can be positive or negative based on quantity
    },
    {
      value: "loss",
      label: "Pérdida",
      description: "Pérdida o daño de stock",
      isPositive: false,
    },
    {
      value: "initial",
      label: "Stock Inicial",
      description: "Stock inicial del producto",
      isPositive: true,
    },
  ];

  return movementTypes;
});
