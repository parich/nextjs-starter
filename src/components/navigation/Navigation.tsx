"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  demos,
  otherPages,
  projectPages,
  blogItems,
  blockItems,
  docsPages,
} from "@/data/menu";
import { cn } from "@/lib/utils";

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

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();

  const getActiveParent = (menuLinks: MenuItem[]) => {
    return menuLinks.find((parent: MenuItem) => {
      if (parent.links) {
        return parent.links.some((link: MenuItem) => link.href === pathname);
      }
      return parent.href === pathname;
    });
  };

  const isActive = (href?: string) => href === pathname;

  return (
    <NavigationMenu.Root className={cn("hidden lg:flex", className)}>
      <NavigationMenu.List className="flex space-x-1">
        {/* Demos Mega Menu */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className={cn(
              "group flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600 data-[state=open]:text-purple-600",
              demos.some((demo) => demo.href === pathname) &&
                "text-purple-600"
            )}
          >
            Demos
            <ChevronDown className="ml-1 h-4 w-4 group-data-[state=open]:rotate-180 transition-transform" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-7xl mt-1 bg-white border border-gray-200 shadow-lg rounded-md">
            <div className="p-6">
              <div className="grid grid-cols-6 gap-4 max-h-96 overflow-y-auto">
                {demos.map((demo) => (
                  <Link
                    key={demo.id}
                    href={demo.href}
                    className={cn(
                      "block p-2 rounded-lg hover:bg-gray-50 transition-colors",
                      isActive(demo.href) &&
                        "bg-purple-50 ring-2 ring-purple-200"
                    )}
                  >
                    <div className="aspect-video mb-2 rounded overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <span className="text-xs text-gray-500">
                        Demo {demo.id}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">
                      {demo.alt}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Pages Dropdown */}
        <NavigationMenu.Item>
          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
              <button
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600 data-[state=open]:text-purple-600",
                  getActiveParent(otherPages) && "text-purple-600"
                )}
              >
                Pages
                <ChevronDown className="ml-1 h-4 w-4 group-data-[state=open]:rotate-180 transition-transform" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-50 w-64 bg-white border border-gray-200 shadow-lg rounded-md p-2 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                side="bottom"
                align="start"
                sideOffset={4}
              >
                {otherPages.map((item) => (
                  <div key={item.id}>
                    {item.links ? (
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                          {item.label}
                          <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent className="z-50 w-48 bg-white border border-gray-200 shadow-lg rounded-md p-2">
                          {item.links.map((subItem) => (
                            <DropdownMenu.Item key={subItem.id} asChild>
                              <Link
                                href={subItem.href || "#"}
                                className={cn(
                                  "block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer",
                                  isActive(subItem.href) &&
                                    "text-purple-600 bg-purple-50"
                                )}
                              >
                                {subItem.label}
                              </Link>
                            </DropdownMenu.Item>
                          ))}
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                    ) : (
                      <DropdownMenu.Item asChild>
                        <Link
                          href={item.href || "#"}
                          className={cn(
                            "block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer",
                            isActive(item.href) &&
                              "text-purple-600 bg-purple-50"
                          )}
                        >
                          {item.label}
                        </Link>
                      </DropdownMenu.Item>
                    )}
                  </div>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </NavigationMenu.Item>

        {/* Projects Dropdown */}
        <NavigationMenu.Item>
          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
              <button
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600 data-[state=open]:text-purple-600",
                  getActiveParent(
                    projectPages.flatMap((section) => section.links)
                  ) && "text-purple-600"
                )}
              >
                Projects
                <ChevronDown className="ml-1 h-4 w-4 group-data-[state=open]:rotate-180 transition-transform" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-50 w-80 bg-white border border-gray-200 shadow-lg rounded-md p-4 will-change-[opacity,transform]"
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <div className="grid grid-cols-2 gap-4">
                  {projectPages.map((section) => (
                    <div key={section.id}>
                      <h6 className="text-sm font-semibold text-purple-600 mb-2">
                        {section.title}
                      </h6>
                      <div className="space-y-1">
                        {section.links.map((link) => (
                          <Link
                            key={link.id}
                            href={link.href || "#"}
                            className={cn(
                              "block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded",
                              isActive(link.href) &&
                                "text-purple-600 bg-purple-50"
                            )}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </NavigationMenu.Item>

        {/* Blog Dropdown */}
        <NavigationMenu.Item>
          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
              <button
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600 data-[state=open]:text-purple-600",
                  getActiveParent(blogItems) && "text-purple-600"
                )}
              >
                Blog
                <ChevronDown className="ml-1 h-4 w-4 group-data-[state=open]:rotate-180 transition-transform" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-50 w-64 bg-white border border-gray-200 shadow-lg rounded-md p-2 will-change-[opacity,transform]"
                side="bottom"
                align="start"
                sideOffset={4}
              >
                {blogItems.map((item) => (
                  <div key={item.id}>
                    {item.type === "dropdown" && item.links ? (
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                          {item.label}
                          <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent className="z-50 w-48 bg-white border border-gray-200 shadow-lg rounded-md p-2">
                          {item.links.map((subItem) => (
                            <DropdownMenu.Item key={subItem.id} asChild>
                              <Link
                                href={subItem.href || "#"}
                                className={cn(
                                  "block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer",
                                  isActive(subItem.href) &&
                                    "text-purple-600 bg-purple-50"
                                )}
                              >
                                {subItem.label}
                              </Link>
                            </DropdownMenu.Item>
                          ))}
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                    ) : (
                      <DropdownMenu.Item asChild>
                        <Link
                          href={item.href || "#"}
                          className={cn(
                            "block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer",
                            isActive(item.href) &&
                              "text-purple-600 bg-purple-50"
                          )}
                        >
                          {item.label}
                        </Link>
                      </DropdownMenu.Item>
                    )}
                  </div>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </NavigationMenu.Item>

        {/* Blocks Mega Menu */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className={cn(
              "group flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600 data-[state=open]:text-purple-600",
              getActiveParent(blockItems) && "text-purple-600"
            )}
          >
            Blocks
            <ChevronDown className="ml-1 h-4 w-4 group-data-[state=open]:rotate-180 transition-transform" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-7xl mt-1 bg-white border border-gray-200 shadow-lg rounded-md">
            <div className="p-6">
              <div className="grid grid-cols-6 gap-4">
                {blockItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "block p-4 rounded-lg hover:bg-gray-50 transition-colors text-center",
                      isActive(item.href) &&
                        "bg-purple-50 ring-2 ring-purple-200"
                    )}
                  >
                    <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {item.label.charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Documentation Mega Menu */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className={cn(
              "group flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600 data-[state=open]:text-purple-600",
              getActiveParent(
                docsPages.flatMap((section) => section.links)
              ) && "text-purple-600"
            )}
          >
            Documentation
            <ChevronDown className="ml-1 h-4 w-4 group-data-[state=open]:rotate-180 transition-transform" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-7xl mt-1 bg-white border border-gray-200 shadow-lg rounded-md">
            <div className="p-6">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4">
                  {docsPages.slice(0, 2).map((section, i) => (
                    <div
                      key={section.id}
                      className={i > 0 ? "mt-6" : ""}
                    >
                      <h6 className="text-sm font-semibold text-purple-600 mb-3">
                        {section.title}
                      </h6>
                      <div className="grid grid-cols-2 gap-1">
                        {section.links.map((link) => (
                          <Link
                            key={link.id}
                            href={link.href}
                            className={cn(
                              "block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded",
                              isActive(link.href) &&
                                "text-purple-600 bg-purple-50"
                            )}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-span-8 border-l border-gray-200 pl-6">
                  <h6 className="text-sm font-semibold text-purple-600 mb-3">
                    Elements
                  </h6>
                  <div className="grid grid-cols-3 gap-1">
                    {docsPages[2].links.map((link) => (
                      <Link
                        key={link.id}
                        href={link.href}
                        className={cn(
                          "block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded",
                          isActive(link.href) &&
                            "text-purple-600 bg-purple-50"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}