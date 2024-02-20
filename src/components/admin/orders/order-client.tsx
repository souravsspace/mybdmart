"use client";

import OrdersDataTable from "./data-table";
import { type OrderType } from "./order-column";

type Props = {
  data: OrderType[];
};

export default function OrderClient({ data }: Props) {
  return <OrdersDataTable data={data} searchInput="productName" />;
}
