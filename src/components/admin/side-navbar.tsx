"use client";

import { useEffect, useState } from "react";

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { Navbar } from "./navbar";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  if (!isMounted) return null;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative border-b px-3 md:min-w-[80px] md:border-b-0 md:border-r  md:pb-10 md:pt-24">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            // disabled
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Navbar
        // isCollapsed={mobileWidth ? true : isCollapsed}
        isCollapsed={true}
        links={[
          {
            title: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Users",
            href: "/admin/users",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Orders",
            href: "/admin/orders",
            icon: ShoppingCart,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/admin/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
