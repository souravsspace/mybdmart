import { z } from "zod";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { AuthCredentialsValidator } from "@/types/account-credentials-validator";

export const authRouter = createTRPCRouter({
  createAccount: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const existingUser = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser != null) throw new TRPCError({ code: "CONFLICT" });

      await ctx.db.user.create({
        data: {
          email,
          username: email.split("@")[0] as string,
          password: await bcrypt.hash(password, 10),
        },
      });

      return { success: true, sentToEmail: email };
    }),

  verifyEmail: publicProcedure
    .input(
      z.object({
        code: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { code, email } = input;

      const isUser = ctx.db.user.findUnique({
        where: {
          email,
        },
      });

      if (isUser == null) throw new TRPCError({ code: "NOT_FOUND" });

      const user = ctx.db.user.findUnique({
        where: {
          email,
        },
        select: {
          verificationTokens: {
            where: {
              token: code,
            },
          },
        },
      });

      if (user.verificationTokens.length === 0)
        throw new TRPCError({ code: "CONFLICT" });

      await ctx.db.user.update({
        where: {
          email,
        },
        data: {
          emailVerified: new Date(),
        },
      });

      await ctx.db.verificationToken.deleteMany({
        where: {
          token: code,
        },
      });

      return { success: true, userEmail: email };
    }),
});
