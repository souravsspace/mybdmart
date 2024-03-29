"use client";

import { useCart } from "@/hooks/use-cart";
import { englishToBanglaNumber, formatPrice } from "@/lib/utils";
import { type ClientProductType as Product } from "@/types/client-product";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartItem({ product }: { product: Product }) {
  const { removeItem, items } = useCart();
  const image = product.images[0]?.imageUrl;

  const findProduct = items.find((item) => item.product.id === product.id);

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {image ? (
              <Image
                src={image}
                alt={product.name}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <Link
              href={`/products/${product.id}`}
              className="mb-1 line-clamp-1 text-wrap text-sm font-medium hover:underline"
            >
              {product.name}
            </Link>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {product.categoryName}
            </span>

            <span className="ml-auto line-clamp-1 text-sm">
              {englishToBanglaNumber(findProduct?.quantity)} x{" "}
              {formatPrice(product.newPrice ? product.newPrice : product.price)}
            </span>
          </div>
        </div>

        <div className="my-auto flex flex-col space-y-1 font-medium">
          <button
            onClick={() => removeItem(findProduct!.product)}
            className="flex items-center gap-0.5 text-xs text-primary"
          >
            <X className="size-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
