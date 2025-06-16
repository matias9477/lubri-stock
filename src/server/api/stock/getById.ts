import { db } from "@/db";
import { products } from "@/db/schema";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { eq, or } from "drizzle-orm";

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
    return {
      product: await db.query.products.findFirst({
        where: eq(products.id, input.id),
      }),
      equivalents: await db.query.productEquivalences.findMany({
        where: (pe) =>
          or(eq(pe.productId, input.id), eq(pe.equivalentProductId, input.id)),
        with: {
          equivalentProduct: true,
          product: true,
        },
      }),
    };
  });
