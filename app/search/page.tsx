'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Grid, List, TrendingUp, Loader2 } from 'lucide-react';
import { MasonryGrid } from '@/components/shared/MasonryGrid';
import { UNSPLASH_IMAGES } from '@/lib/mockdata';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeFilter, setFilter] = useState('Featured');
  const [viewMode, setView] = useState<'grid' | 'list'>('grid');
  
  const [cards, setCards] = useState(UNSPLASH_IMAGES);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const observerTarget = useRef<HTMLDivElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filters = ['Featured', 'Birthday', 'Diwali', 'Christmas', 'Holi', 'Good Morning', 'Motivation', 'Love', 'Anniversary'];
  const TRENDING_SEARCHES = ['diwali wishes', 'birthday', 'motivation', 'good morning'];
  const TRENDING_TOPICS = [
    { name: 'Wallpapers', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop' },
    { name: 'Festivals', image: 'https://images.unsplash.com/photo-1533227260879-108b3cc1a6eb?q=80&w=100&auto=format&fit=crop' },
  ];

  const handleSearch = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = customQuery || query;
    if (finalQuery.trim()) {
      setQuery(finalQuery);
      setIsDropdownOpen(false);
      router.push(`/search?q=${encodeURIComponent(finalQuery)}`);
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
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setCards(prevCards => [...prevCards, ...UNSPLASH_IMAGES]);
      setIsLoadingMore(false);
    }, 1500);
  }, [isLoadingMore]);

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

  return (
    <main className="min-h-[100svh] t-bg flex flex-col pt-14">
      
      {/* Inline styles for the soothing float animation */}
      <style>{`
        @keyframes float-soft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .anim-float-1 { animation: float-soft 4s ease-in-out infinite; }
        .anim-float-2 { animation: float-soft 5s ease-in-out infinite 1s; }
        .anim-float-3 { animation: float-soft 4.5s ease-in-out infinite 0.5s; }
        .anim-float-4 { animation: float-soft 5.5s ease-in-out infinite 1.5s; }
      `}</style>

      {/* Animated Filter Navigation */}
      <div className="w-full bg-[var(--bg)]/80 backdrop-blur-xl sticky top-14 z-30 pb-2 animate-fade-up">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2 flex justify-start md:justify-center gap-2 sm:gap-3 text-sm font-medium overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filters.map((f, i) => (
            <button 
              key={f} onClick={() => setFilter(f)} style={{ animationDelay: `${i * 30}ms` }}
              className={`animate-scale-in transition-all duration-200 px-4 py-1.5 rounded-full ${
                activeFilter === f ? 'bg-[var(--text)] text-[var(--bg)] shadow-sm' : 't-muted hover:t-text hover:bg-[var(--bg-tertiary)]/50'
              }`}
            >
              {f}
            </button>
          ))}
        </nav>
      </div>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8 relative z-40">
        
        {/* Left Side: Hero Text & Search Integration */}
        <div className="flex-1 w-full max-w-2xl lg:max-w-none animate-fade-up relative z-50" style={{ animationDelay: '100ms' }}>
          <h1 className="text-4xl sm:text-5xl lg:text-[46px] font-bold t-text mb-4 tracking-tight leading-tight">
            Warmly
          </h1>
          <div className="text-base sm:text-lg t-text mb-6 space-y-1">
            <p>The internet's source for heartfelt greetings.</p>
            <p>Shared by people everywhere.</p>
          </div>
          
          <div className="relative w-full z-50" ref={searchWrapperRef}>
            <form 
              onSubmit={(e) => handleSearch(e)}
              className={`relative flex items-center w-full bg-[var(--surface-2)] border ${isDropdownOpen ? 'border-[var(--accent)]/50 ring-2 ring-[var(--accent)]/10' : 'border-transparent hover:border-[var(--border)]'} focus-within:bg-[var(--surface)] rounded-2xl transition-all shadow-sm`}
            >
              <Search size={20} className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 t-faint z-20" />
              <input 
                type="text" 
                placeholder="Search greetings, wishes, and quotes..." 
                value={query}
                onChange={e => setQuery(e.target.value)} 
                onFocus={() => setIsDropdownOpen(true)}
                className="w-full pl-12 sm:pl-14 pr-5 py-3.5 sm:py-4 bg-transparent t-text text-sm sm:text-base placeholder:t-muted focus:outline-none rounded-2xl"
              />
            </form>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-3 w-full bg-[var(--surface)] border t-border rounded-2xl shadow-2xl p-4 sm:p-6 text-left animate-fade-up origin-top overflow-hidden z-50">
                <div className="mb-5 sm:mb-6">
                  <h3 className="text-[11px] sm:text-xs font-bold t-muted uppercase tracking-wider mb-2.5">Trending Searches</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {TRENDING_SEARCHES.map(item => (
                      <button key={item} type="button" onClick={() => handleSearch(undefined, item)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border t-border bg-[var(--surface-2)] hover:bg-[var(--bg-tertiary)] text-xs sm:text-sm t-muted hover:t-text transition-colors">
                        <TrendingUp size={14} />{item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[11px] sm:text-xs font-bold t-muted uppercase tracking-wider mb-2.5">Trending Topics</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {TRENDING_TOPICS.map(topic => (
                      <button key={topic.name} type="button" onClick={() => handleSearch(undefined, topic.name)} className="flex items-center gap-2 sm:gap-3 pr-3 sm:pr-4 p-1 rounded-lg border t-border bg-[var(--surface-2)] hover:bg-[var(--bg-tertiary)] text-xs sm:text-sm t-muted hover:t-text transition-colors">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded overflow-hidden shrink-0 bg-gray-200">
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

        {/* Right Side: Popular Card with Infinite Animation */}
        <div className="w-full lg:w-[480px] border t-border rounded-2xl bg-[var(--surface)] p-1.5 overflow-hidden flex flex-row shadow-sm hover:shadow-md transition-shadow animate-fade-up relative z-20" style={{ animationDelay: '200ms' }}>
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp size={18} className="t-text" />
                <span className="font-bold text-sm tracking-wide">Discover</span>
              </div>
              <h3 className="font-bold t-text text-lg sm:text-xl leading-tight">
                Top greetings <br/> this week.
              </h3>
              <p className="t-muted text-xs sm:text-sm mt-1">Perfect for your loved ones.</p>
            </div>
            <Link 
              href="/categories"
              className="mt-6 self-start bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-semibold rounded-xl hover:scale-105 transition-transform duration-200 inline-block"
            >
              Explore Popular
            </Link>
          </div>
          
          {/* Animated 2x2 Grid */}
          <div className="w-[140px] sm:w-[180px] p-2 grid grid-cols-2 grid-rows-2 gap-2 relative">
             <div className="w-full h-full">
               <div className="w-full h-full bg-[var(--accent-light)] border border-[var(--accent)]/10 rounded-xl anim-float-1"></div>
             </div>
             <div className="w-full h-full translate-y-4">
               <div className="w-full h-full bg-amber-100 dark:bg-amber-900/20 border border-amber-500/10 rounded-xl anim-float-2"></div>
             </div>
             <div className="w-full h-full -translate-y-4">
               <div className="w-full h-full bg-sky-100 dark:bg-sky-900/20 border border-sky-500/10 rounded-xl anim-float-3"></div>
             </div>
             <div className="w-full h-full">
               <div className="w-full h-full bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-500/10 rounded-xl anim-float-4"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Masonry Layout Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 animate-fade-up relative z-10" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between mb-8">
          <p className="text-base t-text font-bold">
            {activeFilter} Greetings <span className="t-muted font-normal ml-2">{query && `• Results for "${query}"`}</span>
          </p>
          
          <div className="flex items-center gap-1">
            <button onClick={() => setView('grid')} className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 't-text bg-[var(--surface-2)]' : 't-faint hover:t-text'}`}><Grid size={18} /></button>
            <button onClick={() => setView('list')} className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 't-text bg-[var(--surface-2)]' : 't-faint hover:t-text'}`}><List size={18} /></button>
          </div>
        </div>
        
        <MasonryGrid cards={cards} />
        
        <div ref={observerTarget} className="w-full flex justify-center py-12">
          {isLoadingMore && <Loader2 className="w-8 h-8 t-muted animate-spin" />}
        </div>
      </div>
    </main>
  );
}