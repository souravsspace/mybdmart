import OrderClient from "@/components/orders/order-client";
import { type OrderType } from "@/components/orders/order-column";

const ordersList = [
  {
    id: "1",
    productName: "Apple iPhone 12 Pro",
    price: 999,
    status: "Delivered",
    createdAt: "2021-08-12",
  },
  {
    id: "2",
    productName: "Apple iPhone 15 Pro Max",
    price: 1999,
    status: "processing",
    createdAt: "2021-08-12",
  },
  {
    id: "3",
    productName: "Apple iPhone 13 Pro",
    price: 1299,
    status: "pending",
    createdAt: "2021-08-12",
  },
];

export default function OrdersPage() {
  const OrderedData = ordersList.map((item) => ({
    id: item.id,
    price: item.price,
    date: item.createdAt,
    productName: item.productName,
    status: item.status.toLowerCase() as OrderType["status"],
  }));

  return <OrderClient data={OrderedData} />;
}
