
export interface Artwork {
  id: string;
  title: string;
  category: 'original' | 'limited' | 'postcard' | 'indoor';
  subCategory?: string; // e.g., 'mural', 'alcove', 'exhibition'
  imageUrl: string;
  description?: string;
  year?: string;
  size?: string;
  price?: number;
  isSoldOut?: boolean;
  showInStore?: boolean;
}

export interface VideoProject {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export interface Exhibition {
  year: string;
  title: string;
  location: string;
}
