"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface HeaderContextType {
  showTopBanner: boolean;
  isScrolled: boolean;
}

const HeaderContext = createContext<HeaderContextType>({
  showTopBanner: true,
  isScrolled: false,
});

export const useHeader = () => useContext(HeaderContext);

interface HeaderProviderProps {
  children: React.ReactNode;
}

export function HeaderProvider({ children }: HeaderProviderProps) {
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check if running in browser
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide top banner based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowTopBanner(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowTopBanner(true);
      }

      // Track if we've scrolled at all
      setIsScrolled(currentScrollY > 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, showTopBanner]);

  return (
    <HeaderContext.Provider value={{ showTopBanner, isScrolled }}>
      {children}
    </HeaderContext.Provider>
  );
}