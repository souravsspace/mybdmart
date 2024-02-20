import OrderClient from "@/components/admin/orders/order-client";
import PageTitle from "@/components/admin/page-title";
import { api } from "@/trpc/server";

export const revalidate = 0;

export default async function OrdersPage() {
  const order = await api.order.getAllOrders.query();

  const filteredOrder = order.map((order) => {
    return {
      id: order.id,
      totalItems: order.totalItems,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      orderedItems: order.orderedItems.map((item) => {
        return {
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        };
      }),
    };
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Orders" />

      <OrderClient data={filteredOrder} />
    </div>
  );
}
