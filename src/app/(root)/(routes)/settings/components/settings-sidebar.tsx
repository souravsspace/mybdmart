"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  {
    label: "Profile",
    route: "/settings",
  },
  {
    label: "Security",
    route: "/settings/security",
  },
  {
    label: "Appearance",
    route: "/settings/appearance",
  },
  {
    label: "Delivery Address",
    route: "/settings/delivery-address",
  },
] as const;

export default function SettingsSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex items-start justify-center px-2 md:flex-col md:gap-y-0.5">
      {navItems.map((item, index) => (
        <Link
          key={item.route + index}
          href={item.route}
          onClick={() => setActiveIndex(index)}
          scroll={false}
          className={cn(
            "w-full rounded-md px-3 py-1.5 text-center text-[15px] md:text-left",
            {
              "bg-gray-200/40": activeIndex === index,
              "transition hover:underline": activeIndex !== index,
            },
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
