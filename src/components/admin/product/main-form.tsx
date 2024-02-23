/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";

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
import type { SizeAndColor } from "@/types/admin-product";
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
import { type Categories } from "./product-form";
import useImageToBase64 from "@/hooks/use-image-to-base64";
import useProductSize from "@/hooks/use-product-size";
import useProductColor from "@/hooks/use-product-color";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, type Dispatch, type SetStateAction } from "react";

type Props = {
  form: any;
  isLoading: boolean;
  categories: Categories[];
  sizes: SizeAndColor[];
  colors: SizeAndColor[];
  isSizes: SizeAndColor[];
  isColors: SizeAndColor[];
  setSizeValue: Dispatch<SetStateAction<SizeAndColor[]>>;
  setColorValue: Dispatch<SetStateAction<SizeAndColor[]>>;
};

export default function MainForm({
  form,
  isLoading,
  categories,
  sizes,
  colors,
  isColors,
  isSizes,
  setSizeValue,
  setColorValue,
}: Props) {
  const { covertToBase64, theImage } = useImageToBase64();
  const { selectedSize, isSizeOptions, onSizeValueChange, onSizeRemoveValue } =
    useProductSize({ options: sizes });
  const {
    selectedColor,
    isColorOptions,
    onColorValueChange,
    onColorRemoveValue,
  } = useProductColor({ options: colors });

  useEffect(() => {
    setSizeValue(selectedSize);
    setColorValue(selectedColor);
  }, [selectedSize, selectedColor, setSizeValue, setColorValue]);

  const notEmptyIsSizes = isSizes.length > 0;
  const notEmptyIsColors = isColors.length > 0;

  const arrayOfSize = notEmptyIsSizes ? isSizes : selectedSize;
  const arrayOfColor = notEmptyIsColors ? isColors : selectedColor;

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
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
              This is Product new price. It will be displayed on your admin
              dashboard.
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
                {arrayOfSize.length === 0 && (
                  <li className="px-1.5 py-0.5">Nothing in here</li>
                )}
                {arrayOfSize.map((item) => (
                  <li
                    key={item.id}
                    className="cursor-pointer rounded-md bg-primary px-1.5 py-0.5"
                    onClick={() => onSizeRemoveValue(item.id)}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{item.name}</TooltipTrigger>
                        <TooltipContent>Remove {item.name} ?</TooltipContent>
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
                value={field.value}
                defaultValue={field.value}
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
                {arrayOfColor.length === 0 && (
                  <li className="px-1.5 py-0.5">Nothing in here</li>
                )}
                {arrayOfColor.map((item) => (
                  <li
                    key={item.id}
                    className="cursor-pointer rounded-md bg-primary px-1.5 py-0.5"
                    onClick={() => onColorRemoveValue(item.id)}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{item.name}</TooltipTrigger>
                        <TooltipContent>Remove {item.name} ?</TooltipContent>
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
                value={field.value}
                defaultValue={field.value}
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

      {/* <FormField
        control={form.control}
        name="colors"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Color</FormLabel>
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
                    placeholder="Select a color"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {colors.map((color) => (
                  <SelectItem key={color.id} value={color.id}>
                    {color.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      /> */}

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
            <FormLabel className="space-y-1 leading-none" htmlFor="isFeatured">
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
            <FormLabel className="space-y-1 leading-none" htmlFor="isArchived">
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
              This is Product description. It will be displayed on your admin
              dashboard.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <DragAndDropImage
        imageUrl={theImage as string}
        covertToBase64={covertToBase64}
        inForm
        multiple
      />
    </div>
  );
}
