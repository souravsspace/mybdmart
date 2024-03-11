import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";

export type SalesProps = {
  name: string;
  email: string;
  saleAmount: number;
  image: string | null | undefined;
};

export default function SalesCard(props: SalesProps) {
  return (
    <div className=" flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-full  p-1",
            props.image ? "bg-gray-100" : "bg-gray-50",
          )}
        >
          {props.image ? (
            <Image width={200} height={200} src={props.image} alt="avatar" />
          ) : (
            <div className="h-full w-full rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-xs hover:from-pink-500 hover:to-yellow-500" />
          )}
        </div>
        <div className="text-sm">
          <p>{props.name}</p>
          <div className="w-[120px] overflow-hidden text-ellipsis whitespace-nowrap  text-muted-foreground  sm:w-auto">
            {props.email}
          </div>
        </div>
      </section>
      <p>{formatPrice(props.saleAmount)}</p>
    </div>
  );
}
