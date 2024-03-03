import { z } from "zod";

export const ContactFormValidator = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters long",
    })
    .max(50, {
      message: "First name must be at most 50 characters long",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters long",
    })
    .max(50, {
      message: "Last name must be at most 50 characters long",
    }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters long",
  }),
  topic: z.string(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters long",
  }),
});

export type TContactFormValidator = z.infer<typeof ContactFormValidator>;
