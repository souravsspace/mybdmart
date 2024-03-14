import { api } from "@/trpc/server";
import Wrapper from "@/components/ui/wrapper";
import Heading from "@/components/ui/heading";
import { type ORDER_STATUS } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import OrdersDataTable from "@/components/orders/data-table";
import { type OrderType } from "@/components/orders/order-column";

export const revalidate = 0;

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
      <Wrapper>
        <Heading title="Orders" subtitle="List of all your orders" />

        <Separator className="my-4 sm:my-6" />

        <OrdersDataTable data={filteredData} />
        {/* {data.length === 0 ? (
        <OrdersDataTable data={data} />
      ) : (
        <div className="flex h-96 items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-500 sm:text-3xl">
            No orders found
          </h1>
        </div>
      )} */}
      </Wrapper>
    </div>
  );
}
