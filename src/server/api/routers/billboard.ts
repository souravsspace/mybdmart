import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ROLE } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const Billboard = createTRPCRouter({
  getBillboard: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.billboard.findUnique({
        where: {
          id: input.id,
        },
      });

      return data;
    }),
  createBillboard: publicProcedure
    .input(
      z.object({
        name: z.string(),
        imageUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const role = ctx.session?.user.role;

      if (!userId || !role) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create a billboard",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a billboard",
        });
      }

      await ctx.db.billboard.create({
        data: {
          name: input.name,
          imageUrl: input.imageUrl,
        },
      });

      return {
        success: true,
      };
    }),
  updateBillboard: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const role = ctx.session?.user.role;

      if (!userId || !role) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create a billboard",
        });
      }

      if (!userId || role !== ROLE.ADMIN) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create a billboard",
        });
      }

      const billboard = await ctx.db.billboard.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!billboard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Billboard not found",
        });
      }

      await ctx.db.billboard.update({
        where: {
          id: input.id,
        },

        data: {
          name: input.name,
          imageUrl: input.imageUrl,
        },
      });

      return {
        success: true,
      };
    }),
});
