import { api } from "@/trpc/server";
import type { ClientProductType } from "@/types/client-product";

export const useProductsClient = async () => {
  const getBrandNewProducts = await api.clientProduct.brandNewProducts.query();
  const BrandNewProducts: ClientProductType[] = getBrandNewProducts.map(
    (product) => {
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
      };
    },
  );

  const getTrendingProducts = await api.clientProduct.trendingProduct.query();
  const TrendingProducts: ClientProductType[] = getTrendingProducts.map(
    (product) => {
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
      };
    },
  );

  const getFeaturedProducts = await api.clientProduct.featuredProduct.query();
  const FeaturedProducts: ClientProductType[] = getFeaturedProducts.map(
    (product) => {
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
      };
    },
  );

  return {
    BrandNewProducts,
    TrendingProducts,
    FeaturedProducts,
  };
};
