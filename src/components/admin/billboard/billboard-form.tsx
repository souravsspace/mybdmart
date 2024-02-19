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
  type TbillboardValidator,
  billboardValidator,
} from "@/types/billboard-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Billboard } from "@prisma/client";
import { useForm } from "react-hook-form";
import SubHeading from "@/components/admin/ui/sub-heading";
import toast from "react-hot-toast";
import useImageToBase64 from "@/hooks/use-image-to-base64";
import useBillboard from "@/hooks/use-billboard";
import DragAndDropImage from "@/components/admin/ui/drag-and-drop-image";
import { useRouter } from "next/navigation";

type Props = {
  initialData: Billboard | null;
};

export default function BillboardForm({ initialData }: Props) {
  const router = useRouter();

  const billboardId = initialData?.id;
  const { covertToBase64, theImage } = useImageToBase64();
  const {
    isBillboardLoading,
    createBillboardMutate,
    deleteBillboardMutate,
    updateBillboardMutate,
  } = useBillboard();

  const form = useForm<TbillboardValidator>({
    resolver: zodResolver(billboardValidator),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  const actionButton = initialData ? "Update" : "Create";
  const secondActionButton = initialData ? "Delete" : "Cancel";
  const imageUrl = theImage ? (theImage as string) : initialData?.imageUrl;
  const isFormLoading =
    form.formState.isLoading ||
    form.formState.isValidating ||
    form.formState.isSubmitting;

  const isLoading = isFormLoading || isBillboardLoading;

  const onSubmit = ({ name }: TbillboardValidator) => {
    if (!billboardId || !initialData) {
      if (!theImage) {
        toast.error("Image is required");
        return;
      }
      createBillboardMutate({ name, imageUrl: theImage as string });
      return;
    }

    updateBillboardMutate({
      id: billboardId,
      name,
      imageUrl,
    });
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
              <Button disabled={isFormLoading || isLoading} type="submit">
                {actionButton}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  if (initialData) {
                    if (!billboardId) return;
                    deleteBillboardMutate({ id: billboardId });
                    return;
                  } else {
                    router.push("/admin/settings/billboards");
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

            <DragAndDropImage
              imageUrl={imageUrl}
              covertToBase64={covertToBase64}
            />
          </div>
        </form>
      </Form>
    </main>
  );
}
