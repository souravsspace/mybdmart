import {
  Html,
  Button,
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
import { buttonVariants } from "@/components/ui/button";
import { env } from "@/env";

type Props = {
  token: string;
};

export default function RegisterEmail({ token }: Props) {
  const verifyEmail = env.NEXTAUTH_URL + "verify-email?token=" + token;
  return (
    <Html>
      <Head />
      <Preview>Welcome to MyBDmart.</Preview>
      <Tailwind>
        <Body className="bg-blue-50 font-serif">
          <Container className="mx-auto my-0">
            <Img
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/logo/logo-light.png`}
              width="150"
              height="150"
              alt="MyBDmart"
              className="mx-auto my-0"
            />
            <Text className="text-base">Hi there,</Text>
            <Text className="text-base">
              Welcome to MyBDmart, the marketplace for high quality goods. Use
              the button below to Continue registration.
            </Text>
            <Section className="text-center">
              <Button className={buttonVariants()} href={verifyEmail}>
                Verify Email
              </Button>
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

// export default function RegisterEmailHtml() {
//   render(<RegisterEmail />, { pretty: true });
// }
