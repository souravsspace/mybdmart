"use client";

import Link from "next/link";
import Wrapper from "@/components/ui/wrapper";
import { buttonVariants } from "@/components/ui/button";

export default function Hero() {
  return (
    <Wrapper>
      <section>
        <div className="mx-auto flex max-w-3xl flex-col items-center py-8 text-center sm:py-14 md:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high-quality{" "}
            <span className="text-red-600">digital assets</span>.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            Welcome to MyBDmart. Every asset on our platform is verified by our
            team to ensure our highest quality standards.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="#trending-products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Link
              href="/products"
              className={buttonVariants({
                variant: "ghost",
              })}
            >
              Our quality promise &rarr;
            </Link>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
