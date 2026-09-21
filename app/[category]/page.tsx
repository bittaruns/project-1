import { notFound } from 'next/navigation';
import { MasonryGrid } from '@/components/shared/MasonryGrid';
import { CATEGORIES, LOCAL_CARDS } from '@/lib/mockdata';
import { Footer } from '@/components/layout/footer';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.name.toLowerCase(),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category).toLowerCase();
  
  const categoryData = CATEGORIES.find(c => c.name.toLowerCase() === decodedCategory);

  if (!categoryData) return notFound();

  // Filter images for this category using the new LOCAL_CARDS database
  const categoryImages = LOCAL_CARDS.filter(
    img => img.category.toLowerCase() === decodedCategory
  );

  return (
    <main className="min-h-screen bg-[#f9f9f9] dark:bg-black text-black dark:text-white transition-colors flex flex-col">
      
      {/* Cinematic Hero Banner */}
      <section className="relative w-full h-[35vh] min-h-[280px] max-h-[400px] sm:h-[50vh] sm:max-h-[550px] flex flex-col justify-end overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={categoryData.image} 
            alt={categoryData.name} 
            className="w-full h-full object-cover object-center" 
          />
        </div>
        
        {/* Seamless Gradient Overlay (Fades to page background color) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f9f9f9] via-[#f9f9f9]/60 dark:from-black dark:via-black/80 to-transparent" />
        
        {/* Text Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10 animate-fade-up">
          
          {/* Metadata Pills */}
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-black/10 dark:bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase">
              Collection
            </span>
            <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-semibold drop-shadow-sm">
              {categoryImages.length} beautifully crafted cards
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight capitalize drop-shadow-sm">
            {categoryData.name} Greetings
          </h1>
          
        </div>
      </section>

      {/* Grid Section */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <MasonryGrid cards={categoryImages} />
      </div>

      <Footer />
    </main>
  );
}