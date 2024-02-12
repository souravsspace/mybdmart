import Link from "next/link";
import { shoes } from "@/constant";
import Heading from "@/components/ui/heading";
import ProductCard from "@/components/products/product-card";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
};

export default function ProductReel({ title, subtitle, href }: Props) {
  const productList = shoes;

  return (
    <section className="px-2 py-12">
      <div className="mb-4 md:flex md:items-center md:justify-between">
        <Heading title={title} subtitle={subtitle} />

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
        <div className="mt-6 flex w-full items-center">
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {productList.map((product, index) => (
              <ProductCard
                key={`product-${index}`}
                product={product}
                index={index}
                id={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
