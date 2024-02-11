import ProductReel from "@/components/products/product-reel";
import Wrapper from "@/components/ui/wrapper";
import ProductBreadcrumb from "./components/product-breadcrumb";
import ProductMainDetails from "./components/product-main-details";
import ProductAddToCart from "./components/product-add-to-cart";
import ImageSlider from "@/components/ui/image-slider";

type Props = {
  params: {
    productId: string;
  };
};

export default function ProductPage({ params: { productId } }: Props) {
  const product = {
    id: productId,
    brand: "Nike",
    name: "Steven Jordan",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 120,
    images: ["/shoes/shoes_1.jpg", "/shoes/shoes_2.jpg", "/shoes/shoes_3.jpg"],
  } as const;

  const validUrls = product.images.filter((url) => url);

  return (
    <Wrapper>
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:max-w-lg lg:self-end">
          <ProductBreadcrumb />

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <ProductMainDetails {...product} />
        </div>

        {/* Product images */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-square rounded-lg">
            <ImageSlider urls={validUrls} />
          </div>
        </div>

        <ProductAddToCart {...product} />
      </div>

      <ProductReel
        href="/products"
        title={`Similar Products`}
        subtitle={`Browse similar high-quality product just like '${product.name}'`}
      />
    </Wrapper>
  );
}
