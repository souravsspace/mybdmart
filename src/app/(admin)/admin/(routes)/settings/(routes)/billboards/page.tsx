import SubHeading from "@/components/admin/ui/sub-heading";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function BillboardsPage() {
  return (
    <main>
      <div className="flex items-center justify-between gap-1.5">
        <SubHeading
          title="Billboards"
          subtitle="Manage billboard for your store."
        />

        <Link
          href="/admin/settings/billboards/new"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New
        </Link>
      </div>

      <Separator className="my-2 sm:my-4" />
    </main>
  );
}
