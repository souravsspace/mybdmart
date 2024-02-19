// import OrdersDataTable from "@/components/admin/orders/data-table";
import PageTitle from "@/components/admin/page-title";
// import { api } from "@/trpc/server";

export const revalidate = 0;

export default async function OrdersPage() {
  // const data = await api.orderdata.getOrders.query();

  // const filteredData = data.map((order) => {
  //   return {
  //     ...order,
  //     productData: order.orderedItems.map((item) => {
  //       return {
  //         productName: item.name,
  //         productId: item.productId,
  //         quantity: item.quantity,
  //         price: item.price,
  //       };
  //     }),
  //   };
  // });

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Orders" />

      {/* <OrdersDataTable data={filteredData} searchInput="productName" /> */}
    </div>
  );
}
