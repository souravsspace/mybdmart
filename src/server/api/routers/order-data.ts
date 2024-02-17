import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const orderData = createTRPCRouter({
  getOrders: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.order.findMany({
      include: {
        orderedItems: true,
      },
    });

    return data;
  }),
});
