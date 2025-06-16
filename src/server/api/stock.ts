import { createTRPCRouter } from "./trpc";
import { getAll } from "./stock/getAll";
import { create } from "./stock/create";
import { getBrands } from "./stock/getBrands";
import { getCategories } from "./stock/getCategories";
import { addEquivalents } from "./stock/addEquivalents";
import { getEquivalents } from "./stock/getEquivalents";

export const stockRouter = createTRPCRouter({
  getAll,
  create,
  getBrands,
  getCategories,
  addEquivalents,
  getEquivalents,
});
