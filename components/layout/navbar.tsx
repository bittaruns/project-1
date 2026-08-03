'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Sun, Moon, LayoutGrid, Search, TrendingUp, Info } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDark';
import { Pacifico } from 'next/font/google';
import Image from "next/image";

const pacifico = Pacifico({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
});

export function Navbar() {
  const router = useRouter();
  const { darkMode, toggleDark } = useDarkMode();
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const popularCategories = [
    { name: 'Christmas', href: '/christmas' },
    { name: 'Diwali', href: '/diwali' },
    { name: 'New Year', href: '/new-year' },
    { name: 'Birthday', href: '/birthday' },
    { name: 'Anniversary', href: '/anniversary' },
    { name: 'Festivals', href: '/festivals' },
  ];

  // Helper style to fix WebKit blur during scaling/rotation
  const smoothAnimStyle = { 
    backfaceVisibility: 'hidden', 
    transform: 'translateZ(0)',
    WebkitFontSmoothing: 'antialiased' 
  } as React.CSSProperties;

  return (
    <header 
      // Increased width to w-[98%] and max-w-7xl
      className={`fixed top-4 left-1/2 z-50 w-[100%] max-w-7xl -translate-x-1/2 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0 pointer-events-none'
      }`}
    >
      {/* Replaced bg-[var(--bg)] and backdrop-blur-lg with bg-transparent */}
      <div className="bg-transparent rounded-full px-5 sm:px-8 h-14 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/logo1.png" 
              alt="Warmly Logo" 
              width={48} 
              height={48} 
              className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className={`${pacifico.className} text-[var(--accent)] text-xl tracking-wide opacity-90 group-hover:opacity-100 transition-opacity duration-300`}>
              Warmly
            </span>
          </Link>
        </div>

        {/* Center: Links */}
        <nav className="hidden lg:flex items-center justify-center gap-8">
          
          {/* Categories Dropdown */}
          <div className="relative group">
            <Link
              href="/categories"
              className="flex items-center text-sm font-medium t-text opacity-70 hover:opacity-100 transition-opacity duration-300 py-4"
            >
              <LayoutGrid 
                size={14} 
                style={smoothAnimStyle}
                className="mr-1.5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" 
              />
              Categories
            </Link>
            
            {/* Dropdown Menu with Caret Arrow */}
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-2 w-48 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
              <div className="relative bg-[var(--surface)] border t-border rounded-xl p-2 shadow-xl flex flex-col gap-1">
                {/* The Arrow/Caret pointing up */}
                <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[var(--surface)] border-l border-t t-border rotate-45 rounded-tl-[2px] z-0"></div>
                
                {/* Links wrapped in relative z-10 to stay above the arrow's bottom half */}
                <div className="relative z-10 flex flex-col gap-1 bg-[var(--surface)] rounded-lg">
                  {popularCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="px-4 py-2.5 text-sm t-text opacity-70 hover:opacity-100 hover:bg-[var(--bg-tertiary)] rounded-lg transition-all duration-200"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trending */}
          <Link
            href="/search"
            className="flex items-center text-sm font-medium t-text opacity-70 hover:opacity-100 transition-opacity duration-300 py-4 group"
          >
            <TrendingUp 
              size={14} 
              style={smoothAnimStyle}
              className="mr-1.5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" 
            />
            Trending
          </Link>
          
          {/* About */}
          <Link
            href="/about"
            className="flex items-center text-sm font-medium t-text opacity-70 hover:opacity-100 transition-opacity duration-300 py-4 group"
          >
            <Info 
              size={14} 
              style={smoothAnimStyle}
              className="mr-1.5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" 
            />
            About
          </Link>
        </nav>

        {/* Right: Icons & Search */}
        <div className="flex-1 flex items-center justify-end gap-1">
          
          {/* Search Bar (Slowed down and natural animation) */}
          <form 
            onSubmit={handleSearch}
            className="group/search flex items-center rounded-full bg-[var(--surface-2)]/0 hover:bg-[var(--bg-tertiary)] focus-within:bg-[var(--bg-tertiary)] transition-colors duration-800 ease-in-out"
          >
            <button 
              type="button" 
              style={smoothAnimStyle}
              className="p-2 text-[var(--accent)] opacity-80 group-hover/search:opacity-100 group-focus-within/search:opacity-100 transition-all duration-300 hover:rotate-12 hover:scale-110"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <input
              type="text"
              placeholder="Search greetings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-0 opacity-0 group-hover/search:w-32 group-hover/search:opacity-100 group-hover/search:pr-3 group-focus-within/search:w-32 group-focus-within/search:opacity-100 group-focus-within/search:pr-3 sm:group-hover/search:w-48 sm:group-focus-within/search:w-48 bg-transparent text-sm t-text outline-none transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] placeholder:opacity-40"
            />
          </form>

          {/* Theme Toggle */}
          <button
            onClick={toggleDark}
            style={smoothAnimStyle}
            className="t-text opacity-60 hover:opacity-100 dark:text-yellow-300 transition-all duration-300 ease-out p-2 rounded-full hover:rotate-12 hover:scale-110 ml-1"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

        </div>

      </div>
    </header>
  );
}