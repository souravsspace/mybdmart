"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { type ChangeEvent } from "react";
import { RiImageAddFill } from "react-icons/ri";

type Props = {
  imageUrl: string | undefined;
  covertToBase64: (event: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  inForm?: boolean;
};

export default function DragAndDropImage({
  imageUrl,
  covertToBase64,
  multiple = false,
  inForm,
}: Props) {
  return (
    <div className="flex flex-col-reverse items-center gap-2 md:flex-row">
      <div
        className={cn(
          "relative rounded-lg border-2 border-dashed border-gray-300 p-6",
          inForm ? "w-full" : "max-w-[400px]",
        )}
      >
        <input
          type="file"
          // multiple={multiple}
          className="absolute inset-0 z-50 h-full w-full opacity-0"
          onChange={covertToBase64}
        />
        <div className="text-center">
          <RiImageAddFill className="mx-auto h-10 w-10" />

          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <span>Drag and drop</span>
              <span className="text-red-600"> or browse </span>
              <span>to upload</span>
              <input name="file-upload" type="file" className="sr-only" />
            </label>
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, JPEG up to 10MB
          </p>
        </div>
      </div>

      {imageUrl && (
        <Image
          src={imageUrl}
          alt="BillboardImage"
          width={250}
          height={250}
          className="mt-4 max-w-[400px] rounded-lg md:ml-12 md:mt-0"
        />
      )}
    </div>
  );
}
