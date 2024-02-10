"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Cart from "@/components/navigation/cart";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserAuth from "@/hooks/use-user-auth";

export default function NavIcons() {
  const { isLoggedIn } = useUserAuth();

  return (
    <div className="flex items-center justify-center">
      {isLoggedIn ? (
        <div className="hidden sm:block">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="h-7 w-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="orders">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
          <div
            className={cn("h-5 w-[2px] bg-gray-500 sm:hidden", {
              hidden: isLoggedIn,
            })}
          />
        </>
      )}

      <div
        className={cn("hidden h-5 w-[2px] bg-gray-500 sm:block", {
          "ml-3": isLoggedIn,
        })}
      />

      <Cart />
    </div>
  );
}
