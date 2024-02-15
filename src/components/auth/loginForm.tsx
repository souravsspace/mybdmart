"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialsValidator,
  type TAuthCredentialsValidator,
} from "@/types/account-credentials-validator";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import useResetPass from "@/hooks/use-reset-pass";
import { ForgetPasswordSchema } from "@/types/forget-pass-validation";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isLoading },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const onSubmit = async ({ email, password }: TAuthCredentialsValidator) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid credentials");
      return;
    }

    toast.success("Welcome back!");
    router.push("/");
  };

  const { mutate, isLoadingForget } = useResetPass();

  const handleForgotPassword = () => {
    const validateEmail = ForgetPasswordSchema.safeParse({
      email: getValues("email"),
    });

    if (!validateEmail.success)
      return toast.error("Please enter a valid email address.");
    const { email } = validateEmail.data;

    mutate({ email });
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
            type="email"
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

        <div className="flex items-end justify-end text-sm text-muted-foreground hover:text-gray-950">
          <button
            disabled={isLoading || isLoadingForget}
            type="button"
            onClick={handleForgotPassword}
            className="tracking-tighter"
          >
            Forget password?
          </button>
        </div>

        <Button disabled={isLoading || isLoadingForget} type="submit">
          Login
        </Button>
      </div>
    </form>
  );
}
