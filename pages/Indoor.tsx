
import React, { useState, useEffect } from 'react';
import { ARTWORKS } from '../constants';
import { Artwork } from '../types';
import Newsletter from '../components/Newsletter';
import Lightbox from '../components/Lightbox';
import SmartImage from '../components/SmartImage';

import { hydrateCollection } from '../db';

const Indoor: React.FC = () => {
  const [subFilter, setSubFilter] = useState<'all' | 'mural' | 'alcove' | 'exhibition'>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  const indoorPieces = collection.filter(a => a.category === 'indoor');
  const filteredIndoor = subFilter === 'all'
    ? indoorPieces
    : indoorPieces.filter(a => a.subCategory === subFilter);

  return (
    <div className="animate-fadeIn">
      <div className="mb-12 text-center">
        <h2 className="serif text-3xl italic">Indoor Installations</h2>
        <p className="text-gray-500 mt-2 font-light max-w-2xl mx-auto">
          Custom murals and architectural paintings integrated into interior spaces, including decorative niches and gallery exhibitions.
        </p>
      </div>

      <div className="flex justify-center gap-8 mb-12 text-sm text-gray-500">
        {(['all', 'mural', 'alcove', 'exhibition'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSubFilter(cat)}
            className={`capitalize hover:text-black transition-colors ${subFilter === cat ? 'text-black font-semibold underline underline-offset-4' : ''}`}
          >
            {cat === 'all' ? 'All' : cat === 'mural' ? 'Murals' : cat === 'alcove' ? 'Alcoves' : 'Exhibitions'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {filteredIndoor.map((art) => (
          <div key={art.id} className="group">
            <div
              className="overflow-hidden relative bg-gray-50 shadow-sm transition-shadow hover:shadow-xl cursor-zoom-in"
              onClick={() => setSelectedImage(art.imageUrl)}
            >
              <SmartImage
                id={art.id}
                fallbackUrl={art.imageUrl}
                alt={art.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-baseline">
                {art.title && <h3 className="serif text-xl">{art.title}</h3>}
                <span className="text-[9px] uppercase tracking-widest text-gray-400">{art.subCategory}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{art.year} • Interior</p>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      <Newsletter />
    </div>
  );
};

export default Indoor;
