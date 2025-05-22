import { publicProcedure } from "../trpc";
import { db } from "@/db";
import { products } from "@/db/schema";

export const getAll = publicProcedure.query(async () => {
  return db.select().from(products);
});
