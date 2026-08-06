'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, TrendingUp, X } from 'lucide-react';

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

  // Universal Data
  const TRENDING_SEARCHES = ['diwali wishes', 'birthday', 'motivation', 'good morning'];
  const TRENDING_TOPICS = [
    { name: 'Wallpapers', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop' },
    { name: 'Festivals', image: 'https://images.unsplash.com/photo-1533227260879-108b3cc1a6eb?q=80&w=100&auto=format&fit=crop' },
  ];
  
  if (variant !== 'navbar') {
    TRENDING_TOPICS.push(
      { name: '3D Renders', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=100&auto=format&fit=crop' },
      { name: 'Nature', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=100&auto=format&fit=crop' }
    );
  }
  
  const TRENDING_COLLECTIONS = ['Minimalist', 'Typography', 'Vintage', 'Floral'];

  const handleSearch = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = customQuery || val;
    if (finalQuery.trim()) {
      setVal(finalQuery);
      setIsOpen(false);
      if (onSearch) onSearch(finalQuery);
      router.push(`/search?q=${encodeURIComponent(finalQuery)}`);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Shared Responsive Dropdown UI
  const DropdownMenu = () => (
    <div 
      className={`
        ${variant === 'navbar' 
          ? 'fixed left-3 right-3 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[360px] md:w-[400px]' 
          : 'absolute top-full mt-2 w-full left-0'} 
        bg-[var(--surface)] border t-border rounded-2xl shadow-2xl p-4 sm:p-6 text-left animate-fade-up z-[60] origin-top overflow-hidden
      `}
    >
      {/* Trending Searches */}
      <div className="mb-4 sm:mb-5">
        <h3 className="text-[11px] sm:text-xs font-bold t-muted uppercase tracking-wider mb-2 sm:mb-2.5">
          Trending Searches
        </h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {TRENDING_SEARCHES.map(item => (
            <button 
              key={item} 
              type="button" 
              onClick={() => handleSearch(undefined, item)} 
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border t-border bg-[var(--surface-2)] hover:bg-[var(--bg-tertiary)] text-xs sm:text-sm t-muted hover:t-text transition-colors"
            >
              <TrendingUp size={13} />
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className={variant !== 'navbar' ? 'mb-4 sm:mb-5' : ''}>
        <h3 className="text-[11px] sm:text-xs font-bold t-muted uppercase tracking-wider mb-2 sm:mb-2.5">
          Trending Topics
        </h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {TRENDING_TOPICS.map(topic => (
            <button 
              key={topic.name} 
              type="button" 
              onClick={() => handleSearch(undefined, topic.name)} 
              className="flex items-center gap-2 pr-3 p-1 rounded-lg border t-border bg-[var(--surface-2)] hover:bg-[var(--bg-tertiary)] text-xs sm:text-sm t-muted hover:t-text transition-colors"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded overflow-hidden shrink-0 bg-gray-200">
                <img src={topic.image} alt={topic.name} className="w-full h-full object-cover" />
              </div>
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Collections (Shown on Hero & Page variants) */}
      {variant !== 'navbar' && (
        <div>
          <h3 className="text-[11px] sm:text-xs font-bold t-muted uppercase tracking-wider mb-2 sm:mb-2.5">
            Trending Collections
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {TRENDING_COLLECTIONS.map(collection => (
              <button 
                key={collection} 
                type="button" 
                onClick={() => handleSearch(undefined, collection)} 
                className="px-3 sm:px-4 py-1.5 rounded-lg border t-border bg-[var(--surface-2)] hover:bg-[var(--bg-tertiary)] text-xs sm:text-sm t-muted hover:t-text transition-colors"
              >
                {collection}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // ================= NAVBAR VARIANT =================
  if (variant === 'navbar') {
    return (
      <div className="relative flex items-center z-50" ref={wrapperRef}>
        <form 
          onSubmit={handleSearch} 
          className={`
            flex items-center rounded-full transition-all duration-300 ease-out px-1
            ${isOpen 
              ? 'bg-[var(--surface)] border t-border w-[180px] sm:w-[240px] md:w-[300px] lg:w-[320px] shadow-sm' 
              : 'bg-transparent hover:bg-[var(--bg-tertiary)]/50 w-9 sm:w-10 md:w-44 lg:w-48'}
          `}
        >
          <button 
            type={isOpen ? "submit" : "button"} 
            onClick={() => !isOpen && setIsOpen(true)} 
            className="p-1.5 sm:p-2 t-muted hover:t-text transition-transform duration-300 hover:scale-105 flex-shrink-0" 
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          
          <input 
            value={val} 
            onChange={e => setVal(e.target.value)} 
            onFocus={() => setIsOpen(true)} 
            placeholder="Search..." 
            className={`
              bg-transparent text-xs sm:text-sm t-text outline-none transition-all duration-300 ease-out 
              placeholder:text-gray-400 dark:placeholder:text-gray-500 min-w-0
              ${isOpen ? 'w-full opacity-100 px-1 sm:px-2 py-1.5' : 'w-0 md:w-full opacity-0 md:opacity-100 md:px-2'}
            `} 
          />

          {isOpen && (
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors md:hidden"
            >
              <X size={14} />
            </button>
          )}
        </form>

        {isOpen && <DropdownMenu />}
      </div>
    );
  }

  // ================= HERO / PAGE VARIANTS =================
  return (
    <div ref={wrapperRef} className="relative flex flex-col items-center w-full max-w-3xl mx-auto z-50">
      <form 
        onSubmit={handleSearch} 
        className={`
          relative flex items-center w-full rounded-2xl sm:rounded-full p-1 sm:p-1.5 transition-all duration-300
          ${variant === 'page' ? 'bg-[var(--surface-2)] focus-within:bg-[var(--surface)]' : 'bg-[var(--surface)]'}
          border ${isOpen ? 'border-[var(--accent)]/50 ring-2 ring-[var(--accent)]/10' : variant === 'page' ? 'border-transparent hover:border-[var(--border)]' : 'border-gray-200 dark:border-white/10'}
          shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
        `}
      >
        <Search size={18} className="text-gray-400 ml-3 sm:ml-4 flex-shrink-0" />
        
        <input 
          value={val} 
          onChange={e => setVal(e.target.value)} 
          onFocus={() => setIsOpen(true)} 
          placeholder="Search birthday, Diwali, Christmas..." 
          className="flex-1 bg-transparent t-text text-xs sm:text-base px-2.5 sm:px-4 py-2 sm:py-3 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 min-w-0" 
        />
        
        {variant === 'hero' ? (
          <button 
            type="submit" 
            className="bg-[var(--text)] hover:opacity-90 active:scale-95 text-[var(--bg)] px-4 sm:px-8 py-2 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm whitespace-nowrap"
          >
            Search
          </button> 
        ) : (
          <div className="px-3 sm:px-4 text-xs t-faint hidden sm:block">↵</div>
        )}
      </form>

      {isOpen && <DropdownMenu />}
    </div>
  );
}