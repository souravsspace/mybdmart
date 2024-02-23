import { useState } from "react";

export default function useMultipleValue() {
  const [array, setArray] = useState<string[]>([]);

  return {
    array,
    setArray,
  };
}
