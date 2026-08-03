'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Heart, Share2 } from 'lucide-react';
import { CardData } from '@/type';
// Internal ImageCard Component
function ImageCard({ card, onClick, delay = 0 }: { card: CardData; onClick: () => void; delay?: number }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer card-hover t-surface border t-border animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden" style={{ height: card.height }}>
        <img
          src={card.image} alt={card.title} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.5s ease' }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-3 left-3 right-3 flex items-center justify-between transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <button
            onClick={e => { e.stopPropagation(); setDownloaded(true); setTimeout(() => setDownloaded(false), 2000); }}
            className="flex items-center gap-1.5 bg-white text-gray-900 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            <Download size={12} />{downloaded ? 'Saved!' : 'Download'}
          </button>
          <div className="flex items-center gap-1.5">
            <button onClick={e => { e.stopPropagation(); setLiked(!liked); }}
              className={`p-2 rounded-xl transition-all ${liked ? 'bg-red-500 text-white scale-110' : 'bg-white/90 text-gray-700 hover:bg-white'}`}>
              <Heart size={13} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <button onClick={e => e.stopPropagation()}
              className="p-2 rounded-xl bg-white/90 text-gray-700 hover:bg-white transition-all">
              <Share2 size={13} />
            </button>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold t-text truncate">{card.title}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs t-faint">{card.category}</span>
          <span className="text-xs t-faint flex items-center gap-1"><Download size={10} />{card.downloads.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export function MasonryGrid({ cards }: { cards: CardData[] }) {
  const router = useRouter();
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
      {cards.map((card, i) => (
        <div key={card.id} className="break-inside-avoid mb-4">
          <ImageCard card={card} onClick={() => router.push(`/detail/${card.id}`)} delay={i * 60} />
        </div>
      ))}
    </div>
  );
}