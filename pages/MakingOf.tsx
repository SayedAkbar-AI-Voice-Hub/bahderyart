
import React, { useState, useEffect } from 'react';
import { MAKING_OF_VIDEOS, ARTWORKS } from '../constants';
import Newsletter from '../components/Newsletter';
import Lightbox from '../components/Lightbox';
import SmartImage from '../components/SmartImage';
import { hydrateCollection, getImage } from '../db';
import { VideoProject, Artwork } from '../types';

const MakingOf: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [feedItems, setFeedItems] = useState<Artwork[]>([]);
  const [videoPosts, setVideoPosts] = useState<VideoProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 1. Load Social Feed (From Artworks)
        const savedArt = localStorage.getItem('bahadery_art_collection');
        const baseArt = savedArt ? JSON.parse(savedArt) : ARTWORKS;
        const hydratedArt = await hydrateCollection(baseArt);
        setFeedItems(hydratedArt.slice(0, 6));

        // 2. Load Video Posts
        const savedMaking = localStorage.getItem('bahadery_making_of');
        const baseMaking = savedMaking ? JSON.parse(savedMaking) : MAKING_OF_VIDEOS;

        const hydratedMaking = await Promise.all(
          baseMaking.map(async (v: VideoProject) => {
            // Check if thumbnail is a marker for IndexedDB
            const stored = await getImage(v.id);
            if (stored) {
              return { ...v, thumbnailUrl: stored };
            }
            return v;
          })
        );
        setVideoPosts(hydratedMaking);
      } catch (err) {
        console.error("MakingOf load error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) return <div className="h-[60vh] flex items-center justify-center serif italic text-gray-400">Loading Content...</div>;

  return (
    <div className="animate-fadeIn">
      <h2 className="serif text-3xl mb-12 italic">Visual Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mb-20">
        {feedItems.map((art) => (
          <div
            key={art.id}
            className="aspect-square bg-gray-100 group cursor-pointer overflow-hidden"
            onClick={() => setSelectedImage(art.imageUrl)}
          >
            <SmartImage
              id={art.id}
              fallbackUrl={art.imageUrl}
              alt="Social media post"
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      <div className="space-y-24 max-w-5xl mx-auto">
        {videoPosts.map((v) => (
          <div key={v.id} className="group">
            <div className="border-t border-gray-100 pt-12 mb-6 flex flex-col items-start">
              <h3 className="serif text-2xl mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 font-light italic">{v.description}</p>
            </div>
            <div className="relative aspect-video bg-black overflow-hidden shadow-2xl">
              {v.videoUrl ? (
                <iframe
                  src={v.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 italic uppercase tracking-widest text-[10px]">
                  {v.thumbnailUrl ? (
                    <img src={v.thumbnailUrl} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Video preview" />
                  ) : (
                    "Video coming soon"
                  )}
                </div>
              )}
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
