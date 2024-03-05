"use client";

import Link from "next/link";
import {
  calculateDiscountPercentage,
  cn,
  formatPrice,
  thirtyDaysAge,
} from "@/lib/utils";
import ProductSkeletonHero from "./product-skeleton-hero";
import ImageSlider from "@/components/ui/image-slider";
import { useEffect, useState } from "react";
import { type ClientProductType } from "@/types/client-product";
import { Button } from "../ui/button";
import { STOCK } from "@prisma/client";

type Props = {
  id: string;
  product: ClientProductType;
  index: number;
};

export default function ProductCard({ product, id, index }: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductSkeletonHero />;

  const validUrls = product.images
    .map((image) => image.imageUrl)
    .filter((url) => url);

  const discount = product.newPrice
    ? calculateDiscountPercentage(product.price, product.newPrice)
    : 0;

  const isNew = new Date(product.createdAt as Date) > thirtyDaysAge;

  return (
    <Link
      className={cn(
        "group invisible h-full w-full cursor-pointer rounded-lg border p-1.5 pb-2 shadow-md dark:bg-muted/30",
        {
          "visible animate-in fade-in-5": isVisible,
        },
      )}
      href={`/products/${id}`}
    >
      <div className="flex w-full flex-col">
        <ImageSlider urls={validUrls} discount={discount} isNew={isNew} />

        <section className="px-1.5">
          <h2 className={cn("mt-4 text-base text-muted-foreground")}>
            {product.name}
          </h2>
          <p className="mt-1 flex w-full items-center justify-between text-lg font-semibold text-primary">
            {product.newPrice && formatPrice(product.newPrice)}
            {product.newPrice ? (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            ) : (
              <span>{formatPrice(product.price)}</span>
            )}
          </p>

          <Button className="mt-1 w-full uppercase" size="sm">
            order
          </Button>
        </section>
      </div>
    </Link>
  );
}
