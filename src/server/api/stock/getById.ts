import { db } from "@/db";
import { products } from "@/db/schema";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { eq, or, and, ne } from "drizzle-orm";

export const getById = publicProcedure
  .input(z.object({ id: z.string().uuid() }))
  .query(async ({ input }) => {
    return db.query.products.findFirst({
      where: eq(products.id, input.id),
    });
  });

export const getByIdWithEquivalents = publicProcedure
  .input(z.object({ id: z.string().uuid() }))
  .query(async ({ input }) => {
    // Get the current product
    const product = await db.query.products.findFirst({
      where: eq(products.id, input.id),
    });

    // Get equivalents where this product is either the main product or the equivalent
    // but exclude the current product from the results
    const equivalents = await db.query.productEquivalences.findMany({
      where: (pe) =>
        or(
          and(eq(pe.productId, input.id), ne(pe.equivalentProductId, input.id)),
          and(eq(pe.equivalentProductId, input.id), ne(pe.productId, input.id))
        ),
      with: {
        equivalentProduct: true,
        product: true,
      },
    });

    return {
      product,
      equivalents,
    };
  });
