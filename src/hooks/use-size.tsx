import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useSize() {
  const router = useRouter();

  const { mutate: createSizeMutate, isLoading: createIsLoading } =
    api.size.createSize.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to create size");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to create size!");
          return;
        }

        toast.error("Failed to create size");
      },
      onSuccess: () => {
        toast.success("Size created successfully!");
        router.push("/admin/settings/sizes");
      },
    });

  const { mutate: deleteSizeMutate, isLoading: deleteIsLoading } =
    api.size.deleteSize.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to delete size");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to delete size!");
          return;
        }

        toast.error("Failed to delete size");
      },
      onSuccess: () => {
        toast.success("Size deleted successfully!");
        router.push("/admin/settings/sizes");
      },
    });

  const { mutate: updateSizeMutate, isLoading: updateIsLoading } =
    api.size.updateSize.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to update size");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to update size!");
          return;
        }

        toast.error("Failed to update size");
      },
      onSuccess: () => {
        toast.success("Size updated successfully!");
        router.push("/admin/settings/sizes");
      },
    });

  const isSizeLoading = createIsLoading || deleteIsLoading || updateIsLoading;

  return {
    createSizeMutate,
    deleteSizeMutate,
    updateSizeMutate,
    isSizeLoading,
  };
}
