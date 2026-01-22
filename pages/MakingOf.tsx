
import React, { useState } from 'react';
import { MAKING_OF_VIDEOS, ARTWORKS } from '../constants';
import Newsletter from '../components/Newsletter';
import Lightbox from '../components/Lightbox';

const MakingOf: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const feedItems = ARTWORKS.slice(0, 6);

  return (
    <div className="animate-fadeIn">
      <h2 className="serif text-3xl mb-12 italic">Instagram feed</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mb-20">
        {feedItems.map((art) => (
          <div 
            key={art.id} 
            className="aspect-square bg-gray-100 group cursor-pointer overflow-hidden"
            onClick={() => setSelectedImage(art.imageUrl)}
          >
            <img 
              src={art.imageUrl} 
              alt="Social media post" 
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      <div className="space-y-24 max-w-5xl mx-auto">
        {MAKING_OF_VIDEOS.map((v) => (
          <div key={v.id} className="group">
            <div className="border-t border-gray-100 pt-12 mb-6 flex flex-col items-start">
               <h3 className="serif text-2xl mb-2">{v.title}</h3>
               <p className="text-sm text-gray-500 font-light italic">{v.description}</p>
            </div>
            <div className="relative aspect-video bg-black overflow-hidden shadow-2xl">
              <iframe 
                src={v.videoUrl} 
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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

export default MakingOf;
