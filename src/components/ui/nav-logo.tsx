"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function NavLogo() {
  const { theme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/logo/logo-dark.png");

  useEffect(() => {
    if (systemTheme === "dark") {
      setLogoUrl("/logo/logo-dark.png");
    }
    if (systemTheme === "light") {
      setLogoUrl("/logo/logo-light.png");
    }
    if (theme === "dark") {
      setLogoUrl("/logo/logo-dark.png");
    }
    if (theme === "light") {
      setLogoUrl("/logo/logo-light.png");
    }

    setIsMounted(true);
  }, [theme, systemTheme]);

  if (!isMounted) return <div className="h-[75px] w-[180px]" />;

  return (
    <Link href="/">
      <Image
        src={logoUrl}
        alt="MyBDmart"
        width={180}
        height={80}
        className="object-contain"
      />
    </Link>
  );
}
