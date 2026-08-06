'use client';

import React, { useState, useEffect } from 'react';

// Spread out wider in a smooth, elegant semi-linear arc
const FAN_CARDS = [
  { img: '/hero/1.jpeg', rotate: -18, tx: -420, ty: 45, z: 10 }, 
  { img: '/hero/2.jpeg', rotate: -11, tx: -250, ty: 20, z: 20 }, 
  { img: '/hero/3.jpeg', rotate: -4,  tx: -80,  ty: 5,  z: 30 }, 
  { img: '/hero/4.jpeg', rotate: 4,   tx: 80,   ty: 5,  z: 40 }, 
  { img: '/hero/5.jpeg', rotate: 11,  tx: 250,  ty: 20, z: 50 }, 
  { img: '/hero/6.jpeg', rotate: 18,  tx: 420,  ty: 45, z: 60 }, 
];

export function HeroCardFan() {
  const [fanned, setFanned] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setFanned(true), 150);
    return () => clearTimeout(t1);
  }, []);

  // Card dimensions
  const CARD_W = 210; 
  const CARD_H = 210; 

  const smoothStyle = {
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
    WebkitFontSmoothing: 'antialiased',
  } as React.CSSProperties;

  return (
    <div className="relative flex items-center justify-center w-full" style={{ height: CARD_H + 20 }}>
      
      <div className="relative flex items-center justify-center" style={{ width: CARD_W, height: CARD_H }}>
        {FAN_CARDS.map((card, i) => {
          const isHovered = hoveredIndex === i;
          
          let transform = '';
          if (!fanned) {
            transform = `translateX(0px) translateY(20px) rotate(0deg) scale(0.9)`;
          } else if (isHovered) {
            transform = `translateX(${card.tx}px) translateY(${card.ty - 25}px) rotate(${card.rotate}deg) scale(1.12)`;
          } else {
            transform = `translateX(${card.tx}px) translateY(${card.ty}px) rotate(${card.rotate}deg) scale(1)`;
          }

          const zIndex = isHovered ? 150 : card.z;
          const transformTransition = fanned 
            ? `transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)` 
            : `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms`;

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="absolute top-0 left-0 cursor-pointer rounded-[24px] overflow-hidden bg-[var(--surface-2)]"
              style={{
                ...smoothStyle,
                width: CARD_W,
                height: CARD_H,
                zIndex,
                transform,
                opacity: fanned ? 1 : (i === 3) ? 1 : 0,
                transition: `${transformTransition}, opacity 0.5s ease, box-shadow 0.4s ease`,
                boxShadow: isHovered 
                  ? '0 40px 80px -12px rgba(0, 0, 0, 0.5)' 
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <img
                src={card.img}
                alt={`Warmly Featured Card ${i + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
            </div>
          );
        })}
      </div>
    </div>
  );
}