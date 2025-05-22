import { createTRPCRouter } from "./trpc";
import { getAll } from "./stock/getAll";
import { create } from "./stock/create";
import { getBrands } from "./stock/getBrands";
import { getCategories } from "./stock/getCategories";

export const stockRouter = createTRPCRouter({
  getAll,
  create,
  getBrands,
  getCategories,
});
