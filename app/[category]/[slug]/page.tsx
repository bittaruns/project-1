import { notFound } from 'next/navigation';
import { Download } from 'lucide-react'; // Removed MessageCircle, ThumbsUp, Copy from here
import { Button } from '@/components/UI/Button';
import { MasonryGrid } from '@/components/shared/MasonryGrid';
import { LOCAL_CARDS } from '@/lib/mockdata';
import { Footer } from '@/components/layout/footer';
import { ShareButtons } from '@/components/shared/ShareButtons'; // <-- Import the new component

interface ImageDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LOCAL_CARDS.map((img) => ({
    slug: img.id.toString(),
  }));
}

export default async function ImageDetailPage(props: ImageDetailPageProps) {
  const params = await props.params;
  
  // Find the exact card from the LOCAL_CARDS database
  const card = LOCAL_CARDS.find((img) => img.id.toString() === params.slug);

  if (!card) return notFound();

  // Find related images in the same category
  const relatedImages = LOCAL_CARDS.filter(
    (img) => img.category === card.category && img.id !== card.id
  ).slice(0, 8);

  return (
    <main className="min-h-screen bg-[#f9f9f9] dark:bg-black text-black dark:text-white transition-colors flex flex-col pt-16 sm:pt-20">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Preview */}
          <div className="rounded-[16px] overflow-hidden border border-gray-200 dark:border-[#27272a] shadow-xl animate-scale-in bg-gray-100 dark:bg-[#121212]">
            <img 
              src={card.image} 
              alt={card.title} 
              className="w-full h-auto object-cover" 
              style={{ maxHeight: '70vh' }} 
            />
          </div>

          {/* Details & Actions */}
          <div className="py-2 lg:py-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-black text-white dark:bg-[#1a2b4b] dark:text-[#60a5fa] mb-4">
              {card.category}
            </span>
            
            <h1 className="text-3xl sm:text-4xl font-bold mt-1 mb-4 tracking-tight">
              {card.title}
            </h1>
            
            <p className="text-gray-500 dark:text-[#a1a1aa] leading-relaxed mb-6 text-sm sm:text-base">
              A beautifully crafted {card.category.toLowerCase()} greeting designed for sharing joy and warmth. Perfect for WhatsApp, Instagram, and Facebook.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {card.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-[#18181b] text-gray-500 dark:text-[#a1a1aa] border border-gray-200 dark:border-[#27272a] text-[11px] sm:text-xs rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            <a href={card.image} download={`${card.id}.jpg`} className="block w-full mb-4">
              <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity">
                <Download size={18} /> Download
              </Button>
            </a>

            {/* Replace the static HTML buttons with the new Client Component */}
            <ShareButtons title={card.title} />

          </div>
        </div>

        {/* Related Images Section */}
        {relatedImages.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <h2 className="text-2xl font-bold mb-6 sm:mb-8 tracking-tight">Related Greetings</h2>
            <MasonryGrid cards={relatedImages} />
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}