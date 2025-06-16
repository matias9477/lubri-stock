import { z } from "zod";
import { publicProcedure } from "../trpc";
import { productEquivalences } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";
import { db } from "@/db";

export const addEquivalents = publicProcedure
  .input(
    z.object({
      productId: z.string().uuid(),
      equivalentIds: z.array(z.string().uuid()),
    })
  )
  .mutation(async ({ input }) => {
    const values = input.equivalentIds
      .filter((id) => id !== input.productId)
      .map((eid) => ({
        productId: input.productId,
        equivalentProductId: eid,
      }));

    for (const { productId, equivalentProductId } of values) {
      const existing = await db.query.productEquivalences.findFirst({
        where: or(
          and(
            eq(productEquivalences.productId, productId),
            eq(productEquivalences.equivalentProductId, equivalentProductId)
          ),
          and(
            eq(productEquivalences.productId, equivalentProductId),
            eq(productEquivalences.equivalentProductId, productId)
          )
        ),
      });

      if (!existing) {
        await db.insert(productEquivalences).values({
          productId,
          equivalentProductId,
        });
      }
    }
  });
