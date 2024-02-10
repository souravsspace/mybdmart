import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { QueryValidator } from "@/types/query-validator";
import { z } from "zod";

// todo backend

export const products = createTRPCRouter({
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.string().nullish(),
        query: QueryValidator,
      }),
    )
    .query(async ({ input, ctx }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;


    }),
});
