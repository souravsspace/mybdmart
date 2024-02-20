import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ROLE } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const Category = createTRPCRouter({
  getCategory: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.category.findUnique({
        where: {
          id: input.id,
        },
      });

      return data;
    }),
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.category.findMany();
    return data;
  }),
  createCategory: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const role = ctx.session?.user.role;

      if (!userId || !role) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create a category",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a category",
        });
      }

      await ctx.db.category.create({
        data: {
          name: input.name,
        },
      });

      return {
        success: true,
      };
    }),
  updateCategory: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const role = ctx.session?.user.role;

      if (!userId || !role) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create a category",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a category",
        });
      }

      const category = await ctx.db.category.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!category) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });
      }

      await ctx.db.category.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name as string,
        },
      });

      return {
        success: true,
      };
    }),
  deleteCategory: publicProcedure
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
          message: "You are not authorized to create a category",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a category",
        });
      }

      const category = await ctx.db.category.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!category) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });
      }

      await ctx.db.category.delete({
        where: {
          id: input.id,
        },
      });

      return {
        success: true,
      };
    }),
});
