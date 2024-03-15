import ProductCard from "@/components/products/product-card";
import Wrapper from "@/components/ui/wrapper";
import { api } from "@/trpc/server";
import { type ClientProductType } from "@/types/client-product";

export const revalidate = 0;

type Props = {
  searchParams: {
    page: string | undefined;
    sort: string | undefined;
    categoryId: string | undefined;
    productId: string | undefined;
    query: string | undefined;
  };
};

export default async function ProductsPage({ searchParams }: Props) {
  const pageNumber = searchParams.page;
  const sort = searchParams.sort;
  const categoryId = searchParams.categoryId;
  const productId = searchParams.productId;
  const query = searchParams.query;

  const product = await api.clientProduct.allProducts.query({
    page: pageNumber ? parseInt(pageNumber) : 1,
    sort: sort,
    categoryId: categoryId,
    productId: productId,
    query: query,
  });

  if (!product || product.length == 0) {
    return (
      <Wrapper className="my-4 flex h-full w-full items-center justify-center sm:my-6 md:my-8">
        <h4 className="text-center">
          No products found. Please try again later.
        </h4>
      </Wrapper>
    );
  }

  const products: ClientProductType[] = product.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      newPrice: product.newPrice,
      categoryName: product.category ? product.category.name : "",
      categoryId: product.category ? product.category.id : "",
      images: product.images,
      sizes: product.sizes.map((size) => ({ id: size.id, name: size.name })),
      colors: product.colors.map((color) => ({
        id: color.id,
        name: color.name,
      })),
      stock: product.stock,
      sell: product.sell,
      createdAt: product.createdAt,
    };
  });

  return (
    <Wrapper className="my-4 sm:my-6 md:my-8">
      <div className="grid w-full grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {!products ? (
          <div className="item-center flex w-full justify-center">
            <h4 className="my-6 text-center text-muted-foreground">
              No products found. Please try again later.
            </h4>
          </div>
        ) : (
          products.map((product, index) => (
            <ProductCard
              key={`product-${product.id}`}
              product={product}
              index={index}
              id={product.id}
            />
          ))
        )}
      </div>
    </Wrapper>
  );
}
