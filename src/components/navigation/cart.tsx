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
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const itemCount = items.length;
  const cartTotal = items.reduce((total, { product }) => {
    const price = product.newPrice ? product.newPrice : product.price;
    return total + price;
  }, 0);

  const deliveryChargeQuery = api.deliveryAddress.deliveryCharge.useQuery();
  const { data: deliveryAddress } =
    api.deliveryAddress.getDeliveryAddress.useQuery();

  const deliveryCharge = deliveryChargeQuery.data?.deliveryCharge
    ? deliveryChargeQuery.data?.deliveryCharge
    : 120;

  const isAddedDeliveryAddress = deliveryAddress?.userDeliveryAddress;

  const { mutateAsync, isLoading } = api.clientOrder.createOrder.useMutation({
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("You are not authorized to create a order!");
        return;
      }
      if (error.data?.code === "FORBIDDEN") {
        toast.error("Verify your email to place a order!");
        return;
      }

      toast.error("Failed to place order!");
    },
    onSuccess: () => {
      toast.success("Checkout successful!");
      router.push("/orders");
    },
  });

  const handleCheckout = async () => {
    if (!isAddedDeliveryAddress) {
      toast.error("Please add delivery address!");
      router.push("/settings/delivery-address");
      return;
    }

    await mutateAsync({
      deliveryCharge,
      totalItems: itemCount,
      totalPrice: cartTotal + deliveryCharge,
      price: items.map((product) =>
        product.product.newPrice
          ? product.product.newPrice
          : product.product.price,
      ),
      ProductQuantity: items.map((product) => product.quantity),
      productId: items.map((product) => product.product.id),
      sizeId: items.map((product) => product.product.sizeId),
      colorId: items.map((product) => product.product.colorId),
    });
    clearCart();
  };

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

              <Button
                disabled={isLoading}
                className="mt-2 w-full"
                onClick={handleCheckout}
              >
                Continue to Checkout
              </Button>
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
