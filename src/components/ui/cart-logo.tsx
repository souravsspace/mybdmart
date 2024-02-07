import { ShoppingCart } from "lucide-react";

export function CartLogo() {
  return (
    <div className="relative mx-3.5">
      <ShoppingCart className="h-6 w-6 cursor-pointer" />
      <div className="absolute -top-2 left-5 right-0 flex h-3 w-5 items-center justify-center rounded-full bg-primary p-2 text-xs font-medium">
        <span className="text-white">1</span>
      </div>
    </div>
  );
}
