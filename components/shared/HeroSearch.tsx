'use client';
import { UniversalSearch } from '@/components/shared/UniversalSearch';

export function HeroSearch() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <UniversalSearch variant="hero" />
    </div>
  );
}