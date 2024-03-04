import { z } from "zod";
import { thirtyDaysAge } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const ClientProduct = createTRPCRouter({
  allProducts: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const pageNumber = input.page;

      const products = await ctx.db.product.findMany({
        where: {
          isArchived: false,
        },
        take: 20,
        skip: (pageNumber - 1) * 20,
        include: {
          category: true,
          colors: true,
          sizes: true,
          images: true,
        },
      });

      if (products.length === 0) {
        throw new Error("No products found");
      }

      return products;
    }),

  brandNewProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany({
      where: {
        isArchived: false,
        createdAt: {
          gte: thirtyDaysAge,
        },
      },
      include: {
        category: true,
        colors: true,
        sizes: true,
        images: true,
      },
      take: 20,
    });

    return products;
  }),
  trendingProduct: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany({
      where: {
        isArchived: false,
      },
      orderBy: {
        sell: "desc",
      },
      include: {
        category: true,
        colors: true,
        sizes: true,
        images: true,
      },
      take: 20,
    });

    return products;
  }),
  featuredProduct: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany({
      where: {
        isFeatured: true,
        isArchived: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        category: true,
        colors: true,
        sizes: true,
        images: true,
      },
      take: 20,
    });

    return products;
  }),
});
