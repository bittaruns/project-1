'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();

  const smoothAnimStyle = { 
    backfaceVisibility: 'hidden', 
    transform: 'translateZ(0)', 
    WebkitFontSmoothing: 'antialiased' 
  } as React.CSSProperties;

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 bg-[#f9f9f9] dark:bg-black transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div 
              className="relative w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-105" 
              style={smoothAnimStyle}
            >
              <Image 
                src="/logo.png" 
                alt="Warmly Logo" 
                fill 
                sizes="(max-width: 640px) 32px, 36px" 
                className="object-contain" 
              />
            </div>
            <span className="text-black dark:text-white text-xl font-bold tracking-tight">
              Warmly
            </span>
          </Link>
        </div>

        {/* Right: Categories Text Link */}
        <div className="flex items-center justify-end">
          <Link 
            href="/categories" 
            className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
              pathname === '/categories' 
                ? 'text-black dark:text-white' 
                : 'text-gray-500 dark:text-[#a1a1aa] hover:text-black dark:hover:text-white'
            }`}
          >
            Categories
          </Link>
        </div>

      </div>
    </header>
  );
}