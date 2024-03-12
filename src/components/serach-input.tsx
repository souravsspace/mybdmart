"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const FormSchema = z.object({
  query: z.string().min(3, "Query must be at least 3 characters"),
});

type TFormSchema = z.infer<typeof FormSchema>;

export default function SerachInput() {
  const router = useRouter();

  const form = useForm<TFormSchema>({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = ({ query }: TFormSchema) => {
    router.push(`/products?query=${query}`);
  };

  const loading = form.formState.isLoading || form.formState.isSubmitting;

  return (
    <div
      {...form}
      className="flex items-end justify-end"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder=""
                    className="sm:w-72"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" size="sm" disabled={loading}>
            <FaMagnifyingGlass className="size-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
