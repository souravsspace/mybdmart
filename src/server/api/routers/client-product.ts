import { z } from "zod";
import { thirtyDaysAge } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const ClientProduct = createTRPCRouter({
  allProducts: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        sort: z.string().optional(),
        categoryId: z.string().optional(),
        productId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page: pageNumber, sort: sortBy, productId } = input;

      if (sortBy === undefined) {
        return await ctx.db.product.findMany({
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
      }

      if (sortBy === "hot-deals") {
        return await ctx.db.product.findMany({
          where: {
            isArchived: false,
            newPrice: {
              not: null,
            },
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
      }

      if (sortBy === "trending-products") {
        return await ctx.db.product.findMany({
          where: {
            isArchived: false,
          },
          orderBy: {
            sell: "desc",
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
      }

      if (sortBy === "featured-products") {
        return await ctx.db.product.findMany({
          where: {
            isFeatured: true,
            isArchived: false,
          },
          orderBy: {
            updatedAt: "desc",
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
      }

      if (sortBy === "category") {
        const products = await ctx.db.product.findMany({
          where: {
            category: {
              id: input.categoryId,
            },
          },
          include: {
            images: true,
            colors: true,
            sizes: true,
            category: true,
          },
        });

        if (productId) {
          const filteredProducts = products.filter((product) => {
            return product.id !== productId;
          });
          return filteredProducts;
        }
        return products;
      }
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
