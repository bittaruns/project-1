import Link from "next/link";
import { HeroSearch } from "@/components/shared/UniversalSearch"; // Ensure correct import path
import { Footer } from "@/components/layout/footer";

export default function WelcomePage() {
  return (
    <main className="bg-[#f9f9f9] dark:bg-black text-black dark:text-white min-h-[100svh] flex flex-col w-full overflow-x-hidden transition-colors duration-300">
      
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
        <style>{`
          @keyframes starTravel1 {
            0% { transform: translate(0, 0) rotate(45deg) scaleY(0); opacity: 0; }
            4% { opacity: 1; transform: translate(-15px, 15px) rotate(45deg) scaleY(1); }
            25% { opacity: 0; transform: translate(-280px, 280px) rotate(45deg) scaleY(0); }
            100% { opacity: 0; transform: translate(-280px, 280px) rotate(45deg) scaleY(0); }
          }
          @keyframes starTravel2 {
            0% { transform: translate(0, 0) rotate(45deg) scaleY(0); opacity: 0; }
            4% { opacity: 1; transform: translate(-20px, 20px) rotate(45deg) scaleY(1.2); }
            28% { opacity: 0; transform: translate(-350px, 350px) rotate(45deg) scaleY(0); }
            100% { opacity: 0; transform: translate(-350px, 350px) rotate(45deg) scaleY(0); }
          }
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
          .star-1 { top: 0%; left: 45%; animation: starTravel1 6s ease-out infinite 0s; }
          .star-2 { top: 0%; left: 80%; animation: starTravel2 7.5s ease-out infinite 2s; }
          .star-3 { top: 0%; left: 95%; animation: starTravel3 5.5s ease-out infinite 3.5s; }
        `}</style>

        <section className="relative min-h-[calc(100svh-6rem)] flex flex-col p-6 sm:p-10">
          {/* Background Wrapper */}
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
            <div className="absolute inset-0 bg-[url('/BI.webp')] bg-cover bg-center bg-no-repeat opacity-100 animate-breathe" />
            <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/50 transition-colors duration-500" />
            <div className="absolute inset-x-0 top-0 h-[40%] hidden dark:block overflow-hidden pointer-events-none rounded-t-[2.5rem]">
              <div className="shooting-star star-1"></div>
              <div className="shooting-star star-2"></div>
              <div className="shooting-star star-3"></div>
            </div>
          </div>

          {/* Main Content */}
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
              
              {/* FIXED MOBILE WRAPPER: Constrained width, padded edges */}
              <div className="w-full sm:w-[420px] px-2 sm:px-0 mt-8 animate-fade-up delay-200">
                <HeroSearch />
              </div>
            </div>

            <div className="w-full flex justify-center pb-2 sm:pb-4">
              <Link href="/download-app" className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 sm:px-8 sm:py-4 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md border border-gray-100 dark:border-none">
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
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-black dark:text-white">
            Designed for connection.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            Everything you need to find the perfect words and images, instantly. No ads, no watermarks, just pure joy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#27272a] p-8 md:p-12 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg animate-fade-up delay-100">
            <div className="relative z-10 max-w-md">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black dark:text-white">One-tap sharing to anywhere.</h3>
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                Send directly to WhatsApp, Instagram, or iMessage. We automatically format the image so it looks crisp and perfectly cropped on every platform.
              </p>
            </div>
          </div>

          <div className="group relative rounded-3xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#27272a] p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg animate-fade-up delay-150">
            <div className="flex flex-col justify-end h-full">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">10,000+ HD Cards</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Updated daily by top creators. Never send the same greeting twice.
              </p>
            </div>
          </div>

          <div className="group relative rounded-3xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#27272a] p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg animate-fade-up delay-200">
            <div className="flex flex-col justify-end h-full">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Zero Watermarks</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Your greetings should be about your message, not our logo. 100% clean images.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] p-8 md:p-12 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg animate-fade-up delay-300">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black dark:text-white">Download the Android App</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm text-sm sm:text-base">
              Get daily notifications for upcoming festivals, offline saving, and faster search.
            </p>
            <Link href="/download-app" className="inline-flex items-center gap-2 bg-[#4285F4] text-white px-6 py-3 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-sm">
              Get it on Google Play
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. How It Works (Steps) ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">
            {[
              { num: "01", title: "Find the occasion", desc: "Search through 50+ hand-curated categories or use our smart search." },
              { num: "02", title: "Pick the perfect card", desc: "Browse HD images, quotes, and wishes designed by professionals." },
              { num: "03", title: "Share instantly", desc: "Tap to download or share directly to your favorite messaging apps." }
            ].map((step, i) => (
              <div key={i} className="relative animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
                <span className="text-6xl md:text-8xl font-black text-gray-100 dark:text-[#18181b] absolute -top-8 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 pointer-events-none">
                  {step.num}
                </span>
                <div className="relative z-10 pt-4 md:pt-8">
                  <h4 className="text-xl font-bold mb-2 text-black dark:text-white">{step.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}