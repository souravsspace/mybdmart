import Hero from "@/components/hero";
import ProductReel from "@/components/products/product-reel";
import Wrapper from "@/components/ui/wrapper";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore();

  return (
    <main>
      <Hero />

      <Wrapper>
        <section>
          <ProductReel
            title="Brand New"
            subtitle="Check those out, newly added items."
            href="/new-products"
          />
        </section>
        <section id="trending-product">
          <ProductReel
            title="Trending"
            subtitle="Check those out, newly added items."
            href="/trending-products"
          />
        </section>
      </Wrapper>
    </main>
  );
}
