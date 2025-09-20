"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { socialLinks } from "@/data/socials";
import { otherPages, projectPages, blogItems } from "@/data/menu";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation/Navigation";
import { useHeader } from "@/components/providers/HeaderProvider";

interface MenuItem {
  id: string;
  label?: string;
  title?: string;
  href?: string;
  links?: MenuItem[];
  type?: string;
  columns?: number;
  image?: string;
  src?: string;
  alt?: string;
}

// Mobile Menu Component
function MobileMenuItem({
  item,
  isActive,
}: {
  item: MenuItem;
  isActive: (href?: string) => boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.links) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-2 text-left text-gray-700 hover:text-purple-600 font-medium"
        >
          {item.label}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <div className="pl-4 mt-2 space-y-2">
            {item.links.map((subItem) => (
              <Link
                key={subItem.id}
                href={subItem.href || "#"}
                className={cn(
                  "block py-1 text-sm text-gray-600 hover:text-purple-600",
                  isActive(subItem.href) && "text-purple-600 font-medium"
                )}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "block py-2 text-gray-700 hover:text-purple-600 font-medium",
        isActive(item.href) && "text-purple-600"
      )}
    >
      {item.label}
    </Link>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { showTopBanner, isScrolled } = useHeader();
  const pathname = usePathname();

  const isActive = (href?: string) => href === pathname;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300",
        isScrolled ? "shadow-lg" : "shadow-sm"
      )}
    >
      {/* Top Banner */}
      <div
        className={cn(
          "bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center text-sm font-medium transition-all duration-300 ease-in-out overflow-hidden",
          showTopBanner ? "py-2 max-h-20 opacity-100" : "py-0 max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4">
          <p className="mb-0">
            ✨ Already a Best Template!{" "}
            <a
              href="https://dokkooon.com"
              className="text-white hover:text-gray-200 inline-flex items-center underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Grab Your Copy Now
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={cn(
          "bg-white border-b transition-all duration-300",
          !showTopBanner && isScrolled
            ? "border-gray-200"
            : "border-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                Sandbox
              </Link>
            </div>

            {/* Desktop Navigation */}
            <Navigation />

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="https://themeforest.net/item/sandbox-modern-multipurpose-tailwind-css-nextjs-template/57540184"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Purchase Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-4 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Mobile menu items */}
              <div className="space-y-4">
                {/* Demos Section */}
                <div>
                  <button className="w-full flex items-center justify-between py-2 text-left text-gray-700 hover:text-purple-600 font-medium">
                    Demos
                  </button>
                </div>

                {/* Pages Section */}
                <div>
                  <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                    Pages
                  </span>
                  <div className="mt-2 space-y-1">
                    {otherPages.map((item) => (
                      <MobileMenuItem
                        key={item.id}
                        item={item}
                        isActive={isActive}
                      />
                    ))}
                  </div>
                </div>

                {/* Projects Section */}
                <div>
                  <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                    Projects
                  </span>
                  <div className="mt-2 space-y-1">
                    {projectPages.map((section) => (
                      <div key={section.id}>
                        <h6 className="text-sm font-medium text-gray-600 mb-1">
                          {section.title}
                        </h6>
                        <div className="pl-2 space-y-1">
                          {section.links.map((link) => (
                            <Link
                              key={link.id}
                              href={link.href || "#"}
                              className={cn(
                                "block py-1 text-sm text-gray-600 hover:text-purple-600",
                                isActive(link.href) &&
                                  "text-purple-600 font-medium"
                              )}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Blog Section */}
                <div>
                  <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                    Blog
                  </span>
                  <div className="mt-2 space-y-1">
                    {blogItems.map((item) => (
                      <MobileMenuItem
                        key={item.id}
                        item={item}
                        isActive={isActive}
                      />
                    ))}
                  </div>
                </div>

                {/* Blocks Section */}
                <div>
                  <button className="w-full flex items-center justify-between py-2 text-left text-gray-700 hover:text-purple-600 font-medium">
                    Blocks
                  </button>
                </div>

                {/* Documentation Section */}
                <div>
                  <button className="w-full flex items-center justify-between py-2 text-left text-gray-700 hover:text-purple-600 font-medium">
                    Documentation
                  </button>
                </div>
              </div>

              {/* Mobile Social Links */}
              <div className="pt-6 border-t border-gray-200">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">info@email.com</p>
                  <p className="text-sm text-gray-600 mb-4">
                    00 (123) 456 78 90
                  </p>
                </div>
                <div className="flex space-x-4">
                  {socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      style={{ color: link.color }}
                    >
                      <span className="sr-only">{link.icon}</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <circle cx="10" cy="10" r="8" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <a
                href="https://themeforest.net/item/sandbox-modern-multipurpose-tailwind-css-nextjs-template/57540184"
                className="block w-full bg-purple-600 text-white text-center px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Purchase Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
