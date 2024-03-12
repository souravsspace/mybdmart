"use client";

import { formatPrice } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

type BarChartProps = {
  data: {
    name: string;
    total: number;
  }[];
};

export default function BarChart({ data }: BarChartProps) {
  const { theme } = useTheme();
  const [barColor, setBarColor] = useState<string>("");

  useEffect(() => {
    if (theme === "dark") {
      setBarColor("#ffffff");
    } else {
      setBarColor("#000000");
    }
  }, [theme]);

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `${formatPrice(value as number)}`}
        />
        <Bar fill={barColor} dataKey={"total"} radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
