import { type ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

export default function useImageToBase64() {
  const [theImage, setTheImage] = useState<string | null>(null);
  const [theImages, setTheImages] = useState<string[] | null>(null);

  function convertToBase64(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return toast.error("Images are required");
    }

    if (files.length === 1) {
      const file = files[0]!;

      const fileSize = (file.size / (1024 * 1024)).toFixed(2);
      console.log(`Original image size: ${fileSize} mb`);

      const options = {
        maxSizeMB: 1, // Adjust the maximum size in MB as needed
        maxWidthOrHeight: 1920, // Adjust the maximum width or height as needed
      };

      imageCompression(file, options)
        .then((compressedFile) => {
          const compressedFileSize = (
            compressedFile.size /
            (1024 * 1024)
          ).toFixed(2);
          console.log(`Compressed image size: ${compressedFileSize} mb`);

          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);

          reader.onload = () => {
            const base64 = reader.result;
            setTheImage(base64 as string);
          };

          reader.onerror = () => {
            throw new Error("Failed to convert image to base64");
          };
        })
        .catch((error) => {
          console.error("Error compressing image:", error);
        });
    } else {
      const imagesArray: string[] = [];

      Array.from(files).forEach((file) => {
        const options = {
          maxSizeMB: 1, // Adjust the maximum size in MB as needed
          maxWidthOrHeight: 1920, // Adjust the maximum width or height as needed
        };

        imageCompression(file, options)
          .then((compressedFile) => {
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);

            reader.onload = () => {
              const base64 = reader.result;
              if (base64) {
                imagesArray.push(base64 as string);
                if (imagesArray.length === files.length) {
                  setTheImages(imagesArray);
                }
              }
            };

            reader.onerror = () => {
              throw new Error("Failed to convert image to base64");
            };
          })
          .catch((error) => {
            console.error("Error compressing image:", error);
          });
      });
    }
  }

  const removeImage = (index: number) => {
    if (theImages) {
      const newImages = theImages.filter((_, i) => i !== index);
      setTheImages(newImages);
    }
  };

  return {
    theImage,
    theImages,
    removeImage,
    convertToBase64,
    setTheImages,
  };
}

// import { type ChangeEvent, useState } from "react";
// import toast from "react-hot-toast";

// export default function useImageToBase64() {
//   const [theImage, setTheImage] = useState<string | ArrayBuffer | null>(null);
//   const [theImages, setTheImages] = useState<string[] | ArrayBuffer[] | null>(
//     null,
//   );

//   function covertToBase64(event: ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];

//     if (!file) {
//       return toast.error("Image is required");
//     }

//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => {
//       const base64 = reader.result;
//       setTheImage(base64);
//     };
//     reader.onerror = () => {
//       throw new Error("Failed to convert image to base64");
//     };
//   }

//   return {
//     covertToBase64,
//     theImage,
//     theImages,
//   };
// }
