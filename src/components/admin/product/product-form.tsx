"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  type TProductValidator,
  ProductValidator,
} from "@/types/product-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SubHeading from "@/components/admin/ui/sub-heading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type {
  Categories,
  productType,
  SizeAndColor,
} from "@/types/admin-product";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DragAndDropImage from "@/components/admin/ui/drag-and-drop-image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import useImageToBase64 from "@/hooks/use-image-to-base64";
import useProductSize from "@/hooks/use-product-size";
import useProductColor from "@/hooks/use-product-color";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Trash } from "lucide-react";
import useProduct from "@/hooks/use-product";
import { useEffect, useState } from "react";
import AlertModal from "@/components/modals/alert-modal";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/loader";
import { STOCK } from "@prisma/client";
import { productStockStatus } from "@/constant";

type Props = {
  initialData: productType | null;
  sizes: SizeAndColor[];
  colors: SizeAndColor[];
  categories: Categories[];
};

export default function ProductForm({
  initialData,
  sizes,
  colors,
  categories,
}: Props) {
  const router = useRouter();
  const productId = initialData?.id;

  const [open, setOpen] = useState(false);

  const {
    deleteProductMutate,
    createProductMutate,
    isProductLoading,
    updateProductMutate,
    createIsLoading,
  } = useProduct();

  const { convertToBase64, theImages, removeImage, setTheImages } =
    useImageToBase64();

  const {
    selectedSize,
    isSizeOptions,
    onSizeValueChange,
    onSizeRemoveValue,
    setSelectedSize,
    setIsSizeOptions,
  } = useProductSize({ options: sizes });
  const {
    selectedColor,
    isColorOptions,
    onColorValueChange,
    onColorRemoveValue,
    setSelectedColor,
    setIsColorOptions,
  } = useProductColor({ options: colors });

  useEffect(() => {
    if (initialData) {
      // Filter out the initial data from sizes and colors arrays
      const filteredSizes = sizes.filter((size) =>
        initialData.sizes.every((selectedSize) => selectedSize.id !== size.id),
      );
      const filteredColors = colors.filter((color) =>
        initialData.colors.every(
          (selectedColor) => selectedColor.id !== color.id,
        ),
      );
      // Set the selected data to setSelectedSize and setSelectedColor
      setSelectedSize(initialData.sizes);
      setSelectedColor(initialData.colors);

      // Set the filtered data to setIsSizeOptions and setIsColorOptions
      setIsSizeOptions(filteredSizes);
      setIsColorOptions(filteredColors);

      // // Set the images to the images state
      // const rawImages = initialData.images.map((image) => image.imageUrl);
      // setTheImages(rawImages);
    }
  }, [
    initialData,
    sizes,
    colors,
    setIsSizeOptions,
    setIsColorOptions,
    setSelectedColor,
    setSelectedSize,
    setTheImages,
  ]);

  const form = useForm<TProductValidator>({
    resolver: zodResolver(ProductValidator),
    defaultValues: {
      name: initialData?.name || "",
      images: initialData?.images || [],
      price: String(initialData?.price) || "",
      newPrice: String(initialData?.newPrice) || "",
      sizes: initialData?.sizes || [],
      colors: initialData?.colors || [],
      categoryId: initialData?.categoryId || "",
      isFeatured: initialData?.isFeatured || false,
      isArchived: initialData?.isArchived || false,
      description: initialData?.description || "",
      stock: initialData?.stock || STOCK.IN_STOCK,
    },
  });

  const isFormLoading =
    form.formState.isLoading ||
    form.formState.isValidating ||
    form.formState.isSubmitting;

  const actionButton = initialData ? "Update" : "Create";
  const secondActionButton = initialData ? "Delete" : "Cancel";
  const imageAction = initialData && "Can't update images or delete images!";

  const isLoading = isFormLoading || isProductLoading;

  const isImages = initialData?.images || [];
  const newImagesArray = theImages?.map((image) => {
    return { imageUrl: image };
  });
  const arrayOfImage = isImages.length > 0 ? isImages : newImagesArray;

  const onSubmit = (data: TProductValidator) => {
    if (!selectedSize) return toast.error("Please select colors");
    if (!selectedColor) return toast.error("Please select sizes");
    if (!arrayOfImage) return toast.error("Please select images");

    if (initialData) {
      updateProductMutate({
        ...data,
        id: initialData.id,
        sizes: selectedSize,
        colors: selectedColor,
        images: arrayOfImage,
        price: String(data.price),
        newPrice: String(data.newPrice),
        stock: data.stock,
      });
      return;
    }

    createProductMutate({
      ...data,
      sizes: selectedSize,
      colors: selectedColor,
      images: arrayOfImage,
      price: String(data.price),
      newPrice: String(data.newPrice),
    });
  };

  if (createIsLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="my-6 sm:my-8">
          <h4 className="text-muted-foreground">
            Uploading product to the server...
          </h4>
        </div>
        <Loader />
      </div>
    );

  return (
    <main>
      <AlertModal
        loading={isLoading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          if (!productId) return;
          deleteProductMutate({ id: productId });
          setOpen(false);
        }}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="flex flex-col items-start justify-between gap-1.5 sm:flex-row md:items-center">
            <SubHeading
              title="Products"
              subtitle="Manage product for your store."
            />
            <div className="flex w-full items-center justify-end gap-1.5 sm:w-fit sm:gap-2">
              <Button disabled={isLoading} type="submit" size="sm">
                {actionButton}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => {
                  if (initialData) {
                    setOpen(true);
                  } else {
                    router.back();
                  }
                }}
              >
                {secondActionButton}
              </Button>
            </div>
          </div>

          <Separator className="my-2 sm:my-4" />

          <div className="flex flex-col gap-4 sm:gap-6 md:grid md:grid-cols-2  md:gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isLoading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is Product name. It will be displayed on your admin
                    dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="number"
                      placeholder="Product price"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is Product price. It will be displayed on your admin
                    dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="number"
                      placeholder="Product price"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is Product new price. It will be displayed on your
                    admin dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <div className="space-y-3">
                    <ul className="flex flex-wrap gap-1 rounded-md border-[1px] border-muted px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      {selectedSize.length === 0 && (
                        <li className="px-1.5 py-0.5">Nothing in here</li>
                      )}
                      {selectedSize.map((item) => (
                        <li
                          key={item.id}
                          className="cursor-pointer rounded-md bg-primary px-1.5 py-0.5"
                          onClick={() => onSizeRemoveValue(item.id)}
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>{item.name}</TooltipTrigger>
                              <TooltipContent>
                                Remove {item.name} ?
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </li>
                      ))}
                    </ul>
                    <Select
                      disabled={isLoading}
                      onValueChange={(e) => {
                        field.onChange;
                        onSizeValueChange(e);
                      }}
                    >
                      <SelectTrigger>
                        <h4>Select Any</h4>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select any colors</SelectLabel>
                          {isSizeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <div className="space-y-3">
                    <ul className="flex flex-wrap gap-1 rounded-md border-[1px] border-muted px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      {selectedColor.length === 0 && (
                        <li className="px-1.5 py-0.5">Nothing in here</li>
                      )}
                      {selectedColor.map((item) => (
                        <li
                          key={item.id}
                          className="cursor-pointer rounded-md bg-primary px-1.5 py-0.5"
                          onClick={() => onColorRemoveValue(item.id)}
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>{item.name}</TooltipTrigger>
                              <TooltipContent>
                                Remove {item.name} ?
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </li>
                      ))}
                    </ul>
                    <Select
                      disabled={isLoading}
                      onValueChange={(e) => {
                        field.onChange;
                        onColorValueChange(e);
                      }}
                    >
                      <SelectTrigger>
                        <h4>Select Any</h4>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select any colors</SelectLabel>
                          {isColorOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="isFeatured"
                    />
                  </FormControl>
                  <FormLabel
                    className="space-y-1 leading-none"
                    htmlFor="isFeatured"
                  >
                    <h4>Featured</h4>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="isArchived"
                    />
                  </FormControl>
                  <FormLabel
                    className="space-y-1 leading-none"
                    htmlFor="isArchived"
                  >
                    <h4>Archived</h4>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      typeof="text"
                      placeholder="Product description"
                      {...field}
                      rows={7}
                    />
                  </FormControl>
                  <FormDescription>
                    This is Product description. It will be displayed on your
                    admin dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isLoading}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a stock" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Stock</SelectLabel>
                            {productStockStatus.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      This is Product available stock. It will be displayed on
                      your admin dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {imageAction ? (
                <div className="relative my-8 flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
                  <h4 className="text-center">{imageAction}</h4>
                </div>
              ) : (
                <DragAndDropImage
                  inForm
                  multiple
                  convertToBase64={convertToBase64}
                />
              )}
            </div>

            <div className="col-span-2 mt-4 flex flex-col flex-wrap items-center justify-center gap-2 md:mt-8 md:flex-row md:justify-around md:gap-4">
              {!arrayOfImage
                ? null
                : arrayOfImage.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        width={260}
                        height={260}
                        alt="Product Image"
                        src={image.imageUrl}
                        className="mx-auto aspect-square max-w-[350px] rounded-md"
                      />
                      <Button
                        type="button"
                        size="icon"
                        className={cn(
                          "absolute right-1 top-1",
                          initialData && "hidden",
                        )}
                        disabled={isLoading}
                        onClick={() => removeImage(index)}
                      >
                        <Trash className="size-5" />
                      </Button>
                    </div>
                  ))}
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}
