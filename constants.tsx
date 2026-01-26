
import { Artwork, VideoProject, Exhibition } from './types';

export const ARTWORKS: Artwork[] = [
  // New Originals (Sold & In Store)
  {
    id: 'n1',
    title: 'Kabul Riverside Mosque',
    category: 'original',
    imageUrl: '/artworks/bridge_mosque.jpg',
    year: '2024',
    isSoldOut: true,
    showInStore: true
  },
  {
    id: 'n2',
    title: 'Panjshir Valley Study',
    category: 'original',
    imageUrl: '/artworks/mountain_valley.jpg',
    year: '2024',
    isSoldOut: true,
    showInStore: true
  },
  {
    id: 'n3',
    title: 'Old City Sunset',
    category: 'original',
    imageUrl: '/artworks/sunset_street.jpg',
    year: '2024',
    isSoldOut: true,
    showInStore: true
  },
  {
    id: 'n4',
    title: 'Bamiyan Cliffside',
    category: 'original',
    imageUrl: '/artworks/bamiyan_cliffs.jpg',
    year: '2024',
    isSoldOut: true,
    showInStore: true
  },
  {
    id: 'n5',
    title: 'Echoes of Bamiyan',
    category: 'original',
    imageUrl: '/artworks/buddha_nook.jpg',
    year: '2024',
    isSoldOut: true,
    showInStore: true
  },
  // General Artworks / Landscapes
  { id: 'a1', title: 'Mountain Waterfall Valley', category: 'original', imageUrl: 'art-01.jpg', year: '2024' },
  { id: 'a2', title: 'Riverside Village Life', category: 'original', imageUrl: 'art-02.jpg', year: '2024' },
  { id: 'a3', title: 'The Great Cliff Passage', category: 'original', imageUrl: 'art-03.jpg', year: '2023' },
  { id: 'a4', title: 'Snowy Peaks Study', category: 'original', imageUrl: 'art-04.jpg', year: '2024' },
  { id: 'a5', title: 'Autumn River House', category: 'original', imageUrl: 'art-05.jpg', year: '2023' },
  { id: 'a6', title: 'Crystal Lake Fort', category: 'original', imageUrl: 'art-06.jpg', year: '2024' },
  { id: 'a7', title: 'The Silent Minaret', category: 'original', imageUrl: 'art-07.jpg', year: '2024' },
  { id: 'a8', title: 'Reflections of the Citadel', category: 'original', imageUrl: 'art-08.jpg', year: '2024' },
  { id: 'a9', title: 'Town Square Tower', category: 'original', imageUrl: 'art-09.jpg', year: '2023' },
  { id: 'a10', title: 'Dusk in the Valley', category: 'original', imageUrl: 'art-10.jpg', year: '2024' },

  // Indoor Pieces / Murals (Categorized)
  { id: 'i11', title: 'Harvest Mice Water Tower', category: 'indoor', subCategory: 'mural', imageUrl: 'art-indoor-watertower.jpg', year: '2025' },
  { id: 'i10', title: 'The Hoopoe Bird Mural', category: 'indoor', subCategory: 'mural', imageUrl: 'art-indoor-bird.jpg', year: '2025' },
  { id: 'i1', title: 'Framed Archways Monument', category: 'indoor', subCategory: 'exhibition', imageUrl: 'art-indoor-01.jpg', year: '2024' },
  { id: 'i2', title: 'Exhibition Wall Triptych', category: 'indoor', subCategory: 'exhibition', imageUrl: 'art-indoor-02.jpg', year: '2024' },
  { id: 'i3', title: 'Street Scene Niche', category: 'indoor', subCategory: 'alcove', imageUrl: 'art-indoor-03.jpg', year: '2024' },
  { id: 'i4', title: 'Winter Village Niche', category: 'indoor', subCategory: 'alcove', imageUrl: 'art-indoor-05.jpg', year: '2023' },
  { id: 'i5', title: 'Riverside Settlement Mural', category: 'indoor', subCategory: 'mural', imageUrl: 'art-indoor-06.jpg', year: '2024' },
  { id: 'i6', title: 'Mountain Pass Installation', category: 'indoor', subCategory: 'mural', imageUrl: 'art-indoor-07.jpg', year: '2024' },
  { id: 'i7', title: 'The Watchtower Mural', category: 'indoor', subCategory: 'mural', imageUrl: 'art-indoor-08.jpg', year: '2023' },
  { id: 'i8', title: 'Blue Valley Niche', category: 'indoor', subCategory: 'alcove', imageUrl: 'art-indoor-09.jpg', year: '2024' },
  { id: 'i9', title: 'Forest Edge Mural', category: 'indoor', subCategory: 'mural', imageUrl: 'art-indoor-10.jpg', year: '2024' }
];

export const MAKING_OF_VIDEOS: VideoProject[] = [
  {
    id: 'v1',
    title: 'Process: Landscapes of the Soul',
    description: 'A timelapse capturing the delicate layering of colors in my latest valley series.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'art-01.jpg'
  }
];

export const PERSONAL_EXHIBITIONS: Exhibition[] = [
  { year: '2024', title: 'Ramadan and More (Curated by Peter Gressman)', location: 'Dubai, UAE' },
  { year: '2024', title: 'Heritage & Light', location: 'National Gallery - Kabul' },
  { year: '2023', title: 'Silence of the Mountains', location: 'Modern Art Space - Dubai' }
];

export const COLLECTIVE_EXHIBITIONS: Exhibition[] = [
  { year: '2024', title: 'Global Canvas Art Festival (Season II)', location: 'Dubai (Guinness World Record Event)' },
  { year: '2024', title: 'Universal Landscapes', location: 'Louvre Abu Dhabi' },
  { year: '2023', title: 'Colors of Central Asia', location: 'Smithsonian - Washington D.C.' },
  { year: 'Ongoing', title: 'Human Expo for Volunteering & Innovation', location: 'UAE Year of Community' }
];
