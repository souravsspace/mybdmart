import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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

export default function DropdownMulti({ options }: Props) {
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ul className="flex flex-wrap gap-1 rounded-md border-[1px] border-muted px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
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
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-[280px]">
        <DropdownMenuLabel>Select Value</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem></DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
