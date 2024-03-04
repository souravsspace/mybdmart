"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
// import { api } from "@/trpc/react";

export default function Hero() {
  // const { data: billboardImage } = api.billboard.getBilloardByActive.useQuery();

  return (
    <section
      className="relative hidden overflow-hidden bg-primary-foreground bg-cover bg-center bg-no-repeat object-contain md:block"
      // style={{
      //   backgroundImage: `url(${billboardImage?.imageUrl})`,
      // }}
    >
      <div className="mx-auto my-8 flex max-w-2xl flex-col items-center rounded-lg bg-white/90 py-4 text-center shadow-2xl backdrop-blur-3xl sm:my-14 sm:py-6 md:my-20 md:py-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Your marketplace for <br /> high-quality{" "}
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
  );
}
