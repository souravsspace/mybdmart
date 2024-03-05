import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  ProfileValidation,
  SecurityValidation,
} from "@/types/settings-validators";
import { z } from "zod";
import bcrypt from "bcrypt";

export const userFrontend = createTRPCRouter({
  getProfileData: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    const user = await ctx.db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }),
  updateProfile: publicProcedure
    .input(
      ProfileValidation.extend({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name, username, email } = input;

      if (!email || !name || !username) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      await ctx.db.user.update({
        where: {
          email,
        },
        data: {
          name,
          username,
        },
      });

      return {
        success: true,
      };
    }),

  changePassword: publicProcedure
    .input(
      SecurityValidation.extend({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { oldPassword, newPassword, email } = input;

      if (!email || !oldPassword || !newPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });

      const oldPasswordMatch = await bcrypt.compare(
        oldPassword,
        user!.password as string,
      );

      if (!oldPasswordMatch)
        throw new TRPCError({
          code: "BAD_REQUEST",
        });

      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      await ctx.db.user.update({
        where: {
          email,
        },
        data: {
          password: newHashedPassword,
        },
      });

      return {
        success: true,
      };
    }),
});
