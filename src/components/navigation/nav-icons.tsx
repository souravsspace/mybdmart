"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Cart from "@/components/navigation/cart";
import { cn } from "@/lib/utils";

export default function NavIcons() {
  const isLoggedIn = false;

  return (
    <div className="flex items-center justify-center">
      {isLoggedIn ? (
        <Link
          href="/profile"
          className="h-7 w-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
        />
      ) : (
        <>
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
        </>
      )}

      <div
        className={cn("h-5 w-[2px] bg-gray-500", {
          "ml-3": isLoggedIn,
        })}
      />

      <Cart />
    </div>
  );
}
