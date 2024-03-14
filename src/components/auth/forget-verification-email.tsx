"use client";

import { cn } from "@/lib/utils";
import { OTPInput, type SlotProps } from "input-otp";
import sendMail from "@/actions/sendMail";
import useUserAuth from "@/hooks/use-user-auth";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import otp from "@/actions/otp";
import { Button } from "@/components/ui/button";

type Props = {
  email: string;
};

export default function ForgetVerificationEmail({ email }: Props) {
  const { userAuthData } = useUserAuth();

  const router = useRouter();
  const [value, setValue] = useState("");
  const [isResending, setIsResending] = useState(false);

  const [userEmail] = useState(() => {
    if (userAuthData?.email) {
      return userAuthData.email;
    } else {
      return email;
    }
  });

  const { isLoading, mutate } = api.authRouter.verifyEmail.useMutation({
    onError: (err) => {
      if (err.data?.code === "NOT_FOUND") {
        toast.error("User not found.");
        return;
      }

      if (err.data?.code === "CONFLICT") {
        toast.error("Invalid verification code.");
        return;
      }

      toast.error("Could not verify email. Please try again.");
    },

    onSuccess: async ({ userEmail }) => {
      toast.success("Email verified successfully.");

      try {
        toast.loading("Generating OTP...");

        const OTP = await otp({ email: userEmail });

        toast.dismiss();
        router.push(`/new-password?to=${userEmail}&otp=${OTP}`);
      } catch (error) {
        toast.dismiss();
        toast.error("Could not generate OTP. Please try again.");
      }
    },
  });

  const onSubmit = () => {
    mutate({ code: value, email: userEmail });
  };

  const resendEmail = async (userEmail: string) => {
    try {
      toast.loading("Sending email...");
      setIsResending(true);
      await sendMail({ email: userEmail });
      toast.dismiss();
      toast.success("Email sent successfully.");
    } catch (error) {
      toast.dismiss();
      setIsResending(false);
      toast.error("Could not send email. Please try again.");
    } finally {
      setTimeout(() => {
        setIsResending(false);
      }, 60000);
    }
  };

  return (
    <>
      <OTPInput
        maxLength={4}
        value={value}
        disabled={isLoading}
        onComplete={onSubmit}
        onChange={(val) => setValue(val)}
        containerClassName="group flex items-center has-[:disabled]:opacity-30"
        render={({ slots }) => (
          <>
            <div className="flex">
              {slots.slice(0, 2).map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>

            <FakeDash />

            <div className="flex">
              {slots.slice(2).map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>
          </>
        )}
      />

      <Button
        variant="link_foreground"
        className="mt-4 sm:mt-6"
        type="button"
        disabled={isLoading || isResending}
        onClick={() => resendEmail(userEmail)}
      >
        Click here to resend email
      </Button>
    </>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative h-14 w-10 text-[2rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border-y border-r border-border first:rounded-l-md first:border-l last:rounded-r-md",
        "group-focus-within:border-accent-foreground/20 group-hover:border-accent-foreground/20",
        "outline outline-0 outline-accent-foreground/20",
        { "outline-4 outline-accent-foreground": props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex animate-caret-blink items-center justify-center">
          <div className="h-8 w-px bg-white" />
        </div>
      )}
    </div>
  );
}

function FakeDash() {
  return (
    <div className="flex w-10 items-center justify-center">
      <div className="h-1 w-3 rounded-full bg-border" />
    </div>
  );
}
