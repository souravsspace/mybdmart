"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SecurityValidation,
  type TSecurityValidation,
} from "@/types/settings-validators";
import useUserAuth from "@/hooks/use-user-auth";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import useResetPass from "@/hooks/use-reset-pass";
import sendMail from "@/actions/sendMail";
import { useRouter } from "next/navigation";

export function SecurityForm() {
  const router = useRouter();
  const { userAuthData } = useUserAuth();

  const { data } = api.authRouter.isVerified.useQuery();

  const form = useForm<TSecurityValidation>({
    resolver: zodResolver(SecurityValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const { isLoading, mutate } = api.userFrontend.changePassword.useMutation({
    onError: (error) => {
      if (error.data?.code === "BAD_REQUEST") {
        toast.error("Your old password is incorrect.");
        form.reset();
        return;
      }

      toast.error("Failed to update profile");
      form.reset();
    },

    onSuccess: () => {
      toast.success("Password updated successfully.");
      form.reset();
    },
  });

  const { mutate: resetPassMutate, isLoadingForget } = useResetPass();

  function onSubmit({ oldPassword, newPassword }: TSecurityValidation) {
    mutate({ oldPassword, newPassword, email: userAuthData!.email! });
  }

  const handleForgotPassword = () => {
    if (!userAuthData?.email) {
      toast.error("Email not found.");
      return;
    }
    resetPassMutate({ email: userAuthData.email });
  };

  const handleVerifyEmail = async () => {
    const sentToEmail = userAuthData!.email as string;

    try {
      toast.loading("Sending email...");
      await sendMail({ email: sentToEmail });
      toast.remove();
      toast.success("Email sent. Please verify your email.");
      router.push("/verify-email?to=" + sentToEmail);
    } catch (error) {
      toast.error("Email send failed.");
      router.push("/verify-email?to=" + sentToEmail);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormDescription>Type your old password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormDescription>
                Type your new password, must be at least 8 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          disabled={isLoading || isLoadingForget}
          type="button"
          onClick={handleForgotPassword}
          className="tracking-tighter"
        >
          Forget password ?
        </button>

        {data?.verified === false && (
          <Button
            disabled={isLoading || isLoadingForget}
            type="button"
            variant="link"
            className="sm:ml-2"
            onClick={handleVerifyEmail}
          >
            Verify Email
          </Button>
        )}

        <div className="flex items-center gap-x-2">
          <Button
            disabled={isLoading || isLoadingForget}
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Clear Changes
          </Button>
          <Button disabled={isLoading || isLoadingForget} type="submit">
            Update Password
          </Button>
        </div>
      </form>
    </Form>
  );
}
