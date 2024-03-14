"use server";

import ContactEmail from "@/components/emails/contact";
import { resend } from "@/server/mail";
import { type TContactFormValidator } from "@/types/contact-form-validator";

export default async function sendContactMail({
  firstName,
  lastName,
  phoneNumber,
  email,
  topic,
  message,
}: TContactFormValidator) {
  const fullName = `${firstName} + " " + ${lastName}`;
  try {
    const { data, error } = await resend.emails.send({
      from: email,
      to: "support <support@mybdmart.com>",
      reply_to: email,
      subject: `Contact form: ${topic}`,
      text: `First Name: ${firstName}
      Last Name: ${lastName}
      Email: ${email}
      Phone Number: ${phoneNumber}
      Topic: ${topic}
      Message: ${message}`,
      react: (
        <ContactEmail
          name={fullName}
          phoneNumber={phoneNumber}
          email={email}
          topic={topic}
          message={message}
        />
      ),
    });

    if (error)
      throw new Error("Error while sending message. Please try again later.");

    return data;
  } catch (error) {
    throw new Error("Error while sending message. Please try again later.");
  }
}
