import { db } from "@/server/db";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { AuthCredentialsValidator } from "@/lib/account-credentials-validator";

export const authRouter = createTRPCRouter({
  createAccount: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const user = await db.user.findFirst({
        where: {
          email,
        },
      });

      if (user) throw new TRPCError({ code: "CONFLICT" });

      await db.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, 12),
        },
      });

      return { success: true, sentToEmail: email };
    }),
});
