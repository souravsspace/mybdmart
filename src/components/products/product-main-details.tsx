import { formatPrice } from "@/lib/utils";
import { Check } from "lucide-react";

type Props = {
  brand: string;
  name: string;
  description: string;
  price: number;
};

export default function ProductMainDetails({
  brand,
  price,
  description,
}: Props) {
  return (
    <section className="mt-4">
      <div className="flex items-center">
        <p className="font-medium text-gray-900">{formatPrice(price)}</p>

        <div className="ml-4 border-l border-gray-300 pl-4 text-muted-foreground">
          {brand}
        </div>
      </div>

      <div className="mt-4 space-y-6">
        <p className="text-base text-muted-foreground">{description}</p>
      </div>

      <div className="mt-6 flex items-center">
        <Check
          aria-hidden="true"
          className="h-5 w-5 flex-shrink-0 text-green-500"
        />
        <p className="ml-2 text-sm text-muted-foreground">
          Eligible for 4-5 days delivery.
        </p>
      </div>
    </section>
  );
}
