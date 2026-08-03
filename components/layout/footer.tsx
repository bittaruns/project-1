import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t t-border t-surface mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--accent)] rounded-xl flex items-center justify-center">
                <Sparkles size={15} className="text-white" />
              </div>
              {/* Updated Name */}
              <span className="font-bold t-text">Warmly</span>
            </div>
            <p className="text-sm t-muted leading-relaxed">
              Beautiful greetings for every moment. Share joy, love, and celebration with the world.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold t-text mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm t-muted hover:t-accent-text transition-colors">Home</Link></li>
              <li><Link href="/categories" className="text-sm t-muted hover:t-accent-text transition-colors">Categories</Link></li>
              <li><Link href="/search" className="text-sm t-muted hover:t-accent-text transition-colors">Search</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold t-text mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm t-muted hover:t-accent-text transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm t-muted hover:t-accent-text transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm t-muted hover:t-accent-text transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm t-muted hover:t-accent-text transition-colors">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold t-text mb-4">Connect</h4>
            <ul className="space-y-2">
              {['Twitter', 'Instagram', 'Pinterest'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm t-muted hover:t-accent-text transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t t-border pt-8 flex items-center justify-between gap-4">
          {/* Updated Copyright */}
          <p className="text-xs t-faint">© {new Date().getFullYear()} Warmly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}