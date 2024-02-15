"use client";

import sendMail from "@/actions/sendMail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserAuth from "@/hooks/use-user-auth";
import {
  type TVerificationCodeSchema,
  VerificationCodeSchema,
} from "@/types/verification-validator";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import otp from "@/actions/otp";

type Props = {
  email: string;
};

export default function ForgetVerificationEmail({ email }: Props) {
  const { userAuthData } = useUserAuth();

  const router = useRouter();
  const [isResending, setIsResending] = useState(false);

  const [userEmail] = useState(() => {
    if (userAuthData?.email) {
      return userAuthData.email;
    } else {
      return email;
    }
  });

  const form = useForm<TVerificationCodeSchema>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(VerificationCodeSchema),
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

      if (err instanceof ZodError) {
        toast.error("Could not verify email. Please try again.");
        return;
      }

      toast.error("Something went wrong. Please try again.");
    },

    onSuccess: async ({ userEmail }) => {
      toast.success("Email verified successfully.");

      try {
        const data = await otp({ email: userEmail });

        router.push(`/new-password?to=${userEmail}&otp=${data}`);
      } catch (error) {
        toast.error("Could not generate OTP. Please try again.");
      }
    },
  });

  const onSubmit = ({ code }: TVerificationCodeSchema) => {
    mutate({ code, email: userEmail });
  };

  const resendEmail = async (userEmail: string) => {
    try {
      setIsResending(true);
      await sendMail({ email: userEmail });
      toast.success("Email sent successfully.");
    } catch (error) {
      setIsResending(false);
      toast.error("Could not send email. Please try again.");
    } finally {
      setTimeout(() => {
        setIsResending(false);
      }, 60000);
    }
  };

  return (
    <form
      {...form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-10 w-52"
    >
      <Input
        type="text"
        placeholder="Type Your OTP.."
        {...form.register("code")}
      />

      <Button disabled={isLoading} type="submit" className="mt-2 w-full">
        Submit
      </Button>
      <Button
        disabled={isLoading || isResending}
        variant="secondary"
        type="button"
        className="mt-2 w-full"
        onClick={() => resendEmail(userEmail)}
      >
        Resend
      </Button>
    </form>
  );
}
