import { api } from "@/trpc/server";
import PageTitle from "@/components/admin/page-title";
import OrderClient from "@/components/admin/orders/order-client";
import { type ORDER_STATUS } from "@prisma/client";
import { type OrderType } from "@/components/admin/orders/order-column";

export const revalidate = 0;

export default async function OrdersPage() {
  const data = await api.clientOrder.getServerOrders.query();

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
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      userEmail: order.user?.email || "",
      userDeliveryAddress: order.user?.deliveryAddress || undefined,
      productId: order.orderedItems.map((item) => item.product?.id || ""),
    };
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Orders" />

      <OrderClient data={filteredData} />
    </div>
  );
}
