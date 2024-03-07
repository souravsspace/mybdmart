"use client";

import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { type ClientProductType as Product } from "@/types/client-product";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

export default function CartItem({ product }: { product: Product }) {
  const image = product.images[0]?.imageUrl;
  const { removeItem } = useCart();

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
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
            <span className="mb-1 line-clamp-1 text-sm font-medium">
              {product.name}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {product.categoryName}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product.newPrice ? product.newPrice : product.price)}
          </span>
          <button
            onClick={() => removeItem(product.id)}
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
