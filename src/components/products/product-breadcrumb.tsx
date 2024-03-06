import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  categoryName: string;
};

export default function ProductBreadcrumb({ categoryName }: Props) {
  const BREADCRUMBS = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    {
      id: 2,
      name: "Products",
      href: "/products",
    },
    {
      id: 3,
      name: `${categoryName}`,
      href: `/products?sort=${categoryName.toLowerCase()}`,
    },
  ] as const;

  return (
    <ol className="flex items-center space-x-2">
      {BREADCRUMBS.map((breadcrumb, index) => (
        <li key={breadcrumb.href + breadcrumb.id}>
          <div className="flex items-center text-sm">
            <Link
              href={breadcrumb.id === 3 ? "" : breadcrumb.href}
              className={cn(
                "text-sm font-medium text-muted-foreground",
                breadcrumb.id === 3 ? "cursor-not-allowed" : "cursor-pointer",
              )}
            >
              {breadcrumb.name}
            </Link>

            {index !== BREADCRUMBS.length - 1 ? (
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="ml-2 h-5 w-5 flex-shrink-0 text-muted-foreground"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
