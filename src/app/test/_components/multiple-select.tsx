"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

type ColorOption = {
  value: string;
  label: string;
  color: string;
  isFixed?: boolean;
  isDisabled?: boolean;
};

type Props = {
  options: ColorOption[];
};

export default function MultipleSelect({ options }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isOptions, setIsOptions] = useState<ColorOption[]>(options);

  const onValueChange = (value: string) => {
    const find = selected.find((item) => item === value);

    if (find) {
      setSelected(selected.filter((item) => item !== value));

      const optionToAddBack = options.find((option) => option.value === value);
      if (optionToAddBack) {
        setIsOptions([...isOptions, optionToAddBack]);
      }
    } else {
      setSelected([...selected, value]);
      setIsOptions(isOptions.filter((option) => option.value !== value));
    }
  };

  const removeValue = (value: string) => {
    setSelected(selected.filter((item) => item !== value));

    const optionToAddBack = options.find((option) => option.value === value);
    if (optionToAddBack) {
      setIsOptions([...isOptions, optionToAddBack]);
    }
  };

  console.log("selected", selected);

  return (
    <div className="space-y-3">
      <ul className="flex flex-wrap gap-1 rounded-md border-[1px] border-muted px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        {selected.length === 0 && (
          <li className="px-1.5 py-0.5">Nothing in here</li>
        )}
        {selected.map((item) => (
          <li
            key={item}
            className="cursor-pointer rounded-md bg-primary px-1.5 py-0.5"
            onClick={() => removeValue(item)}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>{item}</TooltipTrigger>
                <TooltipContent>Remove {item} ?</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
      </ul>

      <Select onValueChange={onValueChange}>
        <SelectTrigger>
          <h4>Select Any</h4>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select any colors</SelectLabel>
            {isOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
