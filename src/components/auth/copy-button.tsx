"use client";

import { Button } from "@/components/ui/button";
import { copyText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  text: string | string[];
};

export default function CopyButton({ text }: Props) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        try {
          await copyText(text as string);
          toast.success("Copied to clipboard!");
          setTimeout(() => {
            router.push("/login");
          }, 500);
        } catch (error) {
          toast.error("Could not copy to clipboard.");
        }
      }}
    >
      Copy Password
    </Button>
  );
}
