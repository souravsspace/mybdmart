import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";

type WrapperProps = {
  className?: string;
} & PropsWithChildren;

export default function Wrapper({ children, className }: WrapperProps) {
  return <div className={cn("mx-auto max-w-6xl", className)}>{children}</div>;
}
