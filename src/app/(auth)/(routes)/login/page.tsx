import Link from "next/link";
import Logo from "@/components/ui/logo";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <main className="h-full w-full">
      <Link href="/">
        <Logo />
      </Link>

      <div className="relative flex flex-col items-center justify-center pt-20 sm:container lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 rounded-md px-2 sm:w-[350px] sm:px-6 sm:py-8 sm:shadow-xl">
          <div className="flex flex-col items-center space-y-1 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to your account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/register"
            >
              Don&apos;t have an account? Register
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
