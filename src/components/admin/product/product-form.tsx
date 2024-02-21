import type { SizeAndColor, productType } from "@/types/admin-product";

type Categories = {
  id: string;
  name: string;
};

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
  return <>TODO</>;
}

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import {
//   type TproductValidator,
//   productValidator,
// } from "@/types/product-validator";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import SubHeading from "@/components/admin/ui/sub-heading";
// import toast from "react-hot-toast";
// import useImageToBase64 from "@/hooks/use-image-to-base64";
// import useProduct from "@/hooks/use-product";
// import DragAndDropImage from "@/components/admin/ui/drag-and-drop-image";
// import { useRouter } from "next/navigation";
// import type { productType, SizeAndColor } from "@/types/admin-product";

// type Categories = {
//   id: string;
//   name: string;
// };

// type Props = {
//   initialData: productType | null;
//   sizes: SizeAndColor[];
//   colors: SizeAndColor[];
//   categories: Categories[];
// };

// export default function ProductForm({ initialData }: Props) {
//   const router = useRouter();

//   const productId = initialData?.id;
//   const { covertToBase64, theImage } = useImageToBase64();
//   const {
//     isProductLoading,
//     createProductMutate,
//     deleteProductMutate,
//     updateProductMutate,
//   } = useProduct();

//   const form = useForm<TproductValidator>({
//     resolver: zodResolver(productValidator),
//     defaultValues: {
//       name: initialData?.name || "",
//     },
//   });

//   const actionButton = initialData ? "Update" : "Create";
//   const secondActionButton = initialData ? "Delete" : "Cancel";
//   const imageUrl = theImage ? (theImage as string) : initialData?.imageUrl;
//   const isFormLoading =
//     form.formState.isLoading ||
//     form.formState.isValidating ||
//     form.formState.isSubmitting;

//   const isLoading = isFormLoading || isProductLoading;

//   const onSubmit = ({ name }: TproductValidator) => {
//     if (!productId || !initialData) {
//       if (!theImage) {
//         toast.error("Image is required");
//         return;
//       }
//       createProductMutate({ name, imageUrl: theImage as string });
//       return;
//     }

//     updateProductMutate({
//       id: productId,
//       name,
//       imageUrl,
//     });
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
//                 disabled={isFormLoading || isLoading}
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
//                     deleteProductMutate({ id: productId });
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

//           <div className="grid gap-6 sm:gap-12">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       className="max-w-96"
//                       placeholder="Product name"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormDescription>
//                     This is Product name. It will be displayed on your admin
//                     dashboard.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <DragAndDropImage
//               imageUrl={imageUrl}
//               covertToBase64={covertToBase64}
//             />
//           </div>
//         </form>
//       </Form>
//     </main>
//   );
// }
