import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { Tailwind } from "@react-email/tailwind";

interface VerifyEmailProps {
  verificationCode: string;
}

const baseUrl = process.env.NEXTAUTH_URL
  ? `https://${process.env.NEXTAUTH_URL}`
  : "";

export default function VerifyEmail({ verificationCode }: VerifyEmailProps) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview> Email Verification</Preview>
        <Body className="bg-[#fff] text-[#212121]">
          <Container className="mx-auto my-0 bg-[#eee] p-5">
            <Section className="bg-[#fff]">
              <Section className="flex items-center justify-center bg-[#252f3d] px-0 py-5">
                <Img
                  src={`${baseUrl}/logo/light-logo.png`}
                  width="75"
                  height="45"
                  alt="MyBDMart Logo"
                />
              </Section>
              <Section className="px-8 py-6">
                <Heading className="mb-4 text-2xl font-bold text-[#333]">
                  Verify your email address
                </Heading>
                <Text className="mb-4">
                  Thanks for using MyBdmart. We want to make sure it&apos;s
                  really you. Please enter the following verification code when
                  prompted. If you don&apos;t want to create an account, you can
                  ignore this message.
                </Text>

                <Section className="flex items-center justify-center">
                  <Text className="text-center text-lg font-bold">
                    Verification code
                  </Text>

                  <Text className="mx-0 my-2.5 text-center text-4xl font-bold">
                    {verificationCode}
                  </Text>
                  <Text className="m-0 text-center text-lg">
                    (This code is valid for 10 minutes)
                  </Text>
                </Section>
              </Section>
              <Hr />
              <Section className="px-8 py-6">
                <Text className="m-0">
                  MyBdmart Web Services will never email you and ask you to
                  disclose or verify your password, credit card, or banking
                  account number.
                </Text>
              </Section>
            </Section>
            <Text className="mx-0 my-6 px-5 py-0 text-sm text-[#333]">
              This message was produced and distributed by MyBDmart Web
              Services, Inc. © 2024, MyBDmart Web Services, Inc.. All rights
              reserved. is a registered trademark of{" "}
              <Link
                href="https://mybdmart.com"
                target="_blank"
                className="text-sm text-[#2754C5] underline"
              >
                Mybdmart.com
              </Link>
              , Inc. View our{" "}
              <Link
                href="https://mybdmart.com"
                target="_blank"
                className="text-sm text-[#2754C5] underline"
              >
                privacy policy
              </Link>
              .
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
