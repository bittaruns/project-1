import Link from 'next/link';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { Sparkles } from 'lucide-react';
import { HeroCardFan } from '@/components/shared/HeroCardFan';
import { HeroSearch } from '@/components/shared/HeroSearch';
import { FeaturedCollections } from '@/components/shared/FeaturedCollections';
import { CATEGORIES } from '@/lib/mockdata';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap' 
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  style: ['italic'], 
  weight: ['600', '700'],
  display: 'swap' 
});

export default function HomePage() {
  return (
    <main>
      {/* ── Hero Section ── */}
      {/* Reduced top/bottom padding to keep it on one screen */}
      <section className="relative t-bg overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center min-h-[105vh] justify-center">
        
        {/* Background Textures: Grid (with fade mask) + Radial */}
        {/* The mask-image makes the grid visible at the top and fade to transparent at the bottom */}
        <div className="absolute inset-0 pointer-events-none bg-grid-pattern z-0 [mask-image:linear-gradient(to_bottom,white_5%,transparent_40%)]" />
        <div className="absolute inset-0 pointer-events-none bg-radial-shadow z-0" />

        <div className="relative max-w-5xl mx-auto text-center z-10 w-full flex flex-col items-center">
          
          {/* Badge */}
          {/* <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 opacity-90 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] mb-4 shadow-sm">
              <span className={`${jakarta.className} text-xs font-semibold tracking-wide`}>
                Over 1,000 Greetings
              </span>
            </div>
          </div> */}

          {/* Titles - Reduced font clamp sizes */}
          <div className="mb-6 animate-fade-up delay-100 scale-130">
            <h1 
              className={`${jakarta.className} font-[600] text-[#111827] dark:text-white leading-[1.05] tracking-tight`}
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Beautiful <span className="text-[var(--accent)]">Greetings</span>
            </h1>
            <h2 
              className={`${jakarta.className} italic font-bold text-[#6B7280] dark:text-gray-300 leading-tight mt-1`}
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              for Every Moment.
            </h2>
          </div>

          {/* Search Bar - Reduced bottom margin */}
          <div className="w-full relative z-30 mb- mt-5 animate-fade-up delay-200">
            <HeroSearch />
          </div>

          {/* Animated card fan - Added origin-top and slight scaling on mobile to fit */}
          <div className="mb-8 animate-fade-up delay-300 origin-top scale-90 sm:scale-100">
            <HeroCardFan />
          </div>

          {/* Stats Section - Tightened gap and margins */}
          <div className={`${jakarta.className} flex flex-wrap justify-center gap-8 sm:gap-16 mt-2 animate-fade-up delay-500`}>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-[#292c31]/60 dark:text-white/40 mb-1">1K+</p>
              <p className="text-xs sm:text-sm text-gray-400 dark:text-white/20 font-medium">Greeting Cards</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-[#292c31]/60 dark:text-white/40 mb-1">200K+</p>
              <p className="text-xs sm:text-sm text-gray-400 dark:text-white/20 font-medium">Downloads</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-[#292c31]/60 dark:text-white/40 mb-1">50</p>
              <p className="text-xs sm:text-sm text-gray-400 dark:text-white/20 font-medium">Categories</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Featured Collections ── */}
      <FeaturedCollections categories={CATEGORIES} />

      {/* ── Trending Categories ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 t-bg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 animate-fade-up">
            <h2 className={`${jakarta.className} text-2xl sm:text-3xl font-bold t-text`}>Trending Categories</h2>
            <p className="t-muted mt-2">What everyone is sharing right now</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link
                href={`/${cat.name.toLowerCase()}`}
                key={cat.name}
                className="group relative overflow-hidden rounded-2xl aspect-square border t-border card-hover animate-scale-in block"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  loading="lazy" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className={`${jakarta.className} text-white font-bold text-sm sm:text-base`}>{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}