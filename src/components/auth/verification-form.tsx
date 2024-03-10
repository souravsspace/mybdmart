"use client";

import { ZodError } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { OTPInput, type SlotProps } from "input-otp";

export default function VerificationForm({ email }: { email: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");

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
      if (err instanceof ZodError) {
        toast.error("Could not verify email. Please try again.");
        return;
      }
      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: () => {
      toast.success("Email verified successfully.");
      router.push("/login");
    },
  });

  const onSubmit = () => {
    mutate({ code: value, email });
  };

  return (
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
        <div className="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center">
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
