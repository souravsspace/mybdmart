"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { api } from "@/trpc/react";

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
    label: "Address",
    route: "/settings/delivery-address",
  },
  {
    label: "Appearance",
    route: "/settings/appearance",
  },
] as const;

export default function SettingsSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = api.authRouter.isVerified.useQuery();

  return (
    <div className="flex flex-nowrap items-start justify-center px-2 md:flex-col md:gap-y-0.5">
      {navItems.map((item, index) => (
        <Link
          key={item.route + index}
          href={item.route}
          onClick={() => setActiveIndex(index)}
          scroll={false}
          className={cn(
            "relative w-full rounded-md px-3 py-1.5 text-center text-[15px] hover:bg-gray-200/20 dark:hover:bg-gray-700/20 md:text-left",
            {
              "bg-gray-200/40 dark:bg-gray-700/40": activeIndex === index,
              "transition hover:underline": activeIndex !== index,
            },
          )}
        >
          {item.label}
          {index === 1 && data?.verified === false && (
            <div className="absolute right-2 top-2 flex h-3 w-5 items-center justify-center rounded-full bg-primary p-2 text-xs font-medium">
              <span className="text-white">1</span>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
