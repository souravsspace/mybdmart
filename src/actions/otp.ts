"use server";

import { db } from "@/server/db";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

type Props = {
  email: string;
};

export default async function otp({ email }: Props) {
  const randomPassword = randomUUID();
  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  await db.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return randomPassword;
}
