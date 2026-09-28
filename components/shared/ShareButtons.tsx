'use client';

import { useState, useEffect } from 'react';
import { Copy } from 'lucide-react'; // We still use Lucide for the generic Copy icon

// Official WhatsApp SVG Logo
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

// Official Facebook SVG Logo
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' \n' + url)}`, '_blank');
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      <button 
        onClick={handleWhatsApp}
        // Updated hover color to Official WhatsApp Green (#25D366)
        className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-[#25D366]/10 hover:border-[#25D366]/30 hover:text-[#25D366] transition-all shadow-sm dark:shadow-none bg-white dark:bg-[#18181b]"
      >
        <WhatsAppIcon className="w-[18px] h-[18px]" /> 
        <span className="hidden sm:inline">WhatsApp</span>
      </button>
      
      <button 
        onClick={handleFacebook}
        // Updated hover color to Official Facebook Blue (#1877F2)
        className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 hover:text-[#1877F2] transition-all shadow-sm dark:shadow-none bg-white dark:bg-[#18181b]"
      >
        <FacebookIcon className="w-[18px] h-[18px]" /> 
        <span className="hidden sm:inline">Facebook</span>
      </button>
      
      <button 
        onClick={handleCopy}
        className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-[#27272a] text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] transition-all shadow-sm dark:shadow-none bg-white dark:bg-[#18181b]"
      >
        <Copy size={16} /> 
        <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
}