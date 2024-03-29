import toast from "react-hot-toast";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { cn, copyText, englishToBanglaNumber, formatPrice } from "@/lib/utils";
import { ORDER_STATUS } from "@prisma/client";

type SizeAndColor = {
  name: string;
  value: string;
};

export type OrderType = {
  id: string;
  productName: string[];
  totalItems: number;
  TotalPrice: number;
  status: ORDER_STATUS;
  productPrice: number[];
  productQuantity: number[] | string[];
  date: Date;
  sizes: SizeAndColor[];
  colors: SizeAndColor[];
};

export const OrderColumn: ColumnDef<OrderType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5 capitalize">
        {row.original.productName.map((name, i) => (
          <h4 key={name + i}>
            {i + 1}: {name}
          </h4>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "totalItems",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Products
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{englishToBanglaNumber(row.original.totalItems)}</div>
    ),
  },
  {
    accessorKey: "TotalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{formatPrice(row.original.TotalPrice)}</div>,
  },
  {
    accessorKey: "productPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Products
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5 capitalize">
        {row.original.productQuantity.map((value, i) => (
          <h4 key={i}>
            {englishToBanglaNumber(value as number)} x{" "}
            {formatPrice(row.original.productPrice[i] as number)}
          </h4>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "colors",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size & Color
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2 uppercase">
          {row.original.sizes.map((size, i) => (
            <h4 key={size.value + i} className="size-4">
              {size.value}
            </h4>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {row.original.colors.map((color, i) => (
            <span
              className={`size-4 rounded-full`}
              style={{ backgroundColor: color.value }}
              key={color.value + i}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const rowValue = row.original.status.toUpperCase();
      return (
        <div
          className={cn("w-fit rounded-lg px-4 py-2 font-medium capitalize", {
            "bg-orange-200 dark:bg-orange-600":
              rowValue === "PENDING" || rowValue === "PROCESSING",
            "bg-green-200 dark:bg-green-600": rowValue === "DELIVERED",
            "bg-red-200 dark:bg-primary": rowValue === "CANCELLED",
            "bg-amber-200 dark:bg-amber-200": rowValue === "REFUNDED",
          })}
        >
          {rowValue}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      const over24Hours =
        order.date > new Date(Date.now() - 24 * 60 * 60 * 1000);
      const canCancel = order.status === ORDER_STATUS.PENDING && !over24Hours;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                await copyText(order.id);
                toast.success("Order ID copied to clipboard");
              }}
            >
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {row.original.status === ORDER_STATUS.PENDING && (
              <DropdownMenuItem disabled={canCancel} className="cursor-pointer">
                Cancel Order
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
