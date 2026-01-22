
import React, { useState, useEffect } from 'react';
import { ARTWORKS } from '../constants';
import { Artwork } from '../types';
import Newsletter from '../components/Newsletter';
import Lightbox from '../components/Lightbox';

const Store: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'original' | 'limited' | 'postcard'>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [collection, setCollection] = useState<Artwork[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bahadery_art_collection');
    if (saved) {
      setCollection(JSON.parse(saved));
    } else {
      setCollection(ARTWORKS);
    }
  }, []);
  
  const storeItems = collection.filter(a => !!a.showInStore);
  const filteredItems = filter === 'all' ? storeItems : storeItems.filter(a => a.category === filter);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-center gap-8 mb-16 text-sm text-gray-500">
        {(['all', 'limited', 'original', 'postcard'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`capitalize hover:text-black transition-colors ${filter === cat ? 'text-black font-semibold' : ''}`}
          >
            {cat === 'all' ? 'All' : cat === 'limited' ? 'Limited edition' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {filteredItems.map((item) => (
          <div key={item.id} className="flex flex-col items-center group">
            <div 
              className="relative w-full aspect-square bg-white flex items-center justify-center p-8 border border-transparent group-hover:border-gray-100 transition-all cursor-zoom-in"
              onClick={() => setSelectedImage(item.imageUrl)}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="max-w-full max-h-full object-contain shadow-sm group-hover:shadow-xl transition-all duration-500"
              />
              {item.isSoldOut && (
                <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 text-[10px] tracking-widest uppercase">
                  Sold Out
                </div>
              )}
            </div>
            <div className="mt-8 text-center space-y-2">
              <h3 className="serif text-xl">{item.title} | <span className="capitalize">{item.category}</span></h3>
              <p className="text-sm font-medium">
                {item.price ? `€${item.price.toFixed(2)}` : 'Contact for Pricing'}
              </p>
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

export default Store;
