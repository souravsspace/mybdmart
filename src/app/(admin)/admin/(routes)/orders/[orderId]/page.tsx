import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import PageTitle from "@/components/admin/page-title";
import OrderedItems, {
  type OrderItemsType,
} from "@/components/admin/orders/ordered-items";

type Props = {
  params: {
    orderId: string;
  };
};

export const revalidate = 0;

export default async function ClientOrderPage({ params: { orderId } }: Props) {
  const orderedData = await api.orderedItems.getOrderedItems.query({
    orderId,
  });

  if (!orderedData) return notFound();

  const address = await api.deliveryAddress.getDeliveryAddress.query();

  const filteredOrder: OrderItemsType[] = orderedData.map((item) => {
    return {
      id: item.id,
      sizes: item.size.map((size) => {
        return {
          id: size.id,
          name: size.name,
          value: size.value,
        };
      }),
      colors: item.color.map((color) => {
        return {
          id: color.id,
          name: color.name,
          value: color.value,
        };
      }),
      charge: item.order?.deliveryCharge,
      total: item.order?.totalPrice,
      ItemQuantity: item.order?.totalItems,
      productName: item.product?.name,
      productPrice: item.product?.price,
      productQuantity: item.productQuantity,
      productId: item.productId,
    };
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Ordered Items" />

      <OrderedItems
        address={address.userDeliveryAddress}
        data={filteredOrder}
      />
    </div>
  );
}
