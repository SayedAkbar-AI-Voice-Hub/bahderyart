
import React, { useEffect } from 'react';

interface LightboxProps {
  imageUrl: string | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageUrl, onClose }) => {
  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (imageUrl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [imageUrl]);

  if (!imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] bg-white flex items-center justify-center p-0 animate-fadeIn cursor-zoom-out"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="fixed top-8 right-8 text-gray-400 hover:text-black transition-colors z-[10001] p-2"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Pure Image View */}
      <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
        <img 
          src={imageUrl} 
          alt="Artwork Preview" 
          className="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default Lightbox;
