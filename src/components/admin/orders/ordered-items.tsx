"use client";

import { type SizeAndColor } from "@/types/admin-product";
import { type DeliveryAddress } from "@prisma/client";
import { useEffect, useState } from "react";
import { IoPricetagOutline } from "react-icons/io5";
import { BiTagAlt } from "react-icons/bi";
import { englishToBanglaNumber, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export type OrderItemsType = {
  id: string;
  sizes: SizeAndColor[];
  colors: SizeAndColor[];
  charge: number | undefined;
  total: number | undefined;
  ItemQuantity: number | undefined;
  productName: string | undefined;
  productPrice: number | undefined;
  productQuantity: number | undefined;
  productId: string | null;
};

type Props = {
  address: DeliveryAddress;
  data: OrderItemsType[];
};

export default function OrderedItems({ data, address }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleInvoice = () => {
    // TODO: Add invoice download functionality
    toast.success("Invoice downloaded successfully");
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      <section className="p-2 shadow-md dark:shadow-gray-700/80 sm:p-4">
        <ProductHeading name="Products" isProduct />
        <hr className="my-3" />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data.map((item) => {
            const productQuantity = item.productQuantity as number;
            const productPrice = item.productPrice as number;
            const productTotal = formatPrice(productPrice * productQuantity);

            return (
              <div key={item.id} className="rounded-md border-2 p-3">
                <h4 className="text-xs text-muted-foreground">
                  Product Id: {item.productId}
                </h4>
                <h3 className="text-lg font-medium capitalize">
                  {item.productName}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground sm:gap-3">
                  <h4 className="text-sm">
                    {item.sizes.map((size) => size.name).join(", ")}
                  </h4>
                  <span> - </span>
                  <h4 className="text-sm">
                    {item.colors.map((color) => color.name).join(", ")}
                  </h4>
                </div>
                <h4 className="font-medium">
                  {englishToBanglaNumber(productQuantity)} x{" "}
                  {formatPrice(productPrice)} = {productTotal}
                </h4>
              </div>
            );
          })}
        </div>
      </section>

      <section className="p-2 shadow-md dark:shadow-gray-700/80 sm:p-4">
        <ProductHeading name="Shipping Info" isProduct={false} />
        <hr className="my-3" />
        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="flex w-full flex-1 flex-col gap-2 text-muted-foreground">
            <h2 className="text-lg font-semibold dark:text-white">
              Contact Info
            </h2>
            <h4>Name: {address.name}</h4>
            <h4>Email: {address.email}</h4>
            <h4>Number: {address.phoneNumber}</h4>
            <h4>City: {address.city}</h4>
            <h4>Zip: {address.zip}</h4>
            <h4>Full Address: {address.address}</h4>
            {address.additionalInfo ? (
              <h4>Additional Info: {address.additionalInfo}</h4>
            ) : null}
            <h4>Inside Dhaka: {address.insideDhaka ? "Yes" : "No"}</h4>
          </div>
          <div className="flex w-full flex-1 flex-col gap-2 sm:gap-4">
            <h4 className="text-sm text-muted-foreground">
              Delivery Charge: {formatPrice(data[0]?.charge as number)}
            </h4>
            <h2 className="mt-2 text-center text-lg font-semibold dark:text-white sm:mt-0 sm:text-start">
              Total Cost:
              <span className="ml-2">
                {formatPrice(data[0]?.total as number)}
              </span>
            </h2>
            <Button
              className="w-full"
              variant="secondary"
              onClick={handleInvoice}
              disabled
            >
              Download Invoice (Coming Soon)
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

type ProductHeading = {
  name: string;
  isProduct: boolean;
};

function ProductHeading({ name, isProduct }: ProductHeading) {
  return (
    <div className="flex items-center gap-2">
      {isProduct ? (
        <IoPricetagOutline className="mr-2 size-6" />
      ) : (
        <BiTagAlt className="mr-2 size-6" />
      )}
      <h1 className="text-xl font-semibold">{name}</h1>
    </div>
  );
}
