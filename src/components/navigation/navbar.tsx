"use client";

import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constant";
import Wrapper from "@/components/ui/wrapper";
import NavIcons from "@/components/navigation/nav-icons";
import MobileNav from "@/components/navigation/mobile-nav";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme } = useTheme();
  const [logoUrl, setLogoUrl] = useState("/logo/logo-light.png");

  useEffect(() => {
    setLogoUrl(
      theme === "dark" ? "/logo/logo-dark.png" : "/logo/logo-light.png",
    );
  }, [theme]);

  return (
    // sticky left-0 right-0 top-0 z-50
    // <nav className="bg-secondary-foreground text-white">
    <nav className="border-b bg-white dark:bg-gray-950">
      <Wrapper className="flex items-center justify-center p-2 sm:py-3.5">
        {/* Mobile */}
        <MobileNav />

        <Link className="-ml-3.5 mr-auto" href="/">
          <Image
            src={logoUrl}
            alt="MyBDmart"
            width={180}
            height={80}
            className="object-contain"
          />
        </Link>
        {/* Desktop */}
        <div className="hidden md:flex md:items-center md:gap-x-2.5 lg:gap-x-4">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path + name}
              href={path}
              className="relative font-sans text-sm font-medium uppercase text-muted-foreground transition-all hover:text-gray-950 dark:hover:text-gray-200 max-lg:text-xs md:text-xs lg:text-sm"
            >
              {name}

              {/* <span className="absolute bottom-0 left-0 right-0 h-px w-full bg-primary" /> */}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <NavIcons />
        </div>
      </Wrapper>
    </nav>
  );
}
