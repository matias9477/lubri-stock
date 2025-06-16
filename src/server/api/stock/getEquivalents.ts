import { db } from "@/db";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { productEquivalences } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";

export const getEquivalents = publicProcedure
  .input(z.object({ productId: z.string().uuid() }))
  .query(async ({ input }) => {
    const equivalences = await db
      .select()
      .from(productEquivalences)
      .where(
        or(
          eq(productEquivalences.productId, input.productId),
          eq(productEquivalences.equivalentProductId, input.productId)
        )
      );

    const equivalentIds = equivalences.map((e) =>
      e.productId === input.productId ? e.equivalentProductId : e.productId
    );

    return db.query.products.findMany({
      where: (products, { inArray }) => inArray(products.id, equivalentIds),
    });
  });
