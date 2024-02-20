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
import {
  type TCategoryValidator,
  CategoryValidator,
} from "@/types/category-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Category } from "@prisma/client";
import { useForm } from "react-hook-form";
import SubHeading from "@/components/admin/ui/sub-heading";
import useCategory from "@/hooks/use-category";
import { useRouter } from "next/navigation";

type Props = {
  initialData: Category | null;
};

export default function CategoryForm({ initialData }: Props) {
  const router = useRouter();

  const categoryId = initialData?.id;
  const {
    isCategoryLoading,
    createCategoryMutate,
    deleteCategoryMutate,
    updateCategoryMutate,
  } = useCategory();

  const form = useForm<TCategoryValidator>({
    resolver: zodResolver(CategoryValidator),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  const actionButton = initialData ? "Update" : "Create";
  const secondActionButton = initialData ? "Delete" : "Cancel";
  const isFormLoading =
    form.formState.isLoading ||
    form.formState.isValidating ||
    form.formState.isSubmitting;

  const isLoading = isFormLoading || isCategoryLoading;

  const onSubmit = ({ name }: TCategoryValidator) => {
    if (!initialData || !categoryId) {
      createCategoryMutate({ name });
      return;
    }
    updateCategoryMutate({
      id: categoryId,
      name,
    });
  };

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-start justify-between gap-1.5 sm:flex-row md:items-center">
            <SubHeading
              title="Categories"
              subtitle="Manage category for your store."
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
                    if (!categoryId) return;
                    deleteCategoryMutate({ id: categoryId });
                    return;
                  } else {
                    router.push("/admin/settings/categories");
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
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is Category name. It will be displayed on your admin
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
