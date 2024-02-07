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

export default function MobileNav() {
  return (
    <div className="block sm:hidden">
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
                      // className="relative text-sm uppercase text-gray-300 transition-all hover:text-white"
                      className="relative font-sans text-base font-medium uppercase text-gray-500 transition-all hover:text-gray-950"
                    >
                      {name}

                      {/* <span className="absolute bottom-0 left-0 right-0 h-px w-full bg-primary" /> */}
                    </Link>
                  ))}
                </div>

                <hr className="my-8" />

                <div className="flex flex-col gap-y-3">
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
                  <Button>Logout</Button>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
