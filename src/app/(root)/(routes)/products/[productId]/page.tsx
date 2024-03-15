import Wrapper from "@/components/ui/wrapper";
import ImageSlider from "@/components/ui/image-slider";
import ProductReel from "@/components/products/product-reel";
import ProductBreadcrumb from "@/components/products/product-breadcrumb";
import ProductMainDetails from "@/components/products/product-main-details";
import ProductAddToCart from "@/components/products/product-add-to-cart";
import { api } from "@/trpc/server";
import { type ClientProductType } from "@/types/client-product";
import { notFound } from "next/navigation";

type Props = {
  params: {
    productId: string;
  };
};

export const revalidate = 0;

export default async function ProductPage({ params: { productId } }: Props) {
  const getProduct = await api.soloClientProduct.soloProduct.query({
    productId,
  });

  const getSimilarProducts =
    await api.soloClientProduct.getSimilarProducts.query({
      categoryName: getProduct.category?.name || "",
    });

  const product: ClientProductType = {
    ...getProduct,
    id: getProduct.id,
    name: getProduct.name,
    description: getProduct.description,
    price: getProduct.price,
    newPrice: getProduct.newPrice,
    categoryName: getProduct.category?.name || "",
    categoryId: getProduct.category?.id || "",
    sizes: getProduct.sizes,
    colors: getProduct.colors,
    images: getProduct.images,
    stock: getProduct.stock,
    sell: getProduct.sell,
    createdAt: getProduct.createdAt,
  };

  const similarProducts: ClientProductType[] = getSimilarProducts.map(
    (product) => ({
      ...product,
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      newPrice: product.newPrice,
      categoryName: product.category?.name || "",
      categoryId: product.category?.id || "",
      sizes: product.sizes,
      colors: product.colors,
      images: product.images,
      stock: product.stock,
      sell: product.sell,
      createdAt: product.createdAt,
    }),
  );
  const FilterdSimilarProducts = similarProducts.filter(
    (product) => product.id !== productId,
  );

  const validUrls = product.images.map((image) => image.imageUrl);

  if (!product) return notFound();

  return (
    <Wrapper>
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:max-w-lg lg:self-end">
          <ProductBreadcrumb categoryName={product.categoryName} />

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <ProductMainDetails product={product} />
        </div>

        {/* Product images */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-square rounded-lg">
            <ImageSlider urls={validUrls} />
          </div>
        </div>

        <ProductAddToCart product={product} stock={product.stock} />

        <div className="col-span-2 w-full">
          <ProductReel
            href={`/products?sort=category&categoryId=${product.categoryId}&productId=${product.id}`}
            title={`Similar Products`}
            subtitle={`Browse similar high-quality product just like '${product.name}'`}
            products={FilterdSimilarProducts}
          />
        </div>
      </div>
    </Wrapper>
  );
}
