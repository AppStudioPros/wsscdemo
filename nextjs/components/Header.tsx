"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#ai-features" },
    { label: "Demo", href: "#chatbot" },
    { label: "Technology", href: "#tech-stack" },
    { label: "ROI", href: "#roi" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Mobile: Floating hamburger icon only */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2"
              data-testid="mobile-menu-button"
              aria-label="Open menu"
              style={{ color: '#ffffff' }}
            >
              <Menu className="h-7 w-7" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <SheetTitle className="text-2xl font-bold text-[#0066CC] mb-8">
              Menu
            </SheetTitle>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left px-4 py-3 text-lg font-medium text-gray-700 hover:text-[#0066CC] hover:bg-gray-50 rounded-lg transition-colors"
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Full header bar */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a
                href="#"
                className="text-2xl font-bold text-[#0066CC]"
                data-testid="header-logo"
              >
                WSSC Water
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-[#0066CC] font-medium transition-colors"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
