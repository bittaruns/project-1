import { notFound } from 'next/navigation';
// import { MasonryGrid } from '@/components/shared/MasonryGrid';
// import { Badge } from '@/components/ui/Badge';
// import { CATEGORIES, UNSPLASH_IMAGES } from '@/lib/mockData';

import { MasonryGrid } from '@/components/shared/MasonryGrid';
import { CATEGORIES,UNSPLASH_IMAGES } from '@/lib/mockdata';
import { Badge } from '@/components/UI/Badge';

interface CategoryPageProps {
  params: { category: string };
}

// Ensure Next.js pre-builds all category routes as Static HTML
export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.name.toLowerCase(),
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category).toLowerCase();
  const categoryData = CATEGORIES.find(c => c.name.toLowerCase() === decodedCategory);

  if (!categoryData) return notFound();

  // Filter images for this category
  const categoryImages = UNSPLASH_IMAGES.filter(
    img => img.category.toLowerCase() === decodedCategory
  );

  return (
    <main className="min-h-screen t-bg">
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img 
          src={categoryData.image} 
          alt={categoryData.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <Badge variant="accent">Collection</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3 capitalize">
            {categoryData.name} Greetings
          </h1>
          <p className="text-white/70 mt-2">{categoryData.count.toLocaleString()} beautifully crafted cards</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MasonryGrid cards={categoryImages} />
      </div>
    </main>
  );
}