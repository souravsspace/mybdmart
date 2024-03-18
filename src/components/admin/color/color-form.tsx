"use client";

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
import { Separator } from "@/components/ui/separator";
import { type TColorValidator, ColorValidator } from "@/types/color-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Color } from "@prisma/client";
import { useForm } from "react-hook-form";
import SubHeading from "@/components/admin/ui/sub-heading";
import useColor from "@/hooks/use-color";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  initialData: Color | null;
};

export default function ColorForm({ initialData }: Props) {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const colorId = initialData?.id;
  const {
    isColorLoading,
    createColorMutate,
    deleteColorMutate,
    updateColorMutate,
  } = useColor();

  const form = useForm<TColorValidator>({
    resolver: zodResolver(ColorValidator),
    defaultValues: {
      name: initialData?.name || "",
      value: initialData?.value || "",
    },
  });

  if (!isMounted) return null;

  const actionButton = initialData ? "Update" : "Create";
  const secondActionButton = initialData ? "Delete" : "Cancel";
  const isFormLoading =
    form.formState.isLoading ||
    form.formState.isValidating ||
    form.formState.isSubmitting;

  const isLoading = isFormLoading || isColorLoading;

  const onSubmit = ({ name, value }: TColorValidator) => {
    if (!initialData || !colorId) {
      createColorMutate({ name, value });
      return;
    }
    updateColorMutate({
      id: colorId,
      name,
      value,
    });
  };

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-start justify-between gap-1.5 sm:flex-row md:items-center">
            <SubHeading
              title="Colors"
              subtitle="Manage color for your store."
            />

            <div className="flex w-full items-center justify-end gap-1.5 sm:w-fit sm:gap-2">
              <Button
                size="sm"
                disabled={isFormLoading || isLoading}
                type="submit"
              >
                {actionButton}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  if (initialData) {
                    if (!colorId) return;
                    deleteColorMutate({ id: colorId });
                    return;
                  } else {
                    router.push("/admin/settings/colors");
                  }
                }}
              >
                {secondActionButton}
              </Button>
            </div>
          </div>

          <Separator className="my-2 sm:my-4" />

          <div className="grid gap-6 sm:gap-12">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="max-w-96"
                      placeholder="Color name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is Color name. It will be displayed on your admin
                    dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      className="max-w-96"
                      placeholder="Color value"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is Color value. Must Be a valid color value with hex.
                    e.g #000000
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </main>
  );
}
