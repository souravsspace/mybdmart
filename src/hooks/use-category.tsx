import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useCategory() {
  const router = useRouter();

  const { mutate: createCategoryMutate, isLoading: createIsLoading } =
    api.category.createCategory.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to create category");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to create category!");
          return;
        }

        toast.error("Failed to create category");
      },
      onSuccess: () => {
        toast.success("Category created successfully!");
        router.push("/admin/settings/categories");
      },
    });

  const { mutate: deleteCategoryMutate, isLoading: deleteIsLoading } =
    api.category.deleteCategory.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to delete category");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to delete category!");
          return;
        }
        if (error.data?.code === "PRECONDITION_FAILED") {
          toast.error("The category is being used by a product!");
          return;
        }

        toast.error("Failed to delete category");
      },
      onSuccess: () => {
        toast.success("Category deleted successfully!");
        router.push("/admin/settings/categories");
      },
    });

  const { mutate: updateCategoryMutate, isLoading: updateIsLoading } =
    api.category.updateCategory.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to update category");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to update category!");
          return;
        }

        toast.error("Failed to update category");
      },
      onSuccess: () => {
        toast.success("Category updated successfully!");
        router.push("/admin/settings/categories");
      },
    });

  const isCategoryLoading =
    createIsLoading || deleteIsLoading || updateIsLoading;

  return {
    createCategoryMutate,
    deleteCategoryMutate,
    updateCategoryMutate,
    isCategoryLoading,
  };
}
