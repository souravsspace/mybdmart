"use client";

import Heading from "@/components/ui/heading";
import Wrapper from "@/components/ui/wrapper";
import OrdersDataTable from "./data-table";
import { type OrderType } from "./order-column";
import { Separator } from "@/components/ui/separator";

type Props = {
  data: OrderType[];
};

export default function OrderClient({ data }: Props) {
  return (
    <Wrapper className="px-2 sm:px-0">
      <Heading title="Orders" subtitle="List of all your orders." />

      <Separator className="my-2 sm:my-6" />

      <OrdersDataTable data={data} searchInput="productName" />
    </Wrapper>
  );
}
