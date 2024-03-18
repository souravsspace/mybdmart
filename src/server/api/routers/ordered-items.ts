import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const OrderedItems = createTRPCRouter({
  getOrderedItems: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { orderId } = input;

      if (!orderId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "orderId is required",
        });
      }

      const orderedItems = await ctx.db.orderedItem.findMany({
        where: {
          orderId,
        },
        include: {
          product: true,
          size: true,
          color: true,
          order: true,
        },
      });

      if (!orderedItems) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No ordered items found",
        });
      }

      return orderedItems;
    }),
});
