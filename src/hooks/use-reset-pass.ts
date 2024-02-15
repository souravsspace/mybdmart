import sendMail from "@/actions/sendMail";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ZodError } from "zod";

export default function useResetPass() {
  const router = useRouter();

  const { mutate, isLoading: isLoadingForget } = api.resetPass.useMutation({
    onError: (error) => {
      if (error.data?.code === "NOT_FOUND" || "CONFLICT") {
        toast.error("User not found.");
        return;
      }

      if (error instanceof ZodError) {
        toast.error(error.message);
        return;
      }

      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: async ({ sentToEmail }) => {
      try {
        await sendMail({ email: sentToEmail });

        toast.success(`Verification email sent to ${sentToEmail}.`);
        router.push("/forget-password?to=" + sentToEmail);
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });
  return {
    mutate,
    isLoadingForget,
  };
}
