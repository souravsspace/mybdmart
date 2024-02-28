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

      // Extract input data from the input object
      const {
        name,
        price,
        description,
        newPrice,
        isFeatured,
        isArchived,
        categoryId,
        images,
        colors,
        sizes,
      } = input;

      // Create an array to store new color and size ids
      const colorIds: string[] = [];
      const sizeIds: string[] = [];

      // Create or connect colors and sizes to the product
      await Promise.all(
        colors.map(async (color) => {
          const existingColor = await ctx.db.color.findUnique({
            where: { id: color.id },
          });
          if (existingColor) {
            colorIds.push(existingColor.id);
          } else {
            const createdColor = await ctx.db.color.create({
              data: { name: color.name, value: color.value },
            });
            colorIds.push(createdColor.id);
          }
        }),
      );

      await Promise.all(
        sizes.map(async (size) => {
          const existingSize = await ctx.db.size.findUnique({
            where: { id: size.id },
          });
          if (existingSize) {
            sizeIds.push(existingSize.id);
          } else {
            const createdSize = await ctx.db.size.create({
              data: { name: size.name, value: size.value },
            });
            sizeIds.push(createdSize.id);
          }
        }),
      );

      // Create the product
      await ctx.db.product.create({
        data: {
          name,
          price: Number(price),
          description,
          newPrice: Number(newPrice),
          isFeatured,
          isArchived,
          categoryId,
          colors: { connect: colorIds.map((id) => ({ id })) },
          sizes: { connect: sizeIds.map((id) => ({ id })) },
          images: {
            createMany: {
              data: images.map((image) => ({
                imageUrl: image.imageUrl,
              })),
            },
          },
        },
        include: {
          category: true,
          images: true,
          colors: true,
          sizes: true,
        },
      });

      return {
        success: true,
      };
    }),
  updateProduct: publicProcedure
    .input(TRPCProductValidator.extend({ id: z.string() }))
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

      // Extract input data from the input object
      const {
        name,
        price,
        description,
        newPrice,
        isFeatured,
        isArchived,
        categoryId,
        images,
        colors,
        sizes,
      } = input;

      // Create an array to store new color and size ids
      const colorIds: string[] = [];
      const sizeIds: string[] = [];

      // Create or connect colors and sizes to the product
      await Promise.all(
        colors.map(async (color) => {
          const existingColor = await ctx.db.color.findUnique({
            where: { id: color.id },
          });
          if (existingColor) {
            colorIds.push(existingColor.id);
          } else {
            const createdColor = await ctx.db.color.create({
              data: { name: color.name, value: color.value },
            });
            colorIds.push(createdColor.id);
          }
        }),
      );

      await Promise.all(
        sizes.map(async (size) => {
          const existingSize = await ctx.db.size.findUnique({
            where: { id: size.id },
          });
          if (existingSize) {
            sizeIds.push(existingSize.id);
          } else {
            const createdSize = await ctx.db.size.create({
              data: { name: size.name, value: size.value },
            });
            sizeIds.push(createdSize.id);
          }
        }),
      );

      // update the product
      await ctx.db.product.update({
        where: {
          id: input.id,
        },
        data: {
          name,
          price: Number(price),
          description,
          newPrice: Number(newPrice),
          isFeatured,
          isArchived,
          categoryId,
          colors: { connect: colorIds.map((id) => ({ id })) },
          sizes: { connect: sizeIds.map((id) => ({ id })) },
          images: {
            createMany: {
              data: images.map((image) => ({
                imageUrl: image.imageUrl,
              })),
            },
          },
        },
        include: {
          category: true,
          images: true,
          colors: true,
          sizes: true,
        },
      });

      return {
        success: true,
      };
    }),
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
