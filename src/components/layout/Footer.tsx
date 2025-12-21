import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ROUTES } from "@/lib/constants";

/**
 * Footer — Simple, calming footer for service intake site
 * Premium feel with minimal links
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/50">
      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">

            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              Cherish your memories <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
            </p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href={ROUTES.HOME} className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href={ROUTES.REQUEST} className="hover:text-foreground transition-colors">
              Request Photos
            </Link>
            <Link href={ROUTES.PRIVACY} className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href={ROUTES.TERMS} className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground/70">
            © {currentYear} Memora | By <a href="https://psychdevs.site" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">PsychDevs</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
