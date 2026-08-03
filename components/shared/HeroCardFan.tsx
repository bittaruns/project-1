'use client';

import React, { useState, useEffect } from 'react';

// 1. Increased the 'tx' (Translate X) spread to accommodate wider cards
const FAN_CARDS = [
  { img: '/hero/1.jpeg', rotate: -20, tx: -400, ty: 80, z: 1 }, 
  { img: '/hero/2.jpeg', rotate: -12, tx: -300, ty: 15, z: 2 }, 
  { img: '/hero/3.jpeg', rotate: -6,  tx: -170, ty: 45, z: 3 }, 
  { img: '/hero/4.jpeg', rotate: -2,  tx: -50,  ty: 0,  z: 4 }, 
  { img: '/hero/5.jpeg', rotate: 3,   tx: 50,   ty: 30, z: 5 }, 
  { img: '/hero/6.jpeg', rotate: 9,   tx: 170,  ty: -5, z: 6 }, 
  { img: '/hero/7.jpeg', rotate: 15,  tx: 300,  ty: 40, z: 7 }, 
  { img: '/hero/8.jpeg', rotate: 20,  tx: 400,  ty: 15, z: 8 }, 
];

export function HeroCardFan() {
  const [fanned, setFanned] = useState(false);
  const [badgesVisible, setBadgesVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setFanned(true), 150);
    const t2 = setTimeout(() => setBadgesVisible(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // 2. Increased the physical width of the cards
  const CARD_W = 205; // Increased from 220
  const CARD_H = 205; // Kept height the same, making them wider rectangles

  const smoothStyle = {
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
    WebkitFontSmoothing: 'antialiased',
  } as React.CSSProperties;

  return (
    <div className="relative flex items-center justify-center w-full" style={{ height: CARD_H + 130 }}>
      
      {/* Light Peach (Wedding) */}
      {/* <div
        className="absolute pointer-events-none z-20 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          left: '10%', top: 20,
          transform: `translateX(${badgesVisible ? '-240px' : '0px'}) translateY(${badgesVisible ? '0px' : '20px'})`,
          opacity: badgesVisible ? 1 : 0,
        }}
      >
        <div className="bg-[#ffedd5] text-[#c2410c] border border-[#fed7aa] px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
          @Wedding
        </div>
      </div> */}

      {/* Pale Green (Birthday) */}
      {/* <div
        className="absolute pointer-events-none z-20 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100"
        style={{
          right: '-20%', top: 10,
          transform: `translateX(${badgesVisible ? '210px' : '0px'}) translateY(${badgesVisible ? '0px' : '20px'})`,
          opacity: badgesVisible ? 1 : 0,
        }}
      >
        <div className="bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
          @Birthday
        </div>
      </div> */}

      {/* Baby Blue (Christmas) */}
      {/* <div
        className="absolute pointer-events-none z-20 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200"
        style={{
          left: '65%', top: -10,
          transform: `translateX(${badgesVisible ? '-70px' : '0px'}) translateY(${badgesVisible ? '0px' : '20px'})`,
          opacity: badgesVisible ? 1 : 0,
        }}
      >
        <div className="bg-[#dbeafe] text-[#1d4ed8] border border-[#bfdbfe] px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
          @Christmas
        </div>
      </div> */}

      {/* The 8 Cards */}
      {/* 3. This relative div automatically takes the size of CARD_W and CARD_H */}
      <div className="relative" style={{ width: CARD_W, height: CARD_H }}>
        {FAN_CARDS.map((card, i) => {
          const isHovered = hoveredIndex === i;
          
          let transform = '';
          if (!fanned) {
            transform = `translateX(0px) translateY(30px) rotate(0deg) scale(1)`;
          } else if (isHovered) {
            transform = `translateX(${card.tx}px) translateY(${card.ty - 25}px) rotate(${card.rotate}deg) scale(1.08)`;
          } else {
            transform = `translateX(${card.tx}px) translateY(${card.ty}px) rotate(${card.rotate}deg) scale(1)`;
          }

          const zIndex = isHovered ? 50 : card.z;
          const transformTransition = fanned 
            ? `transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)` 
            : `transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 30}ms`;

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="absolute top-0 left-0 cursor-pointer rounded-[20px] overflow-hidden bg-[var(--surface)] border border-black/5 dark:border-white/10"
              style={{
                ...smoothStyle,
                width: CARD_W,
                height: CARD_H,
                zIndex,
                transform,
                opacity: fanned ? 1 : (i === 3 || i === 4) ? 1 : 0,
                transition: `${transformTransition}, opacity 0.5s ease`,
                boxShadow: isHovered 
                  ? '0 30px 60px -12px rgba(0, 0, 0, 0.35)' 
                  : '0 15px 35px -5px rgba(0, 0, 0, 0.15)',
              }}
            >
              <img
                src={card.img}
                alt={`Hero Card ${i + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}