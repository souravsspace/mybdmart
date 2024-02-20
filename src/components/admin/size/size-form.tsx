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
import { type TSizeValidator, SizeValidator } from "@/types/size-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Size } from "@prisma/client";
import { useForm } from "react-hook-form";
import SubHeading from "@/components/admin/ui/sub-heading";
import useSize from "@/hooks/use-size";
import { useRouter } from "next/navigation";

type Props = {
  initialData: Size | null;
};

export default function SizeForm({ initialData }: Props) {
  const router = useRouter();

  const sizeId = initialData?.id;
  const {
    isSizeLoading,
    createSizeMutate,
    deleteSizeMutate,
    updateSizeMutate,
  } = useSize();

  const form = useForm<TSizeValidator>({
    resolver: zodResolver(SizeValidator),
    defaultValues: {
      name: initialData?.name || "",
      value: initialData?.value || "",
    },
  });

  const actionButton = initialData ? "Update" : "Create";
  const secondActionButton = initialData ? "Delete" : "Cancel";
  const isFormLoading =
    form.formState.isLoading ||
    form.formState.isValidating ||
    form.formState.isSubmitting;

  const isLoading = isFormLoading || isSizeLoading;

  const onSubmit = ({ name, value }: TSizeValidator) => {
    if (!initialData || !sizeId) {
      createSizeMutate({ name, value });
      return;
    }
    updateSizeMutate({
      id: sizeId,
      name,
    });
  };

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-start justify-between gap-1.5 sm:flex-row md:items-center">
            <SubHeading title="Sizes" subtitle="Manage size for your store." />

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
                    if (!sizeId) return;
                    deleteSizeMutate({ id: sizeId });
                    return;
                  } else {
                    router.push("/admin/settings/sizes");
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
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is Size name. It will be displayed on your admin
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
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is Size value. It will be displayed on your admin
                    dashboard.
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
