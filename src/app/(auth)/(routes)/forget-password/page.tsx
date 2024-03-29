import ForgetVerificationEmail from "@/components/auth/forget-verification-email";
import NavLogo from "@/components/ui/nav-logo";

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
    <div className="relative flex h-full w-full flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <NavLogo />

          <h3 className="text-2xl font-bold tracking-wider sm:text-3xl">
            Check your email
          </h3>
        </div>
      </div>

      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          We&apos;ve sent a verification OTP to {toEmail}
          <span className="font-semibold"></span>
        </p>

        <p className="text-center text-sm text-muted-foreground">
          Please check your email and enter the OTP to verify your email.
        </p>
      </div>

      <ForgetVerificationEmail email={toEmail as string} />
    </div>
  );
}
