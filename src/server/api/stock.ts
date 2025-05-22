import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "./trpc";
import { db } from "@/db";
import { products } from "@/db/schema";

export const stockRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const result = await db.select().from(products);
    return result;
  }),
});
