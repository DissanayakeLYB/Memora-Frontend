import Link from "next/link";
import { Heart } from "lucide-react";
import { ROUTES } from "@/lib/constants";

/**
 * Footer — Simple, calming footer
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50">
      <div className="container-wide py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & tagline */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-sm">M</span>
            </div>
            <span className="font-serif text-foreground">Memora</span>
            <span className="text-muted-foreground text-sm">• Cherish your memories</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href={ROUTES.HOME} className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-border">|</span>
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span className="text-border">|</span>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </nav>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
            <span>for your memories</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

