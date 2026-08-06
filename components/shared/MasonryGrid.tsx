'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Heart, Share2 } from 'lucide-react';
import { CardData } from '@/type';

// Internal ImageCard Component
function ImageCard({ card, onClick }: { card: CardData; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  
  // Track when the image actually finishes loading to prevent layout popping
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer card-hover t-surface border t-border flex flex-col bg-[var(--surface)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* 
        The placeholder background displays immediately, holding the exact height. 
        Once the image loads, it smoothly fades in. 
      */}
      <div 
        className="relative overflow-hidden w-full bg-[var(--bg-tertiary)]" 
        style={{ height: card.height || 300 }}
      >
        <img
          src={card.image} 
          alt={card.title} 
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Action Buttons overlay */}
        <div className={`absolute bottom-3 left-3 right-3 flex items-center justify-between transition-all duration-300 ease-out ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button
            onClick={e => { 
              e.stopPropagation(); 
              setDownloaded(true); 
              setTimeout(() => setDownloaded(false), 2000); 
            }}
            className="flex items-center gap-1.5 bg-white/95 text-gray-900 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-white transition-colors shadow-sm"
          >
            <Download size={14} />{downloaded ? 'Saved!' : 'Download'}
          </button>
          
          <div className="flex items-center gap-1.5">
            <button 
              onClick={e => { e.stopPropagation(); setLiked(!liked); }}
              className={`p-1.5 rounded-lg transition-all shadow-sm ${liked ? 'bg-[var(--accent)] text-white scale-105' : 'bg-white/95 text-gray-700 hover:bg-white'}`}
            >
              <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={e => e.stopPropagation()}
              className="p-1.5 rounded-lg bg-white/95 text-gray-700 hover:bg-white transition-all shadow-sm"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Clean, styled card footer */}
      <div className="p-4 pt-3">
        <p className="text-sm font-bold t-text truncate tracking-tight">{card.title}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs t-muted font-medium">{card.category}</span>
          <span className="text-xs t-muted flex items-center gap-1 font-medium">
            <Download size={12} />
            {card.downloads.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export function MasonryGrid({ cards }: { cards: CardData[] }) {
  const router = useRouter();
  const [colCount, setColCount] = useState(1);

  // Dynamically calculate how many columns we need based on window width
  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 1280) setColCount(5); // xl
      else if (window.innerWidth >= 1024) setColCount(4); // lg
      else if (window.innerWidth >= 768) setColCount(3); // md
      else if (window.innerWidth >= 640) setColCount(2); // sm
      else setColCount(1); // mobile
    };
    
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  // Distribute cards sequentially into the calculated columns
  // This prevents the grid from recalculating and jumping when infinite scroll triggers
  const columns: CardData[][] = Array.from({ length: colCount }, () => []);
  cards.forEach((card, i) => {
    columns[i % colCount].push(card);
  });

  return (
    <div className="flex items-start gap-5 w-full">
      {columns.map((columnCards, colIndex) => (
        <div key={`col-${colIndex}`} className="flex-1 flex flex-col gap-5">
          {columnCards.map((card, i) => (
            <ImageCard 
              key={`${card.id}-${colIndex}-${i}`} 
              card={card} 
              onClick={() => router.push(`/detail/${card.id}`)} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}