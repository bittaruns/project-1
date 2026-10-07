'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { ChevronDown } from 'lucide-react';

const NAV_CATEGORIES = [
  {
    label: 'Holidays',
    items: [
      '4th of July', 'Halloween', 'Mother\'s Day', 'Father\'s Day', 
      'Thanksgiving', 'Christmas', 'New Year', 'Valentine\'s Day', 
      'St. Patrick\'s Day', 'Easter', 'Hanukkah', 'Diwali', 'Holi', 'Eid'
    ]
  },
  {
    label: 'Occasions',
    items: [
      'Anniversary', 'Birthday', 'Congratulations', 'Friendship', 
      'Goodbye', 'Good Luck', 'Graduation', 'Love', 'Sympathy', 'Thank You'
    ]
  },
  {
    label: 'Feelings',
    items: [
      'Good morning', 'Good evening', 'Good night', 'Friendship', 
      'Get Well', 'Hugs', 'Miss You', 'Love & Romance', 'Sympathy', 'Sorry & Apology'
    ]
  },
  {
    label: 'International Days',
    items: [
      'Women\'s Day', 'Earth Day', 'Friendship Day', 'World Health Day', 
      'World Environment Day', 'World Water Day', 'International Day of Peace', 
      'Labor Day', 'Memorial Day', 'World Teachers\' Day', 'Lunar New Year', 'New Year\'s Eve'
    ]
  },
  {
    label: 'Quotations',
    items: [
      'Wisdom', 'Peace', 'Gratitude', 'Success', 'Happiness', 'Pain', 
      'Awareness', 'Courage', 'Maturity', 'Love', 'Break up', 'Buddha', 
      'Zen', 'Lao Tzu', 'Socrates', 'Rumi', 'Osho'
    ]
  }
];

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // State for the sliding pill animation
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const smoothAnimStyle = { 
    backfaceVisibility: 'hidden', 
    transform: 'translateZ(0)', 
    WebkitFontSmoothing: 'antialiased' 
  } as React.CSSProperties;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f9f9f9]/80 dark:bg-black/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/welcome" className="flex items-center gap-3 group">
            <div 
              className="relative w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-500 ease-out group-hover:scale-110" 
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
            <span className="text-black dark:text-white text-xl font-extrabold tracking-tight">
              Warmly
            </span>
          </Link>
        </div>

        {/* Right: Modern Navigation */}
        <nav className="hidden lg:flex items-center justify-end flex-1">
          {/* Added onMouseLeave to hide the pill when leaving the navigation area */}
          <ul 
            className="relative flex items-center gap-1"
            onMouseLeave={() => setHoverStyle(prev => ({ ...prev, opacity: 0 }))}
          >
            
            {/* --- SLIDING PILL BACKGROUND --- */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-9 bg-black/5 dark:bg-white/10 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0"
              style={{
                left: hoverStyle.left,
                width: hoverStyle.width,
                opacity: hoverStyle.opacity,
              }}
            />

            {NAV_CATEGORIES.map((category) => {
              const isCategoryActive = mounted && category.items.some(
                (item) => decodeURIComponent(pathname) === `/${item.toLowerCase()}`
              );

              return (
                <li 
                  key={category.label} 
                  className="relative group z-10"
                  // Calculate the exact position and width of the hovered element
                  onMouseEnter={(e) => {
                    setHoverStyle({
                      left: e.currentTarget.offsetLeft,
                      width: e.currentTarget.offsetWidth,
                      opacity: 1
                    });
                  }}
                >
                  <button 
                    // Removed the static hover backgrounds since the pill now handles it
                    className={`flex items-center gap-1 px-3 py-2 rounded-full text-[14px] font-semibold transition-colors duration-300 ease-out
                      ${isCategoryActive 
                        ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                      }`}
                  >
                    {category.label}
                    <ChevronDown size={14} className="opacity-60 group-hover:rotate-180 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]" />
                  </button>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-3 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-50">
                    <div className="bg-white/95 dark:bg-[#121212]/95 backdrop-blur-2xl border border-gray-100 dark:border-[#27272a] rounded-[20px] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] p-2.5 w-[360px]">
                      <div className="grid grid-cols-2 gap-1">
                        {category.items.map((item) => {
                          const href = `/${item.toLowerCase()}`;
                          const isActive = mounted && decodeURIComponent(pathname) === href;

                          return (
                            <Link
                              key={item}
                              href={href}
                              className={`block px-3 py-2 text-[13px] rounded-lg transition-all duration-200 ease-out active:scale-[0.98]
                                ${isActive
                                  ? 'bg-gray-100 dark:bg-white/10 text-black dark:text-white font-semibold'
                                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white font-medium'
                                }`}
                            >
                              {item}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
            
            {/* Categories Button */}
            <li className="ml-2 z-10">
              <Link 
                href="/categories" 
                className="flex items-center justify-center px-5 py-2 rounded-full text-[14px] font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-85 transition-opacity active:scale-[0.97]"
              >
                Categories
              </Link>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
}