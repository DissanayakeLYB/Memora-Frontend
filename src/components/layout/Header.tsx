"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

/**
 * Header — Clean navigation for service intake site
 * Minimal, premium feel with clear CTA
 */
export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Don't show the request button if already on request page
  const isRequestPage = pathname === ROUTES.REQUEST;
  const isThankYouPage = pathname === ROUTES.THANK_YOU;

  const navLinks = [{ href: "/#how-it-works", label: "How it works" }];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2.5 group">
            <Image
              src="/resources/Memora-logo.png"
              alt="Memora"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors">
              Memora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === ROUTES.HOME && pathname === "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* CTA Button */}
            {!isRequestPage && !isThankYouPage && (
              <Link href={ROUTES.REQUEST}>
                <Button size="sm" className="gap-2">
                  Request Photos
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container-wide py-4 space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {!isRequestPage && !isThankYouPage && (
              <div className="pt-3 border-t border-border">
                <Link
                  href={ROUTES.REQUEST}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full gap-2">
                    Request Photos
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
