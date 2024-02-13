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

export const SecurityValidation = z.object({
  oldPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type TSecurityValidation = z.infer<typeof SecurityValidation>;

export const DeliveryAddressFormValidation = z.object({
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  zip: z.number().min(3, {
    message: "Postal code must be at least 3 characters.",
  }),
  googleMapLink: z
    .string()
    .url({
      message: "Invalid Google Map link.",
    })
    .optional(),
  insideDhaka: z.boolean(),
  phoneNumber: z.string().min(11, {
    message: "Phone number must be at least 11 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  additionalInfo: z.string().optional(),
});

export type TDeliveryAddressFormValidation = z.infer<
  typeof DeliveryAddressFormValidation
>;
