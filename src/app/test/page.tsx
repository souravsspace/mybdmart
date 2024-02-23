"use client";

import Wrapper from "@/components/ui/wrapper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelect from "./_components/multiple-select";
import DropdownMulti from "./_components/dropdown-multi";

const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export default function TestPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-white p-4 text-black dark:bg-black dark:text-white">
      <Wrapper>
        {/* <h1 className="text-center text-3xl font-semibold">Single Select</h1> */}
        {/* <div className="mt-6 max-w-[280px]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div> */}

        <h1 className="mt-6 text-center text-3xl font-semibold sm:mt-12">
          My Version - Multi Select
        </h1>
        <div className="mt-6 max-w-[280px] sm:mt-12">
          <MultipleSelect options={colourOptions} />
          {/* <DropdownMulti options={colourOptions} /> */}
        </div>

        {/* <h1 className="mt-6 text-center text-3xl font-semibold sm:mt-12">
          Multi Select
        </h1>
        <div className="mt-6 max-w-[280px] sm:mt-12">
          <ReactMultiSelect colourOptions={colourOptions} />
        </div> */}
      </Wrapper>
    </div>
  );
}
