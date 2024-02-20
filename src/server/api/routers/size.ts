import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { SizeValidator } from "@/types/size-validator";
import { ROLE } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const Size = createTRPCRouter({
  getSize: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.size.findUnique({
        where: {
          id: input.id,
        },
      });

      return data;
    }),
  getAllSize: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.size.findMany();
    return data;
  }),
  createSize: publicProcedure
    .input(SizeValidator)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const role = ctx.session?.user.role;

      if (!userId || !role) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create a size",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a size",
        });
      }

      await ctx.db.size.create({
        data: {
          name: input.name,
          value: input.value,
        },
      });

      return {
        success: true,
      };
    }),
  updateSize: publicProcedure
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
          message: "You are not authorized to create a size",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a size",
        });
      }

      const size = await ctx.db.size.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!size) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Size not found",
        });
      }

      await ctx.db.size.update({
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
  deleteSize: publicProcedure
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
          message: "You are not authorized to create a size",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a size",
        });
      }

      const size = await ctx.db.size.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!size) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Size not found",
        });
      }

      await ctx.db.size.delete({
        where: {
          id: input.id,
        },
      });

      return {
        success: true,
      };
    }),
});
