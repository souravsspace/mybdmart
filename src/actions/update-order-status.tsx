"use server";

import { db } from "@/server/db";
import { ORDER_STATUS } from "@prisma/client";

export const onUpdateOrderStatus = async (
  orderId: string,
  status: ORDER_STATUS,
) => {
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) throw new Error("Order not found");

  try {
    const updatedOrder = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
      include: {
        orderedItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (updatedOrder.status === ORDER_STATUS.DELIVERED) {
      await Promise.all(
        updatedOrder.orderedItems.map(async (item) => {
          return await db.product.update({
            where: {
              id: item.product?.id,
            },
            data: {
              sell: {
                increment: item.productQuantity,
              },
            },
          });
        }),
      );
    }

    return { success: true };
  } catch (error) {
    throw new Error("Failed to update order status");
  }
};
