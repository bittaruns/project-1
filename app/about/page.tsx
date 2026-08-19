import { Footer } from '@/components/layout/footer';
import { Coffee } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="t-bg min-h-[100svh] flex flex-col w-full overflow-x-hidden">
      <div className="flex-1 pt-11 sm:pt-15 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        
        {/* ── Elegant Hero Reveal with Original Logo ── */}
        <div className="max-w-4xl animate-fade-up flex flex-col items-start">
          <h1 className="text-[4rem] sm:text-[6rem] lg:text-[8rem] font-extrabold t-text tracking-tighter leading-[0.9] mb-6">
            About Us.
          </h1>
        </div>

        {/* ── The Story Section ── */}
        <div 
          className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 sm:mt-16 mb-20 animate-fade-up" 
          style={{ animationDelay: '150ms' }}
        >
          {/* Left Column */}
          <div className="md:col-span-4 lg:col-span-5">
            <h2 className="text-sm font-bold t-muted uppercase tracking-widest sticky top-24">
              The Story
            </h2>
          </div>

          {/* Right Column */}
          <div className="md:col-span-8 lg:col-span-7">
            <p className="text-2xl sm:text-3xl leading-snug text-[var(--text)] font-bold mb-8 tracking-tight">
              We believe that sharing joy shouldn't be difficult.
            </p>
            
            <div className="t-muted text-lg leading-relaxed font-medium space-y-6 mb-12">
              <p>
                Warmly was born out of a simple frustration: finding beautiful, high-quality greeting cards online had become an exhausting chore. The internet is flooded with generic designs, overwhelming ads, and hidden paywalls. We knew there had to be a better way to connect with the people who matter most.
              </p>
              <p>
                We created this space to offer a clutter-free, premium experience. Every card on Warmly is thoughtfully designed and carefully curated to ensure you are sending something genuinely special—whether it's for a milestone birthday, a global festival, or just a spontaneous reminder that you care.
              </p>
              <p>
                We design the artwork, write the code, and keep the servers running so that you can focus entirely on celebrating life's best moments effortlessly.
              </p>
            </div>

            {/* Support Card */}
            <div className="bg-[var(--surface)] border t-border p-6 sm:p-8 rounded-3xl">
              <h3 className="text-xl font-bold t-text mb-2">Support our work</h3>
              <p className="t-muted text-base leading-relaxed mb-6">
                Warmly is a proudly independent project driven by passion. If you love using our platform and want to help us keep the library growing and the servers running, your support means the world to us.
              </p>
              <a 
                href="https://buymeacoffee.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-[#FFDD00] text-black px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                <Coffee size={16} />
                Buy us a coffee
              </a>
            </div>

          </div>
        </div>

      </div>
      
      <Footer />
    </main>
  );
}