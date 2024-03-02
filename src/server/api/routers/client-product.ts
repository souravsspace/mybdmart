import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const ClientProduct = createTRPCRouter({
  brandNewProducts: publicProcedure.query(async ({ ctx }) => {
    const thirtyDaysAge = new Date();
    thirtyDaysAge.setDate(thirtyDaysAge.getDate() - 30);

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
