import Link from "next/link";
import { buttonVariants } from "./button";

export default function LoginToView() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-lg">Login to view this page</h1>
      <Link
        href="/login"
        className={buttonVariants({
          variant: "link_foreground",
          className: "text-sm underline",
        })}
      >
        Click here to login.
      </Link>
    </div>
  );
}
