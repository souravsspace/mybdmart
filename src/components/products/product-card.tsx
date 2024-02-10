import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import ProductSkeletonHero from "./product-skeleton-hero";
import Image from "next/image";

type Product = {
  name: string;
  price: number;
  image: string;
  color: string;
  brand: string;
};

type Props = {
  product: Product;
  index: number;
};

export default function ProductCard({ product, index }: Props) {
  if (!product) return <ProductSkeletonHero />;
  return (
    <Link className="h-full w-full cursor-pointer" href="/">
      <div className="flex w-full flex-col bg-blue-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="w-48 max-w-fit object-contain"
        />

        <h3 className="mt-4 text-sm font-medium text-gray-700">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
