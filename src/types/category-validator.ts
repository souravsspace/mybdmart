import { z } from "zod";

export const CategoryValidator = z.object({
  name: z
    .string()
    .min(2, {
      message: "Category Name must be at least 2 characters long",
    })
    .max(255, {
      message: "Category Name must be at most 255 characters long",
    }),
});

export type TCategoryValidator = z.infer<typeof CategoryValidator>;
