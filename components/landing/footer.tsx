"use client";

import Link from "next/link";
import { ScaleIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-black backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-8 p-3 md:flex-row">
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center p-2 rounded-lg bg-green-500/10 ring-1 ring-green-500/20">
              <ScaleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">
                G.R.E.G
              </span>
              <span className="text-xs text-muted-foreground">
                AI-Powered Legal Assistant
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {/* <Link
              href="/features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link> */}
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
          </nav>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-1 text-sm md:items-end">
            <div className="text-muted-foreground">
              © {new Date().getFullYear()} G.R.E.G
            </div>
            <div className="text-xs text-muted-foreground/70">
              All rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
