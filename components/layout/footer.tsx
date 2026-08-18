'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useDarkMode } from '@/hooks/useDark';
import { Sun, Moon, Coffee } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Footer() {
  const { darkMode, toggleDark } = useDarkMode();
  
  // FIX: Store the random rain drops in state to prevent React Hydration Mismatch errors
  const [rainDrops, setRainDrops] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    // Generate random values only on the client side after the component mounts
    setRainDrops(
      [...Array(50)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 20}px`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        animationDelay: `${Math.random() * 3}s`,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    );
  }, []);

  return (
    // WRAPPER: Added px-4 sm:px-6 lg:px-8 to create the floating card white-space effect on the sides
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-16">
      <footer className="relative w-full bg-[var(--text)] text-[var(--bg)] rounded-t-[2.5rem] sm:rounded-t-[4rem] pt-12 sm:pt-16 overflow-hidden flex flex-col justify-between">
        
        {/* --- TINY RAIN ANIMATION --- */}
        <style>{`
          @keyframes tiny-rain {
            0% { transform: translateY(-10px); opacity: 0; }
            20% { opacity: 0.8; }
            70% { opacity: 0.8; }
            100% { transform: translateY(80px); opacity: 0; }
          }
          .animate-tiny-rain {
            animation: tiny-rain linear infinite;
          }
        `}</style>
        
        <div 
          className="absolute top-0 left-0 w-full h-32 overflow-hidden pointer-events-none z-0"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)' }}
        >
          {/* Render the safely generated client-side rain drops */}
          {rainDrops.map((style, i) => (
            <div
              key={i}
              className="absolute w-[1.5px] h-[3px] rounded-full bg-[var(--bg)] animate-tiny-rain"
              style={style}
            />
          ))}
        </div>
        {/* --------------------------- */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-8 mb-12 sm:mb-16">
            
            {/* Logo & Theme Toggle Column */}
            <div className="col-span-1 md:col-span-4 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left gap-6">
              <Link href="/" className="inline-block group">
                <div className="relative w-20 h-20 sm:w-20 sm:h-20 transition-transform duration-300 ">
                  <Image 
                    src="/logo.png" 
                    alt="Warmly Logo" 
                    fill 
                    sizes="80px"
                    className="object-contain brightness-0 invert dark:brightness-0 dark:invert-0" 
                  />
                </div>
              </Link>

              <button 
                onClick={toggleDark} 
                className="flex items-center justify-center gap-2 text-xs font-bold bg-[var(--bg)] text-[var(--text)] px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                {darkMode ? 'Light Theme' : 'Dark Theme'}
              </button>
            </div>

            {/* "The Good" Column */}
            <div className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-sm font-bold opacity-100 mb-4">The Good</h4>
              <ul className="space-y-3 flex flex-col items-center md:items-start">
                <li><Link href="/" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">Home</Link></li>
                <li><Link href="/categories" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">Categories</Link></li>
                <li><Link href="/search" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">Discover</Link></li>
                <li><Link href="/about" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">About Us</Link></li>
              </ul>
            </div>

            {/* "The Boring" Column */}
            <div className="col-span-1 md:col-span-3 lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-sm font-bold opacity-100 mb-4">The Boring</h4>
              <ul className="space-y-3 flex flex-col items-center md:items-start">
                <li><Link href="/terms" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">Terms of Use</Link></li>
                <li><Link href="/privacy" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* "The Cool" Column */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-sm font-bold opacity-100 mb-4">The Cool</h4>
              <ul className="space-y-3 mb-6 flex flex-col items-center md:items-start">
                <li><a href="#" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">X</a></li>
                <li><Link href="/contribute" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity text-yellow-300 dark:text-yellow-500">Get you card added</Link></li>
              </ul>

              <a 
                href="https://buymeacoffee.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-bold bg-[#FFDD00] text-black px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md mt-2 md:mt-0"
              >
                <Coffee size={14} />
                Buy me a coffee
              </a>
            </div>
          </div>

          {/* Small Meta info */}
          <div className="flex flex-col items-center md:flex-row md:justify-between gap-3 sm:gap-4 pb-2 sm:pb-0 relative z-10 text-center md:text-left">
            <p className="text-xs sm:text-sm font-medium opacity-50">© {new Date().getFullYear()} Warmly Inc.</p>
            <p className="text-xs sm:text-sm font-medium opacity-50">Curated sets for every celebration.</p>
          </div>
        </div>

        <div className="w-full flex justify-center pointer-events-none select-none mt-4 sm:mt-6">
          <span 
            className="font-extrabold opacity-20 leading-[0.8] tracking-[-0.04em] whitespace-nowrap translate-y-[10%]" 
            style={{ fontSize: '18vw' }}
          >
            Warmly
          </span>
        </div>
      </footer>
    </div>
  );
}