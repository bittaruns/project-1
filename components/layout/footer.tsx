'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useDarkMode } from '@/hooks/useDark';
import { 
  Sun, 
  Moon, 
  Coffee, 
  Smartphone, 
  Pin, 
  ShoppingBag,
  PlusCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Custom SVGs matching Lucide's style for brands removed from the lucide-react package
const FacebookIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const YoutubeIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.6 6.3 3.3 5.6 4.1 5.5C6.1 5.1 12 5.1 12 5.1s5.9 0 7.9.4c.8.1 1.5.8 1.6 1.6.4 2 .4 4.9.4 4.9s0 2.9-.4 4.9c-.1.8-.8 1.5-1.6 1.6-2 .4-7.9.4-7.9.4s-5.9 0-7.9-.4c-.8-.1-1.5-.8-1.6-1.6-.4-2-.4-4.9-.4-4.9s0-2.9.4-4.9z"/><polygon points="9.8 14.3 15.8 12 9.8 9.7 9.8 14.3"/></svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);


export function Footer() {
  const { darkMode, toggleDark } = useDarkMode();
  
  const [rainDrops, setRainDrops] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
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
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-16">
      <footer className="relative w-full bg-[var(--text)] text-[var(--bg)] rounded-t-[2.5rem] sm:rounded-t-[4rem] pt-12 sm:pt-16 overflow-hidden flex flex-col justify-between">
        
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
          {rainDrops.map((style, i) => (
            <div
              key={i}
              className="absolute w-[1.5px] h-[3px] rounded-full bg-[var(--bg)] animate-tiny-rain"
              style={style}
            />
          ))}
        </div>

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
                <li>
                  <a href="https://play.google.com/store/apps/details?id=realappes.greetingscards" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
                    <Smartphone size={16} /> Android App
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/@warmlygreetings" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
                    <YoutubeIcon size={16} /> YouTube
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/warmlygreetings/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
                    <FacebookIcon size={16} /> Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/warmlygreetings" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
                    <InstagramIcon size={16} /> Instagram
                  </a>
                </li>
                <li>
                  <a href="https://in.pinterest.com/warmlygreetings/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
                    <Pin size={16} /> Pinterest
                  </a>
                </li>
                <li>
                  <a href="https://www.redbubble.com/people/WarmlyGreetings/shop" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
                    <ShoppingBag size={16} /> Redbubble
                  </a>
                </li>
                <li>
                  <Link href="/contribute" className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity text-yellow-300 dark:text-yellow-500">
                    <PlusCircle size={16} /> Get your card added
                  </Link>
                </li>
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