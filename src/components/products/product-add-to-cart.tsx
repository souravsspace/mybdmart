"use client";

import { Button } from "@/components/ui/button";
import { STOCK } from "@prisma/client";
import { Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { type ClientProductType as Product } from "@/types/client-product";

type Props = {
  stock: STOCK;
  product: Product;
};

export default function ProductAddToCart({ stock, product }: Props) {
  const { addItem } = useCart();
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
          {stock === STOCK.IN_STOCK ? (
            <Button
              onClick={() => {
                addItem(product);
                setIsSuccess(true);
              }}
              size="lg"
              className="w-full"
            >
              {isSuccess ? "Added!" : "Add to cart"}
            </Button>
          ) : (
            <Button size="lg" className="w-full" disabled>
              Out of stock
            </Button>
          )}
        </div>
        <div className="mt-6 text-center">
          <div className="text-medium group inline-flex text-sm">
            <Shield
              aria-hidden="true"
              className="mr-2 h-5 w-5 flex-shrink-0 text-muted-foreground"
            />
            <span className="text-muted-foreground">7 Day Return Guarante</span>
          </div>
        </div>
      </div>
    </div>
  );
}
