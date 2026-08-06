'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Added usePathname
import { Sun, Moon, LayoutGrid, TrendingUp, Info, Menu, X } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDark';
import Image from "next/image";
import { UniversalSearch } from '@/components/shared/UniversalSearch';

export function Navbar() {
  const { darkMode, toggleDark } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current route

  const smoothAnimStyle = { 
    backfaceVisibility: 'hidden', 
    transform: 'translateZ(0)', 
    WebkitFontSmoothing: 'antialiased' 
  } as React.CSSProperties;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--bg)]/80 backdrop-blur-xl transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Left: Logo with Hover Animation */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 group">
            <div 
              className="relative w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" 
              style={smoothAnimStyle}
            >
              <Image 
                src="/logo.png" 
                alt="Warmly Logo" 
                fill 
                sizes="(max-width: 640px) 32px, 36px" 
                className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
            <span className="t-text text-lg sm:text-xl font-bold tracking-tight opacity-90 group-hover:opacity-100 transition-all duration-300 block">
              Warmly
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation with Active States */}
        <nav className="hidden lg:flex items-center justify-center gap-4 flex-1">
          <Link 
            href="/categories" 
            className={`flex items-center text-sm font-medium px-3 py-2 rounded-full transition-all duration-300 group ${pathname === '/categories' ? 't-text bg-[var(--bg-tertiary)] shadow-sm' : 't-muted hover:t-text hover:bg-[var(--bg-tertiary)]/50'}`}
          >
            <LayoutGrid size={14} style={smoothAnimStyle} className={`mr-1.5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 ${pathname === '/categories' ? 'text-[var(--accent)]' : ''}`} />
            Categories
          </Link>
          <Link 
            href="/search" 
            className={`flex items-center text-sm font-medium px-3 py-2 rounded-full transition-all duration-300 group ${pathname === '/search' ? 't-text bg-[var(--bg-tertiary)] shadow-sm' : 't-muted hover:t-text hover:bg-[var(--bg-tertiary)]/50'}`}
          >
            <TrendingUp size={14} style={smoothAnimStyle} className={`mr-1.5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 ${pathname === '/search' ? 'text-[var(--accent)]' : ''}`} />
            Discover
          </Link>
          <Link 
            href="/about" 
            className={`flex items-center text-sm font-medium px-3 py-2 rounded-full transition-all duration-300 group ${pathname === '/about' ? 't-text bg-[var(--bg-tertiary)] shadow-sm' : 't-muted hover:t-text hover:bg-[var(--bg-tertiary)]/50'}`}
          >
            <Info size={14} style={smoothAnimStyle} className={`mr-1.5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 ${pathname === '/about' ? 'text-[var(--accent)]' : ''}`} />
            About
          </Link>
        </nav>

        {/* Right: Universal Search & Theme Controls */}
        <div className="flex flex-1 lg:flex-none items-center justify-end gap-1 sm:gap-2">
          
          <UniversalSearch variant="navbar" />

          <button 
            onClick={toggleDark} 
            style={smoothAnimStyle} 
            className="t-muted hover:t-text transition-all duration-300 ease-out p-1.5 sm:p-2 rounded-full hover:bg-[var(--bg-tertiary)]/50 flex-shrink-0" 
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            style={smoothAnimStyle} 
            className="lg:hidden t-muted hover:t-text transition-all duration-300 ease-out p-1.5 sm:p-2 rounded-full hover:bg-[var(--bg-tertiary)]/50 flex-shrink-0" 
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel with Active States */}
      <div className={`lg:hidden absolute top-14 left-0 right-0 bg-[var(--surface)] border-b t-border shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
        <div className="p-4 flex flex-col gap-2">
          <Link 
            href="/categories" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className={`flex items-center p-3 rounded-xl text-sm font-medium transition-colors ${pathname === '/categories' ? 't-text bg-[var(--bg-tertiary)]' : 't-text bg-[var(--bg-tertiary)]/30 hover:bg-[var(--bg-tertiary)]'}`}
          >
            <LayoutGrid size={16} className={`mr-3 ${pathname === '/categories' ? 'text-[var(--accent)]' : 't-muted'}`} /> Categories
          </Link>
          <Link 
            href="/search" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className={`flex items-center p-3 rounded-xl text-sm font-medium transition-colors ${pathname === '/search' ? 't-text bg-[var(--bg-tertiary)]' : 't-text bg-[var(--bg-tertiary)]/30 hover:bg-[var(--bg-tertiary)]'}`}
          >
            <TrendingUp size={16} className={`mr-3 ${pathname === '/search' ? 'text-[var(--accent)]' : 't-muted'}`} /> Discover
          </Link>
          <Link 
            href="/about" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className={`flex items-center p-3 rounded-xl text-sm font-medium transition-colors ${pathname === '/about' ? 't-text bg-[var(--bg-tertiary)]' : 't-text bg-[var(--bg-tertiary)]/30 hover:bg-[var(--bg-tertiary)]'}`}
          >
            <Info size={16} className={`mr-3 ${pathname === '/about' ? 'text-[var(--accent)]' : 't-muted'}`} /> About Us
          </Link>
        </div>
      </div>
    </header>
  );
}