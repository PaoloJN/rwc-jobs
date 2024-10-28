"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";

type NavLink = {
    href: string;
    label: string;
    startsWith?: string;
    exact?: boolean;
    include?: string;
    exclude?: string;
};

// Use the type with the navLinks array
const navLinks: NavLink[] = [];

export function MainNav() {
    const pathname = usePathname();

    return (
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
                <Icons.logo className="h-6 w-6" />
                <span className="hidden font-bold lg:inline-block">{siteConfig.name}</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
                {navLinks?.map(({ href, label, startsWith, exact, include, exclude }) => {
                    const isActive = exact
                        ? pathname === startsWith
                        : (startsWith &&
                              pathname?.startsWith(startsWith) &&
                              (!exclude || !pathname?.startsWith(exclude))) ||
                          (include && pathname?.startsWith(include));

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "transition-colors hover:text-foreground/80",
                                isActive ? "text-foreground" : "text-foreground/60"
                            )}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
