"use client";

import Wrapper from "@/components/ui/wrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Hero() {
  return (
    <Wrapper>
      <section>
        <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high-quality{" "}
            <span className="text-red-600">digital assets</span>.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            Welcome to MyBDmart. Every asset on our platform is verified by
            our team to ensure our highest quality standards.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
