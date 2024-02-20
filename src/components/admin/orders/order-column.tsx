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
import { cn, copyText, formatDate, formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";
import { type ORDER_STATUS } from "@prisma/client";

export type OrderedItems = {
  productName: string;
  price: number;
  quantity: number;
};

export type OrderType = {
  id: string;
  totalItems: number;
  totalPrice: number;
  status: ORDER_STATUS;
  orderedItems: OrderedItems[];
  createdAt: Date;
  updatedAt: Date;
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
    accessorKey: "orderedItems",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ordered Items
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const orderedItems: OrderedItems = row.getValue("orderedItems");
      return (
        <ul className="gap gap-y-0.5 capitalize">
          <li className="text-sm font-medium">{orderedItems.productName}</li>
          <li className="text-xs text-gray-500">
            {formatPrice(orderedItems.price)} x {orderedItems.quantity}
          </li>
        </ul>
      );
    },
  },
  {
    accessorKey: "totalItems",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Items
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    accessorKey: "totalPrice",
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
    cell: ({ row }) => <div>{formatPrice(row.getValue("price"))}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => (
      <div className="capitalize"> {formatDate(row.getValue("createdAt"))}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.getValue("updatedAt"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("w-fit rounded-lg px-4 py-2 font-medium capitalize", {
            "bg-orange-200 dark:bg-orange-600":
              row.getValue("status") === "PENDING" ||
              row.getValue("status") === "PROCESSING",
            "bg-green-200 dark:bg-green-600":
              row.getValue("status") === "COMPLETED" ||
              row.getValue("status") === "DELIVERED",
            "bg-red-200 dark:bg-primary":
              row.getValue("status") === "CANCELLED",
            "bg-amber-200 dark:bg-amber-200":
              row.getValue("status") === "REFUNDED",
          })}
        >
          {row.getValue("status")}
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
              onClick={async () => {
                await copyText(payment.id);
                toast.success("Payment ID copied to clipboard");
              }}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            <DropdownMenuItem>Cancel Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
