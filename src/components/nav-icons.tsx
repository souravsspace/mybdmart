"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { buttonVariants } from "./ui/button";

export default function NavIcons() {
  return (
    <div className="flex items-center justify-center">
      <Link
        href="/register"
        className={buttonVariants({
          variant: "link_foreground",
          className: "hidden sm:block ",
        })}
      >
        Create Account
      </Link>

      <div className="hidden h-5 w-[2px] bg-gray-500 sm:block" />
      <Link
        href="/login"
        className={buttonVariants({
          variant: "link_foreground",
        })}
      >
        Login
      </Link>

      <div className="h-5 w-[2px] bg-gray-500" />

      <div className="relative mx-3.5">
        <ShoppingCart className="h-6 w-6 cursor-pointer" />
        <div className="absolute -top-2 left-5 right-0 flex h-3 w-5 items-center justify-center rounded-full bg-primary p-2 text-xs font-medium">
          <span>0</span>
        </div>
      </div>
    </div>
  );
}
