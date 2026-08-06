import Link from 'next/link';
import { HeroCardFan } from '@/components/shared/HeroCardFan';
import { HeroSearch } from '@/components/shared/HeroSearch';
import { FeaturedCollections } from '@/components/shared/FeaturedCollections';
import { CATEGORIES } from '@/lib/mockdata';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <main>
      {/* ── Hero Section ── */}
      <section className="relative t-bg overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center min-h-[100svh] justify-start sm:justify-center">

        <div className="relative max-w-5xl mx-auto text-center z-10 w-full flex flex-col items-center">
          
          {/* Titles - Increased font size clamps for massive impact */}
          <div className="mb-8 animate-fade-up delay-100 w-full px-2">
            <h1 
              className="font-extrabold text-[var(--text)] tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(3rem, 9vw, 6rem)' }}
            >
              Beautiful <span className="text-[var(--accent)]">Greetings</span>
            </h1>
            <h2 
              className="font-extrabold text-gray-400 dark:text-gray-500 tracking-tight leading-tight mt-1"
              style={{ fontSize: 'clamp(2.75rem, 8vw, 5.5rem)' }}
            >
              for Every Moment.
            </h2>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-2xl relative z-40 mt-2 sm:mt-4 animate-fade-up delay-200">
            <HeroSearch />
          </div>

          {/* Animated card fan */}
          <div className="my-14 sm:my-20 animate-fade-up delay-300 origin-top scale-75 sm:scale-90 md:scale-100 relative z-10">
            <HeroCardFan />
          </div>

          {/* Stats Section - Removed border, added softer shadow */}
          <div className="animate-fade-up delay-500 bg-[var(--surface)]/50 backdrop-blur-md rounded-3xl px-8 sm:px-16 py-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none inline-flex flex-wrap justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold t-text mb-0.5">10K+</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">Greetings</p>
            </div>
            <div className="w-px bg-gray-200 dark:bg-white/10 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold t-text mb-0.5">2M+</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">Downloads</p>
            </div>
            <div className="w-px bg-gray-200 dark:bg-white/10 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold t-text mb-0.5">50+</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">Categories</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Featured Collections ── */}
      <FeaturedCollections categories={CATEGORIES} />

      {/* ── Trending Categories ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 t-bg relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-10 sm:mb-12 animate-fade-up text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight t-text">Trending Categories</h2>
              <p className="t-muted mt-2 text-sm sm:text-base font-medium">What everyone is sharing right now.</p>
            </div>
            <Link href="/categories" className="text-sm font-bold text-[var(--accent)] hover:opacity-80 transition-opacity">
              View all categories &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {CATEGORIES.slice(0, 4).map((cat, i) => (
              <Link
                href={`/${cat.name.toLowerCase()}`}
                key={cat.name}
                className="group relative overflow-hidden rounded-2xl aspect-square sm:aspect-auto sm:h-72 border t-border block shadow-sm animate-scale-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  loading="lazy" 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <p className="text-white font-bold text-lg sm:text-xl lg:text-2xl group-hover:translate-x-1 transition-transform duration-300">
                    {cat.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer/>
    </main>
  );
}