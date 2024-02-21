import ProductsDataTable from "@/components/admin/product/data-table";
import SubHeading from "@/components/admin/ui/sub-heading";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import { type productType } from "@/types/admin-product";
import { Plus } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function ProductsPage() {
  const products = await api.product.getAllProducts.query();

  const filteredProduct: productType[] = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      newPrice: product.newPrice,
      description: product.description,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      updatedAt: product.updatedAt,
      category: product.category?.name,
      size: product.size?.value,
      color: product.color?.value,
      images: product.images.map((image) => {
        return {
          imageUrl: image.imageUrl,
        };
      }),
    };
  });

  return (
    <main>
      <div className="flex flex-col items-start justify-between gap-1.5 sm:flex-row md:items-center">
        <SubHeading
          title="Products"
          subtitle="Manage product for your store."
        />

        <div className="flex w-full items-center justify-end gap-1.5 sm:w-fit sm:gap-2">
          <Link
            href="/admin/settings/new"
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
        <ProductsDataTable data={filteredProduct} searchInput="name" />
      </div>
    </main>
  );
}
