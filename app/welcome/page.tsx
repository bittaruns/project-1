'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HeroSearch } from "@/components/shared/UniversalSearch";
import { Footer } from "@/components/layout/footer";
import { CATEGORIES } from "@/lib/mockdata";

const FEATURES_DATA = [
  {
    label: "Love & Romance",
    title: "Express your heart.",
    desc: "Whether it's Valentine's Day or just a Tuesday, find the perfect words to show them how much you care with our beautiful romantic greetings.",
    image: "/Cards/valentines_day/Valentines-1.jpg"
  },
  {
    label: "Festive Joy",
    title: "Spread the cheer.",
    desc: "Share the warmth of the holidays. From Merry Christmas to Thanksgiving, our festive collection brings everyone closer together.",
    image: "/Cards/christmas/christmas-1.jpg"
  },
  {
    label: "Cultural Celebrations",
    title: "Illuminate their day.",
    desc: "Celebrate diversity with stunning greetings for Diwali, Eid, Hanukkah, and Holi. Perfect for wishing peace, light, and prosperity.",
    image: "/Cards/diwali/Diwali-1.jpg"
  },
  {
    label: "Spooky Season",
    title: "Thrills and chills.",
    desc: "Get into the spooky spirit! Send fun, eerie, and creative Halloween cards that will give your friends a delightful fright.",
    image: "/Cards/halloween/Halloween-1.jpg"
  }
];

export default function WelcomePage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const row1Categories = CATEGORIES.slice(0, 7);
  const row2Categories = CATEGORIES.slice(7, 13);

  // Smooth Intersection Observer for desktop scroll tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = featureRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) setActiveFeature(index);
          }
        });
      },
      // Trigger exactly when the item reaches the center of the viewport
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 } 
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToFeature = (index: number) => {
    featureRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const generateTag = (name: string) => {
    return `#${name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  };

  return (
    <main className="bg-[#f9f9f9] dark:bg-black text-black dark:text-white min-h-[100svh] flex flex-col w-full transition-colors duration-300">
      
      {/* ── Custom Animations ── */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1) translate(0px, 0px); }
          50% { transform: scale(1.06) translate(-1%, -1%); }
        }
        .animate-breathe {
          animation: breathe 25s ease-in-out infinite;
        }
        
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 80s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 80s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── 1. Hero Section ── */}
      <div className="p-4 sm:p-5 lg:p-6">
        <section className="relative min-h-[calc(100svh-6rem)] flex flex-col p-6 sm:p-10">
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
            <div className="absolute inset-0 bg-[url('/BI.webp')] bg-cover bg-center bg-no-repeat opacity-100 animate-breathe" />
            <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/50 transition-colors duration-500" />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col flex-1 justify-between max-w-7xl mx-auto">
            <div className="w-full flex justify-center pt-2 sm:pt-4">
              <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#FFDD00] animate-pulse" />
                <span className="text-xs font-extrabold text-black tracking-wider uppercase">Over 2M+ Downloads</span>
              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center text-center flex-1 my-8 drop-shadow-xl">
              <div className="animate-fade-up delay-100 w-full flex flex-col items-center px-2 gap-2 sm:gap-4">
                <h1 className="font-extrabold text-black dark:text-white tracking-tight leading-[1.1] text-center w-full sm:whitespace-nowrap" style={{ fontSize: "clamp(2.8rem, 5.5vw, 6rem)" }}>
                  Greeting for <span>every</span> moment.
                </h1>
                <p className="font-medium text-gray-800 dark:text-white/90 mt-2 text-center drop-shadow-md px-4" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)" }}>
                  Find, download, and share stunning HD greeting cards instantly.
                </p>
              </div>
              
              <div className="w-full sm:w-[420px] px-2 sm:px-0 mt-8 animate-fade-up delay-200">
                <HeroSearch />
              </div>
            </div>

            <div className="w-full flex justify-center pb-2 sm:pb-4">
              <Link href="/download-app" className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 sm:px-8 sm:py-4 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md border border-gray-100 dark:border-none">
                <span className="text-sm sm:text-base font-bold text-black">Get the Free App</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ── 2. Premium Smooth Sticky Scroll Section ── */}
      <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mt-4 md:mt-12">
        
        {/* Mobile-Only Heading (Hidden on Desktop) */}
        <div className="md:hidden mb-10 text-center sm:text-left">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-black dark:text-white leading-tight">
            Celebrate every occasion.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-24 relative">
          
          {/* Left Column (Sticky Navigation - DESKTOP ONLY) */}
          <div className="hidden md:flex w-full md:w-1/3 sticky top-32 z-30 flex-col gap-10">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black dark:text-white leading-tight">
              Celebrate every occasion.
            </h2>
            
            <div className="relative">
              {/* Animated Vertical Line Indicator */}
              <div 
                className="absolute left-0 w-[3px] bg-black dark:bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ 
                  top: `${(activeFeature * 100) / FEATURES_DATA.length}%`, 
                  height: `${100 / FEATURES_DATA.length}%` 
                }} 
              />
              
              <ul className="flex flex-col text-xl font-medium border-l-2 border-gray-200 dark:border-[#27272a] relative">
                {FEATURES_DATA.map((feature, idx) => {
                  const isActive = activeFeature === idx;
                  return (
                    <li 
                      key={idx}
                      onClick={() => scrollToFeature(idx)}
                      className={`shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer whitespace-nowrap 
                        py-5 pl-8
                        ${isActive 
                          ? 'text-black dark:text-white font-bold translate-x-3' 
                          : 'text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white hover:translate-x-1'
                        }`}
                    >
                      {feature.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right Column (Scrolling Image Blocks) */}
          <div className="w-full md:w-2/3 flex flex-col gap-16 md:gap-40 pb-12 md:pb-24">
            {FEATURES_DATA.map((feature, i) => (
              <div 
                key={i} 
                ref={(el) => { featureRefs.current[i] = el; }} 
                className="flex flex-col gap-6 scroll-mt-32"
              >
                <div className="w-full aspect-square sm:aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] border border-gray-200 dark:border-[#27272a] shadow-xl md:shadow-2xl overflow-hidden relative group bg-gray-100 dark:bg-[#121212]">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-[1.5rem] md:rounded-[2rem] pointer-events-none" />
                </div>
                
                <div>
                  {/* Mobile-Only Label Badge (Hidden on Desktop) */}
                  <span className="md:hidden text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">
                    {feature.label}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black dark:text-white">{feature.title}</h3>
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Community Marquee Section ── */}
      <section className="py-24 bg-transparent overflow-hidden w-full relative border-t border-gray-200 dark:border-white/5">
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-black dark:text-white">
            Made by community.<br />Greetings that truly live.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thousands of HD greetings, crafted and curated for every occasion. Refreshed every single day.
          </p>
        </div>

        {/* Marquee Row 1 */}
        <div className="w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="flex w-max animate-marquee-left hover:pause">
            
            {/* Block 1 */}
            <div className="flex items-start gap-6 pr-6">
              {row1Categories.map((category, i) => (
                <div key={i} className="flex flex-col group shrink-0 w-[280px] sm:w-[350px]">
                  <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-[#27272a] aspect-[16/9] bg-gray-100 dark:bg-[#121212]">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                  </div>
                  <div className="mt-4 flex items-center justify-between px-1">
                    <span className="font-bold text-black dark:text-white text-[15px]">{category.name}</span>
                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] px-2.5 py-1 rounded-md transition-colors group-hover:bg-gray-200 group-hover:dark:bg-[#27272a]">
                      {generateTag(category.name)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Block 2 (Duplicate for Loop) */}
            <div className="flex items-start gap-6 pr-6">
              {row1Categories.map((category, i) => (
                <div key={`dup-${i}`} className="flex flex-col group shrink-0 w-[280px] sm:w-[350px]">
                  <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-[#27272a] aspect-[16/9] bg-gray-100 dark:bg-[#121212]">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                  </div>
                  <div className="mt-4 flex items-center justify-between px-1">
                    <span className="font-bold text-black dark:text-white text-[15px]">{category.name}</span>
                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] px-2.5 py-1 rounded-md transition-colors group-hover:bg-gray-200 group-hover:dark:bg-[#27272a]">
                      {generateTag(category.name)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Marquee Row 2 (Reverse) */}
        <div className="w-full inline-flex flex-nowrap mt-10 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="flex w-max animate-marquee-right hover:pause">
            
            {/* Block 1 */}
            <div className="flex items-start gap-6 pr-6">
              {row2Categories.map((category, i) => (
                <div key={i} className="flex flex-col group shrink-0 w-[240px] sm:w-[300px]">
                  <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-[#27272a] aspect-[4/3] bg-gray-100 dark:bg-[#121212]">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                  </div>
                  <div className="mt-4 flex items-center justify-between px-1">
                    <span className="font-bold text-black dark:text-white text-[15px]">{category.name}</span>
                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] px-2.5 py-1 rounded-md transition-colors group-hover:bg-gray-200 group-hover:dark:bg-[#27272a]">
                      {generateTag(category.name)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Block 2 (Duplicate for Loop) */}
            <div className="flex items-start gap-6 pr-6">
              {row2Categories.map((category, i) => (
                <div key={`dup2-${i}`} className="flex flex-col group shrink-0 w-[240px] sm:w-[300px]">
                  <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-[#27272a] aspect-[4/3] bg-gray-100 dark:bg-[#121212]">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                  </div>
                  <div className="mt-4 flex items-center justify-between px-1">
                    <span className="font-bold text-black dark:text-white text-[15px]">{category.name}</span>
                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] px-2.5 py-1 rounded-md transition-colors group-hover:bg-gray-200 group-hover:dark:bg-[#27272a]">
                      {generateTag(category.name)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}