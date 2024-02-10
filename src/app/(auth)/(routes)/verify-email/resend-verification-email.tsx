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

type Props = {
  email: string;
};

export default function ResendVerificationEmail({ email }: Props) {
  const router = useRouter();
  const { userAuthData } = useUserAuth();

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

    onSuccess: () => {
      toast.success("Email verified successfully.");
      router.push("/login");
    },
  });

  const onSubmit = ({ code }: TVerificationCodeSchema) => {
    mutate({ code, email: userEmail });
  };

  const resendEmail = async (userEmail: string) => {
    try {
      await sendMail({ email: userEmail });
    } catch (error) {
      console.error(error);
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
        disabled={isLoading}
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
