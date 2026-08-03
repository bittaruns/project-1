'use client';

import React, { useState } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { MasonryGrid } from '@/components/shared/MasonryGrid';
import { UNSPLASH_IMAGES } from '@/lib/mockdata';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setFilter] = useState('All');
  const [sort, setSort] = useState('trending');
  const [viewMode, setView] = useState<'grid' | 'list'>('grid');
  
  const filters = ['All', 'Birthday', 'Diwali', 'Christmas', 'Holi', 'Good Morning', 'Motivation', 'Love', 'Anniversary'];

  return (
    <main className="min-h-screen t-bg">
      {/* Search Header */}
      <section className="t-surface-2 py-12 px-4 sm:px-6 lg:px-8 border-b t-border">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold t-text mb-6 animate-fade-up">Find Your Perfect Greeting</h1>
          <div className="relative animate-fade-up delay-100">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 t-faint" />
            <input 
              type="text" 
              placeholder="Search birthday, Diwali, quotes…" 
              value={query}
              onChange={e => setQuery(e.target.value)} 
              autoFocus
              className="w-full pl-14 pr-5 py-4 rounded-2xl border t-border t-surface t-text text-base placeholder:[color:var(--text-faint)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all" 
            />
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          
          {/* Category Chips */}
          <div className="flex gap-2 flex-wrap">
            {filters.map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === f 
                    ? 'bg-[var(--accent)] text-white shadow-md' 
                    : 't-surface border t-border t-muted hover:border-[var(--accent)] hover:t-accent-text'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          
          {/* Sort & View Toggles */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)}
              className="px-3 py-2 rounded-xl border t-border t-surface t-text text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="downloads">Most Downloaded</option>
            </select>
            
            <div className="flex rounded-xl border t-border overflow-hidden">
              <button 
                onClick={() => setView('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[var(--accent-light)] t-accent-text' : 't-faint hover:t-text'}`}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[var(--accent-light)] t-accent-text' : 't-faint hover:t-text'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <p className="text-sm t-faint mb-6">
          {UNSPLASH_IMAGES.length} results{query && ` for "${query}"`}
        </p>
        
        {/* Pass the images to the Masonry Grid */}
        <MasonryGrid cards={UNSPLASH_IMAGES} />
      </div>
    </main>
  );
}