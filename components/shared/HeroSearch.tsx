'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function HeroSearch() {
  const router = useRouter();
  const [val, setVal] = useState('');

  // Expanded list to match the screenshot
  const SEARCH_CHIPS = ['Birthday', 'Diwali', 'Holi', 'Christmas', 'Anniversary', 'Good Morning', 'Love'];

  const handleSearch = (e?: React.FormEvent, query?: string) => {
    if (e) e.preventDefault();
    const finalQuery = query || val;
    if (finalQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(finalQuery)}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-3xl mx-auto">
      
      {/* Wide Pill Search Bar */}
      <form 
        onSubmit={(e) => handleSearch(e)}
        className="relative flex items-center w-full bg-white dark:bg-[#222222] border border-gray-200 dark:border-white/10 rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-shadow duration-300"
      >
        <Search
          size={20}
          className="text-gray-400 ml-4 flex-shrink-0"
        />
        <input
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="Search birthday, Diwali, Christmas..."
          className="flex-1 bg-transparent t-text text-base px-4 py-3 focus:outline-none placeholder:text-gray-400"
        />
        <button 
          type="submit" 
          className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 active:scale-95 text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors shadow-sm"
        > 
          Search 
        </button> 
      </form>

      {/* Search Chips */}
      {/* <div className="flex flex-wrap justify-center gap-3">
        {SEARCH_CHIPS.map(chip => (
          <button
            key={chip}
            type="button"
            onClick={() => handleSearch(undefined, chip)}
            className="px-5 py-2 rounded-full border border-gray-100 dark:border-white/10 dark:text-white/70 text-xs sm:text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:border-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-[#222222] shadow-sm active:scale-95"
          >
            {chip}
          </button>
        ))}
      </div> */}
    </div>
  );
}