import { publicProcedure } from "../trpc";
import { db } from "@/db";
import { products } from "@/db/schema";
import { z } from "zod";
import { desc, asc, count } from "drizzle-orm";

/**
 * Get paginated products with optional sorting
 * @param input - Pagination and sorting parameters
 * @returns Paginated products with metadata
 */
export const getAll = publicProcedure
  .input(
    z
      .object({
        page: z.number().min(0).default(0),
        pageSize: z.number().min(1).max(100).default(10),
        sortBy: z
          .enum(["name", "code", "stockQuantity", "listPrice", "createdAt"])
          .default("name"),
        sortOrder: z.enum(["asc", "desc"]).default("asc"),
      })
      .optional()
  )
  .query(
    async ({
      input = { page: 0, pageSize: 10, sortBy: "name", sortOrder: "asc" },
    }) => {
      const { page, pageSize, sortBy, sortOrder } = input;
      const offset = page * pageSize;

      // Get total count for pagination metadata
      const totalCountResult = await db
        .select({ count: count() })
        .from(products);
      const total = totalCountResult[0]?.count || 0;

      // Get paginated data with sorting
      const data = await db.query.products.findMany({
        limit: pageSize,
        offset,
        orderBy: (products) => {
          const sortField = products[sortBy as keyof typeof products];
          return sortOrder === "asc" ? asc(sortField) : desc(sortField);
        },
      });

      return {
        data,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
          hasNextPage: page < Math.ceil(total / pageSize) - 1,
          hasPreviousPage: page > 0,
        },
      };
    }
  );
