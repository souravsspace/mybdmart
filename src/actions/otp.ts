"use server";

import { db } from "@/server/db";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

type Props = {
  email: string;
};

export default async function otp({ email }: Props) {
  const randomPassword = randomUUID();
  const updatedRandomPassword = randomPassword.replace(/-/g, "");

  const hashedPassword = await bcrypt.hash(updatedRandomPassword, 10);

  try {
    await db.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error("Could not generate OTP. Please try again.");
  }

  return updatedRandomPassword;
}
