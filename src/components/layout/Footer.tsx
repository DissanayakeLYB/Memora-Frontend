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
            <span className="text-muted-foreground text-sm">Cherish your memories</span>
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

          
        </div>
      </div>
    </footer>
  );
}

