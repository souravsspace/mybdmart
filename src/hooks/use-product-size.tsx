"use client";

import { type SizeAndColor } from "@/types/admin-product";
import { useState } from "react";

type useProductSizeProps = {
  options: SizeAndColor[];
};

export default function useProductSize({ options }: useProductSizeProps) {
  const [selectedSize, setSelectedSize] = useState<SizeAndColor[]>([]);
  const [isSizeOptions, setIsSizeOptions] = useState<SizeAndColor[]>(options);

  const onSizeValueChange = (value: string) => {
    const find = selectedSize.find((item) => item.value === value);

    if (find) {
      setSelectedSize(selectedSize.filter((item) => item.value !== value));

      const optionToAddBack = options.find((option) => option.value === value);
      if (optionToAddBack) {
        setIsSizeOptions([...isSizeOptions, optionToAddBack]);
      }
    } else {
      // setSelectedSize([...selectedSize, value]);
      setSelectedSize([
        ...selectedSize,
        options.find((option) => option.value === value)!,
      ]);
      setIsSizeOptions(
        isSizeOptions.filter((option) => option.value !== value),
      );
    }
  };

  const onSizeRemoveValue = (id: string) => {
    setSelectedSize(selectedSize.filter((item) => item.id !== id));

    const optionToAddBack = options.find((option) => option.id === id);
    if (optionToAddBack) {
      setIsSizeOptions([...isSizeOptions, optionToAddBack]);
    }
  };

  return {
    selectedSize,
    isSizeOptions,
    onSizeValueChange,
    onSizeRemoveValue,
  };
}
