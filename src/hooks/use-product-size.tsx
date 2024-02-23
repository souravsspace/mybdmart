"use client";

import { useState } from "react";

type Option = {
  id: string;
  name: string;
  value: string;
};

type useProductSizeProps = {
  options: Option[];
};

export default function useProductSize({ options }: useProductSizeProps) {
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [isSizeOptions, setIsSizeOptions] = useState<Option[]>(options);

  const onSizeValueChange = (value: string) => {
    const find = selectedSize.find((item) => item === value);

    if (find) {
      setSelectedSize(selectedSize.filter((item) => item !== value));

      const optionToAddBack = options.find((option) => option.value === value);
      if (optionToAddBack) {
        setIsSizeOptions([...isSizeOptions, optionToAddBack]);
      }
    } else {
      setSelectedSize([...selectedSize, value]);
      setIsSizeOptions(
        isSizeOptions.filter((option) => option.value !== value),
      );
    }
  };

  const onSizeRemoveValue = (value: string) => {
    setSelectedSize(selectedSize.filter((item) => item !== value));

    const optionToAddBack = options.find((option) => option.value === value);
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
