"use server";

import { Resend } from "resend";
import { env } from "@/env";
import RegisterEmail from "@/components/emails/register";
import { db } from "@/server/db";
import { randomUUID } from "crypto";

const resend = new Resend(env.RESEND_API_KEY);

type Props = {
  email: string;
};

export default async function sendMail({ email }: Props) {
  const tokenIdentifier = randomUUID();
  const tokenValue = randomUUID();

  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 10);

  const createToken = await db.verificationToken.create({
    data: {
      identifier: tokenIdentifier,
      token: tokenValue,
      expires: expirationTime,
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
