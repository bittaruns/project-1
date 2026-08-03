'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryData } from '@/type';

export function FeaturedCollections({ categories }: { categories: CategoryData[] }) {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const CARD_W = 260;
  const GAP = 16;
  const STEP = CARD_W + GAP;

  const maxIdx = Math.max(0, categories.length - 1);
  const clamp = (v: number) => Math.max(0, Math.min(maxIdx - 2, v));

  const goTo = (i: number) => setIdx(clamp(i));
  const canPrev = idx > 0;
  const canNext = idx < categories.length - 3;


  // todo: rounded card 
  return (
    <section className="t-surface-2 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div className="animate-fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold t-text">Featured Collections</h2>
            <p className="t-muted mt-2">Curated sets for every celebration</p>
          </div>
          <div className="flex items-center gap-2 animate-fade-up delay-200">
            <button
              onClick={() => goTo(idx - 1)} disabled={!canPrev} aria-label="Previous"
              className={`w-10 h-10 rounded-xl border t-border flex items-center justify-center transition-all duration-200
                ${canPrev ? 't-surface t-text hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] cursor-pointer' : 'opacity-30 cursor-not-allowed t-surface t-faint'}`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goTo(idx + 1)} disabled={!canNext} aria-label="Next"
              className={`w-10 h-10 rounded-xl border t-border flex items-center justify-center transition-all duration-200
                ${canNext ? 't-surface t-text hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] cursor-pointer' : 'opacity-30 cursor-not-allowed t-surface t-faint'}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4"
            style={{
              transform: `translateX(-${idx * STEP}px)`,
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              width: `${categories.length * STEP - GAP}px`,
            }}
          >
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => router.push(`/${cat.name.toLowerCase()}`)}
                className="group relative overflow-hidden rounded-2xl flex-shrink-0 card-hover border t-border animate-scale-in"
                style={{ width: CARD_W, animationDelay: `${i * 80}ms` }}
              >
                <img
                  src={cat.image} alt={cat.name}
                  className="w-full object-cover"
                  style={{ height: 180, transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.07)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <p className="text-white font-bold text-sm">{cat.name}</p>
                  <p className="text-white/60 text-xs mt-0.5">{cat.count.toLocaleString()} images</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-6">
          {categories.map((_, i) => (
            <button
              key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === idx ? 'w-6 h-2 bg-[var(--accent)]' : 'w-2 h-2 bg-[var(--border)]'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}