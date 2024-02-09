"use server";

import { db } from "@/server/db";

type Props = {
  verificationCode: string;
  verificationToken: string;
  userEmail: string;
};

export default async function verifyMailCode({
  verificationCode,
  verificationToken,
  userEmail,
}: Props) {
  if (!verificationToken || !verificationCode || !userEmail)
    throw new Error("Some parameters are missing!");

  if (verificationCode !== verificationToken)
    throw new Error("Invalid verification code");

  try {
    const result = await db.verificationToken.findUnique({
      where: {
        token: verificationToken,
      },
    });

    const validToken = result!.expires > new Date();

    if (!validToken) throw new Error("Invalid verification code");

    await db.verificationToken.delete({
      where: {
        token: verificationToken,
      },
    });

    await db.user.update({
      where: {
        email: userEmail,
      },
      data: {
        emailVerified: new Date(Date.now()),
      },
    });

    return true;
  } catch (error) {}
}
