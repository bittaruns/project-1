import Link from "next/link";
import { HeroSearch } from "@/components/shared/HeroSearch";
import { FeaturedCollections } from "@/components/shared/FeaturedCollections";
import { CATEGORIES } from "@/lib/mockdata";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <main className="t-bg min-h-[100svh] flex flex-col w-full overflow-x-hidden">
      {/* ── Hero Section ── */}
      <div className="p-4 sm:p-5 lg:p-6">
        <section
          className="
            relative overflow-hidden
            min-h-[calc(100svh-6rem)]
            rounded-[2rem]
            shadow-md
            flex flex-col items-center justify-center
            px-4 sm:px-6
            py-12 sm:py-14 lg:py-16
          "
        >
          {/* Background Image Only */}
          <div
            className="
              absolute inset-0
              bg-[url('/BI.webp')]
              bg-cover bg-center bg-no-repeat
              opacity-80
            "
          />

          {/* Dark Overlay Only */}
          <div className="absolute inset-0 bg-black/20 rounded-[2rem]" />

          {/* ── Hero Content ── */}
          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* Heading */}
            <div className="animate-fade-up w-full px-2">
              <h1
                className="
                  font-extrabold
                  text-white
                  tracking-tight
                  leading-[1.05]
                "
                style={{
                  fontSize: "clamp(2.75rem, 7vw, 5.25rem)",
                }}
              >
                Greeting Cards
              </h1>

              <h2
                className="
                  font-semibold
                  text-white
                  tracking-tight
                  leading-tight
                  mt-3
                "
                style={{
                  fontSize: "clamp(1.35rem, 3vw, 2rem)",
                }}
              >
                for Every Moment.
              </h2>
            </div>

            {/* Search */}
            <div className="w-full max-w-2xl relative z-40 mt-8 animate-fade-up delay-200">
              <HeroSearch />
            </div>

            {/* Android App CTA */}
            <div className="mt-7 animate-fade-up delay-300 relative z-10">
              <Link
                href="/download-app"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-white/95
                  px-6
                  py-3.5
                  shadow-lg
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-white
                  hover:shadow-xl
                  active:scale-95
                "
              >
                {/* Google Play Icon */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    shrink-0
                    transition-transform
                    duration-500
                    group-hover:rotate-[8deg]
                    group-hover:scale-110
                  "
                  aria-hidden="true"
                >
                  <path
                    d="M7.7 4.7C6.7 5.4 6 6.7 6 8.3V39.7C6 41.3 6.7 42.6 7.7 43.3L27 24L7.7 4.7Z"
                    fill="#00C853"
                  />
                  <path
                    d="M27 24L33.6 17.4L10.5 4.3C9.5 3.8 8.5 4.2 7.7 4.7L27 24Z"
                    fill="#00B0FF"
                  />
                  <path
                    d="M27 24L7.7 43.3C8.5 43.8 9.5 44.2 10.5 43.7L33.6 30.6L27 24Z"
                    fill="#FFD600"
                  />
                  <path
                    d="M33.6 17.4L40.1 21.1C42.6 22.5 42.6 25.5 40.1 26.9L33.6 30.6L27 24L33.6 17.4Z"
                    fill="#FF1744"
                  />
                </svg>

                <div className="text-left leading-tight">
                  <span className="block text-sm sm:text-base font-bold text-black">
                    Install Android App
                  </span>
                </div>
              </Link>
            </div>

            {/* Stats */}
            <div
              className="
                mt-10 sm:mt-12
                animate-fade-up delay-500
                flex flex-wrap
                items-center
                justify-center
                gap-7 sm:gap-10 lg:gap-14
                text-white
              "
            >
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold">
                  10K+
                </p>
                <p className="text-[9px] sm:text-[10px] text-white/75 uppercase tracking-wider font-bold">
                  Greetings
                </p>
              </div>

              <div className="w-px h-8 bg-white/30 hidden sm:block" />

              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold">
                  2M+
                </p>
                <p className="text-[9px] sm:text-[10px] text-white/75 uppercase tracking-wider font-bold">
                  Downloads
                </p>
              </div>

              <div className="w-px h-8 bg-white/30 hidden sm:block" />

              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold">
                  50+
                </p>
                <p className="text-[9px] sm:text-[10px] text-white/75 uppercase tracking-wider font-bold">
                  Categories
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Featured Collections ── */}
      <FeaturedCollections categories={CATEGORIES} />

      {/* ── Trending Categories ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-9 sm:mb-11 animate-fade-up text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight t-text">
                Trending Categories
              </h2>

              <p className="t-muted mt-2 text-sm sm:text-base font-medium">
                What everyone is sharing right now.
              </p>
            </div>

            <Link
              href="/categories"
              className="text-sm font-bold text-[var(--accent)] hover:opacity-80 transition-opacity"
            >
              View all categories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {CATEGORIES.slice(0, 4).map((cat, i) => (
              <Link
                href={`/${cat.name.toLowerCase()}`}
                key={cat.name}
                className="
                  group
                  relative overflow-hidden
                  rounded-2xl
                  aspect-square sm:aspect-auto sm:h-72
                  border t-border
                  block shadow-sm
                  animate-scale-in
                "
                style={{
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="
                    w-full h-full
                    object-cover
                    grayscale
                    brightness-90
                    group-hover:grayscale-0
                    group-hover:scale-110
                    transition-all
                    duration-700
                    ease-out
                  "
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

      <Footer />
    </main>
  );
}