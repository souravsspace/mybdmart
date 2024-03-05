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
  ProfileValidation,
  type TProfileValidation,
} from "@/types/settings-validators";
import useUserAuth from "@/hooks/use-user-auth";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

type Props = {
  name: string | undefined | null;
  username: string | undefined;
};

export function SettingsProfileForm({ name, username }: Props) {
  const { userAuthData } = useUserAuth();

  const form = useForm<TProfileValidation>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      name: name ? name : "",
      username: username ? username : "",
    },
  });

  const { isLoading, mutate } = api.userFrontend.updateProfile.useMutation({
    onError: (error) => {
      if (error.data?.code === "BAD_REQUEST") {
        toast.error("Invalid request");
        form.reset();
        return;
      }

      toast.error("Failed to update profile");
      form.reset();
    },

    onSuccess: () => {
      toast.success("Profile updated");
      form.reset();
    },
  });

  function onSubmit({ name, username }: TProfileValidation) {
    mutate({ name, username, email: userAuthData!.email! });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Bd Mart" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="mybdmart" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display username.
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
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
