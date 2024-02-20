import { z } from "zod";

export const ColorValidator = z.object({
  name: z
    .string()
    .min(2, {
      message: "Color Name must be at least 2 characters long",
    })
    .max(255, {
      message: "Color Name must be at most 255 characters long",
    }),
  value: z
    .string()
    .min(2, {
      message: "Color Value must be at least 2 characters long",
    })
    .max(255, {
      message: "Color Value must be at most 255 characters long",
    }),
});

export type TColorValidator = z.infer<typeof ColorValidator>;
