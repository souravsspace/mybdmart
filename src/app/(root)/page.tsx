import Hero from "@/components/hero";
import ProductReel from "@/components/products/product-reel";
import Wrapper from "@/components/ui/wrapper";
import { useProductsClient } from "@/hooks/use-products-client";

export const revalidate = 0;

export default async function Home() {
  const { BrandNewProducts, TrendingProducts, FeaturedProducts } =
    await useProductsClient();

  // const { data: products } = api.clientProduct.allProducts.useQuery({
  //   page: 1,
  // });

  // const updatedProducts = products?.map((product) => {
  //   return {
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //     newPrice: product.newPrice,
  //     categoryName: product.category ? product.category.name : "",
  //     categoryId: product.category ? product.category.id : "",
  //     images: product.images,
  //     sizes: product.sizes.map((size) => ({ id: size.id, name: size.name })),
  //     colors: product.colors.map((color) => ({
  //       id: color.id,
  //       name: color.name,
  //     })),
  //     stock: product.stock,
  //     sell: product.sell,
  //     createdAt: product.createdAt,
  //   };
  // });

  return (
    <>
      <Hero />
      <Wrapper>
        <section id="brand-new">
          <ProductReel
            title="Brand New"
            subtitle="Check those out newly added items."
            href="/products?sort=brand-new"
            products={BrandNewProducts.slice(0, 4)}
            // products={updatedProducts?.slice(0, 4)}
          />
        </section>
        <section id="trending-products">
          <ProductReel
            title="Trending"
            subtitle="Check those out our best selling items."
            href="/products?sort=trending-products"
            products={TrendingProducts.slice(0, 4)}
            // products={updatedProducts?.slice(0, 4)}
          />
        </section>
        <section id="featured-products">
          <ProductReel
            title="Featured"
            subtitle="Check those out our featured items."
            href="/products?sort=featured-products"
            products={FeaturedProducts.slice(0, 4)}
            // products={updatedProducts?.slice(0, 4)}
          />
        </section>
      </Wrapper>
    </>
  );
}
