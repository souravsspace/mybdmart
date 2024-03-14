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
  DeliveryAddressFormValidation,
  type TDeliveryAddressFormValidation,
} from "@/types/settings-validators";
import useUserAuth from "@/hooks/use-user-auth";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../ui/checkbox";

type Props = {
  id?: string;
  name?: string;
  address?: string;
  city?: string;
  zip?: string;
  googleMapLink?: string | null;
  insideDhaka?: boolean;
  phoneNumber?: string;
  email?: string;
  additionalInfo?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string | null;
};

export function DeliveryAddressForm(data: Props) {
  const { userAuthData } = useUserAuth();

  const form = useForm<TDeliveryAddressFormValidation>({
    resolver: zodResolver(DeliveryAddressFormValidation),
    defaultValues: {
      name: data?.name || userAuthData?.name || "",
      address: data?.address || "",
      city: data?.city || "",
      zip: data?.zip || "",
      googleMapLink: data?.googleMapLink || "",
      insideDhaka: data?.insideDhaka || false,
      phoneNumber: data?.phoneNumber || "",
      email: userAuthData?.email || "",
      additionalInfo: data?.additionalInfo || "",
    },
  });

  const { isLoading, mutate } =
    api.deliveryAddress.postDeliveryAddress.useMutation({
      onError: (error) => {
        if (error.data?.code === "BAD_REQUEST") {
          toast.error("Insert all fields correctly.");
          form.reset();
          return;
        }
        if (error.data?.code === "NOT_FOUND") {
          toast.error("User not found.");
          form.reset();
          return;
        }

        if (error.data?.code === "PARSE_ERROR") {
          toast.error("Something went wrong. Please try again.");
          return;
        }

        if (error.data?.code === "UNPROCESSABLE_CONTENT") {
          toast.error("No id provided. Please try again.");
          return;
        }

        toast.error("Failed update delivery address");
      },
      onSuccess: () => {
        toast.success("Delivery address updated successfully.");
      },
    });

  function onSubmit(updateData: TDeliveryAddressFormValidation) {
    mutate({
      id: data?.id,
      name: updateData.name,
      city: updateData.city,
      zip: updateData.zip,
      address: updateData.address,
      googleMapLink: updateData.googleMapLink,
      insideDhaka: updateData.insideDhaka,
      phoneNumber: updateData.phoneNumber,
      email: updateData.email,
      additionalInfo: updateData.additionalInfo,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="e.g. Sakib"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Type the name of the person who will receive the delivery
                package.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                City <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="e.g. Dhaka"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Type your city name, where you live.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Zip <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={isLoading}
                  placeholder="1000"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Type your zip code, where you live.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="e.g. 623no House, Kutubkhali, Dhaka-1002"
                  {...field}
                  cols={8}
                />
              </FormControl>
              <FormDescription>
                Type your full address with house number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="googleMapLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Map Link</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="https://www.google.com/maps/@23.7007754,90.4497544,14.85z?entry=ttu"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                If you have a google map link, you can paste it here. It will
                help us to find your location easily.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone Number <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={isLoading}
                  placeholder="e.g. 01XXXXXXXXX"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Type your phone number, without +88.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={true}
                  placeholder="e.g. your_email@mail.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your email address, where you want to get delivery notification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insideDhaka"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-x-2">
                  <Checkbox
                    id="insideDhaka"
                    defaultChecked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel
                    htmlFor="insideDhaka"
                    disabled={isLoading}
                    {...field}
                  >
                    If you are inside Dhaka, then check this box.
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Extra Information"
                  {...field}
                  cols={8}
                />
              </FormControl>
              <FormDescription>
                Suggest us if you have any extra information.
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
            Update Address
          </Button>
        </div>
      </form>
    </Form>
  );
}
