import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useColor() {
  const router = useRouter();

  const { mutate: createColorMutate, isLoading: createIsLoading } =
    api.color.createColor.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to create color");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to create color!");
          return;
        }

        toast.error("Failed to create color");
      },
      onSuccess: () => {
        toast.success("Color created successfully!");
        router.push("/admin/settings/colors");
      },
    });

  const { mutate: deleteColorMutate, isLoading: deleteIsLoading } =
    api.color.deleteColor.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to delete color");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to delete color!");
          return;
        }

        toast.error("Failed to delete color");
      },
      onSuccess: () => {
        toast.success("Color deleted successfully!");
        router.push("/admin/settings/colors");
      },
    });

  const { mutate: updateColorMutate, isLoading: updateIsLoading } =
    api.color.updateColor.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to update color");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to update color!");
          return;
        }

        toast.error("Failed to update color");
      },
      onSuccess: () => {
        toast.success("Color updated successfully!");
        router.push("/admin/settings/colors");
      },
    });

  const isColorLoading = createIsLoading || deleteIsLoading || updateIsLoading;

  return {
    createColorMutate,
    deleteColorMutate,
    updateColorMutate,
    isColorLoading,
  };
}
