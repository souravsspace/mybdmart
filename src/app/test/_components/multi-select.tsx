"use client";

import Select from "react-select";

type ColorOption = {
  value: string;
  label: string;
  color: string;
  isFixed?: boolean;
  isDisabled?: boolean;
};

type Props = {
  colorOptions: ColorOption[];
};

export default function ReactMultiSelect({ colorOptions }: Props) {
  return (
    <Select
      defaultValue={[colorOptions[2], colorOptions[3]]}
      isMulti
      name="colors"
      options={colorOptions}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}
