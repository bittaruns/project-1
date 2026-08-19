import { Footer } from '@/components/layout/footer';

export default function TermsPage() {
  return (
    <main className="t-bg min-h-[100svh] flex flex-col w-full overflow-x-hidden">
      <div className="flex-1 pt-14 pb-14 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h1 className="text-5xl sm:text-7xl font-extrabold t-text tracking-tight mb-8">Terms of Use</h1>
          
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none t-muted space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-bold t-text mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Warmly, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>

            <h2 className="text-xl font-bold t-text mt-8 mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Warmly's website for personal, non-commercial transitory viewing only.</p>
            
            <h2 className="text-xl font-bold t-text mt-8 mb-4">3. Disclaimer</h2>
            <p>The materials on Warmly's website are provided on an 'as is' basis. Warmly makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}