import { TRPCError } from "@trpc/server";
import { publicProcedure } from "@/server/api/trpc";
import { ForgetPasswordSchema } from "@/types/forget-pass-validation";

export const resetPass = publicProcedure
  .input(ForgetPasswordSchema)
  .mutation(async ({ ctx, input }) => {
    const { email } = input;

    const user = await ctx.db.user.findUnique({
      where: {
        email,
      },
    });

    if (user == null) throw new TRPCError({ code: "CONFLICT" });
    if (!user.email) throw new TRPCError({ code: "NOT_FOUND" });

    return { success: true, sentToEmail: email };
  });
