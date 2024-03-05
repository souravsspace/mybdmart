"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const [logoUrl, setLogoUrl] = useState("/logo/logo-light.png");

  useEffect(() => {
    setLogoUrl(
      theme === "dark" ? "/logo/logo-dark.png" : "/logo/logo-light.png",
    );
  }, [theme]);
  return (
    <Image
      src={logoUrl}
      alt="MyBDmart"
      width={170}
      height={70}
      className="object-contain"
    />
  );
}
