import { createTRPCRouter } from "./trpc";
import { getAll } from "./stock/getAll";
import { create } from "./stock/create";
import { getBrands } from "./stock/getBrands";
import { getCategories } from "./stock/getCategories";
import { addEquivalents } from "./stock/addEquivalents";
import { getEquivalents } from "./stock/getEquivalents";
import { getById, getByIdWithEquivalents } from "./stock/getById";
import { update } from "./stock/update";

export const stockRouter = createTRPCRouter({
  getAll,
  create,
  getBrands,
  getCategories,
  addEquivalents,
  getEquivalents,
  getById,
  getByIdWithEquivalents,
  update,
});
