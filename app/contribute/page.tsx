import { Footer } from '@/components/layout/footer';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function ContributePage() {
  return (
    <main className="t-bg min-h-[100svh] flex flex-col w-full overflow-x-hidden">
      <div className="flex-1 pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        
        {/* ── Hero Section ── */}
        <div className="max-w-4xl animate-fade-up flex flex-col items-start">
          <h1 className="text-[3.5rem] sm:text-[5rem] lg:text-[7rem] font-extrabold t-text tracking-tighter leading-[0.9] mb-6">
            Work With Us.
          </h1>
        </div>

        {/* ── Contribute Content ── */}
        <div 
          className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 sm:mt-16 mb-20 animate-fade-up" 
          style={{ animationDelay: '150ms' }}
        >
          {/* Left Column */}
          <div className="md:col-span-4 lg:col-span-5">
            <h2 className="text-sm font-bold t-muted uppercase tracking-widest sticky top-24">
              For Creators
            </h2>
          </div>

          {/* Right Column */}
          <div className="md:col-span-8 lg:col-span-7">
            <h3 className="text-2xl sm:text-3xl leading-snug text-[var(--text)] font-bold mb-6 tracking-tight">
              Get your artwork featured.
            </h3>
            <p className="t-muted text-lg leading-relaxed font-medium mb-8">
              Are you a designer or illustrator? We are always looking to expand our library with fresh, beautiful styles. Submit your custom greeting cards to us, and if they fit our vibe, we will buy them at a fair price to feature in our global inventory.
            </p>
            <a 
              href="mailto:hello@warmly.app" 
              className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-[var(--text)] text-[var(--bg)] px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Submit your designs <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>
      
      <Footer />
    </main>
  );
}