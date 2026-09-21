'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '@/lib/mockdata';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Footer } from '@/components/layout/footer';

export default function CombinedGreetingsPage() {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const POPULAR_TAGS = ['Birthday', 'Diwali', 'Christmas', 'Holi', 'Good Morning', 'Motivation', 'Love', 'Anniversary'];

  const ALL_CATEGORIES = [
    { name: 'All', image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=100&q=80' },
    ...CATEGORIES
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = customQuery !== undefined ? customQuery : query;
    if (finalQuery.trim()) {
      setQuery(finalQuery);
      router.push(`/search?q=${encodeURIComponent(finalQuery.trim().toLowerCase())}`);
    }
  };

  return (
    <main className="min-h-[100svh] bg-[#f9f9f9] dark:bg-black text-black dark:text-white font-sans antialiased selection:bg-black/10 dark:selection:bg-white/30 transition-colors duration-300 flex flex-col">
      
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        /* Clean up native search icon on mobile browsers */
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button { display: none; }
      `}</style>

      <div className="flex-1">
        <section className="pt-24 sm:pt-28 pb-4 px-4 flex flex-col items-center justify-center w-full animate-fade-up" style={{ animationDelay: '0ms' }}>
          
          <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <h1 className="text-[32px] sm:text-[40px] md:text-[46px] font-bold tracking-tight leading-[1.1] text-black dark:text-white">
              Warmly <br className="hidden sm:block" />
              Greetings for everyone
            </h1>
            <p className="text-gray-500 dark:text-[#a1a1aa] text-[13px] sm:text-[15px] font-normal leading-relaxed">
              Discover {CATEGORIES.length} beautiful categories, handpicked and <br className="hidden sm:block" />
              curated for your loved ones.
            </p>
          </div>

          <div className="w-full sm:w-[380px] mt-8 relative animate-fade-up" style={{ animationDelay: '50ms' }}>
            {/* HTML action="/search" handles fallback if JS breaks on mobile */}
            <form action="/search" onSubmit={handleSearch} className="relative flex items-center w-full">
              <Search size={15} className="absolute left-4 text-gray-400 dark:text-[#a1a1aa] pointer-events-none" />
              <input 
                ref={searchInputRef}
                type="search" 
                name="q"
                enterKeyHint="search"
                placeholder="Search greetings..." 
                value={query}
                onChange={e => setQuery(e.target.value)} 
                /* text-[16px] is strictly required to prevent mobile auto-zoom */
                className="w-full bg-white dark:bg-[#18181b] hover:bg-gray-50 dark:hover:bg-[#202024] border border-gray-200 dark:border-[#27272a] text-black dark:text-white text-[16px] sm:text-[14px] rounded-full py-2.5 pl-10 pr-16 focus:outline-none focus:border-gray-300 dark:focus:border-[#3f3f46] transition-colors placeholder:text-gray-400 dark:placeholder:text-[#a1a1aa] shadow-sm dark:shadow-none appearance-none"
              />
              
              {/* Invisible submit button ensures the 'Go/Search' keyboard button triggers submit */}
              <button type="submit" className="absolute w-0 h-0 opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>Search</button>

              <div className="absolute right-2.5 flex items-center gap-1 pointer-events-none">
                <kbd className="bg-gray-100 dark:bg-[#27272a] text-gray-500 dark:text-[#a1a1aa] font-sans font-medium text-[10px] px-1.5 py-0.5 rounded-[4px]">Ctrl</kbd>
                <kbd className="bg-gray-100 dark:bg-[#27272a] text-gray-500 dark:text-[#a1a1aa] font-sans font-medium text-[10px] px-1.5 py-0.5 rounded-[4px]">K</kbd>
              </div>
            </form>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[11px] sm:text-[12px] animate-fade-up" style={{ animationDelay: '100ms' }}>
            <span className="text-gray-400 dark:text-[#71717a]">Popular:</span>
            {POPULAR_TAGS.map(tag => (
              <button 
                key={tag} 
                onClick={() => handleSearch(undefined, tag)}
                className="text-gray-500 dark:text-[#a1a1aa] hover:text-black dark:hover:text-[#e4e4e7] underline decoration-gray-300 dark:decoration-[#52525b] decoration-dotted underline-offset-[4px] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-2 max-w-[700px] mx-auto animate-fade-up" style={{ animationDelay: '150ms' }}>
            {ALL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    if (cat.name !== 'All') {
                      router.push(`/${encodeURIComponent(cat.name.toLowerCase())}`);
                    }
                  }}
                  className={`flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full border shadow-sm dark:shadow-none transition-colors duration-200 ${
                    isActive 
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-[#18181b] dark:border-[#27272a] dark:text-[#e4e4e7] dark:hover:bg-[#27272a]'
                  }`}
                >
                  <div className="w-[20px] h-[20px] rounded-full overflow-hidden shrink-0 bg-gray-200 dark:bg-[#27272a]">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-medium tracking-wide">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="w-full px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto pb-16 mt-6 sm:mt-10 animate-fade-up" style={{ animationDelay: '200ms' }}>
          
          <div className="flex flex-row items-center justify-between mb-4 border-b border-transparent">
            <p className="text-gray-500 dark:text-[#a1a1aa] text-[13px] font-medium">
              {CATEGORIES.length} Categories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {CATEGORIES.map((cat, index) => (
              <div key={`${cat.name}-${index}`} className="group cursor-pointer flex flex-col gap-2">
                <Link href={`/${encodeURIComponent(cat.name.toLowerCase())}`} className="block relative w-full aspect-[4/3] rounded-[10px] overflow-hidden border border-gray-200 dark:border-[#27272a] bg-gray-100 dark:bg-[#18181b]">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                </Link>
                
                <div className="flex flex-col justify-start px-0.5 mt-1">
                  <h3 className="text-gray-900 dark:text-[#e4e4e7] font-semibold text-[13px] group-hover:text-black dark:group-hover:text-white transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 dark:text-[#71717a] text-[11px] font-medium mt-0.5">
                    Explore Collection
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer/>
    </main>
  );
}