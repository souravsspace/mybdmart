import Hero from "@/components/hero";
import ProductReel from "@/components/products/product-reel";
import SerachInput from "@/components/serach-input";
import Wrapper from "@/components/ui/wrapper";
import { useProductsClient } from "@/hooks/use-products-client";

export const revalidate = 0;

export default async function Home() {
  const { BrandNewProducts, TrendingProducts, FeaturedProducts } =
    await useProductsClient();

  return (
    <main>
      <Hero />
      <Wrapper>
        <section className="mt-6 hidden sm:mt-8 md:block">
          <SerachInput />
        </section>
        <section id="brand-new">
          <ProductReel
            title="Brand New"
            subtitle="Check those out newly added items."
            href="/products?sort=brand-new"
            products={BrandNewProducts?.slice(0, 4)}
          />
        </section>
        <section id="trending-products">
          <ProductReel
            title="Trending"
            subtitle="Check those out our best selling items."
            href="/products?sort=trending-products"
            products={TrendingProducts?.slice(0, 4)}
          />
        </section>
        <section id="featured-products">
          <ProductReel
            title="Featured"
            subtitle="Check those out our featured items."
            href="/products?sort=featured-products"
            products={FeaturedProducts?.slice(0, 4)}
          />
        </section>
      </Wrapper>
    </main>
  );
}
