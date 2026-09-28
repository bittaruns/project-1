import Link from 'next/link';

export default function NotFound() {
  return (
    // Replaced <main> with <div> to prevent invalid HTML (since layout.tsx already has a main)
    // Used flex-1 to perfectly center it in the remaining viewport height
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
      <h1 className="text-[8rem] sm:text-[12rem] font-extrabold text-gray-200 dark:text-[#18181b] leading-none tracking-tighter">
        404
      </h1>
      
      <h2 className="text-2xl sm:text-4xl font-bold text-black dark:text-white mt-4 tracking-tight">
        Lost in the moments.
      </h2>
      
      <p className="text-gray-500 dark:text-[#a1a1aa] mt-4 max-w-md mx-auto text-sm sm:text-base">
        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
      </p>
      
      <Link 
        href="/welcome" 
        className="mt-8 bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full text-[14px] font-semibold hover:opacity-85 active:scale-[0.97] transition-all duration-200 ease-out"
      >
        Take me home
      </Link>
    </div>
  );
}