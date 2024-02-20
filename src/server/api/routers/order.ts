import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
// import { ORDER_STATUS } from "@prisma/client";
// import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const Order = createTRPCRouter({
  getOrder: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.order.findUnique({
        where: {
          id: input.id,
        },
      });

      return data;
    }),
  getAllOrders: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.order.findMany({
      include: {
        orderedItems: true,
      },
    });
    return data;
  }),
  // createOrder: publicProcedure
  //   .input(OrderValidator)
  //   .mutation(async ({ ctx, input }) => {
  //     const userId = ctx.session?.user.id;
  //     const role = ctx.session?.user.role;

  //     if (!userId || !role) {
  //       throw new TRPCError({
  //         code: "UNAUTHORIZED",
  //         message: "You are not authorized to create a order",
  //       });
  //     }

  //     if (!userId || role !== ROLE.ADMIN) {
  //       throw new TRPCError({
  //         code: "FORBIDDEN",
  //         message: "You are not allowed to create a order",
  //       });
  //     }

  //     await ctx.db.order.create({
  //       data: {
  //         name: input.name,
  //         value: input.value,
  //       },
  //     });

  //     return {
  //       success: true,
  //     };
  //   }),
  // updateOrder: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //       name: z.string().optional(),
  //       value: z.string().optional(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const userId = ctx.session?.user.id;
  //     const role = ctx.session?.user.role;

  //     if (!userId || !role) {
  //       throw new TRPCError({
  //         code: "UNAUTHORIZED",
  //         message: "You are not authorized to create a order",
  //       });
  //     }

  //     if (!userId || role !== ROLE.ADMIN) {
  //       throw new TRPCError({
  //         code: "FORBIDDEN",
  //         message: "You are not allowed to create a order",
  //       });
  //     }

  //     const order = await ctx.db.order.findUnique({
  //       where: {
  //         id: input.id,
  //       },
  //     });

  //     if (!order) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Order not found",
  //       });
  //     }

  //     await ctx.db.order.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: {
  //         name: input.name,
  //         value: input.value,
  //       },
  //     });

  //     return {
  //       success: true,
  //     };
  //   }),
  // deleteOrder: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const userId = ctx.session?.user.id;
  //     const role = ctx.session?.user.role;

  //     if (!userId || !role) {
  //       throw new TRPCError({
  //         code: "UNAUTHORIZED",
  //         message: "You are not authorized to create a order",
  //       });
  //     }

  //     if (!userId || role !== ROLE.ADMIN) {
  //       throw new TRPCError({
  //         code: "FORBIDDEN",
  //         message: "You are not allowed to create a order",
  //       });
  //     }

  //     const order = await ctx.db.order.findUnique({
  //       where: {
  //         id: input.id,
  //       },
  //     });

  //     if (!order) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Order not found",
  //       });
  //     }

  //     await ctx.db.order.delete({
  //       where: {
  //         id: input.id,
  //       },
  //     });

  //     return {
  //       success: true,
  //     };
  //   }),
});
