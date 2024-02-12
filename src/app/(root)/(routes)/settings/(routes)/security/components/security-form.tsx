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

export function SecurityForm() {
  const { userAuthData } = useUserAuth();

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

  function onSubmit({ oldPassword, newPassword }: TSecurityValidation) {
    mutate({ oldPassword, newPassword, email: userAuthData!.email! });
  }

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
        <div className="flex items-center gap-x-2">
          <Button
            disabled={isLoading}
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Clear Changes
          </Button>
          <Button disabled={isLoading} type="submit">
            Update Password
          </Button>
        </div>
      </form>
    </Form>
  );
}
