"use server";

import { db } from "@/server/db";
import { deleteToken } from "@/actions/deleteToken";
import bcrypt from "bcrypt";
import { resend } from "@/server/mail";
import VerifyEmail from "@/components/emails/verify-email";

type Props = {
  email: string;
};

function generateRandomNumber(): number {
  return Math.floor(Math.random() * 9000) + 1000;
}

export default async function sendMail({ email }: Props) {
  const tokenIdentifier = generateRandomNumber().toString();
  const tokenValue = generateRandomNumber().toString();

  const hashedToken = await bcrypt.hash(tokenValue, 10);
  // const hashedIdentifier = await bcrypt.hash(tokenIdentifier, 10);

  const expirationMinuteTime = 10;

  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + expirationMinuteTime);

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user == null) throw new Error("User not found");

  const createToken = await db.verificationToken.create({
    data: {
      identifier: tokenIdentifier,
      token: hashedToken,
      expires: expirationTime,
      userId: user.id,
    },
  });

  const timeoutSeconds = 1000 * 60 * expirationMinuteTime;

  // Schedule token deletion after expiration time
  setTimeout(() => {
    deleteToken(createToken.identifier, createToken.token)
      .then(() => {
        console.log("Token deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting token:", error);
      });
  }, timeoutSeconds);

  try {
    const { data, error } = await resend.emails.send({
      from: "no-reply <no-reply@mybdmart.com>",
      to: email,
      reply_to: "support@mybdmart.com",
      subject: "Verify your account",
      react: <VerifyEmail verificationCode={tokenIdentifier} />,
    });

    if (error) {
      return error.message;
    }

    return data;
  } catch (error) {
    return error;
  }
}
