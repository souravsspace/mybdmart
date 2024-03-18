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
import { api } from "@/trpc/react";
import { ROLE } from "@prisma/client";

export default function NavIcons() {
  const { isLoggedIn, userAuthData } = useUserAuth();

  const { data } = api.authRouter.isVerified.useQuery();

  return (
    <div className="flex items-center justify-center">
      {isLoggedIn ? (
        <div className="hidden sm:block">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative">
              <div className="h-7 w-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              {data?.verified === false && (
                <div className="absolute -top-2 left-5 right-0 flex h-3 w-5 items-center justify-center rounded-full bg-primary p-2 text-xs font-medium">
                  <span className="text-white">1</span>
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                My Account -{" "}
                {userAuthData?.name ||
                  userAuthData?.username ||
                  userAuthData?.email?.split("@")[0]}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userAuthData?.role === ROLE.ADMIN ? (
                <DropdownMenuItem>
                  <Link href="/admin">Dashboard</Link>
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem>
                <Link href="/orders">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="relative">
                <Link href="/settings">Settings</Link>
                {data?.verified === false && (
                  <div className="absolute right-0 top-2 flex h-3 w-5 items-center justify-center rounded-full bg-primary p-2 text-xs font-medium">
                    <span className="text-white">1</span>
                  </div>
                )}
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
