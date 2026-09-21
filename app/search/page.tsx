'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense, useMemo } from 'react';
import { Search, Grid, List, TrendingUp, Loader2 } from 'lucide-react';
import { MasonryGrid } from '@/components/shared/MasonryGrid';
import { LOCAL_CARDS, CATEGORIES } from '@/lib/mockdata';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';

  // 1. Hydration Safety State
  const [isMounted, setIsMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [viewMode, setView] = useState<'grid' | 'list'>('grid');
  
  // 2. Infinite Scroll State
  const [displayCount, setDisplayCount] = useState(15);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const observerTarget = useRef<HTMLDivElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const TRENDING_SEARCHES = ['diwali', 'birthday', 'thanksgiving', 'christmas'];
  const TRENDING_TOPICS = CATEGORIES.slice(0, 4);

  // 3. Instantly calculate filtered cards during render (No lag, no state desync)
  const filteredCards = useMemo(() => {
    if (!urlQuery.trim()) return LOCAL_CARDS;
    
    const lowerQ = urlQuery.toLowerCase().trim();
    return LOCAL_CARDS.filter(c => 
      c.title.toLowerCase().includes(lowerQ) ||
      c.category.toLowerCase().includes(lowerQ) ||
      c.tags.some(tag => tag.toLowerCase().includes(lowerQ))
    );
  }, [urlQuery]);

  const displayedCards = filteredCards.slice(0, displayCount);

  // Sync component safely after mount
  useEffect(() => {
    setIsMounted(true);
    setQuery(urlQuery);
    setDisplayCount(15); // Reset scroll position when user searches something new
  }, [urlQuery]);

  const handleSearch = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = customQuery !== undefined ? customQuery : query;
    setIsDropdownOpen(false);
    
    if (finalQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(finalQuery.trim())}`);
    } else {
      router.push(`/search`);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadMoreCards = useCallback(() => {
    if (isLoadingMore || displayCount >= filteredCards.length) return;
    
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + 15);
      setIsLoadingMore(false);
    }, 800);
  }, [isLoadingMore, displayCount, filteredCards.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreCards();
      },
      { threshold: 0.1, rootMargin: '400px' }
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => { if (observerTarget.current) observer.unobserve(observerTarget.current); };
  }, [loadMoreCards]);

  // Prevent rendering mismatched HTML during the initial server load
  if (!isMounted) {
    return (
      <main className="min-h-[100svh] bg-[#f9f9f9] dark:bg-black flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-[100svh] bg-[#f9f9f9] dark:bg-black text-black dark:text-white transition-colors flex flex-col pt-14">
      
      <style>{`
        /* Clean up native search icon on mobile browsers */
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button { display: none; }
      `}</style>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:pt-8 lg:pb-14 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8 relative z-40">
        
        {/* Left Side: Hero Text & Search Integration */}
        <div className="flex-1 w-full max-w-2xl lg:max-w-none animate-fade-up relative z-50">
          <h1 className="text-4xl sm:text-5xl lg:text-[46px] font-bold mb-4 tracking-tight leading-tight text-black dark:text-white">
            Warmly
          </h1>
          <div className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 space-y-1">
            <p>The internet's source for heartfelt greetings.</p>
            <p>Shared by people everywhere.</p>
          </div>
          
          <div className="relative w-full z-50" ref={searchWrapperRef}>
            <form 
              action="/search"
              onSubmit={(e) => handleSearch(e)}
              className={`relative flex items-center w-full bg-white dark:bg-[#18181b] border ${isDropdownOpen ? 'border-blue-500/50 ring-2 ring-blue-500/10' : 'border-gray-200 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#3f3f46]'} rounded-2xl transition-all shadow-sm`}
            >
              <Search size={20} className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 z-20" />
              <input 
                type="search" 
                name="q"
                enterKeyHint="search"
                placeholder="Search greetings, wishes, and quotes..." 
                value={query}
                onChange={e => setQuery(e.target.value)} 
                onFocus={() => setIsDropdownOpen(true)}
                className="w-full pl-12 sm:pl-14 pr-5 py-3.5 sm:py-4 bg-transparent text-black dark:text-white text-[16px] md:text-[15px] placeholder:text-gray-400 focus:outline-none rounded-2xl appearance-none"
              />
              <button type="submit" className="absolute w-0 h-0 opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>Search</button>
            </form>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-3 w-full bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-2xl shadow-2xl p-4 sm:p-6 text-left animate-fade-up origin-top overflow-hidden z-50">
                <div className="mb-5 sm:mb-6">
                  <h3 className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Trending Searches</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {TRENDING_SEARCHES.map(item => (
                      <button 
                        key={item} 
                        type="button" 
                        onMouseDown={(e) => { e.preventDefault(); setQuery(item); handleSearch(undefined, item); }} 
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#202024] hover:bg-gray-100 dark:hover:bg-[#2a2a2e] text-xs sm:text-sm text-gray-600 dark:text-gray-300 transition-colors"
                      >
                        <TrendingUp size={14} />{item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Trending Topics</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {TRENDING_TOPICS.map(topic => (
                      <button 
                        key={topic.name} 
                        type="button" 
                        onMouseDown={(e) => { e.preventDefault(); setQuery(topic.name); handleSearch(undefined, topic.name); }} 
                        className="flex items-center gap-2 sm:gap-3 pr-3 sm:pr-4 p-1 rounded-lg border border-gray-200 dark:border-[#27272a] bg-gray-50 dark:bg-[#202024] hover:bg-gray-100 dark:hover:bg-[#2a2a2e] text-xs sm:text-sm text-gray-600 dark:text-gray-300 transition-colors"
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded overflow-hidden shrink-0 bg-gray-200 dark:bg-[#27272a]">
                          <img src={topic.image} alt={topic.name} className="w-full h-full object-cover" />
                        </div>
                        {topic.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Popular Card */}
        <div className="w-full lg:w-[480px] border border-gray-200 dark:border-[#27272a] rounded-2xl bg-white dark:bg-[#18181b] p-1.5 overflow-hidden flex flex-row shadow-sm hover:shadow-md transition-shadow animate-fade-up relative z-20">
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp size={18} className="text-gray-700 dark:text-gray-300" />
                <span className="font-bold text-sm tracking-wide text-gray-900 dark:text-white">Discover</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl leading-tight">
                Top greetings <br/> this week.
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">Perfect for your loved ones.</p>
            </div>
            <Link 
              href="/categories"
              className="mt-6 self-start bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-semibold rounded-xl hover:scale-105 transition-transform duration-200 inline-block"
            >
              Explore our categories
            </Link>
          </div>
          
          <div className="w-[140px] sm:w-[180px] p-2 grid grid-cols-2 grid-rows-2 gap-2 relative">
             <div className="w-full h-full bg-blue-100 dark:bg-blue-900/20 border border-blue-500/10 rounded-xl"></div>
             <div className="w-full h-full bg-amber-100 dark:bg-amber-900/20 border border-amber-500/10 rounded-xl translate-y-4"></div>
             <div className="w-full h-full bg-sky-100 dark:bg-sky-900/20 border border-sky-500/10 rounded-xl -translate-y-4"></div>
             <div className="w-full h-full bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-500/10 rounded-xl"></div>
          </div>
        </div>
      </section>

      {/* Results Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-base text-gray-900 dark:text-white font-bold">
            {urlQuery ? `Results for "${urlQuery.trim()}"` : `All Greetings`} 
            <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">
              ({filteredCards.length})
            </span>
          </p>
          
          <div className="flex items-center gap-1">
            <button onClick={() => setView('grid')} className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'text-black bg-gray-100 dark:text-white dark:bg-[#27272a]' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}><Grid size={18} /></button>
            <button onClick={() => setView('list')} className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'text-black bg-gray-100 dark:text-white dark:bg-[#27272a]' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}><List size={18} /></button>
          </div>
        </div>
        
        {filteredCards.length > 0 ? (
          <MasonryGrid cards={displayedCards} viewMode={viewMode} />
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <Search size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No greetings found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try searching for something else like "Diwali" or "Birthday".</p>
          </div>
        )}
        
        {displayedCards.length < filteredCards.length && (
          <div ref={observerTarget} className="w-full flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[100svh] flex items-center justify-center bg-[#f9f9f9] dark:bg-black">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}