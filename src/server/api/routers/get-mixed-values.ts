import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const GetMixedValues = createTRPCRouter({
  mixedData: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user || ctx.session?.user.role === "USER") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not allowed to get mixed values!",
      });
    }

    const sizes = await ctx.db.size.findMany();
    const colors = await ctx.db.color.findMany();
    const categories = await ctx.db.category.findMany();
    return { sizes, colors, categories };
  }),
});
