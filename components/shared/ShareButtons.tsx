'use client';

import { useState } from 'react';
import { MessageCircle, ThumbsUp, Copy, Check } from 'lucide-react';

export function ShareButtons({ title }: { title: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleWhatsApp = () => {
    const url = window.location.href;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " - " + url)}`, '_blank');
  };

  const handleFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleCopy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      
      // Reset the button back to normal after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <button 
        onClick={handleWhatsApp}
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-500 transition-all"
      >
        <MessageCircle size={16} /> WhatsApp
      </button>
      
      <button 
        onClick={handleFacebook}
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-500 transition-all"
      >
        <ThumbsUp size={16} /> Facebook
      </button>
      
      <button 
        onClick={handleCopy}
        disabled={isCopied}
        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] text-sm font-medium transition-all ${
          isCopied 
            ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/50' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#27272a]'
        }`}
      >
        {isCopied ? <Check size={16} /> : <Copy size={16} />}
        {isCopied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}