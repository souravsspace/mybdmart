"use server";

import { Resend } from "resend";
import { db } from "@/server/db";
import { randomUUID } from "crypto";
import RegisterEmail from "@/components/emails/register";

const resend = new Resend(process.env.RESEND_API_KEY as string);

type Props = {
  email: string;
};

export default async function sendMail({ email }: Props) {
  const tokenIdentifier = randomUUID();
  const tokenValue = randomUUID();

  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 10);

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user == null) throw new Error("User not found");

  const createToken = await db.verificationToken.create({
    data: {
      identifier: tokenIdentifier,
      token: tokenValue,
      expires: expirationTime,
      userId: user.id,
    },
  });

  try {
    const { data, error } = await resend.emails.send({
      from: "Register <onboarding@resend.dev>",
      to: email,
      reply_to: "onboarding@resend.dev",
      subject: "Verify your account",
      react: <RegisterEmail token={createToken.token} />,
    });

    if (error) return error;
    return data;
  } catch (error) {
    return error;
  }
}
