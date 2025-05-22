import { db } from "@/db";
import { brands } from "@/db/schema";
import { publicProcedure } from "../trpc";

export const getBrands = publicProcedure.query(async () => {
  return db.select().from(brands);
});
