import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCProductValidator } from "@/types/product-validator";
import { ROLE } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const Product = createTRPCRouter({
  getProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findUnique({
        where: {
          id: input.id,
        },
        include: {
          category: true,
          images: true,
          colors: true,
          sizes: true,
        },
      });

      return data;
    }),
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.product.findMany({
      include: {
        category: true,
        images: true,
        colors: true,
        sizes: true,
      },
    });
    return data;
  }),
  createProduct: publicProcedure
    .input(TRPCProductValidator)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const role = ctx.session?.user.role;

      if (!userId || !role) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create a product",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a product",
        });
      }

      await ctx.db.product.create({
        data: {
          name: input.name,
          price: Number(input.price),
          description: input.description,
          newPrice: Number(input.newPrice),
          isFeatured: input.isFeatured,
          isArchived: input.isArchived,
          categoryId: input.categoryId,
          colors: {
            connect: input.colors.map((color) => {
              return {
                id: color.id,
              };
            }),
          },
          sizes: {
            connect: input.sizes.map((size) => ({
              id: size.id,
            })),
          },
          images: {
            createMany: {
              data: input.images.map((image) => ({
                imageUrl: image.imageUrl,
              })),
            },
          },
        },
      });

      return {
        success: true,
      };
    }),
  // updateProduct: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //       name: z.string().optional(),
  //       imageUrl: z.string().optional(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const userId = ctx.session?.user.id;
  //     const role = ctx.session?.user.role;

  //     if (!userId || !role) {
  //       throw new TRPCError({
  //         code: "UNAUTHORIZED",
  //         message: "You are not authorized to create a product",
  //       });
  //     }

  //     if (!userId || role !== ROLE.ADMIN) {
  //       throw new TRPCError({
  //         code: "FORBIDDEN",
  //         message: "You are not allowed to create a product",
  //       });
  //     }

  //     const product = await ctx.db.product.findUnique({
  //       where: {
  //         id: input.id,
  //       },
  //     });

  //     if (!product) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Product not found",
  //       });
  //     }

  //     await ctx.db.product.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: {
  //         name: input.name as string,
  //         imageUrl: input.imageUrl as string,
  //       },
  //     });

  //     return {
  //       success: true,
  //     };
  //   }),
  deleteProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const role = ctx.session?.user.role;

      if (!userId || !role) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create a product",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a product",
        });
      }

      const product = await ctx.db.product.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      await ctx.db.product.delete({
        where: {
          id: input.id,
        },
      });

      return {
        success: true,
      };
    }),
});
