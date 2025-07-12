import { z } from "zod";
import { publicProcedure } from "../trpc";
import { db } from "@/db";
import { stockMovements, products } from "@/db/schema";
import { eq, desc, and, gte, lte, count } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const getMovementsSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  page: z.number().min(0).default(0),
  pageSize: z.number().min(1).max(100).default(20),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  movementType: z.string().optional(),
});

export type GetMovementsInput = z.infer<typeof getMovementsSchema>;

export const getMovements = publicProcedure
  .input(getMovementsSchema)
  .query(async ({ input }) => {
    try {
      // Verify product exists
      const product = await db.query.products.findFirst({
        where: eq(products.id, input.productId),
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      // Build where conditions
      const whereConditions = [eq(stockMovements.productId, input.productId)];

      if (input.startDate) {
        whereConditions.push(
          gte(stockMovements.date, new Date(input.startDate))
        );
      }

      if (input.endDate) {
        whereConditions.push(lte(stockMovements.date, new Date(input.endDate)));
      }

      if (input.movementType) {
        whereConditions.push(
          eq(stockMovements.movementType, input.movementType)
        );
      }

      // Get total count
      const totalCount = await db
        .select({ count: count() })
        .from(stockMovements)
        .where(and(...whereConditions));

      // Get movements with pagination
      const movements = await db.query.stockMovements.findMany({
        where: and(...whereConditions),
        orderBy: [desc(stockMovements.date)],
        limit: input.pageSize,
        offset: input.page * input.pageSize,
        with: {
          product: {
            columns: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      });

      const total = Number(totalCount[0]?.count || 0);
      const totalPages = Math.ceil(total / input.pageSize);

      return {
        data: movements,
        pagination: {
          page: input.page,
          pageSize: input.pageSize,
          total,
          totalPages,
        },
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch stock movements",
      });
    }
  });
