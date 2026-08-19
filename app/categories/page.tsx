'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES, UNSPLASH_IMAGES } from '@/lib/mockdata';
import { TrendingUp, ArrowRight, X } from 'lucide-react';

export default function CategoriesPage() {
  const [isTrendingOpen, setIsTrendingOpen] = useState(false);
  
  // Default to first 7 to prevent hydration mismatch on SSR
  const [trendingList, setTrendingList] = useState(UNSPLASH_IMAGES.slice(0, 7));

  useEffect(() => {
    // Function to calculate the daily trending order
    const updateTrendingOrder = () => {
      const now = new Date();
      
      // Create a deterministic seed based on the current local Date (Year + Month + Day)
      // This ensures the order stays the same all day, but changes at midnight
      const seed = now.getFullYear() + now.getMonth() + now.getDate();
      
      // Calculate how much to offset/shift the array today
      const offset = seed % UNSPLASH_IMAGES.length;
      
      // Rotate the array and grab the top 7
      const rotated = [...UNSPLASH_IMAGES.slice(offset), ...UNSPLASH_IMAGES.slice(0, offset)];
      setTrendingList(rotated.slice(0, 7));
    };

    // 1. Run immediately on mount to ensure local timezone date is used
    updateTrendingOrder();

    // 2. Set up an interval to watch for midnight to change it live
    const interval = setInterval(() => {
      const now = new Date();
      // If the time is exactly 12:00 AM, reshuffle
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        updateTrendingOrder();
      }
    }, 60000); // Checks once every minute

    return () => clearInterval(interval);
  }, []);

  // Handle body scroll locking for mobile modal
  useEffect(() => {
    if (isTrendingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isTrendingOpen]);

  return (
    // Reduced pt-16 to pt-4/pt-8 to fix the huge gap below the navbar
    <main className="min-h-[100svh] pt-6 sm:pt-10 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-10 relative z-10">
        
        {/* Main Content Area */}
        <div className="flex-1 w-full">
          <div className="mb-8 animate-fade-up">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight t-text pb-2">
              Explore Categories
            </h1>
            <p className="t-muted mt-2 text-base sm:text-lg max-w-xl">
              Browse through {CATEGORIES.length} stunning collections to find exactly what you are looking for.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {CATEGORIES.map((cat, i) => (
              <Link
                href={`/${cat.name.toLowerCase()}`}
                key={cat.name}
                style={{ animationDelay: `${i * 50}ms` }}
                className="animate-scale-in group relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 text-white/90 text-sm font-medium">
                    Explore <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Adjusted Sticky Sidebar */}
        <div className="hidden lg:block w-[320px] xl:w-[360px] shrink-0 sticky top-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-[var(--surface)]/60 backdrop-blur-xl border t-border rounded-3xl p-6 shadow-lg shadow-black/5 flex flex-col h-fit">
            
            <div className="flex items-center justify-between mb-5 pb-4 border-b t-border">
              <h2 className="text-lg font-bold t-text flex items-center gap-2">
                <TrendingUp size={20} className="text-[var(--accent)]" />
                Trending
              </h2>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--accent)] bg-[var(--accent-light)] px-2.5 py-1.5 rounded-full">
                Top 7
              </span>
            </div>

            {/* Increased gap slightly for better breathing room since we have fewer items */}
            <div className="flex flex-col gap-2.5">
              {trendingList.map((item, index) => (
                <Link
                  href={`/detail/${item.id}`}
                  key={`desktop-${item.id}-${index}`}
                  className="group flex items-center gap-3.5 p-2 rounded-2xl bg-transparent hover:bg-[var(--surface-2)] transition-all duration-300"
                >
                  <span className={`w-5 text-center font-bold text-sm ${index < 3 ? 'text-[var(--accent)]' : 't-faint'}`}>
                    {index + 1}
                  </span>

                  {/* Restored thumbnail to slightly larger size */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-black/5 dark:border-white/5 shadow-sm">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold t-text truncate group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] t-muted font-medium border t-border px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-fade-up" style={{ animationDelay: '400ms' }}>
        <button 
          onClick={() => setIsTrendingOpen(true)}
          className="pointer-events-auto flex items-center gap-2 bg-[var(--accent)] text-white px-6 py-3 rounded-full font-bold shadow-[0_8px_30px_var(--accent-light)] hover:scale-105 active:scale-95 transition-all duration-300 text-sm"
        >
          <TrendingUp size={18} />
          Trending
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-400 ease-in-out ${isTrendingOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsTrendingOpen(false)} />
        
        <div className={`absolute bottom-0 left-0 right-0 bg-[var(--surface)] border-t t-border rounded-t-[2rem] p-5 pb-8 max-h-[60vh] flex flex-col shadow-2xl transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isTrendingOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="w-10 h-1 bg-[var(--bg-tertiary)] rounded-full mx-auto mb-5" />
          
          <div className="flex justify-between items-center mb-5 shrink-0">
            <h2 className="text-xl font-bold t-text flex items-center gap-2">
              <TrendingUp size={20} className="text-[var(--accent)]" />
              Trending Now
            </h2>
            <button onClick={() => setIsTrendingOpen(false)} className="p-2 bg-[var(--surface-2)] hover:bg-[var(--surface)] rounded-full t-text transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-2 overflow-y-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {trendingList.map((item, index) => (
              <Link
                href={`/detail/${item.id}`}
                key={`mobile-${item.id}-${index}`}
                onClick={() => setIsTrendingOpen(false)}
                className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-[var(--surface-2)] transition-colors active:scale-[0.98]"
              >
                <span className={`w-5 text-center font-bold text-sm ${index < 3 ? 'text-[var(--accent)]' : 't-faint'}`}>
                  {index + 1}
                </span>

                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-black/5 dark:border-white/5">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold t-text truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] t-muted font-medium border t-border px-2.5 py-0.5 rounded-md">{item.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}