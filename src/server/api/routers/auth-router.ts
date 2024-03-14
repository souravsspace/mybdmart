import { z } from "zod";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { AuthCredentialsValidator } from "@/types/account-credentials-validator";

export const authRouter = createTRPCRouter({
  createAccount: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email: userEmail, password } = input;

      const email = userEmail.toLowerCase();

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

  isVerified: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user.id;

    const findUser = await ctx.db.user.findUnique({
      where: {
        id: user,
        emailVerified: {
          not: null,
        },
      },
    });

    if (findUser == null || !findUser) return { verified: false };

    return { verified: true };
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

      const matchUser = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });

      if (matchUser == null) throw new TRPCError({ code: "NOT_FOUND" });

      const verifiedToken = await ctx.db.verificationToken.findMany({
        where: {
          user: {
            email,
          },
          identifier: code,
        },
      });

      if (!verifiedToken || verifiedToken == null)
        throw new TRPCError({ code: "CONFLICT" });

      await ctx.db.user.update({
        where: {
          id: matchUser.id,
          email: matchUser.email,
        },
        data: {
          emailVerified: new Date(Date.now()),
        },
      });

      await ctx.db.verificationToken.deleteMany({
        where: {
          userId: matchUser.id,
          identifier: code,
        },
      });

      return { success: true, userEmail: matchUser.email };
    }),
});
