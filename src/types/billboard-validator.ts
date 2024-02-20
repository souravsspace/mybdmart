import { z } from "zod";

export const billboardValidator = z.object({
  name: z
    .string()
    .min(2, {
      message: "Billboard Name must be at least 2 characters long",
    })
    .max(255, {
      message: "Billboard Name must be at most 255 characters long",
    }),
});

export type TbillboardValidator = z.infer<typeof billboardValidator>;
