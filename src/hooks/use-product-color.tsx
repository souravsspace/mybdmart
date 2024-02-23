"use client";

import { useState } from "react";

type Option = {
  id: string;
  name: string;
  value: string;
};

type useProductColorProps = {
  options: Option[];
};

export default function useProductColor({ options }: useProductColorProps) {
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [isColorOptions, setIsColorOptions] = useState<Option[]>(options);

  const onColorValueChange = (value: string) => {
    const find = selectedColor.find((item) => item === value);

    if (find) {
      setSelectedColor(selectedColor.filter((item) => item !== value));

      const optionToAddBack = options.find((option) => option.value === value);
      if (optionToAddBack) {
        setIsColorOptions([...isColorOptions, optionToAddBack]);
      }
    } else {
      setSelectedColor([...selectedColor, value]);
      setIsColorOptions(
        isColorOptions.filter((option) => option.value !== value),
      );
    }
  };

  const onColorRemoveValue = (value: string) => {
    setSelectedColor(selectedColor.filter((item) => item !== value));

    const optionToAddBack = options.find((option) => option.value === value);
    if (optionToAddBack) {
      setIsColorOptions([...isColorOptions, optionToAddBack]);
    }
  };

  return {
    selectedColor,
    isColorOptions,
    onColorValueChange,
    onColorRemoveValue,
  };
}
