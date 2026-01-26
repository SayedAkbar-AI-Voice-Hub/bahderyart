
import React, { useState, useEffect } from 'react';
import { ARTWORKS } from '../constants';
import { Artwork } from '../types';
import Newsletter from '../components/Newsletter';
import Lightbox from '../components/Lightbox';
import SmartImage from '../components/SmartImage';

import { hydrateCollection } from '../db';

const Artworks: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'original' | 'limited' | 'postcard' | 'indoor'>('all');
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

  const filteredArtworks = filter === 'all' ? collection : collection.filter(a => a.category === filter);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-center gap-8 mb-12 text-sm text-gray-500">
        {(['all', 'indoor', 'original', 'limited', 'postcard'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`capitalize hover:text-black transition-colors ${filter === cat ? 'text-black font-semibold underline underline-offset-4' : ''}`}
          >
            {cat === 'all' ? 'All' : cat === 'limited' ? 'Limited edition' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
        {filteredArtworks.map((art) => (
          <div key={art.id} className="group">
            <div
              className="overflow-hidden relative bg-gray-50 aspect-auto shadow-sm cursor-zoom-in"
              onClick={() => setSelectedImage(art.imageUrl)}
            >
              <SmartImage
                id={art.id}
                fallbackUrl={art.imageUrl}
                alt={art.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {art.isSoldOut && (
                <div className="absolute top-4 right-4 bg-black text-white px-2 py-1 text-[10px] tracking-widest uppercase">
                  Sold Out
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              {art.title && <h3 className="serif text-lg">{art.title}</h3>}
              {art.year && <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{art.year}</p>}
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

export default Artworks;
