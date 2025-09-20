"use client";

import Header from "@/components/headers/Header";
import { useHeader } from "@/components/providers/HeaderProvider";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({
  children,
  className = "",
}: MainLayoutProps) {
  const { showTopBanner } = useHeader();

  return (
    <div className={cn("min-h-screen", className)}>
      <Header />
      <main
        className={cn(showTopBanner ? "main-content" : "main-content-compact")}
      >
        {children}
      </main>
    </div>
  );
}

// Variant with default padding
export function MainLayoutPadded({
  children,
  className = "",
}: MainLayoutProps) {
  const { showTopBanner } = useHeader();

  return (
    <div className={cn("min-h-screen", className)}>
      <Header />
      <main
        className={cn(
          showTopBanner ? "main-content-padded" : "main-content-padded-compact",
          "container mx-auto"
        )}
      >
        {children}
      </main>
    </div>
  );
}
