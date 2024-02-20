import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ColorValidator } from "@/types/color-validator";
import { ROLE } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const Color = createTRPCRouter({
  getColor: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.color.findUnique({
        where: {
          id: input.id,
        },
      });

      return data;
    }),
  getAllColor: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.color.findMany();
    return data;
  }),
  createColor: publicProcedure
    .input(ColorValidator)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const role = ctx.session?.user.role;

      if (!userId || !role) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create a color",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a color",
        });
      }

      await ctx.db.color.create({
        data: {
          name: input.name,
          value: input.value,
        },
      });

      return {
        success: true,
      };
    }),
  updateColor: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        value: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const role = ctx.session?.user.role;

      if (!userId || !role) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create a color",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a color",
        });
      }

      const color = await ctx.db.color.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!color) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Color not found",
        });
      }

      await ctx.db.color.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          value: input.value,
        },
      });

      return {
        success: true,
      };
    }),
  deleteColor: publicProcedure
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
          message: "You are not authorized to create a color",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a color",
        });
      }

      const color = await ctx.db.color.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!color) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Color not found",
        });
      }

      await ctx.db.color.delete({
        where: {
          id: input.id,
        },
      });

      return {
        success: true,
      };
    }),
});
