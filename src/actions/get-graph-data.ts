"use server";

import { db } from "@/server/db";
import { ORDER_STATUS, type Order, type OrderedItem } from "@prisma/client";

type TGraphData = {
  name: string;
  total: number;
};

export default async function getGraphData(): Promise<TGraphData[]> {
  const paidOrders: (Order & { orderedItems: OrderedItem[] })[] =
    await db.order.findMany({
      where: {
        status: {
          equals: ORDER_STATUS.DELIVERED,
        },
      },
      include: {
        user: true,
        orderedItems: true,
      },
    });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    if (typeof month === "number") {
      let revenueForOrder = 0;

      for (const item of order.orderedItems) {
        revenueForOrder += item.price * item.productQuantity;
      }

      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }
  }

  const graphData: TGraphData[] = Array.from(
    { length: 12 },
    (_, i): TGraphData => ({
      name:
        ([
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][i] as string) ?? "",
      total: 0,
    }),
  );

  for (const monthStr in monthlyRevenue) {
    const month = Number(monthStr);
    if (!isNaN(month) && isFinite(month) && month >= 0 && month <= 11) {
      // @ts-expect-error Explanation: We are suppressing this error because TypeScript cannot infer that graphData[month] is defined, even though it is, due to the check in the loop.
      graphData[month].total = monthlyRevenue[month] ?? 0;
    }
  }

  return graphData;
}
