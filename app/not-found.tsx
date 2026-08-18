import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[100svh] flex flex-col items-center justify-center text-center px-4 t-bg">
      <h1 className="text-[8rem] sm:text-[12rem] font-extrabold text-[var(--accent)] leading-none tracking-tighter opacity-20">
        404
      </h1>
      <h2 className="text-2xl sm:text-4xl font-bold t-text mt-4 tracking-tight">
        Lost in the moments.
      </h2>
      <p className="t-muted mt-4 max-w-md mx-auto text-sm sm:text-base">
        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
      </p>
      <Link 
        href="/" 
        className="mt-8 bg-[var(--text)] text-[var(--bg)] px-8 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform"
      >
        Take me home
      </Link>
    </main>
  );
}