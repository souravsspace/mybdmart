import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const soloClientProduct = createTRPCRouter({
  soloProduct: publicProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { productId } = input;

      const product = await ctx.db.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          images: true,
          colors: true,
          sizes: true,
          category: true,
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    }),
  getSimilarProducts: publicProcedure
    .input(
      z.object({
        categoryName: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { categoryName } = input;

      const products = await ctx.db.product.findMany({
        where: {
          category: {
            name: categoryName,
          },
        },
        include: {
          images: true,
          colors: true,
          sizes: true,
          category: true,
        },
      });

      return products;
    }),
});
