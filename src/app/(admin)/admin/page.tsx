import BarChart from "@/components/admin/bar-chart";
import getGraphData from "@/actions/get-graph-data";
import PageTitle from "@/components/admin/page-title";
import { englishToBanglaNumber, formatPrice } from "@/lib/utils";
import SalesCard, { type SalesProps } from "@/components/admin/sales-card";
import Card, { CardContent, type CardProps } from "@/components/admin/card";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import {
  getActiveProduct,
  getLastHourTotalActiveProducts,
  getLastMonthTotalRevenue,
  getLastMonthTotalSale,
  getLastMonthTotalUser,
  getRecentOrdersUserData,
  getTotalRevenue,
  getTotalSell,
  getTotalUser,
} from "@/actions/get-overview";

export const revalidate = 0;

export default async function AdminPage() {
  const TotalSale = await getTotalSell();
  const TotalUser = await getTotalUser();
  const TotalRevenue = await getTotalRevenue();
  const TotalActiveProducts = await getActiveProduct();

  const LastMonthRevenue = await getLastMonthTotalRevenue();
  const LastMonthSale = await getLastMonthTotalSale();
  const LastMonthUser = await getLastMonthTotalUser();
  const LastHourTotalActiveProducts = await getLastHourTotalActiveProducts();

  const userSalesData = await getRecentOrdersUserData();
  const FiltteredUser: SalesProps[] = userSalesData.map((data) => {
    return {
      name: data.user?.name || (data.user?.username as string),
      email: data.user!.email,
      saleAmount: data.totalPrice,
      image: data.user?.image,
    };
  });

  const cardData: CardProps[] = [
    {
      label: "Total Revenue",
      amount: "+" + formatPrice(TotalRevenue),
      discription: LastMonthRevenue + "% from last month",
      icon: DollarSign,
    },
    {
      label: "Sale",
      amount: "+" + englishToBanglaNumber(TotalSale),
      discription: LastMonthSale + "% from last month",
      icon: CreditCard,
    },
    {
      label: "Users",
      amount: englishToBanglaNumber(TotalUser),
      discription: LastMonthUser + "% from last month",
      icon: Users,
    },
    {
      label: "Active Products",
      amount: "+" + englishToBanglaNumber(TotalActiveProducts),
      discription: LastHourTotalActiveProducts + " since last hour",
      icon: Activity,
    },
  ];

  const GraphRevenue = await getGraphData();

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <BarChart data={GraphRevenue} />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Sales</p>
            <p className="text-sm text-muted-foreground">
              You made {TotalSale} sales this month.
            </p>
          </section>
          {FiltteredUser.map((data, i) => (
            <SalesCard
              key={i}
              name={data.name}
              email={data.email}
              saleAmount={data.saleAmount}
              image={data.image}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
}
