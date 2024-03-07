"use client";

import { Check } from "lucide-react";
import { STOCK } from "@prisma/client";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { type ClientProductType } from "@/types/client-product";
import { useEffect, useState } from "react";

type Props = {
  product: ClientProductType;
};

export default function ProductMainDetails({ product }: Props) {
  const {
    price,
    description,
    newPrice,
    categoryName,
    sell,
    stock,
    colors,
    sizes,
  } = product;
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedColorParams = searchParams.get("color");
  const selectedSizeParams = searchParams.get("size");

  const productColorId = colors?.[0]?.id;
  const productSizeId = sizes?.[0]?.id;

  const [selectedColor, setSelectedColor] = useState(
    productColorId ? productColorId : selectedColorParams,
  );
  const [selectedSize, setSelectedSize] = useState(
    productSizeId ? productSizeId : selectedSizeParams,
  );

  useEffect(() => {
    router.push(`?color=${selectedColor}&size=${selectedSize}`, {
      scroll: false,
    });
  }, [selectedColor, selectedSize, router]);

  return (
    <section className="mt-4">
      <div className="flex items-center">
        <p className="text-lg font-medium text-primary">
          {newPrice && formatPrice(newPrice)}
          {newPrice ? (
            <span className="ml-2 text-xs text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          ) : (
            <span>{formatPrice(price)}</span>
          )}
        </p>

        <div className="ml-4 border-l border-gray-300 pl-4 text-muted-foreground">
          {categoryName}
        </div>
      </div>

      <div className="flex">
        <p className="font-sm text-base text-muted-foreground">
          {stock === STOCK.IN_STOCK
            ? "In Stock"
            : STOCK.LOW_STOCK
              ? "Low Stock"
              : "Out of Stock"}
        </p>
        <p className="font-sm ml-4 border-l border-gray-300 pl-4 text-base text-muted-foreground">
          Total Sold: {sell}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-x-2">
        <div className="mr-4 flex flex-wrap gap-1 border-r border-gray-300 pr-4">
          {colors
            ? colors.map((color) => (
                <Button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  size="sm"
                  className={cn(
                    "size-7 rounded-full bg-gray-200",
                    selectedColor === color.id
                      ? "outline outline-primary-foreground"
                      : "",
                  )}
                  style={{ backgroundColor: color.value }}
                />
              ))
            : null}
        </div>

        <div className="flex flex-wrap gap-1">
          {sizes
            ? sizes.map((size) => (
                <Button
                  onClick={() => setSelectedSize(size.id)}
                  key={size.id}
                  size="sm"
                  variant="outline"
                  className={cn(
                    "size-8 rounded-full",
                    selectedSize === size.id
                      ? "outline outline-primary-foreground"
                      : "",
                  )}
                >
                  {size.value}
                </Button>
              ))
            : null}
        </div>
      </div>

      <div className="mt-4 space-y-6">
        <p className="text-base text-muted-foreground">{description}</p>
      </div>

      <div className="mt-6 flex items-center">
        <Check
          aria-hidden="true"
          className="h-5 w-5 flex-shrink-0 text-green-500"
        />
        <p className="ml-2 text-sm text-muted-foreground">
          Eligible for 4-5 days delivery.
        </p>
      </div>
    </section>
  );
}
