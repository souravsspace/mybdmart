import { z } from "zod";

export const CLIENT_ORDER = z.object({
  totalPrice: z.number(),
  deliveryCharge: z.number(),
  totalItems: z.number(),
  productId: z.array(z.string()),
  ProductQuantity: z.array(z.number()),
  price: z.array(z.number()),
  colorId: z.array(z.string()),
  sizeId: z.array(z.string()),
});

export type TCLIENT_ORDER = z.infer<typeof CLIENT_ORDER>;
