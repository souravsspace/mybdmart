import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const usersData = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.user.findMany();
    return data;
  }),
});
