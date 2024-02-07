import { ShoppingCart } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function Cart() {
  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <div className="relative mx-3.5">
            <ShoppingCart className="h-6 w-6 cursor-pointer" />
            <div className="absolute -top-2 left-5 right-0 flex h-3 w-5 items-center justify-center rounded-full bg-primary p-2 text-xs font-medium">
              <span className="text-white">0</span>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
