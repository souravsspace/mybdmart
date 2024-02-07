import { Button } from "@/components/ui/button";
import Image from "next/image";

type CartMainSectionProps = {
  itemQuantity: number;
  // itemId: string;
};

export default function CartMainSection({
  itemQuantity,
  // itemId,
}: CartMainSectionProps) {
  const itemPrice = 100;

  const deliveryCharge = 70;
  const total = deliveryCharge + itemPrice * itemQuantity;

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* array of items */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-x-3">
            <Image
              src="/shoes/shoes_1.jpg"
              width={80}
              height={40}
              className="aspect-video rounded-xl object-contain"
              alt="Shoe"
            />
            <span>
              {itemQuantity} x {itemPrice}
            </span>
          </div>
          <span>{itemPrice * itemQuantity}</span>
        </div>
      </div>

      <hr className="my-2.5 sm:my-3.5" />

      <ul className="flex flex-col gap-y-2.5 text-sm text-gray-600">
        <li className="flex items-center justify-between">
          <span>Delivery Charge</span>
          <span>{deliveryCharge}</span>
        </li>
        <li className="flex items-center justify-between text-base font-medium text-gray-950">
          <span>Total</span>
          <span>{total}</span>
        </li>
      </ul>

      <Button className="w-full md:mt-3">Continue to Checkout</Button>
    </>
  );
}
