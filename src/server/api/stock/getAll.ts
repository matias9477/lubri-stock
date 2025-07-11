import { publicProcedure } from "../trpc";
import { db } from "@/db";
import { products, productEquivalences } from "@/db/schema";
import { z } from "zod";
import {
  desc,
  asc,
  count,
  like,
  or,
  and,
  eq,
  inArray,
  ilike,
} from "drizzle-orm";

/**
 * Get paginated products with optional sorting and search
 * @param input - Pagination, sorting, and search parameters
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
        search: z.string().optional(),
      })
      .optional()
  )
  .query(
    async ({
      input = { page: 0, pageSize: 10, sortBy: "name", sortOrder: "asc" },
    }) => {
      const { page, pageSize, sortBy, sortOrder, search } = input;
      const offset = page * pageSize;

      let productIds: string[] = [];
      let total = 0;

      if (search && search.trim()) {
        const searchTerm = search.trim();

        // Search for products that match the search term (case-insensitive)
        const matchingProducts = await db
          .select({ id: products.id })
          .from(products)
          .where(
            or(
              ilike(products.name, `%${searchTerm}%`),
              ilike(products.code, `%${searchTerm}%`)
            )
          );

        const matchingIds = matchingProducts.map((p) => p.id);

        if (matchingIds.length > 0) {
          // Get equivalents for matching products
          const equivalents = await db
            .select({
              productId: productEquivalences.productId,
              equivalentProductId: productEquivalences.equivalentProductId,
            })
            .from(productEquivalences)
            .where(
              or(
                inArray(productEquivalences.productId, matchingIds),
                inArray(productEquivalences.equivalentProductId, matchingIds)
              )
            );

          // Collect all product IDs (original matches + their equivalents)
          const allIds = new Set<string>();
          matchingIds.forEach((id) => allIds.add(id));

          equivalents.forEach((eq) => {
            allIds.add(eq.productId);
            allIds.add(eq.equivalentProductId);
          });

          productIds = Array.from(allIds);
          total = productIds.length;
        } else {
          // No matches found, return empty results
          total = 0;
        }
      } else {
        // Get total count for pagination metadata (no search)
        const totalCountResult = await db
          .select({ count: count() })
          .from(products);
        total = totalCountResult[0]?.count || 0;
      }

      // Get paginated data with sorting (without brand for now)
      let data: (typeof products.$inferSelect)[];
      if (search && search.trim()) {
        if (productIds.length > 0) {
          // Search with equivalents
          data = await db.query.products.findMany({
            where: inArray(products.id, productIds),
            limit: pageSize,
            offset,
            orderBy: (products) => {
              const sortField = products[sortBy as keyof typeof products];
              return sortOrder === "asc" ? asc(sortField) : desc(sortField);
            },
          });
        } else {
          // No search results found
          data = [];
        }
      } else {
        // Normal pagination without search
        data = await db.query.products.findMany({
          limit: pageSize,
          offset,
          orderBy: (products) => {
            const sortField = products[sortBy as keyof typeof products];
            return sortOrder === "asc" ? asc(sortField) : desc(sortField);
          },
        });
      }

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
