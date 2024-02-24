"use client";

import { type SizeAndColor } from "@/types/admin-product";
import { useState } from "react";

type useProductColorProps = {
  options: SizeAndColor[];
};

export default function useProductColor({ options }: useProductColorProps) {
  const [selectedColor, setSelectedColor] = useState<SizeAndColor[]>([]);
  const [isColorOptions, setIsColorOptions] = useState<SizeAndColor[]>(options);

  const onColorValueChange = (value: string) => {
    const find = selectedColor.find((item) => item.value === value);

    if (find) {
      setSelectedColor(selectedColor.filter((item) => item.value !== value));

      const optionToAddBack = options.find((option) => option.value === value);
      if (optionToAddBack) {
        setIsColorOptions([...isColorOptions, optionToAddBack]);
      }
    } else {
      // setSelectedColor([...selectedColor, value]);
      setSelectedColor([
        ...selectedColor,
        options.find((option) => option.value === value)!,
      ]);
      setIsColorOptions(
        isColorOptions.filter((option) => option.value !== value),
      );
    }
  };

  const onColorRemoveValue = (id: string) => {
    setSelectedColor(selectedColor.filter((item) => item.id !== id));
    const optionToAddBack = options.find((option) => option.id === id);
    if (optionToAddBack) {
      setIsColorOptions([...isColorOptions, optionToAddBack]);
    }
  };

  return {
    selectedColor,
    isColorOptions,
    onColorValueChange,
    onColorRemoveValue,
    setSelectedColor,
  };
}
