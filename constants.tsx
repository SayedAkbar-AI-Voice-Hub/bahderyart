
import { Artwork, VideoProject, Exhibition } from './types';

export const ARTWORKS: Artwork[] = [
  // Featured Originals (Sold & In Store)
  { id: 'n1', title: 'Kabul Riverside Mosque', category: 'original', imageUrl: '/artworks/bridge_mosque.jpg', year: '2024', isSoldOut: true, showInStore: true },
  { id: 'n2', title: 'Panjshir Valley Study', category: 'original', imageUrl: '/artworks/mountain_valley.jpg', year: '2024', isSoldOut: true, showInStore: true },
  { id: 'n3', title: 'Old City Sunset', category: 'original', imageUrl: '/artworks/sunset_street.jpg', year: '2024', isSoldOut: true, showInStore: true },
  { id: 'n4', title: 'Bamiyan Cliffside', category: 'original', imageUrl: '/artworks/bamiyan_cliffs.jpg', year: '2024', isSoldOut: true, showInStore: true },
  { id: 'n5', title: 'Echoes of Bamiyan', category: 'original', imageUrl: '/artworks/buddha_nook.jpg', year: '2024', isSoldOut: true, showInStore: true },

  // Original Landscapes
  { id: 'a01', title: 'Band-e-Amir Panorama', category: 'original', imageUrl: '/artworks/IMG_0877.JPG', year: '2024' },
  { id: 'a02', title: 'Paghman Victory Arch', category: 'original', imageUrl: '/artworks/IMG_0863.JPG', year: '2024' },
  { id: 'a03', title: 'Bridge Over Kabul River', category: 'original', imageUrl: '/artworks/IMG_0864.JPG', year: '2024' },
  { id: 'a04', title: 'Misty Green Valley', category: 'original', imageUrl: '/artworks/IMG_0866.JPG', year: '2024' },
  { id: 'a05', title: 'Sunset Bazaar', category: 'original', imageUrl: '/artworks/IMG_0868.JPG', year: '2024' },
  { id: 'a06', title: 'Bamiyan at Twilight', category: 'original', imageUrl: '/artworks/IMG_0869.JPG', year: '2024' },
  { id: 'a07', title: 'Buddha Niche in Winter', category: 'original', imageUrl: '/artworks/IMG_0870.JPG', year: '2024' },
  { id: 'a08', title: 'The Ancient Arch', category: 'original', imageUrl: '/artworks/IMG_0871.JPG', year: '2024' },
  { id: 'a09', title: 'Old City Alleyway', category: 'original', imageUrl: '/artworks/IMG_0872.JPG', year: '2024' },
  { id: 'a10', title: 'Minaret of Jam', category: 'original', imageUrl: '/artworks/IMG_0876.JPG', year: '2024' },
  { id: 'a11', title: 'River Village Serenity', category: 'original', imageUrl: '/artworks/IMG_0878.JPG', year: '2024' },
  { id: 'a12', title: 'Autumn Stream Village', category: 'original', imageUrl: '/artworks/IMG_0879.JPG', year: '2024' },
  { id: 'a13', title: 'Village Reflections', category: 'original', imageUrl: '/artworks/IMG_0880.JPG', year: '2023' },
  { id: 'a14', title: 'Rural Pond at Dusk', category: 'original', imageUrl: '/artworks/IMG_0883.JPG', year: '2023' },
  { id: 'a15', title: 'Moonlit Cottage', category: 'original', imageUrl: '/artworks/IMG_0886.JPG', year: '2024' },
  { id: 'a16', title: 'Citadel Lake Reflection', category: 'original', imageUrl: '/artworks/IMG_0887.JPG', year: '2024' },
  { id: 'a17', title: 'Golden Hour Village', category: 'original', imageUrl: '/artworks/IMG_0888.JPG', year: '2023' },
  { id: 'a18', title: 'Rocky River Gorge', category: 'original', imageUrl: '/artworks/IMG_0922.JPG', year: '2024' },
  { id: 'a19', title: 'Panjshir River Canvas', category: 'original', imageUrl: '/artworks/IMG_0927.JPG', year: '2024' },
  { id: 'a20', title: 'Blue River Settlement', category: 'original', imageUrl: '/artworks/IMG_1132.JPG', year: '2024' },
  { id: 'a21', title: 'Blue River Settlement II', category: 'original', imageUrl: '/artworks/IMG_1132_2.JPG', year: '2024' },
  { id: 'a22', title: 'Village Bridge and Stream', category: 'original', imageUrl: '/artworks/IMG_1135.JPG', year: '2024' },
  { id: 'a23', title: 'Fortress Reflected in Lake', category: 'original', imageUrl: '/artworks/IMG_1136.JPG', year: '2024' },
  { id: 'a24', title: 'Citadel Mirror', category: 'original', imageUrl: '/artworks/IMG_1137.JPG', year: '2024' },
  { id: 'a25', title: 'River Valley Homestead', category: 'original', imageUrl: '/artworks/IMG_1138.JPG', year: '2024' },
  { id: 'a26', title: 'Turquoise Lake Waterfalls', category: 'original', imageUrl: '/artworks/IMG_1139.JPG', year: '2024' },
  { id: 'a27', title: 'The Great Waterfall', category: 'original', imageUrl: '/artworks/IMG_1140.JPG', year: '2024' },
  { id: 'a28', title: 'Mountain Village Bridge', category: 'original', imageUrl: '/artworks/IMG_1141.JPG', year: '2024' },
  { id: 'a29', title: 'Rocky Mountain Meadow', category: 'original', imageUrl: '/artworks/IMG_1142.JPG', year: '2024' },
  { id: 'a30', title: 'Grand Canyon Valley', category: 'original', imageUrl: '/artworks/IMG_1143.JPG', year: '2024' },
  { id: 'a31', title: 'Artist in the Studio', category: 'original', imageUrl: '/artworks/IMG_1144.JPG', year: '2024' },
  { id: 'a32', title: 'Band-e-Amir Canyon', category: 'original', imageUrl: '/artworks/IMG_1145.JPG', year: '2024' },
  { id: 'a33', title: 'Golden Cliffs at Still Lake', category: 'original', imageUrl: '/artworks/IMG_1146.JPG', year: '2024' },
  { id: 'a34', title: 'Sunlit Forest Path', category: 'original', imageUrl: '/artworks/IMG_1148.JPG', year: '2024' },
  { id: 'a35', title: 'River Bend Village', category: 'original', imageUrl: '/artworks/IMG_1149.JPG', year: '2024' },
  { id: 'a36', title: 'Hilltop Citadel', category: 'original', imageUrl: '/artworks/IMG_1150.JPG', year: '2024' },
  { id: 'a37', title: 'Mountain River Passage', category: 'original', imageUrl: '/artworks/IMG_1151.JPG', year: '2024' },
  { id: 'a38', title: 'Snow Peaks Over Lake', category: 'original', imageUrl: '/artworks/IMG_1152.JPG', year: '2024' },
  { id: 'a39', title: 'Paghman Monuments', category: 'original', imageUrl: '/artworks/IMG_1153.JPG', year: '2024' },
  { id: 'a40', title: 'Autumn Village Creek', category: 'original', imageUrl: '/artworks/IMG_1154.JPG', year: '2024' },
  { id: 'a41', title: 'Blue City Alley', category: 'original', imageUrl: '/artworks/IMG_1155.JPG', year: '2024' },
  { id: 'a42', title: 'Stormy Moonlit Stream', category: 'original', imageUrl: '/artworks/IMG_1156.JPG', year: '2024' },
  { id: 'a43', title: 'Ship on Moonlit Sea', category: 'original', imageUrl: '/artworks/IMG_1157.JPG', year: '2024' },
  { id: 'a44', title: 'Kite Over the Mountains', category: 'original', imageUrl: '/artworks/IMG_1158.JPG', year: '2024' },
  { id: 'a45', title: 'Village Stream in Autumn', category: 'original', imageUrl: '/artworks/IMG_1159.JPG', year: '2024' },
  { id: 'a46', title: 'Misty Sunset Lake', category: 'original', imageUrl: '/artworks/IMG_1160.JPG', year: '2024' },
  { id: 'a47', title: 'The Tea Maker', category: 'original', imageUrl: '/artworks/IMG_1161.JPG', year: '2024' },
  { id: 'a48', title: 'Old Tower by the Creek', category: 'original', imageUrl: '/artworks/IMG_1162.JPG', year: '2024' },
  { id: 'a49', title: 'Vibrant Bazaar at Sunset', category: 'original', imageUrl: '/artworks/IMG_1163.JPG', year: '2024' },
  { id: 'a50', title: 'Sunset Over Mountain Lake', category: 'original', imageUrl: '/artworks/IMG_1164.JPG', year: '2024' },
  { id: 'a51', title: 'Busy Afghan Marketplace', category: 'original', imageUrl: '/artworks/IMG_1166.JPG', year: '2024' },
  { id: 'a52', title: 'Mountain Valley Vista', category: 'original', imageUrl: '/artworks/IMG_1167.JPG', year: '2024' },
  { id: 'a53', title: 'Moonlit Village in Blue', category: 'original', imageUrl: '/artworks/IMG_1168.JPG', year: '2024' },
  { id: 'a54', title: 'Bamiyan Buddha Niches', category: 'original', imageUrl: '/artworks/IMG_1169.JPG', year: '2024' },
  { id: 'a55', title: 'Snow Peak at Golden Hour', category: 'original', imageUrl: '/artworks/IMG_1170.JPG', year: '2024' },
  { id: 'a56', title: 'Misty Blue Waterfall', category: 'original', imageUrl: '/artworks/IMG_1171.JPG', year: '2024' },
  { id: 'a57', title: 'Riverside House at Sunset', category: 'original', imageUrl: '/artworks/IMG_1172.JPG', year: '2024' },
  { id: 'a58', title: 'Burj Al Arab at Dusk', category: 'original', imageUrl: '/artworks/IMG_1173.JPG', year: '2024' },
  { id: 'a59', title: 'Mountain Town Street', category: 'original', imageUrl: '/artworks/IMG_1174.JPG', year: '2024' },
  { id: 'a60', title: 'Artist with River Painting', category: 'original', imageUrl: '/artworks/IMG_1175.JPG', year: '2024' },
  { id: 'a61', title: 'Mosque Bridge Panorama', category: 'original', imageUrl: '/artworks/IMG_1176.JPG', year: '2024' },
  { id: 'a62', title: 'Studio Collection Wall', category: 'original', imageUrl: '/artworks/IMG_1177.JPG', year: '2024' },
  { id: 'a63', title: 'Colorful Bazaar Alley', category: 'original', imageUrl: '/artworks/IMG_1178.JPG', year: '2024' },
  { id: 'a64', title: 'Traditional Tower by River', category: 'original', imageUrl: '/artworks/IMG_1179.JPG', year: '2024' },
  { id: 'a65', title: 'Majestic Mountain Sunrise', category: 'original', imageUrl: '/artworks/IMG_1180.JPG', year: '2024' },
  { id: 'a66', title: 'Purple River Hillside', category: 'original', imageUrl: '/artworks/IMG_1181.JPG', year: '2024' },
  { id: 'a67', title: 'Golden Peak at Dawn', category: 'original', imageUrl: '/artworks/IMG_1182.JPG', year: '2024' },
  { id: 'a68', title: 'Green Mountain Passage', category: 'original', imageUrl: '/artworks/IMG_1183.JPG', year: '2024' },

  // Indoor Pieces / Installations
  { id: 'i01', title: 'Band-e-Amir Lake Mural', category: 'indoor', subCategory: 'mural', imageUrl: '/artworks/IMG_0670.JPG', year: '2024' },
  { id: 'i02', title: 'Minaret of Jam Installation', category: 'indoor', subCategory: 'exhibition', imageUrl: '/artworks/IMG_1133.JPG', year: '2024' },
  { id: 'i03', title: 'Citadel Panorama Wall', category: 'indoor', subCategory: 'mural', imageUrl: '/artworks/IMG_1134.JPG', year: '2024' },
  { id: 'i04', title: 'Fortress Display', category: 'indoor', subCategory: 'exhibition', imageUrl: '/artworks/IMG_1147.JPG', year: '2024' },
  { id: 'i05', title: 'Market Street Niche', category: 'indoor', subCategory: 'alcove', imageUrl: '/artworks/whatsapp_01.jpeg', year: '2024' },
  { id: 'i06', title: 'Old City Bazaar Niche', category: 'indoor', subCategory: 'alcove', imageUrl: '/artworks/whatsapp_02.jpeg', year: '2024' },
  { id: 'i07', title: 'Village Stream Alcove', category: 'indoor', subCategory: 'alcove', imageUrl: '/artworks/whatsapp_03.jpeg', year: '2024' },
  { id: 'i08', title: 'Pastoral Meadow Alcove', category: 'indoor', subCategory: 'alcove', imageUrl: '/artworks/whatsapp_04.jpeg', year: '2024' },
];

export const MAKING_OF_VIDEOS: VideoProject[] = [
  {
    id: 'v1',
    title: 'Process: Landscapes of the Soul',
    description: 'A timelapse capturing the delicate layering of colors in my latest valley series.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '/artworks/IMG_1144.JPG'
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
