import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constant";
import Wrapper from "@/components/ui/wrapper";
import NavIcons from "@/components/nav-icons";
import MobileNav from "@/components/mobile-nav";

export default function Navbar() {
  return (
    <nav className="bg-secondary-foreground text-white">
      <Wrapper className="flex items-center justify-center p-2 sm:py-3.5">
        {/* Mobile */}
        <MobileNav />

        <Link className="mr-auto" href="/">
          <Image
            src="/logo/logo-dark.png"
            alt="MyBDmart"
            width={180}
            height={80}
            className="object-contain"
          />
        </Link>
        {/* Desktop */}
        <div className="hidden sm:flex sm:items-center sm:gap-x-4">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path + name}
              href={path}
              className="relative text-sm uppercase text-gray-300 transition-all hover:text-white"
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
