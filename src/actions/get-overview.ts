"use server";

import { db } from "@/server/db";
import { ORDER_STATUS } from "@prisma/client";
import { format, addMonths, subMonths } from "date-fns";

export async function getTotalRevenue() {
  const order = await db.order.findMany({
    where: {
      status: {
        equals: ORDER_STATUS.DELIVERED,
      },
    },
  });

  const totalRevenue = order.reduce((total, order) => {
    return total + order.totalPrice;
  }, 0);

  return totalRevenue || 0;
}

export async function getTotalSell() {
  const order = await db.order.findMany({
    where: {
      status: {
        equals: ORDER_STATUS.DELIVERED,
      },
    },
  });

  // const totalSell = order.reduce((total, order) => {
  //   return total + order.totalItems;
  // }, 0);

  const totalSell = order.length;

  return totalSell || 0;
}

export async function getTotalUser() {
  const user = await db.user.findMany();
  return user.length || 0;
}

export async function getActiveProduct() {
  const product = await db.product.findMany({
    where: {
      isArchived: false,
    },
  });

  return product.length || 0;
}

function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) {
    return 0;
  }

  const change = (current - previous) / previous;
  return change * 100;
}

export async function getLastMonthTotalRevenue() {
  const today = new Date();
  const previousMonth = subMonths(today, 1);
  const previousMonthStart = format(
    new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1),
    "yyyy-MM-dd",
  );
  const previousMonthEnd = format(addMonths(previousMonth, 1), "yyyy-MM-dd");

  const previousRevenue = await db.order.findMany({
    where: {
      createdAt: {
        gte: new Date(previousMonthStart),
        lt: new Date(previousMonthEnd),
      },
      status: {
        equals: ORDER_STATUS.DELIVERED,
      },
    },
  });

  const totalPreviousRevenue = previousRevenue.reduce((total, order) => {
    return total + order.totalPrice;
  }, 0);

  const totalCurrentRevenue = await getTotalRevenue();

  const percentageChange = calculatePercentageChange(
    totalCurrentRevenue,
    totalPreviousRevenue,
  );

  return percentageChange || 0;
}

export async function getLastMonthTotalSale() {
  const today = new Date();
  const previousMonth = subMonths(today, 1);
  const previousMonthStart = format(
    new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1),
    "yyyy-MM-dd",
  );
  const previousMonthEnd = format(addMonths(previousMonth, 1), "yyyy-MM-dd");

  const previousSell = await db.order.findMany({
    where: {
      createdAt: {
        gte: new Date(previousMonthStart),
        lt: new Date(previousMonthEnd),
      },
      status: {
        equals: ORDER_STATUS.DELIVERED,
      },
    },
  });

  const totalPreviousSale = previousSell.reduce((total, order) => {
    return total + order.totalItems;
  }, 0);

  const totalCurrentSale = await getTotalSell();

  const percentageChange = calculatePercentageChange(
    totalCurrentSale,
    totalPreviousSale,
  );

  return percentageChange || 0;
}

export async function getLastMonthTotalUser() {
  const today = new Date();
  const previousMonth = subMonths(today, 1);
  const previousMonthStart = format(
    new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1),
    "yyyy-MM-dd",
  );
  const previousMonthEnd = format(addMonths(previousMonth, 1), "yyyy-MM-dd");

  const previousUser = await db.user.findMany({
    where: {
      createdAt: {
        gte: new Date(previousMonthStart),
        lt: new Date(previousMonthEnd),
      },
    },
  });

  const totalPreviousUser = previousUser.length;
  const totalCurrentUser = await getTotalUser();

  const percentageChange = calculatePercentageChange(
    totalCurrentUser,
    totalPreviousUser,
  );

  return percentageChange || 0;
}

export async function getLastHourTotalActiveProducts() {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  const previousProduct = await db.product.findMany({
    where: {
      createdAt: {
        gte: oneHourAgo,
        lt: now,
      },
      isArchived: false,
    },
  });

  return previousProduct.length || 0;
}

export async function getRecentOrdersUserData() {
  const orders = await db.order.findMany({
    where: {
      status: ORDER_STATUS.DELIVERED,
    },
    include: {
      user: true,
    },
    take: 5,
  });

  return orders || [];
}

// interface SellHistoryByMonth {
//   [monthYear: string]: {
//     orders: Order[];
//     totalSell: number;
//   };
// }

// export async function getSellHistory() {
//   const orders: Order[] = await db.order.findMany({
//     where: {
//       status: ORDER_STATUS.DELIVERED,
//     },
//     include: {
//       user: true,
//     },
//   });

//   return orders || [];
// }

// export async function getSellHistoryByMonth(): Promise<
//   { name: string; total: number }[]
// > {
//   const allOrders: Order[] = await getSellHistory();

//   // Initialize an array to hold sell history data for each month
//   const sellHistoryByMonth: { name: string; total: number }[] = [];

//   // Group orders by month and calculate total sale
//   const monthTotals: { [month: number]: number } = {};
//   allOrders.forEach((order) => {
//     const month: number = order.createdAt.getMonth();
//     if (!monthTotals[month]) {
//       monthTotals[month] = 0;
//     }
//     monthTotals[month] += order.totalItems;
//   });

//   // Convert month totals to array of objects
//   Object.keys(monthTotals).forEach((monthKey) => {
//     const month: number = parseInt(monthKey);
//     const monthName: string = getMonthName(month);
//     const total: number = monthTotals[month] || 0;
//     sellHistoryByMonth.push({ name: monthName, total });
//   });

//   return sellHistoryByMonth;
// }

// function getMonthName(month: number): string {
//   const months: string[] = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   if (month >= 0 && month < months.length) {
//     return months[month];
//   } else {
//     return "Invalid Month"; // Return a default value for invalid months
//   }
// }
