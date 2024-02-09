"use client";

import { MdMenuOpen } from "react-icons/md";
import {
  Sheet,
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
  const { isLoggedIn } = useUserAuth();

  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger>
          <MdMenuOpen className="mr-3.5 h-7 w-7" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left text-xl">
              Welcome to MyBDmart
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

                <div className="flex flex-col gap-y-3">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="orders"
                        className={cn(
                          buttonVariants({
                            variant: "secondary",
                          }),
                        )}
                      >
                        My Orders
                      </Link>
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
