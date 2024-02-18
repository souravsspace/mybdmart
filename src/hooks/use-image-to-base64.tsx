import { type ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export default function useImageToBase64() {
  const [theImage, setTheImage] = useState<string | ArrayBuffer | null>(null);

  function covertToBase64(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      toast.error("Image is required");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result;
      setTheImage(base64);
    };
    reader.onerror = () => {
      throw new Error("Failed to convert image to base64");
    };
  }
  return {
    covertToBase64,
    theImage,
  };
}
