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
import { copyText, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";

export type billboardType = {
  id: string;
  name: string;
  active: boolean;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export const billboardColumn: ColumnDef<billboardType>[] = [
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
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.imageUrl}
        alt={row.original.name}
        width={100}
        height={100}
        className="rounded-md"
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => (
      <div className="capitalize"> {formatDate(row.original.createdAt)}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.original.updatedAt)}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const billboard = row.original;
      const { mutate } = api.billboard.updateBillboardActive.useMutation({
        onSuccess: () => {
          toast.success("Billboard updated");
        },
        onError: () => {
          toast.error("Something went wrong, please try again later.");
        },
      });

      const updateBilloardActive = (id: string, active: boolean) => {
        mutate({ id, active });
      };

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
                await copyText(billboard.id);
                toast.success("billboard ID copied to clipboard");
              }}
            >
              Copy billboard ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/settings/billboards/${billboard.id}`}>
                View billboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <div className="flex items-center space-x-2">
                <Switch
                  id="billboardSwither"
                  checked={billboard.active}
                  onCheckedChange={(e) => {
                    updateBilloardActive(billboard.id, e);
                  }}
                />
                <Label htmlFor="billboardSwither">
                  {billboard.active ? "Active" : "Set Billboard"}
                </Label>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
