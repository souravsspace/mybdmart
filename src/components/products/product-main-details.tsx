import { formatPrice } from "@/lib/utils";
import { type ClientProductType } from "@/types/client-product";
import { Check } from "lucide-react";

type Props = {
  product: ClientProductType;
};

export default function ProductMainDetails({ product }: Props) {
  const { price, description, newPrice, name, categoryName, sell, stock, id } =
    product;

  return (
    <section className="mt-4">
      <div className="flex items-center">
        <p className="text-base font-medium text-primary">
          {newPrice && formatPrice(newPrice)}
          {newPrice ? (
            <span className="ml-2 text-xs text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          ) : (
            <span>{formatPrice(price)}</span>
          )}
        </p>

        <div className="ml-4 border-l border-gray-300 pl-4 text-muted-foreground">
          {categoryName}
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
