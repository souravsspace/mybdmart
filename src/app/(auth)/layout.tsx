import { type PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto flex h-full w-full items-center justify-center p-2 sm:p-4 md:p-6">
      {children}
    </main>
  );
}
