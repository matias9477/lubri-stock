import { z } from "zod";
import { db } from "@/db";
import {
  products,
  stockMovements,
  productApplications,
  productSuppliers,
} from "@/db/schema";
import { publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

/**
 * Deletes a product and all its related data
 * @param input - Product ID to delete
 * @returns Success confirmation
 * @throws {TRPCError} When product not found or deletion fails
 */
export const deleteProduct = publicProcedure
  .input(
    z.object({
      id: z.string().uuid("Invalid product ID"),
    })
  )
  .mutation(async ({ input }) => {
    try {
      // First check if the product exists
      const existingProduct = await db.query.products.findFirst({
        where: eq(products.id, input.id),
      });

      if (!existingProduct) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      // Use transaction to ensure all related data is deleted atomically
      await db.transaction(async (tx) => {
        // Delete stock movements for this product
        await tx
          .delete(stockMovements)
          .where(eq(stockMovements.productId, input.id));

        // Delete product applications (vehicle relationships)
        await tx
          .delete(productApplications)
          .where(eq(productApplications.productId, input.id));

        // Delete product suppliers
        await tx
          .delete(productSuppliers)
          .where(eq(productSuppliers.productId, input.id));

        // Delete the product (equivalents will be cascaded automatically)
        await tx.delete(products).where(eq(products.id, input.id));
      });

      return {
        success: true,
        message: "Product deleted successfully",
        deletedProduct: {
          id: input.id,
          name: existingProduct.name,
        },
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete product",
      });
    }
  });
