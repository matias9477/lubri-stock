import { z } from "zod";
import { publicProcedure } from "../trpc";
import { db } from "@/db";
import { stockMovements, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const createMovementSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  quantity: z.number().refine((val) => val !== 0, "Quantity cannot be zero"),
  movementType: z.string().min(1, "Movement type is required"),
  reason: z.string().min(1, "Reason is required"),
  date: z.string().optional(), // ISO date string
});

export type CreateMovementInput = z.infer<typeof createMovementSchema>;

export const createMovement = publicProcedure
  .input(createMovementSchema)
  .mutation(async ({ input }) => {
    try {
      return await db.transaction(async (tx) => {
        // Get current product
        const product = await tx.query.products.findFirst({
          where: eq(products.id, input.productId),
        });

        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Product not found",
          });
        }

        // Calculate new stock quantity
        const currentStock = Number(product.stockQuantity) || 0;
        const newStock = currentStock + input.quantity;

        // Validate stock level for negative movements
        if (newStock < 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Stock cannot go below zero",
          });
        }

        // Create movement record
        const [movement] = await tx
          .insert(stockMovements)
          .values({
            productId: input.productId,
            quantity: input.quantity,
            movementType: input.movementType,
            reason: input.reason,
            date: input.date ? new Date(input.date) : new Date(),
            userId: null, // TODO: Add user authentication
          })
          .returning();

        // Update product stock quantity
        await tx
          .update(products)
          .set({
            stockQuantity: newStock,
          })
          .where(eq(products.id, input.productId));

        return {
          movement,
          newStockQuantity: newStock,
          previousStockQuantity: currentStock,
        };
      });
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create stock movement",
      });
    }
  });
