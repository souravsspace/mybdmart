import ForgetVerificationEmail from "@/components/auth/forget-verification-email";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function ForgetPasswordPage({ searchParams }: Props) {
  const toEmail = searchParams.to;

  if (typeof toEmail !== "string" && !toEmail) {
    return null;
  }

  return (
    <div className="container relative flex flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <Link
            href="/"
            className="relative flex h-56 w-56 items-center justify-center text-muted-foreground"
          >
            <Image
              src="/logo/logo-light.png"
              width={220}
              height={90}
              alt="logo"
              className="object-contain"
            />
          </Link>

          <h3 className="text-2xl font-semibold">Check your email</h3>

          <p className="text-center text-muted-foreground">
            We&apos;ve sent a verification OTP to{" "}
            <span className="font-semibold">{toEmail}</span>
            <br />
            Please check your email and enter the OTP to reset your email.
          </p>
        </div>
      </div>
      <ForgetVerificationEmail email={toEmail as string} />
    </div>
  );
}
