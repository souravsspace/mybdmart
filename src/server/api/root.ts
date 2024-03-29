import { createTRPCRouter } from "@/server/api/trpc";
import { orderData } from "@/server/api/routers/order-data";
import { resetPass } from "@/server/api/routers/reset-pass";
import { authRouter } from "@/server/api/routers/auth-router";
import { userFrontend } from "@/server/api/routers/user-frontend";
import { deliveryAddress } from "@/server/api/routers/delivery-address";
import { usersData } from "@/server/api/routers/users";
import { Billboard } from "@/server/api/routers/billboard";
import { Category } from "@/server/api/routers/category";
import { Size } from "@/server/api/routers/size";
import { Color } from "@/server/api/routers/color";
import { Order } from "@/server/api/routers/order";
import { Product } from "@/server/api/routers/product";
import { GetMixedValues } from "@/server/api/routers/get-mixed-values";
import { ClientProduct } from "@/server/api/routers/client-product";
import { ContactForm } from "@/server/api/routers/contact-form";
import { soloClientProduct } from "@/server/api/routers/solo-client-product";
import { ClientOrder } from "@/server/api/routers/client-order";
import { OrderedItems } from "@/server/api/routers/ordered-items";

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
  category: Category,
  size: Size,
  color: Color,
  order: Order,
  product: Product,
  getMixedValues: GetMixedValues,
  clientProduct: ClientProduct,
  contactForm: ContactForm,
  soloClientProduct: soloClientProduct,
  clientOrder: ClientOrder,
  orderedItems: OrderedItems,
});

// export type definition of API
export type AppRouter = typeof appRouter;
