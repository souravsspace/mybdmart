import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { Tailwind } from "@react-email/tailwind";

const baseUrl = process.env.NEXTAUTH_URL
  ? `https://${process.env.NEXTAUTH_URL}`
  : "";

interface ContactEmailProps {
  name: string;
  email: string;
  phoneNumber: string;
  topic: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  topic,
  message,
  phoneNumber,
}: ContactEmailProps) {
  const hr = "border-[#e6ebf1] my-5 mx-0";
  const paragraph = "text-[#525f7f] text-base leading-6 text-left";

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>{topic}</Preview>
        <Body className="bg-[#f6f9fc]">
          <Container className="mx-auto my-0 bg-[#ffffff] px-0 pb-8 pt-5">
            <Section className="px-8 py-0">
              <Img
                src={`${baseUrl}/logo/logo-light.png`}
                width="100"
                height="75"
                alt="MyBDmart"
              />
              <Hr className={hr} />
              <Text className={paragraph}>{topic}</Text>
              <Text className={paragraph}>{message}</Text>
              <Text className={paragraph}>— {name}</Text>
              <Hr className={hr} />
              <Text className="text-sm text-[#8898aa]">
                Email: {email}, Phone: {phoneNumber}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
