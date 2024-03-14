import NavLogo from "@/components/ui/nav-logo";
import CopyButton from "@/components/auth/copy-button";

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
    <div className="relative flex h-full w-full flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <NavLogo />

          <h3 className="text-center text-xl font-bold tracking-wider sm:text-2xl">
            Copy your new password.
          </h3>
        </div>
      </div>

      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          Please login and go to{" "}
          <span className="font-bold">settings{" > "}security</span> and change
          you password.
        </p>
      </div>

      <CopyButton text={otp} />
    </div>
  );
}
