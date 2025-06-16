import { db } from "@/db";
import { products } from "@/db/schema";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const update = publicProcedure
  .input(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      code: z.string().optional().nullable(),
      brandId: z.string().uuid().optional().nullable(),
      categoryId: z.string().uuid().optional().nullable(),
      stockQuantity: z.number().int(),
      listPrice: z.number(),
      installedPrice: z.number(),
      notes: z.string().optional().nullable(),
    })
  )
  .mutation(async ({ input }) => {
    const { id, ...data } = input;
    const { listPrice, installedPrice, ...rest } = data;

    await db
      .update(products)
      .set({
        ...rest,
        listPrice: listPrice.toString(),
        installedPrice: installedPrice.toString(),
      })
      .where(eq(products.id, id));
  });
