"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function NavLogo() {
  const { theme } = useTheme();
  const [logoUrl, setLogoUrl] = useState("/logo/logo-light.png");

  useEffect(() => {
    setLogoUrl(
      theme === "dark" ? "/logo/logo-dark.png" : "/logo/logo-light.png",
    );
  }, [theme]);
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
