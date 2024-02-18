import { z } from "zod";

// const MAX_FILE_SIZE = 51200;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

export const billboardValidator = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(255, {
      message: "Name must be at most 255 characters long",
    }),
  // imageFile: z
  //   .custom<FileList>()
  //   .refine((fileList) => fileList.length === 1, "Expected file")
  //   .transform((file) => file[0] as File)
  //   .refine((file) => {
  //     return file.size <= MAX_FILE_SIZE;
  //   }, `File size should be less than 50mb.`)
  //   .refine(
  //     (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
  //     "Only these types are allowed .jpg, .jpeg, .png, .webp and mp4",
  //   ),
});

export type TbillboardValidator = z.infer<typeof billboardValidator>;
