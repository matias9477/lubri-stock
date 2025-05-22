import { db } from "@/db";
import { categories } from "@/db/schema";
import { publicProcedure } from "../trpc";

export const getCategories = publicProcedure.query(async () => {
  return db.select().from(categories);
});
