import Image from "next/image";

export type SalesProps = {
  name: string;
  email: string;
  saleAmount: string;
};

export default function SalesCard(props: SalesProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full bg-gray-100 p-1">
          <Image width={200} height={200} src="/no-image.png" alt="avatar" />
        </div>
        <div className="text-sm">
          <p>{props.name}</p>
          <div className="w-[120px] overflow-hidden text-ellipsis whitespace-nowrap  text-muted-foreground  sm:w-auto">
            {props.email}
          </div>
        </div>
      </section>
      <p>{props.saleAmount}</p>
    </div>
  );
}
