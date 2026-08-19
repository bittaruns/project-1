import { Footer } from '@/components/layout/footer';

export default function PrivacyPage() {
  return (
    <main className="t-bg min-h-[100svh] flex flex-col w-full overflow-x-hidden">
      <div className="flex-1 pt-12 pb-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h1 className="text-5xl sm:text-7xl font-extrabold t-text tracking-tight mb-8">Privacy Policy</h1>
          
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none t-muted space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-bold t-text mt-8 mb-4">1. Information We Collect</h2>
            <p>We only collect information about you if we have a reason to do so—for example, to provide our Services, to communicate with you, or to make our Services better.</p>

            <h2 className="text-xl font-bold t-text mt-8 mb-4">2. How We Use Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Warmly and our users.</p>
            
            <h2 className="text-xl font-bold t-text mt-8 mb-4">3. Data Security</h2>
            <p>We work hard to protect Warmly and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}