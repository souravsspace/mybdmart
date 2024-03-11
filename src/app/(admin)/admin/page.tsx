import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import PageTitle from "@/components/admin/page-title";
import Card, { CardContent, type CardProps } from "@/components/admin/card";
import SalesCard, { type SalesProps } from "@/components/admin/sales-card";
import BarChart from "@/components/admin/bar-chart";
import { englishToBanglaNumber, formatPrice } from "@/lib/utils";
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
      name: data.user?.name || data.user!.username,
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

  const data = [
    {
      name: "Jan",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
    {
      name: "Feb",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
    {
      name: "Mar",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
    {
      name: "Apr",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
    {
      name: "May",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
    {
      name: "Jun",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
    {
      name: "Jul",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
    {
      name: "Aug",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
    {
      name: "Sep",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
    {
      name: "Oct",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
    {
      name: "Nov",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
    {
      name: "Dec",
      total: Math.floor(Math.random() * 5000) + 2000,
    },
  ];

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

          <BarChart data={data} />
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
