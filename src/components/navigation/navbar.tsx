import Link from "next/link";
import { navLinks } from "@/constant";
import Wrapper from "@/components/ui/wrapper";
import NavIcons from "@/components/navigation/nav-icons";
import MobileNav from "@/components/navigation/mobile-nav";
import NavLogo from "@/components/ui/nav-logo";

export default function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-gray-950">
      <Wrapper className="flex items-center justify-center p-2 sm:py-3.5">
        <MobileNav />
        <Link className="-ml-3.5 mr-auto" href="/">
          <NavLogo />
        </Link>
        <div className="hidden md:flex md:items-center md:gap-x-2.5 lg:gap-x-4">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path + name}
              href={path}
              className="relative font-sans text-sm font-medium uppercase text-muted-foreground transition-all hover:text-gray-950 dark:hover:text-gray-200 max-lg:text-xs md:text-xs lg:text-sm"
            >
              {name}
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
