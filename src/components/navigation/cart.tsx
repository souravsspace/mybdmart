import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartLogo } from "@/components/ui/cart-logo";
import CartMainSection from "./cart-main-section";

export default function Cart() {
  const cartTitle = "Your Cart (1)";
  const cartDescription =
    "Streamline Your Shopping Experience with Our Checkout Cart: Effortlessly Organize Your Selections.";

  // const itemId = "dsd324";
  const itemQuantity = 2;

  return (
    <>
      {/* for mobile */}
      <div className="block md:hidden">
        <Drawer>
          <DrawerTrigger>
            <CartLogo />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-left">{cartTitle}</DrawerTitle>
              <DrawerDescription className="text-left">
                {cartDescription}
                {/* <hr className="mt-2.5 sm:mt-3.5" /> */}
              </DrawerDescription>
            </DrawerHeader>

            <DrawerFooter>
              {itemQuantity <= 0 ? (
                <></>
              ) : (
                <CartMainSection
                  // itemId={itemId}
                  itemQuantity={itemQuantity}
                />
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* for desktop */}
      <div className="hidden md:block">
        <Sheet>
          <SheetTrigger>
            <CartLogo />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{cartTitle}</SheetTitle>
              <SheetDescription>
                <p className="mb-6">{cartDescription}</p>

                <CartMainSection
                  // itemId={itemId}
                  itemQuantity={itemQuantity}
                />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
