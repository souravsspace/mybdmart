import ProductForm from "@/components/admin/product/product-form";
import { api } from "@/trpc/server";
import type { SizeAndColor, productType } from "@/types/admin-product";

type Props = {
  params: {
    productId: string;
  };
};

export const revalidate = 0;

export default async function Product({ params: { productId } }: Props) {
  const product = await api.product.getProduct.query({ id: productId });
  const { sizes, colors, categories } =
    await api.getMixedValues.mixedData.query();

  const filteredSizes: SizeAndColor[] = sizes.map((size) => {
    return {
      id: size.id,
      name: size.name,
      value: size.value,
    };
  });

  const filteredColors: SizeAndColor[] = colors.map((color) => {
    return {
      id: color.id,
      name: color.name,
      value: color.value,
    };
  });

  if (!product)
    return (
      <ProductForm
        initialData={null}
        sizes={filteredSizes}
        colors={filteredColors}
        categories={categories}
      />
    );

  const filteredProduct: productType = {
    id: product.id,
    name: product.name,
    price: product.price,
    newPrice: product.newPrice,
    description: product.description,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    updatedAt: product.updatedAt,
    category: product.category?.name,
    categoryId: product.category?.id,
    size: product.size?.value,
    sizeId: product.size?.id,
    color: product.color?.value,
    colorId: product.color?.id,
    images: product.images.map((image) => {
      return {
        imageUrl: image.imageUrl,
      };
    }),
  };

  return (
    <ProductForm
      initialData={filteredProduct}
      colors={filteredColors}
      sizes={filteredSizes}
      categories={categories}
    />
  );
}
