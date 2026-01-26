
import React, { useState, useEffect } from 'react';
import { getImage } from '../db';

interface SmartImageProps {
  id: string;
  fallbackUrl: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const SmartImage: React.FC<SmartImageProps> = ({ id, fallbackUrl, alt, className, style }) => {
  const [displayUrl, setDisplayUrl] = useState<string>(fallbackUrl);

  useEffect(() => {
    const loadDbImage = async () => {
      // 1. If fallbackUrl and it's already base64, use it
      if (fallbackUrl && fallbackUrl.startsWith('data:')) {
        setDisplayUrl(fallbackUrl);
        return;
      }

      // 2. Try fetching from IndexedDB
      try {
        const storedImage = await getImage(id);
        if (storedImage) {
          setDisplayUrl(storedImage);
        } else {
          // 3. Last fallback to standard URL
          setDisplayUrl(fallbackUrl);
        }
      } catch (err) {
        console.error("Failed to load image from DB:", err);
        setDisplayUrl(fallbackUrl);
      }
    };

    loadDbImage();
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
