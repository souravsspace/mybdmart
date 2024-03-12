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
import { cn, copyText } from "@/lib/utils";
import toast from "react-hot-toast";
import { ROLE } from "@prisma/client";
import updateUserRole from "@/actions/update-user-role";

export type UserType = {
  id: string;
  username: string;
  email: string;
  verified: Date | null;
  role: ROLE;
};

export const UserColumn: ColumnDef<UserType>[] = [
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
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.original.username}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.original.email}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const USER_ROLE = row.original.role;

      const onUpdateOrderRole = async (id: string, role: ROLE) => {
        try {
          toast.loading("Updating user role...");
          await updateUserRole(id, role);
          toast.remove();
          toast.success("User role updated successfully!");
        } catch (error) {
          toast.error("Failed to update user role!");
        }
      };
      return (
        <div
          className={cn("w-fit rounded-lg px-4 py-2 font-medium capitalize", {
            "bg-red-200 dark:bg-primary": USER_ROLE === ROLE.ADMIN,
            "bg-blue-200 dark:bg-blue-600": USER_ROLE === ROLE.MOD,
            "bg-green-200 dark:bg-green-600": USER_ROLE === ROLE.USER,
          })}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h4 className="cursor-pointer uppercase">{USER_ROLE}</h4>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="cursor-pointer uppercase"
            >
              {Object.values(ROLE).map((role) => (
                <DropdownMenuItem
                  key={role}
                  onClick={async () => {
                    try {
                      toast.loading("Updating order role...");
                      await onUpdateOrderRole(row.original.id, role);
                      toast.remove();
                      toast.success("Order role updated successfully");
                    } catch (error) {
                      toast.error("Failed to update order role");
                    }
                  }}
                  className={cn(
                    role == USER_ROLE ? "bg-gray-300 dark:bg-gray-700" : "",
                  )}
                >
                  {role}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
  {
    accessorKey: "verified",
    header: "Verified",
    cell: ({ row }) => (
      <div
        className={cn(
          "w-fit rounded-lg px-4 py-2 font-medium capitalize",
          row.original.verified == null || undefined
            ? "bg-red-200 dark:bg-primary"
            : "bg-green-200 dark:bg-green-600",
        )}
      >
        {row.original.verified ? "Yes" : "No"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

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
                await copyText(user.id);
                toast.success("User-ID copied to clipboard");
              }}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await copyText(user.email);
                toast.success("User-Email copied to clipboard");
              }}
            >
              Copy Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
