import SizeDataTable from "@/components/admin/size/data-table";
import SubHeading from "@/components/admin/ui/sub-heading";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import { Plus } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function SizePage() {
  const size = await api.size.getAllSize.query();

  return (
    <main>
      <div className="flex flex-col items-start justify-between gap-1.5 sm:flex-row md:items-center">
        <SubHeading title="Sizes" subtitle="Manage size for your store." />

        <div className="flex w-full items-center justify-end gap-1.5 sm:w-fit sm:gap-2">
          <Link
            href="/admin/settings/sizes/new"
            className={buttonVariants({
              size: "sm",
            })}
          >
            <Plus className="mr-1.5 h-5 w-5" />
            Add New
          </Link>
          <Link
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
            })}
            href="/admin/settings"
          >
            Back
          </Link>
        </div>
      </div>

      <Separator className="my-2 sm:my-4" />

      <div>
        <SizeDataTable data={size} searchInput="name" />
      </div>
    </main>
  );
}
