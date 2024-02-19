import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useBillboard() {
  const router = useRouter();

  const { mutate: createBillboardMutate } =
    api.billboard.createBillboard.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to create billboard");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to create billboard!");
          return;
        }

        toast.error("Failed to create billboard");
      },
      onSuccess: () => {
        toast.success("Billboard created successfully!");
        router.push("/admin/settings/billboards");
      },
    });

  const { mutate: deleteBillboardMutate } =
    api.billboard.deleteBillboard.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to delete billboard");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to delete billboard!");
          return;
        }

        toast.error("Failed to delete billboard");
      },
      onSuccess: () => {
        toast.success("Billboard deleted successfully!");
        router.push("/admin/settings/billboards");
      },
    });

  const { mutate: updateBillboardMutate } =
    api.billboard.updateBillboard.useMutation({
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("login to update billboard");
          return;
        }
        if (error.data?.code === "FORBIDDEN") {
          toast.error("You are not allowed to update billboard!");
          return;
        }

        toast.error("Failed to update billboard");
      },
      onSuccess: () => {
        toast.success("Billboard updated successfully!");
        router.push("/admin/settings/billboards");
      },
    });

  return {
    createBillboardMutate,
    deleteBillboardMutate,
    updateBillboardMutate,
  };
}
