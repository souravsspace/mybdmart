"use client";

import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import ProductSkeletonHero from "./product-skeleton-hero";
import ImageSlider from "@/components/ui/image-slider";
import { useEffect, useState } from "react";

type Product = {
  name: string;
  price: number;
  image: string;
  color: string;
  brand: string;
};

type Props = {
  id: number;
  product: Product;
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

  const validUrls = [
    "/shoes/shoes_1.jpg",
    "/shoes/shoes_2.jpg",
    "/shoes/shoes_3.jpg",
  ].filter((url) => url);

  return (
    <Link
      className={cn("group/main invisible h-full w-full cursor-pointer", {
        "visible animate-in fade-in-5": isVisible,
      })}
      href={`/products/${id}`}
    >
      <div className="flex w-full flex-col">
        <ImageSlider urls={validUrls} />

        <h3 className="mt-4 text-sm font-medium text-gray-700">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.name}</p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
