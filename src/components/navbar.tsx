"use client";

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, Wallet } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: "#", label: "News" },
  { href: "#", label: "Markets" },
  { href: "#", label: "DeFi" },
  { href: "#", label: "NFTs" },
  { href: "#", label: "Learn" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 ml-10 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Wallet className="mr-2 h-4 w-4"/>
                    Connect Wallet
                </Button>
            </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="p-4">
                  <Logo />
                  <div className="mt-8 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <Link key={link.label} href={link.href} className="text-lg text-muted-foreground transition-colors hover:text-primary">
                            {link.label}
                        </Link>
                    ))}
                  </div>
                  <div className="mt-8 space-y-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search..." className="pl-10" />
                    </div>
                     <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Wallet className="mr-2 h-4 w-4"/>
                        Connect Wallet
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
