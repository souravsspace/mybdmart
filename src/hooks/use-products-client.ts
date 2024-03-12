import { api } from "@/trpc/server";
// import type { ClientProductType } from "@/types/client-product";

export const revalidate = 0;

export const useProductsClient = async () => {
  // const getBrandNewProducts = await api.clientProduct.brandNewProducts.query();
  const getBrandNewProducts = await api.clientProduct.allProducts.query({
    sort: "brand-new",
  });
  const BrandNewProducts = getBrandNewProducts?.map((product) => {
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

  // const getTrendingProducts = await api.clientProduct.trendingProduct.query();
  const getTrendingProducts = await api.clientProduct.allProducts.query({
    sort: "trending-products",
  });
  const TrendingProducts = getTrendingProducts?.map((product) => {
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
  });

  // const getFeaturedProducts = await api.clientProduct.featuredProduct.query();
  const getFeaturedProducts = await api.clientProduct.allProducts.query({
    sort: "featured-products",
  });
  const FeaturedProducts = getFeaturedProducts?.map((product) => {
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
  });

  return {
    BrandNewProducts,
    TrendingProducts,
    FeaturedProducts,
  };
};
