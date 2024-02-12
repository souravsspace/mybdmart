import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ProfileValidation } from "@/types/settings-validators";
import { z } from "zod";

export const userFrontend = createTRPCRouter({
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
});
