import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { AuthCredentialsValidator } from "@/lib/account-credentials-validator";

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
          password: await bcrypt.hash(password, 10),
        },
      });

      return { success: true, sentToEmail: email };
    }),
});
