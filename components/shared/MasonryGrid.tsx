'use client';

import React from 'react';
import Link from 'next/link';
import { CardData } from '@/lib/mockdata';

interface MasonryGridProps {
  cards: CardData[];
  viewMode?: 'grid' | 'list';
}

export function MasonryGrid({ cards, viewMode = 'grid' }: MasonryGridProps) {
  
  // List View Layout
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {cards.map((card, index) => (
          <Link 
            href={`/detail/${card.id}`} 
            key={`${card.id}-${index}`} 
            className="flex items-center gap-4 p-3 sm:p-4 bg-transparent hover:bg-gray-50 dark:hover:bg-[#18181b] rounded-2xl transition-colors group"
          >
            <div className="w-24 h-20 sm:w-40 sm:h-28 shrink-0 rounded-[10px] overflow-hidden bg-gray-100 dark:bg-[#27272a] border border-black/5 dark:border-white/5">
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="text-gray-900 dark:text-[#e4e4e7] font-semibold text-[14px] sm:text-[15px] truncate group-hover:text-black dark:group-hover:text-white transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-500 dark:text-[#71717a] text-[13px] mt-0.5">
                {card.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // Standard Grid View (Matching the Wallper Screenshot exactly)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
      {cards.map((card, index) => (
        <Link 
          href={`/detail/${card.id}`} 
          key={`${card.id}-${index}`} 
          className="group cursor-pointer flex flex-col gap-2.5"
        >
          {/* Image Container with precise rounded corners and 16:9 ratio */}
          <div className="block relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-[12px] overflow-hidden border border-black/5 dark:border-white/5 bg-gray-100 dark:bg-[#121212]">
            <img 
              src={card.image} 
              alt={card.title} 
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
            {/* Very subtle hover overlay to make it feel interactive */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
          </div>
          
          {/* Text underneath the image */}
          <div className="flex flex-col justify-start px-0.5">
            <h3 className="text-gray-900 dark:text-[#e4e4e7] font-semibold text-[14px] truncate group-hover:text-black dark:group-hover:text-white transition-colors">
              {card.title}
            </h3>
            <p className="text-gray-500 dark:text-[#71717a] text-[13px] font-medium mt-0.5">
              {card.category}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}