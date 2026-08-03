import { notFound } from 'next/navigation';
import { Download, MessageCircle, ThumbsUp, Copy } from 'lucide-react';
// import { Badge } from '@/components/ui/Badge';
// import { Button } from '@/components/ui/Button';
// import { MasonryGrid } from '@/components/shared/MasonryGrid';
// import { UNSPLASH_IMAGES } from '@/lib/mockData';
import { Badge } from '@/components/UI/Badge';
import { Button } from '@/components/UI/Button';
import { MasonryGrid } from '@/components/shared/MasonryGrid';
import { UNSPLASH_IMAGES } from '@/lib/mockdata';

// Update the interface to reflect that params is a Promise
interface ImageDetailPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return UNSPLASH_IMAGES.map((img) => ({
    category: img.category.toLowerCase(),
    slug: img.id.toString(),
  }));
}

// Make the component async
export default async function ImageDetailPage(props: ImageDetailPageProps) {
  // Await the params here
  const params = await props.params;
  
  const card = UNSPLASH_IMAGES.find((img) => img.id.toString() === params.slug);

  if (!card) return notFound();

  const relatedImages = UNSPLASH_IMAGES.filter(
    (img) => img.category === card.category && img.id !== card.id
  ).slice(0, 8);

  return (
    <main className="min-h-screen t-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Preview */}
          <div className="rounded-2xl overflow-hidden border t-border shadow-xl animate-scale-in">
            <img src={card.image} alt={card.title} className="w-full object-cover" style={{ maxHeight: 520 }} />
          </div>

          {/* Details & Actions */}
          <div className="py-4 animate-fade-up delay-100">
            <Badge variant="accent">{card.category}</Badge>
            <h1 className="text-3xl sm:text-4xl font-bold t-text mt-4 mb-4">{card.title}</h1>
            <p className="t-muted leading-relaxed mb-6">
              A beautifully crafted {card.category.toLowerCase()} greeting designed for sharing joy and warmth. Perfect for WhatsApp, Instagram, and Facebook.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {['greeting', 'wishes', card.category.toLowerCase(), 'share'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-[var(--bg-tertiary)] t-muted text-xs rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            <Button variant="primary" size="lg" className="w-full mb-3">
              <Download size={18} /> Download Original Free
            </Button>

            <div className="grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border t-border text-sm font-medium t-muted hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-500 transition-all">
                <MessageCircle size={16} /> WhatsApp
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border t-border text-sm font-medium t-muted hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-500 transition-all">
                <ThumbsUp size={16} /> Facebook
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border t-border text-sm font-medium t-muted hover:bg-[var(--accent-light)] hover:t-accent-text transition-all">
                <Copy size={16} /> Copy Link
              </button>
            </div>
          </div>
        </div>

        {relatedImages.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold t-text mb-8">Related Images</h2>
            <MasonryGrid cards={relatedImages} />
          </section>
        )}
      </div>
    </main>
  );
}