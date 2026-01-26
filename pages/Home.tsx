
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTWORKS } from '../constants';
import { Artwork } from '../types';
import SmartImage from '../components/SmartImage';

import { hydrateCollection } from '../db';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [collection, setCollection] = useState<Artwork[]>([]);

  useEffect(() => {
    const load = async () => {
      const saved = localStorage.getItem('bahadery_art_collection');
      const baseCollection = saved ? JSON.parse(saved) : ARTWORKS;
      const hydrated = await hydrateCollection(baseCollection);
      setCollection(hydrated);
    };
    load();
  }, []);

  useEffect(() => {
    if (collection.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % collection.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [collection.length]);

  if (collection.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
        <p className="serif italic text-gray-400">Welcome to Bahadery Art. Add photos in Setup to begin.</p>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 w-full h-full cursor-pointer overflow-hidden group"
      onClick={() => navigate('/artworks')}
    >
      {collection.map((art, index) => (
        <div
          key={art.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <SmartImage
            id={art.id}
            fallbackUrl={art.imageUrl}
            alt={art.title}
            className="absolute inset-0 w-full h-full object-cover brightness-90 transition-transform duration-[12000ms] ease-linear"
            style={{
              transform: index === currentIndex ? 'scale(1.15)' : 'scale(1.0)',
              transition: index === currentIndex ? 'transform 12s ease-out, opacity 1s ease-in-out' : 'opacity 1s ease-in-out'
            }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {collection.map((_, index) => (
          <div
            key={index}
            className={`h-[1px] transition-all duration-700 ${index === currentIndex ? 'w-10 bg-white' : 'w-4 bg-white/20'
              }`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 w-14 h-14 rounded-full border border-white/30 overflow-hidden shadow-2xl z-20 hover:scale-110 transition-transform bg-white/10 backdrop-blur-sm">
        <SmartImage
          id="profile-img"
          fallbackUrl={collection[0]?.imageUrl || "art-01.jpg"}
          alt="Bahadery Art Profile"
          className="w-full h-full object-cover grayscale transition-all opacity-80"
        />
      </div>
    </div>
  );
};

export default Home;
