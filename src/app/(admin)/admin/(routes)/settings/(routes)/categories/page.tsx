import CategoriesDataTable from "@/components/admin/category/data-table";
import SubHeading from "@/components/admin/ui/sub-heading";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import { Plus } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function CategoriesPage() {
  const category = await api.category.getAllCategories.query();

  return (
    <main>
      <div className="flex flex-col items-start justify-between gap-1.5 sm:flex-row md:items-center">
        <SubHeading
          title="Categories"
          subtitle="Manage category for your store."
        />

        <div className="flex w-full items-center justify-end gap-1.5 sm:w-fit sm:gap-2">
          <Link
            href="/admin/settings/categories/new"
            className={buttonVariants()}
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New
          </Link>
          <Link
            className={buttonVariants({
              variant: "secondary",
            })}
            href="/admin/settings"
          >
            Back
          </Link>
        </div>
      </div>

      <Separator className="my-2 sm:my-4" />

      <div>
        <CategoriesDataTable data={category} searchInput="name" />
      </div>
    </main>
  );
}
