// "use client";

// import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
// import { Separator } from "@/components/ui/separator";
// import {
//   type TProductValidator,
//   ProductValidator,
// } from "@/types/product-validator";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import SubHeading from "@/components/admin/ui/sub-heading";
// import toast from "react-hot-toast";
// // import useImageToBase64 from "@/hooks/use-image-to-base64";
// import { useRouter } from "next/navigation";
// import type { productType, SizeAndColor } from "@/types/admin-product";
// import MainForm from "./main-form";
// import { useState } from "react";

// export type Categories = {
//   id: string;
//   name: string;
// };

// type Props = {
//   initialData: productType | null;
//   sizes: SizeAndColor[];
//   colors: SizeAndColor[];
//   categories: Categories[];
// };

// export default function ProductForm({
//   initialData,
//   sizes,
//   colors,
//   categories,
// }: Props) {
//   const router = useRouter();
//   const productId = initialData?.id;
//   // const { theImage } = useImageToBase64();

//   const [sizeValue, setSizeValue] = useState<SizeAndColor[]>([]);
//   const [colorValue, setColorValue] = useState<SizeAndColor[]>([]);

//   const form = useForm<TProductValidator>({
//     resolver: zodResolver(ProductValidator),
//     defaultValues: {
//       name: initialData?.name || "",
//       images: initialData?.images || [],
//       price: String(initialData?.price) || "",
//       newPrice: String(initialData?.newPrice) || "",
//       sizeId: initialData?.sizes || [],
//       colorId: initialData?.colors,
//       categoryId: initialData?.category || "",
//       isFeatured: initialData?.isFeatured || false,
//       isArchived: initialData?.isArchived || false,
//       description: initialData?.description || "",
//     },
//   });

//   const actionButton = initialData ? "Update" : "Create";
//   const secondActionButton = initialData ? "Delete" : "Cancel";
//   const isFormLoading =
//     form.formState.isLoading ||
//     form.formState.isValidating ||
//     form.formState.isSubmitting;
//   const isSizes = initialData ? initialData.sizes : [];
//   const isColors = initialData ? initialData.colors : [];
//   // const isImage = initialData ? initialData.images : [];

//   const isProductLoading = false; // demo
//   const isLoading = isFormLoading || isProductLoading;

//   console.log(sizeValue, colorValue, "sizeValue, colorValue");

//   const onSubmit = (data: TProductValidator) => {
//     console.log("The data is : ", data);
//     toast.error("Submit button clicked");

//     console.log("The blah is : ", sizeValue, colorValue);

//     // if (!productId || !initialData) {
//     //   if (!theImage) {
//     //     toast.error("Image is required");
//     //     return;
//     //   }
//     //   return;
//     // }
//   };

//   return (
//     <main>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <div className="flex flex-col items-start justify-between gap-1.5 sm:flex-row md:items-center">
//             <SubHeading
//               title="Products"
//               subtitle="Manage product for your store."
//             />

//             <div className="flex w-full items-center justify-end gap-1.5 sm:w-fit sm:gap-2">
//               <Button
//                 // disabled={isFormLoading || isLoading}
//                 type="submit"
//                 size="sm"
//               >
//                 {actionButton}
//               </Button>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => {
//                   if (initialData) {
//                     if (!productId) return;
//                     // deleteProductMutate({ id: productId });
//                     return;
//                   } else {
//                     router.push("/admin/settings");
//                   }
//                 }}
//               >
//                 {secondActionButton}
//               </Button>
//             </div>
//           </div>

//           <Separator className="my-2 sm:my-4" />

//           {/* <MainForm
//             form={form}
//             isLoading={isLoading}
//             categories={categories}
//             sizes={sizes}
//             colors={colors}
//             setSizeValue={setSizeValue}
//             setColorValue={setColorValue}
//             isSizes={isSizes}
//             isColors={isColors}
//           /> */}
//         </form>
//       </Form>
//     </main>
//   );
// }
