
import React, { useState, useEffect } from 'react';

interface SmartImageProps {
  id: string;
  fallbackUrl: string; // This is the 'imageUrl' from the artwork object
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const SmartImage: React.FC<SmartImageProps> = ({ id, fallbackUrl, alt, className, style }) => {
  const [displayUrl, setDisplayUrl] = useState<string>(fallbackUrl);

  useEffect(() => {
    // If fallbackUrl is already a data URL (base64), we use it directly
    if (fallbackUrl && fallbackUrl.startsWith('data:')) {
      setDisplayUrl(fallbackUrl);
      return;
    }

    // Otherwise, check the secondary image store in case it was uploaded separately
    const saved = localStorage.getItem('bahadery_art_images');
    if (saved) {
      const images = JSON.parse(saved);
      if (images[id]) {
        setDisplayUrl(images[id]);
      } else {
        // Finally fall back to the provided URL (e.g. art-01.jpg)
        setDisplayUrl(fallbackUrl);
      }
    } else {
      setDisplayUrl(fallbackUrl);
    }
  }, [id, fallbackUrl]);

  return (
    <img 
      src={displayUrl || fallbackUrl} 
      alt={alt} 
      className={className} 
      style={style}
      loading="lazy"
    />
  );
};

export default SmartImage;
