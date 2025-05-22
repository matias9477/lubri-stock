import { createTRPCRouter } from "./trpc";
import { stockRouter } from "./stock";

export const appRouter = createTRPCRouter({
  stock: stockRouter,
});

export type AppRouter = typeof appRouter;
