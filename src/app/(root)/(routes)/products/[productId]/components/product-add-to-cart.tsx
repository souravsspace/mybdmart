"use client";

import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  price: number;
};

export default function ProductAddToCart({ id, price }: Props) {
  console.log(id, price, " - ProductAddToCart");

  // const { addItem } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
      <div>
        <div className="mt-10">
          <Button
            onClick={() => {
              // addItem(product);
              setIsSuccess(true);
            }}
            size="lg"
            className="w-full"
          >
            {isSuccess ? "Added!" : "Add to cart"}
          </Button>
        </div>
        <div className="mt-6 text-center">
          <div className="text-medium group inline-flex text-sm">
            <Shield
              aria-hidden="true"
              className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
            />
            <span className="text-muted-foreground hover:text-gray-700">
              7 Day Return Guarante
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
