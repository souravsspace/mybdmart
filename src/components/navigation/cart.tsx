"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "./cartItem";

export default function Cart() {
  const { items } = useCart();

  const itemCount = items.length;
  const cartTotal = items.reduce((total, { product }) => {
    const price = product.newPrice ? product.newPrice : product.price;
    return total + price;
  }, 0);

  const deliveryCharge = 120;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative mx-3.5">
          <ShoppingCart className="h-6 w-6 cursor-pointer" />
          <div className="absolute -top-2 left-5 right-0 flex h-3 w-5 items-center justify-center rounded-full bg-primary p-2 text-xs font-medium">
            <span className="text-white">{itemCount}</span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-left">Your Cart ({itemCount})</SheetTitle>
          <SheetDescription className="text-left">
            <p className="mb-6">
              Streamline Your Shopping Experience with Our Checkout Cart:
              Effortlessly Organize Your Selections.
            </p>
          </SheetDescription>
        </SheetHeader>

        {itemCount > 0 ? (
          <main>
            <ScrollArea className="grid gap-3">
              <hr className="mb-2.5 sm:mb-3.5" />

              <div className="flex flex-col">
                {items.map(({ product }) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>

              <hr className="my-2.5 sm:my-3.5" />

              <ul className="flex flex-col gap-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center justify-between">
                  <span>Delivery Charge</span>
                  <span>{formatPrice(deliveryCharge)}</span>
                </li>
                <li className="flex items-center justify-between text-base font-medium">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal + deliveryCharge)}</span>
                </li>
              </ul>

              {/* <Button className="mt-1 w-full" variant="secondary">
                View Cart
              </Button> */}
              <Button className="mt-2 w-full">Continue to Checkout</Button>
            </ScrollArea>
          </main>
        ) : (
          <div className="text-center">
            <hr className="my-2.5 sm:my-3.5" />
            <h4 className=" mt-10 text-muted-foreground">
              Your cart is empty.
            </h4>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
