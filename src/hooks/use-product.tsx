import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useProduct() {
  const router = useRouter();

  const { mutate: createProductMutate, isLoading: createIsLoading } =
    api.product.createProduct.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to create product");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to create product!");
          return;
        }

        toast.error("Failed to create product");
      },
      onSuccess: () => {
        toast.success("Product created successfully!");
        router.push("/admin/settings?tab=products");
      },
    });

  const { mutate: deleteProductMutate, isLoading: deleteIsLoading } =
    api.product.deleteProduct.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to delete product");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to delete product!");
          return;
        }

        toast.error("Failed to delete product");
      },
      onSuccess: () => {
        toast.success("Product deleted successfully!");
        router.push("/admin/settings?tab=products");
      },
    });

  // const { mutate: updateProductMutate, isLoading: updateIsLoading } =
  //   api.product.updateProduct.useMutation({
  //     onError: (error) => {
  //       if (error.data?.code === "UNAUTHORIZED") {
  //         toast.error("login to update product");
  //         return;
  //       }
  //       if (error.data?.code === "FORBIDDEN") {
  //         toast.error("You are not allowed to update product!");
  //         return;
  //       }

  //       toast.error("Failed to update product");
  //     },
  //     onSuccess: () => {
  //       toast.success("Product updated successfully!");
  //       router.push("/admin/settings");
  //     },
  //   });

  const isProductLoading = createIsLoading || deleteIsLoading;
  // || updateIsLoading;

  return {
    createProductMutate,
    deleteProductMutate,
    // updateProductMutate,
    isProductLoading,
  };
}
