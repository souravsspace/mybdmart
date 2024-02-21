import { type ColumnDef } from "@tanstack/react-table";
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
import {
  cn,
  copyText,
  // formatDate,
  formatPrice,
} from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { type productType } from "@/types/admin-product";
import Image from "next/image";

export const productColumn: ColumnDef<productType>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
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
    accessorKey: "newPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          New Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{formatPrice(row.original.newPrice || 0)}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.category}</div>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => <div className="capitalize">{row.getValue("size")}</div>,
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => <div className="capitalize">{row.original.color}</div>,
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => (
      <div className="grid gap-1">
        {row.original.images.map((img) => {
          return (
            <Image
              key={img.imageUrl}
              src={img.imageUrl}
              alt="product image"
              width={80}
              height={80}
            />
          );
        })}
      </div>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Featured
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isFeatured: boolean = row.original.isFeatured;

      return (
        <div
          className={cn(
            "w-fit rounded-lg px-4 py-2 font-medium capitalize",
            isFeatured
              ? "bg-green-200 dark:bg-green-600"
              : "bg-red-200 dark:bg-primary",
          )}
        >
          {isFeatured}
        </div>
      );
    },
  },
  {
    accessorKey: "isArchived",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Archived
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isArchived: boolean = row.original.isArchived;

      return (
        <div
          className={cn(
            "w-fit rounded-lg px-4 py-2 font-medium capitalize",
            isArchived
              ? "bg-green-200 dark:bg-green-600"
              : "bg-red-200 dark:bg-primary",
          )}
        >
          {isArchived}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "updatedAt",
  //   header: "UpdatedAt",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{formatDate(row.getValue("updatedAt"))}</div>
  //   ),
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
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
                await copyText(product.id);
                toast.success("product ID copied to clipboard");
              }}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/settings/${product.id}`}>View product</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
