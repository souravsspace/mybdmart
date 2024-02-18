import Link from "next/link";

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
    name: "Shoes",
    href: "/products/shoes",
  },
] as const;

export default function ProductBreadcrumb() {
  return (
    <ol className="flex items-center space-x-2">
      {BREADCRUMBS.map((breadcrumb, index) => (
        <li key={breadcrumb.href + breadcrumb.id}>
          <div className="flex items-center text-sm">
            <Link
              href={breadcrumb.href}
              className="text-sm font-medium text-muted-foreground hover:text-gray-900"
            >
              {breadcrumb.name}
            </Link>

            {index !== BREADCRUMBS.length - 1 ? (
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
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
