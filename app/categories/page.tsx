'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES, UNSPLASH_IMAGES } from '@/lib/mockdata';
import { TrendingUp, Download, ArrowRight, X } from 'lucide-react';

export default function CategoriesPage() {
  const [isTrendingOpen, setIsTrendingOpen] = useState(false);
  const trendingList = UNSPLASH_IMAGES.slice(0, 10);

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
    <main className="min-h-[100svh] t-bg pt-20 sm:pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-12 relative">
        
        <div className="flex-1 w-full">
          {/* Animated Header */}
          <div className="mb-8 animate-fade-up">
            <h1 className="text-3xl sm:text-4xl font-bold t-text tracking-tight">Explore Categories</h1>
            <p className="t-muted mt-2 text-sm sm:text-base">
              Browse all {CATEGORIES.length} collections to find the perfect greeting.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link
                href={`/${cat.name.toLowerCase()}`}
                key={cat.name}
                style={{ animationDelay: `${i * 50}ms` }}
                className="animate-scale-in group relative h-[120px] sm:h-[140px] rounded-2xl overflow-hidden border t-border block shadow-sm"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end">
                  <h3 className="text-white font-bold text-base sm:text-lg tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-white/80 text-[10px] sm:text-xs mt-0.5 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Animated Sticky Sidebar */}
        <div className="hidden lg:block w-[400px] xl:w-[420px] shrink-0 sticky top-24 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-[var(--surface)] border t-border rounded-2xl p-6 shadow-sm flex flex-col h-fit">
            
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold t-text flex items-center gap-2">
                <TrendingUp size={20} className="text-[var(--accent)]" />
                Popular Now
              </h2>
              <span className="text-[10px] uppercase tracking-wider font-bold t-muted bg-[var(--surface-2)] px-2.5 py-1 rounded-full">
                Top 10
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {trendingList.map((item, index) => (
                <Link
                  href={`/detail/${item.id}`}
                  key={`desktop-${item.id}-${index}`}
                  className="group flex items-center gap-3 p-2 rounded-xl bg-transparent hover:bg-[var(--bg-tertiary)]/50 transition-colors duration-200"
                >
                  <span className={`w-5 text-center font-bold text-sm ${index < 3 ? 'text-[var(--accent)]' : 't-faint'}`}>
                    {index + 1}
                  </span>

                  <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--surface-2)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold t-text truncate group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] t-muted font-medium bg-[var(--surface-2)] px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-[10px] t-faint flex items-center gap-1 font-medium">
                        <Download size={10} /> {item.downloads.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Modal Logic Remains Unchanged Here... */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-fade-up" style={{ animationDelay: '400ms' }}>
        <button 
          onClick={() => setIsTrendingOpen(true)}
          className="pointer-events-auto flex items-center gap-2 bg-[var(--text)] text-[var(--bg)] px-6 py-3.5 rounded-full font-bold shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <TrendingUp size={18} />
          View Popular
        </button>
      </div>

      <div className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${isTrendingOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsTrendingOpen(false)} />
        
        <div className={`absolute bottom-0 left-0 right-0 bg-[var(--surface)] border-t t-border rounded-t-3xl p-5 pb-8 max-h-[85vh] flex flex-col transition-transform duration-400 cubic-bezier(0.32, 0.72, 0, 1) ${isTrendingOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex justify-between items-center mb-5 shrink-0">
            <h2 className="text-xl font-bold t-text flex items-center gap-2">
              <TrendingUp size={20} className="text-[var(--accent)]" />
              Popular Now
            </h2>
            <button onClick={() => setIsTrendingOpen(false)} className="p-2 bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)] rounded-full t-text transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-2 overflow-y-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {trendingList.map((item, index) => (
              <Link
                href={`/detail/${item.id}`}
                key={`mobile-${item.id}-${index}`}
                onClick={() => setIsTrendingOpen(false)}
                className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[var(--bg-tertiary)]/50 transition-colors"
              >
                <span className={`w-6 text-center font-bold text-sm ${index < 3 ? 'text-[var(--accent)]' : 't-faint'}`}>
                  {index + 1}
                </span>

                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[var(--surface-2)]">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold t-text truncate">{item.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] t-muted font-medium bg-[var(--surface-2)] px-2 py-0.5 rounded">{item.category}</span>
                    <span className="text-[11px] t-faint flex items-center gap-1 font-medium"><Download size={10} /> {item.downloads.toLocaleString()}</span>
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