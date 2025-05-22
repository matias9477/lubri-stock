import { z } from "zod";
import { db } from "@/db";
import { publicProcedure } from "../trpc";
import { products } from "@/db/schema";

export const create = publicProcedure
  .input(
    z.object({
      name: z.string().min(1),
      code: z.string().min(1),
      brandId: z.string().uuid(),
      categoryId: z.string().uuid(),
      stockQuantity: z.number().min(0),
      listPrice: z.number().min(0),
      installedPrice: z.number().min(0),
    })
  )
  .mutation(async ({ input }) => {
    await db.insert(products).values({
      ...input,
      listPrice: input.listPrice.toString(),
      installedPrice: input.installedPrice.toString(),
    });
    return { success: true };
  });
