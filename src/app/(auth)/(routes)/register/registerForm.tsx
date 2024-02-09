"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialsValidator,
  type TAuthCredentialsValidator,
} from "@/lib/account-credentials-validator";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import sendMail from "@/actions/sendMail";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter();

  const { mutate, isLoading } = api.authRouter.createAccount.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Sign in instead?");
        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.message);
        return;
      }
      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: async ({ sentToEmail }) => {
      try {
        await sendMail({ email: sentToEmail });
        
        toast.success(`Verification email sent to ${sentToEmail}.`);
        router.push("/verify-email?to=" + sentToEmail);
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-1 py-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            className={cn({
              "focus-visible:ring-red-500": errors.email,
            })}
            placeholder="you@example.com"
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-1 py-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            type="password"
            className={cn({
              "focus-visible:ring-red-500": errors.password,
            })}
            placeholder="Password"
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <p className="text-[13px] tracking-tighter">
            By creating an account, you agree our terms of service.
          </p>
        </div>

        <Button disabled={isLoading}>Register</Button>
      </div>
    </form>
  );
}
