import { createTRPCRouter } from "@/server/api/trpc";
import { products } from "@/server/api/routers/products";
import { authRouter } from "@/server/api/routers/auth-router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  authRouter: authRouter,
  products: products,
});

// export type definition of API
export type AppRouter = typeof appRouter;
