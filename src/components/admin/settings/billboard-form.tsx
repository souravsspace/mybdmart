"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
  type TbillboardValidator,
  billboardValidator,
} from "@/types/billboard-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Billboard } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import SubHeading from "@/components/admin/ui/sub-heading";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import Image from "next/image";
import useImageToBase64 from "@/hooks/use-image-to-base64";
import { RiImageAddFill } from "react-icons/ri";
import Link from "next/link";

type Props = {
  initialData: Billboard | null;
};

export default function BillboardForm({ initialData }: Props) {
  const router = useRouter();
  const { covertToBase64, theImage } = useImageToBase64();

  const form = useForm<TbillboardValidator>({
    resolver: zodResolver(billboardValidator),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  const actionButton = initialData ? "Update" : "Create";
  const showImage = initialData ? initialData.imageUrl : (theImage as string);
  // const showImage = theImage ? (theImage as string) : initialData?.imageUrl;

  const isLoading = form.formState.isLoading;

  const { mutate: createBillboardMutate } =
    api.billboard.createBillboard.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to create billboard");
          form.reset();
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to create billboard!");
          form.reset();
          return;
        }

        toast.error("Failed to create billboard");
        form.reset();
      },
      onSuccess: () => {
        toast.success("Billboard created successfully!");
        router.push("/admin/settings/billboards");
      },
    });

  const onSubmit = ({ name }: TbillboardValidator) => {
    if (!theImage) {
      toast.error("Image is required");
      return;
    }
    createBillboardMutate({ name, imageUrl: theImage as string });
  };

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-center justify-between gap-1.5 sm:flex-row">
            <SubHeading
              title="Billboards"
              subtitle="Manage billboard for your store."
            />

            <div className="flex w-full items-center justify-end gap-1.5 sm:w-fit sm:gap-2">
              <Button disabled={isLoading} type="submit">
                {actionButton}
              </Button>
              <Link
                className={buttonVariants({
                  variant: "secondary",
                })}
                href="/admin/settings/billboards"
              >
                Back
              </Link>
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
                      placeholder="Billboard name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is Billboard name. It will be displayed on your admin
                    dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col-reverse items-center gap-2 md:flex-row">
              <div className="relative max-w-[400px] rounded-lg border-2 border-dashed border-gray-300 p-6">
                <input
                  type="file"
                  className="absolute inset-0 z-50 h-full w-full opacity-0"
                  onChange={covertToBase64}
                />
                <div className="text-center">
                  <RiImageAddFill className="mx-auto h-10 w-10" />

                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer"
                    >
                      <span>Drag and drop</span>
                      <span className="text-red-600"> or browse</span>
                      <span>to upload</span>
                      <input
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 40MB
                  </p>
                </div>
              </div>

              {showImage && (
                <Image
                  src={showImage}
                  alt="BillboardImage"
                  width={250}
                  height={250}
                  className="mt-4 max-w-[400px] rounded-lg md:ml-12 md:mt-0"
                />
              )}
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}
