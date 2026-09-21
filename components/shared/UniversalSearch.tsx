'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, TrendingUp, X } from 'lucide-react';
import { CATEGORIES } from '@/lib/mockdata';

export function HeroSearch() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <UniversalSearch variant="hero" />
    </div>
  );
}

interface UniversalSearchProps {
  variant?: 'navbar' | 'hero' | 'page';
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

export function UniversalSearch({ variant = 'hero', initialQuery = '', onSearch }: UniversalSearchProps) {
  const router = useRouter();
  const [val, setVal] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const TRENDING_SEARCHES = ['diwali', 'christmas', 'halloween', 'mothers day'];
  const TRENDING_TOPICS = CATEGORIES.slice(0, 4);
  const TRENDING_COLLECTIONS = ['Minimalist', 'Typography', 'Vintage', 'Floral'];

  const handleSearch = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = customQuery !== undefined ? customQuery : val;
    if (finalQuery.trim()) {
      setVal(finalQuery);
      setIsOpen(false);
      if (onSearch) onSearch(finalQuery);
      router.push(`/search?q=${encodeURIComponent(finalQuery.trim().toLowerCase())}`);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const DropdownMenu = () => (
    <div 
      className={`
        ${variant === 'navbar' 
          ? 'fixed left-4 right-4 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[360px] md:w-[400px]' 
          : 'absolute top-full mt-2 w-full left-0'} 
        bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-2xl shadow-xl p-4 sm:p-5 text-left animate-fade-up z-[70] origin-top overflow-hidden
      `}
    >
      <div className="mb-5">
        <h3 className="text-[11px] sm:text-xs font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider mb-2.5">
          Trending Searches
        </h3>
        <div className="flex flex-wrap gap-2">
          {TRENDING_SEARCHES.map(item => (
            <button 
              key={item} 
              type="button" 
              // onMouseDown prevents focus loss, critical for mobile touch targets
              onMouseDown={(e) => { e.preventDefault(); handleSearch(undefined, item); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#202024] hover:bg-gray-100 dark:hover:bg-[#2a2a2e] text-[13px] text-gray-700 dark:text-gray-300 transition-colors"
            >
              <TrendingUp size={14} className="text-gray-400 dark:text-[#a1a1aa]" />
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className={variant !== 'navbar' ? 'mb-5' : ''}>
        <h3 className="text-[11px] sm:text-xs font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider mb-2.5">
          Trending Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {TRENDING_TOPICS.map(topic => (
            <button 
              key={topic.name} 
              type="button" 
              onMouseDown={(e) => { e.preventDefault(); handleSearch(undefined, topic.name); }}
              className="flex items-center gap-2 pr-3 p-1 rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#202024] hover:bg-gray-100 dark:hover:bg-[#2a2a2e] text-[13px] text-gray-700 dark:text-gray-300 transition-colors"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded overflow-hidden shrink-0 bg-gray-200 dark:bg-[#27272a]">
                <img src={topic.image} alt={topic.name} className="w-full h-full object-cover" />
              </div>
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {variant !== 'navbar' && (
        <div>
          <h3 className="text-[11px] sm:text-xs font-bold text-gray-500 dark:text-[#a1a1aa] uppercase tracking-wider mb-2.5">
            Trending Collections
          </h3>
          <div className="flex flex-wrap gap-2">
            {TRENDING_COLLECTIONS.map(collection => (
              <button 
                key={collection} 
                type="button" 
                onMouseDown={(e) => { e.preventDefault(); handleSearch(undefined, collection); }}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#202024] hover:bg-gray-100 dark:hover:bg-[#2a2a2e] text-[13px] text-gray-700 dark:text-gray-300 transition-colors"
              >
                {collection}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (variant === 'navbar') {
    return (
      <div className="relative flex items-center z-50" ref={wrapperRef}>
        <form 
          onSubmit={handleSearch} 
          className={`
            flex items-center rounded-full transition-all duration-300 ease-out px-1
            ${isOpen 
              ? 'bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] w-[200px] sm:w-[240px] md:w-[300px] lg:w-[320px] shadow-sm' 
              : 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 w-9 sm:w-10 md:w-44 lg:w-48'}
          `}
        >
          <button 
            type={isOpen ? "submit" : "button"} 
            onClick={() => !isOpen && setIsOpen(true)} 
            className="p-1.5 sm:p-2 text-gray-500 dark:text-[#a1a1aa] hover:text-black dark:hover:text-white transition-transform duration-300 hover:scale-105 flex-shrink-0" 
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          
          <input 
            type="search"
            enterKeyHint="search"
            value={val} 
            onChange={e => setVal(e.target.value)} 
            onFocus={() => setIsOpen(true)} 
            placeholder="Search..." 
            className={`
              bg-transparent text-[16px] md:text-sm text-black dark:text-white outline-none transition-all duration-300 ease-out 
              placeholder:text-gray-400 dark:placeholder:text-[#71717a] min-w-0 appearance-none
              ${isOpen ? 'w-full opacity-100 px-1 sm:px-2 py-1.5' : 'w-0 md:w-full opacity-0 md:opacity-100 md:px-2'}
            `} 
          />

          {isOpen && (
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 dark:text-[#71717a] hover:text-black dark:hover:text-white transition-colors md:hidden"
            >
              <X size={16} />
            </button>
          )}
        </form>
        {isOpen && <DropdownMenu />}
      </div>
    );
  }

  // ================= HERO / PAGE VARIANTS =================
  return (
    <div ref={wrapperRef} className="relative flex flex-col items-center w-full max-w-xl mx-auto z-50">
      <form 
        onSubmit={handleSearch} 
        className={`
          relative flex items-center w-full rounded-full p-1.5 transition-all duration-300 bg-white dark:bg-[#18181b]
          border ${isOpen ? 'border-blue-500/50 ring-2 ring-blue-500/10' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46]'}
          shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] dark:shadow-none
        `}
      >
        <Search size={20} className="text-gray-400 dark:text-[#a1a1aa] ml-4 flex-shrink-0" />
        
        <input 
          type="search"
          enterKeyHint="search"
          value={val} 
          onChange={e => setVal(e.target.value)} 
          onFocus={() => setIsOpen(true)} 
          placeholder="Search holidays, festivals, seasons..." 
          className="flex-1 bg-transparent text-black dark:text-white text-[16px] md:text-base px-4 py-2.5 sm:py-3 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-[#71717a] min-w-0 appearance-none" 
        />
        
        <button type="submit" className="hidden">Search</button>

        {variant === 'hero' ? (
          <button 
            type="submit" 
            className="bg-black dark:bg-white text-white dark:text-black hover:opacity-90 active:scale-95 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-[15px] font-bold transition-all shadow-sm whitespace-nowrap"
          >
            Search
          </button> 
        ) : (
          <div className="px-3 sm:px-4 text-xs text-gray-400 dark:text-[#71717a] hidden sm:block">↵</div>
        )}
      </form>

      {isOpen && <DropdownMenu />}
    </div>
  );
}