import CopyButton from "@/components/auth/copy-button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function NewPassword({ searchParams }: Props) {
  const toEmail = searchParams.to;
  const otp = searchParams.otp;

  if (
    (typeof toEmail !== "string" && !toEmail) ||
    (typeof otp !== "string" && !otp)
  ) {
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

          <h3 className="text-2xl font-semibold">Copy your new password.</h3>

          <p className="text-center text-muted-foreground">
            Your password has been reset successfully.
          </p>
          <p className="text-center text-muted-foreground">
            Please login and go to{" "}
            <span className="font-semibold">settings{" > "}security</span> and
            change you password.
          </p>

          <CopyButton text={otp} />
        </div>
      </div>
    </div>
  );
}
