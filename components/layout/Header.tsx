import Link from "next/link";
import { Wrench } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { getSiteConfig } from "@/lib/seo";

export function Header() {
  const { name } = getSiteConfig();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground focus-ring rounded-lg"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wrench className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>{name}</span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Navigasi utama">
          <Link
            href="/tools"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-ring rounded"
          >
            Alat
          </Link>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-ring rounded"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-ring rounded"
          >
            Tentang
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
