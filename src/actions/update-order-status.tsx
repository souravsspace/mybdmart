"use server";

import { db } from "@/server/db";
import { type ORDER_STATUS } from "@prisma/client";

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
    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    throw new Error("Failed to update order status");
  }
};
