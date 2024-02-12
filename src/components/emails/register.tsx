import {
  Html,
  Head,
  Body,
  Container,
  Preview,
  Section,
  Text,
  Hr,
  Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type Props = {
  token: string;
};

export default function RegisterEmail({ token }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to MyBDmart.</Preview>
      <Tailwind>
        <Body className="bg-blue-50 p-2 font-serif">
          <Container className="mx-auto my-0">
            <Img
              src={`${process.env.NEXTAUTH_URL}/logo/logo-light.png`}
              width="180"
              height="80"
              alt="MyBDmart"
              className="mx-auto my-0"
            />
            <Text className="text-base">Hi there,</Text>
            <Text className="text-base">
              Welcome to MyBDmart, the marketplace for high quality goods. Use
              the OTP below to Continue.
            </Text>
            <Section className="mx-auto my-5 text-center">
              <Text className="mx-2 rounded-md bg-red-50 font-semibold">
                {token}
              </Text>
            </Section>
            <Text>
              Best,
              <Hr />
              The MyBDmart team.
            </Text>
            <Hr className="mx-0 my-5" />
            <Text className="text-xs text-gray-400">
              If you did not request this email, you can safely ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
