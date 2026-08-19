import Link from "next/link";
import { HeroSearch } from "@/components/shared/HeroSearch";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <main className="t-bg min-h-[100svh] flex flex-col w-full overflow-x-hidden selection:bg-[var(--accent)] selection:text-white">
      
      {/* ── Custom Animations ── */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1) translate(0px, 0px); }
          50% { transform: scale(1.06) translate(-1%, -1%); }
        }
        .animate-breathe {
          animation: breathe 25s ease-in-out infinite;
        }
      `}</style>

{/* ── 1. Hero Section ── */}
<div className="p-4 sm:p-5 lg:p-6">
  {/* Custom Styles for Varied Sky Shooting Stars */}
  <style>{`
    /* Star 1: Travels average distance (~30% down) */
    @keyframes starTravel1 {
      0% { transform: translate(0, 0) rotate(45deg) scaleY(0); opacity: 0; }
      4% { opacity: 1; transform: translate(-15px, 15px) rotate(45deg) scaleY(1); }
      25% { opacity: 0; transform: translate(-280px, 280px) rotate(45deg) scaleY(0); }
      100% { opacity: 0; transform: translate(-280px, 280px) rotate(45deg) scaleY(0); }
    }
    
    /* Star 2: Travels slightly further (~35% down) */
    @keyframes starTravel2 {
      0% { transform: translate(0, 0) rotate(45deg) scaleY(0); opacity: 0; }
      4% { opacity: 1; transform: translate(-20px, 20px) rotate(45deg) scaleY(1.2); }
      28% { opacity: 0; transform: translate(-350px, 350px) rotate(45deg) scaleY(0); }
      100% { opacity: 0; transform: translate(-350px, 350px) rotate(45deg) scaleY(0); }
    }
    
    /* Star 3: Burns out faster (~25% down) */
    @keyframes starTravel3 {
      0% { transform: translate(0, 0) rotate(45deg) scaleY(0); opacity: 0; }
      4% { opacity: 1; transform: translate(-10px, 10px) rotate(45deg) scaleY(0.8); }
      22% { opacity: 0; transform: translate(-220px, 220px) rotate(45deg) scaleY(0); }
      100% { opacity: 0; transform: translate(-220px, 220px) rotate(45deg) scaleY(0); }
    }
    
    .shooting-star {
      position: absolute;
      width: 2px;
      height: 90px;
      background: linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 1) 100%);
      border-radius: 999px;
      opacity: 0;
      transform-origin: bottom center;
      box-shadow: 0px 4px 6px rgba(255, 255, 255, 0.3);
    }
    
    /* All start exactly at top: 0% but vary in left position, duration, and delay */
    .star-1 { top: 0%; left: 45%; animation: starTravel1 6s ease-out infinite 0s; }
    .star-2 { top: 0%; left: 80%; animation: starTravel2 7.5s ease-out infinite 2s; }
    .star-3 { top: 0%; left: 95%; animation: starTravel3 5.5s ease-out infinite 3.5s; }
  `}</style>

  <section
    className="
      relative
      min-h-[calc(100svh-6rem)]
      flex flex-col
      p-6 sm:p-10
    "
  >
    {/* ── Background Wrapper ── */}
    <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border t-border shadow-sm">
      <div
        className="absolute inset-0 bg-[url('/BI.webp')] bg-cover bg-center bg-no-repeat opacity-100 animate-breathe"
      />
      
      {/* 1. Contrast Overlay */}
      <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/50 transition-colors duration-500" />

      {/* 2. Dark Mode Shooting Stars (Wrapper covers top 40% to prevent hard cutoffs) */}
      <div className="absolute inset-x-0 top-0 h-[40%] hidden dark:block overflow-hidden pointer-events-none rounded-t-[2.5rem]">
        <div className="shooting-star star-1"></div>
        <div className="shooting-star star-2"></div>
        <div className="shooting-star star-3"></div>
      </div>
    </div>

    {/* ── Main Content ── */}
    <div className="relative z-10 w-full h-full flex flex-col flex-1 justify-between max-w-7xl mx-auto">
      
      {/* ── TOP: Pill Badge ── */}
      <div className="w-full flex justify-center pt-2 sm:pt-4">
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-xs font-extrabold text-black tracking-wider uppercase">Over 2M+ Downloads</span>
        </div>
      </div>

      {/* ── CENTER: Typography & Search ── */}
      <div className="w-full flex flex-col items-center justify-center text-center flex-1 my-8 drop-shadow-xl">
        <div className="animate-fade-up delay-100 w-full flex flex-col items-center px-[10px] gap-1 sm:gap-4">
          <h1 
            className="font-extrabold text-black dark:text-white tracking-tight leading-[1.1] text-center w-full sm:whitespace-nowrap" 
            style={{ fontSize: "clamp(3.18rem, 5.5vw, 6rem)" }}
          >
            Greeting for <span>every</span> moment.
          </h1>
          
          <p 
            className="font-medium text-black/90 dark:text-white/90 mt-2 text-center drop-shadow-md" 
            style={{ fontSize: "clamp(0.80rem, 1.8vw, 1.15rem)" }}
          >
            Find, download, and share stunning HD greeting cards instantly.
          </p>
        </div>

        {/* Search */}
        <div className="w-full max-w-2xl mt-6 animate-fade-up delay-200">
          <HeroSearch />
        </div>
      </div>

      {/* ── BOTTOM RIGHT: CTA Button ── */}
      <div className="w-full flex pb-2 sm:pb-4">
        <Link
          href="/download-app"
          className="
            group inline-flex items-center gap-3 rounded-full
            bg-white px-7 py-3.5 sm:px-8 sm:py-4 shadow-sm
            transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md
          "
        >
          {/* Full Color Google Play Icon */}
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" className="shrink-0 transition-transform duration-500 group-hover:scale-110">
            <path d="M7.7 4.7C6.7 5.4 6 6.7 6 8.3V39.7C6 41.3 6.7 42.6 7.7 43.3L27 24L7.7 4.7Z" fill="#00C853" />
            <path d="M27 24L33.6 17.4L10.5 4.3C9.5 3.8 8.5 4.2 7.7 4.7L27 24Z" fill="#00B0FF" />
            <path d="M27 24L7.7 43.3C8.5 43.8 9.5 44.2 10.5 43.7L33.6 30.6L27 24Z" fill="#FFD600" />
            <path d="M33.6 17.4L40.1 21.1C42.6 22.5 42.6 25.5 40.1 26.9L33.6 30.6L27 24L33.6 17.4Z" fill="#FF1744" />
          </svg>
          <span className="text-sm sm:text-base font-bold text-black">Get the Free App</span>
        </Link>
      </div>

    </div>
  </section>
</div>

      {/* ── 2. Bento Grid Features ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-12 md:mb-20 text-center max-w-2xl mx-auto animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold t-text tracking-tight mb-4">
            Designed for connection.
          </h2>
          <p className="t-muted text-lg">
            Everything you need to find the perfect words and images, instantly. No ads, no watermarks, just pure joy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Large Feature Card */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-[var(--surface)] border t-border p-8 md:p-12 transition-all hover:border-[#FFDD00] hover:shadow-lg animate-fade-up delay-100">
            <div className="relative z-10 max-w-md">
              <h3 className="text-2xl md:text-3xl font-bold t-text mb-3">One-tap sharing to anywhere.</h3>
              <p className="t-muted text-base md:text-lg leading-relaxed">
                Send directly to WhatsApp, Instagram, or iMessage. We automatically format the image so it looks crisp and perfectly cropped on every platform.
              </p>
            </div>
          </div>

          {/* Square Feature Card 1 */}
          <div className="group relative rounded-3xl bg-[var(--surface)] border t-border p-8 transition-all hover:border-[#FFDD00] hover:shadow-lg animate-fade-up delay-150">
            <div className="flex flex-col justify-end h-full">
              <h3 className="text-xl font-bold t-text mb-2">10,000+ HD Cards</h3>
              <p className="t-muted text-sm leading-relaxed">
                Updated daily by top creators. Never send the same greeting twice.
              </p>
            </div>
          </div>

          {/* Square Feature Card 2 */}
          <div className="group relative rounded-3xl bg-[var(--surface)] border t-border p-8 transition-all hover:border-[#FFDD00] hover:shadow-lg animate-fade-up delay-200">
            <div className="flex flex-col justify-end h-full">
              <h3 className="text-xl font-bold t-text mb-2">Zero Watermarks</h3>
              <p className="t-muted text-sm leading-relaxed">
                Your greetings should be about your message, not our logo. 100% clean images.
              </p>
            </div>
          </div>

          {/* Wide Feature Card */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-[var(--surface-2)] border t-border p-8 md:p-12 transition-transform hover:scale-[1.02] animate-fade-up delay-300">
            <h3 className="text-2xl md:text-3xl font-bold t-text mb-3">Download the Android App</h3>
            <p className="t-muted mb-8 max-w-sm">
              Get daily notifications for upcoming festivals, offline saving, and faster search.
            </p>
            <Link href="/download-app" className="inline-flex items-center gap-2 bg-[#4285F4] text-black px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-sm">
              Get it on Google Play
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. How It Works (Steps) ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y t-border bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">
            {[
              { num: "01", title: "Find the occasion", desc: "Search through 50+ hand-curated categories or use our smart search." },
              { num: "02", title: "Pick the perfect card", desc: "Browse HD images, quotes, and wishes designed by professionals." },
              { num: "03", title: "Share instantly", desc: "Tap to download or share directly to your favorite messaging apps." }
            ].map((step, i) => (
              <div key={i} className="relative animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
                <span className="text-6xl md:text-8xl font-black text-[var(--accent-light)] absolute -top-8 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 pointer-events-none">
                  {step.num}
                </span>
                <div className="relative z-10 pt-4 md:pt-8">
                  <h4 className="text-xl font-bold t-text mb-2">{step.title}</h4>
                  <p className="t-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Support & Collaboration Section ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight t-text">
            Built by humans, for humans.
          </h2>
          <p className="t-muted mt-4 text-lg max-w-2xl font-medium">
            We're a small indie team dedicated to helping people connect. Support the platform or collaborate with us to build amazing things together.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
            <Link
              href="/support"
              className="
                w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                rounded-full bg-[#FFDD00] text-black
                px-8 py-4 font-bold text-base shadow-sm
                hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-md
              "
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4v-2z"/></svg>
              Buy Us a Coffee
            </Link>

            <Link
              href="/careers"
              className="
                w-full sm:w-auto inline-flex items-center justify-center gap-2
                rounded-full border-2 t-border t-text bg-transparent
                px-8 py-4 font-bold text-base
                hover:bg-[var(--surface-2)] hover:border-[#FFDD00]
                hover:scale-105 active:scale-95 transition-all duration-300
              "
            >
              Work With Us &rarr;
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}