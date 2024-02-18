import { createTRPCRouter } from "@/server/api/trpc";
import { orderData } from "@/server/api/routers/order-data";
import { resetPass } from "@/server/api/routers/reset-pass";
import { authRouter } from "@/server/api/routers/auth-router";
import { userFrontend } from "@/server/api/routers/user-frontend";
import { deliveryAddress } from "@/server/api/routers/delivery-address";
import { usersData } from "@/server/api/routers/users";
import { Billboard } from "@/server/api/routers/billboard";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  authRouter: authRouter,
  userFrontend: userFrontend,
  resetPass: resetPass,
  deliveryAddress: deliveryAddress,
  orderdata: orderData,
  usersData: usersData,
  billboard: Billboard,
});

// export type definition of API
export type AppRouter = typeof appRouter;
