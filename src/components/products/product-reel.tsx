import Link from "next/link";
import ProductCard from "@/components/products/product-card";
import { shoes } from "@/constant";
import Image from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  // query: TQueryValidator;
};

export default function ProductReel({ title, subtitle, href }: Props) {
  const productList = shoes;

  return (
    <section className="py-12">
      <div className="mb-4 md:flex md:items-center md:justify-between">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-red-600 hover:text-red-500 md:block"
          >
            Shop the collection <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex w-full">
          <div className="grid w-full grid-cols-1 gap-x-1 sm:grid-cols-2 sm:gap-x-2 md:grid-cols-3 md:gap-x-3 lg:grid-cols-4 lg:gap-x-4">
            {productList.map((product, index) => (
              // <ProductCard
              //   key={`product-${index}`}
              //   product={product}
              //   index={index}
              // />
              <div key={product.name + index}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="w-48 max-w-fit object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
