import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function VerifyEmail({ searchParams }: Props) {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            {/* <VerifyEmail token={token} /> */}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Link
              href="/"
              className="relative flex h-60 w-60 items-center justify-center text-muted-foreground"
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

            {toEmail ? (
              <p className="text-center text-muted-foreground">
                We&apos;ve sent a verification link to{" "}
                <span className="font-semibold">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-center text-muted-foreground">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
