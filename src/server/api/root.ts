import { createTRPCRouter } from "@/server/api/trpc";
import { products } from "@/server/api/routers/products";
import { authRouter } from "@/server/api/routers/auth-router";
import { userFrontend } from "@/server/api/routers/user-frontend";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  authRouter: authRouter,
  products: products,
  userFrontend: userFrontend,
});

// export type definition of API
export type AppRouter = typeof appRouter;
