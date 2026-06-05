export type Platform = 'etsy' | 'amazon' | 'shopify' | 'ebay' | 'poshmark';

export type Tone = 'professional' | 'casual' | 'luxe' | 'fun' | 'minimal';

export interface ListingInput {
  productName: string;
  bullets: string;
  category: string;
  tone: Tone;
  platforms: Platform[];
  photoBase64?: string;
}

export interface PlatformListing {
  title: string;
  bullets: string[];
  description: string;
  tags: string[];
}

export type ListingResults = Partial<Record<Platform, PlatformListing>>;
