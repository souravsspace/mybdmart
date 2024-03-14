import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CLIENT_ORDER } from "@/types/client-order";
import { ORDER_STATUS, ROLE } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const ClientOrder = createTRPCRouter({
  getOrders: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to create a product",
      });
    }

    const orders = await ctx.db.order.findMany({
      where: {
        userId,
      },
      include: {
        orderedItems: {
          include: {
            product: true,
            color: true,
            size: true,
            order: true,
          },
        },
        user: {
          select: {
            email: true,
            deliveryAddress: true,
          },
        },
      },
    });

    return orders;
  }),
  updateOrderStatus: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        status: z.enum([
          ORDER_STATUS.PENDING,
          ORDER_STATUS.PROCESSING,
          ORDER_STATUS.CANCELLED,
          ORDER_STATUS.DELIVERED,
          ORDER_STATUS.REFUNDED,
        ]),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { orderId, status } = input;

      const userId = ctx.session?.user.id;
      const role = ctx.session?.user.role;

      if (!userId || !role) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to update a product",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to update a product",
        });
      }

      const order = await ctx.db.order.findUnique({
        where: {
          id: orderId,
        },
      });

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }

      await ctx.db.order.update({
        where: {
          id: orderId,
        },
        data: {
          status,
        },
      });

      return {
        success: true,
      };
    }),
  createOrder: publicProcedure
    .input(CLIENT_ORDER)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      const {
        ProductQuantity,
        deliveryCharge,
        price,
        productId,
        totalItems,
        totalPrice,
        colorId,
        sizeId,
      } = input;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create a orders",
        });
      }

      const user = await ctx.db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user?.emailVerified) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to create a orders",
        });
      }

      const orderedItemsData = productId
        .filter(
          (_, index) =>
            price[index] !== undefined &&
            ProductQuantity[index] !== undefined &&
            colorId[index] !== undefined &&
            sizeId[index] !== undefined,
        )
        .map((id, index) => {
          const orderedItemId = `${id}-${ProductQuantity[index]}`;
          return {
            where: {
              id: orderedItemId,
            },
            create: {
              id: orderedItemId,
              price: price[index]!,
              productQuantity: ProductQuantity[index]!,
              product: {
                connect: {
                  id,
                },
              },
              color: {
                connect: {
                  id: colorId[index]!,
                },
              },
              size: {
                connect: {
                  id: sizeId[index]!,
                },
              },
            },
          };
        });

      await ctx.db.order.create({
        data: {
          totalPrice,
          totalItems,
          deliveryCharge,
          user: {
            connect: {
              id: userId,
            },
          },
          orderedItems: {
            connectOrCreate: orderedItemsData,
          },
        },
      });

      return {
        success: true,
      };
    }),
});
