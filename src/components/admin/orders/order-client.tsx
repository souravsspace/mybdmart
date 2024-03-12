"use client";

import { useEffect, useState } from "react";
import OrdersDataTable from "./data-table";
import { type OrderType } from "./order-column";

type Props = {
  data: OrderType[];
};

export default function OrderClient({ data }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  return <OrdersDataTable data={data} searchInput="productName" />;
}
