import { z } from "zod";

export const VerificationCodeSchema = z.object({
  code: z.string().max(255, {
    message: "Invalid verification code",
  }),
});

export type TVerificationCodeSchema = z.infer<typeof VerificationCodeSchema>;
