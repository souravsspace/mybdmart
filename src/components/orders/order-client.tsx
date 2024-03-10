import Wrapper from "@/components/ui/wrapper";
import Heading from "../ui/heading";
import { Separator } from "../ui/separator";
import OrdersDataTable from "./data-table";
import { type OrderType } from "./order-column";

type Props = {
  data: OrderType[];
};

export default function OrderClient({ data }: Props) {
  return (
    <Wrapper>
      <Heading title="Orders" subtitle="List of all your orders" />

      <Separator className="my-4 sm:my-6" />

      <OrdersDataTable data={data} />
    </Wrapper>
  );
}
