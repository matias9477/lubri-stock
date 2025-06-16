import { db } from "@/db";
import { products } from "@/db/schema";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const getById = publicProcedure
  .input(z.object({ id: z.string().uuid() }))
  .query(async ({ input }) => {
    return db.query.products.findFirst({
      where: eq(products.id, input.id),
    });
  });
