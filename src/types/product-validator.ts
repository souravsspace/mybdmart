import { z } from "zod";

export const productValidator = z.object({
  name: z
    .string()
    .min(2, {
      message: "Product Name must be at least 2 characters long",
    })
    .max(255, {
      message: "Product Name must be at most 255 characters long",
    }),
});

export type TproductValidator = z.infer<typeof productValidator>;
