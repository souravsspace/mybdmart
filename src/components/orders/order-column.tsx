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
import { cn, copyText, formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";
import { type ORDER_STATUS } from "@prisma/client";

export type OrderType = {
  id: string;
  productName: string;
  price: number;
  status: ORDER_STATUS;
  date: string;
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
    header: "ProductName",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.productName}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{formatPrice(row.original.price)}</div>,
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
      const payment = row.original;

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
              // onClick={() => navigator.clipboard.writeText(payment.id)}
              onClick={async () => {
                await copyText(payment.id);
                toast.success("Payment ID copied to clipboard");
              }}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cancel Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
