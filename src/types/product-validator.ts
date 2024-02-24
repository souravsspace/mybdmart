import { z } from "zod";

export const ProductValidator = z.object({
  name: z
    .string()
    .min(2, {
      message: "Product Name must be at least 2 characters long",
    })
    .max(255, {
      message: "Product Name must be at most 255 characters long",
    }),
  images: z.object({ imageUrl: z.string() }).array(),
  price: z.string().min(1, {
    message: "Price must be at least 1",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters long",
  }),
  newPrice: z.string().optional(),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  // colorId: z.string().min(1, {
  //   message: "Color is required",
  // }),
  // sizeId: z.string().min(1, {
  //   message: "Size is required",
  // }),
  sizes: z
    .object({
      id: z.string(),
      name: z.string(),
      value: z.string(),
    })
    .array()
    .optional(),
  colors: z
    .object({
      id: z.string(),
      name: z.string(),
      value: z.string(),
    })
    .array()
    .optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

export type TProductValidator = z.infer<typeof ProductValidator>;

export const TRPCProductValidator = z.object({
  name: z.string().min(2, {
    message: "Product Name must be at least 2 characters long",
  }),
  images: z.object({ imageUrl: z.string() }).array(),
  price: z.string().min(1, {
    message: "Price must be at least 1",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters long",
  }),
  newPrice: z.string(),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  sizes: z
    .object({
      id: z.string(),
      name: z.string(),
      value: z.string(),
    })
    .array(),
  colors: z
    .object({
      id: z.string(),
      name: z.string(),
      value: z.string(),
    })
    .array(),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export type TTRPCProductValidator = z.infer<typeof TRPCProductValidator>;
