import { z } from "zod";

export const ProfileValidation = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type TProfileValidation = z.infer<typeof ProfileValidation>;
