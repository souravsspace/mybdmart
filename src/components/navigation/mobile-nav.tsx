"use client";

import { MdMenuOpen } from "react-icons/md";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constant";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import useUserAuth from "@/hooks/use-user-auth";

export default function MobileNav() {
  const { isLoggedIn, userAuthData } = useUserAuth();

  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger>
          <MdMenuOpen className="mr-3.5 h-7 w-7" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left text-xl">
              {isLoggedIn
                ? `Welcome, ${userAuthData?.email?.split("@")[0]}!`
                : "Welcome to MyBDmart"}
            </SheetTitle>
            <SheetDescription className="text-left">
              <div className="relative mt-5 flex h-full flex-col justify-between">
                <div className="flex flex-col gap-y-3">
                  {navLinks.map(({ name, path }) => (
                    <Link
                      key={path + name}
                      href={path}
                      className="relative font-sans text-base font-medium uppercase text-gray-500 transition-all hover:text-gray-950"
                    >
                      {name}
                    </Link>
                  ))}
                </div>

                <hr className="my-8" />

                <div className="flex w-full flex-col gap-y-3">
                  {isLoggedIn ? (
                    <>
                      <div className="flex gap-1">
                        <Link
                          href="orders"
                          className={cn(
                            buttonVariants({
                              variant: "secondary",
                              className: "w-full flex-1",
                            }),
                          )}
                        >
                          <SheetClose>My Orders</SheetClose>
                        </Link>
                        <Link
                          href="settings"
                          className={cn(
                            buttonVariants({
                              variant: "secondary",
                              className: "w-full flex-1",
                            }),
                          )}
                        >
                          <SheetClose>Settings</SheetClose>
                        </Link>
                      </div>
                      <Button onClick={() => signOut()}>Logout</Button>
                    </>
                  ) : (
                    <Link href="register" className={cn(buttonVariants())}>
                      Register
                    </Link>
                  )}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
