"use client";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settingSubPages = [
  {
    label: "Billboards",
    href: "/admin/settings/billboards",
    variant: "default",
  },
  {
    label: "Categories",
    href: "/admin/settings/categories",
    variant: "ghost",
  },
  {
    label: "Products",
    href: "/admin/settings/products",
    variant: "ghost",
  },
  {
    label: "Colors",
    href: "/admin/settings/colors",
    variant: "ghost",
  },
  {
    label: "Sizes",
    href: "/admin/settings/sizes",
    variant: "ghost",
  },
];

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="flex w-full flex-wrap items-center justify-start md:justify-end">
      {settingSubPages.map((link, index) => (
        <div
          key={index + link.href}
          className="flex items-center gap-1 sm:gap-2"
        >
          <Link
            href={link.href}
            className={cn(
              buttonVariants({
                variant: link.href === pathName ? "default" : "ghost",
                size: "sm",
              }),
              link.variant === "default" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start",
            )}
          >
            {link.label}
          </Link>

          {index !== settingSubPages.length - 1 ? (
            <Separator className="mx-1 h-5 sm:mx-2" orientation="vertical" />
          ) : null}
        </div>
      ))}
    </nav>
  );
}
