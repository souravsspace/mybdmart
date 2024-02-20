import { z } from "zod";

export const SizeValidator = z.object({
  name: z
    .string()
    .min(2, {
      message: "Size Name must be at least 2 characters long",
    })
    .max(255, {
      message: "Size Name must be at most 255 characters long",
    }),
  value: z
    .string()
    .min(2, {
      message: "Size Value must be at least 2 characters long",
    })
    .max(255, {
      message: "Size Value must be at most 255 characters long",
    }),
});

export type TSizeValidator = z.infer<typeof SizeValidator>;
