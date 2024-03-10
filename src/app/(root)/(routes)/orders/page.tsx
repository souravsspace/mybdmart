import { api } from "@/trpc/server";
import { type ORDER_STATUS } from "@prisma/client";
import OrderClient from "@/components/orders/order-client";
import { type OrderType } from "@/components/orders/order-column";

export default async function OrdersPage() {
  const data = await api.clientOrder.getOrders.query();

  const filteredData: OrderType[] = data.map((order) => {
    return {
      id: order.id,
      TotalPrice: order.totalPrice,
      totalItems: order.totalItems,
      productName: order.orderedItems.map((item) => item.product?.name || ""),
      productPrice: order.orderedItems.map(
        (item) => item.product?.newPrice || item.product?.price || 0,
      ),
      productQuantity: order.orderedItems.map((item) => item.productQuantity),
      status: order.status as ORDER_STATUS,
      date: order.createdAt,
      sizes: order.orderedItems.flatMap((item) =>
        item.size.map((size) => ({
          name: size?.name || "",
          value: size?.value || "",
        })),
      ),
      colors: order.orderedItems.flatMap((item) =>
        item.color.map((color) => ({
          name: color?.name || "",
          value: color?.value || "",
        })),
      ),
    };
  });

  return (
    <div className="mb-4 px-2 sm:px-6">
      <OrderClient data={filteredData} />
    </div>
  );
}
