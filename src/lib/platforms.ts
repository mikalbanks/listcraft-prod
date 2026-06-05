import { Platform } from '@/types';

export interface PlatformConfig {
  name: string;
  titleLimit: number | null;
  tagCount: number;
  descriptionStyle: string;
  wordRange: string;
}

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  etsy: {
    name: 'Etsy',
    titleLimit: 140,
    tagCount: 13,
    descriptionStyle: 'Storytelling + SEO',
    wordRange: '150-300',
  },
  amazon: {
    name: 'Amazon',
    titleLimit: 200,
    tagCount: 7,
    descriptionStyle: 'Benefit-driven bullets',
    wordRange: '150-300',
  },
  shopify: {
    name: 'Shopify',
    titleLimit: null,
    tagCount: 8,
    descriptionStyle: 'Brand-voice, lifestyle',
    wordRange: '150-300',
  },
  ebay: {
    name: 'eBay',
    titleLimit: 80,
    tagCount: 5,
    descriptionStyle: 'Detailed specs + condition',
    wordRange: '100-200',
  },
  poshmark: {
    name: 'Poshmark',
    titleLimit: 40,
    tagCount: 5,
    descriptionStyle: 'Brief, fashion-forward',
    wordRange: '50-150',
  },
};

export const ALL_PLATFORMS: Platform[] = ['etsy', 'amazon', 'shopify', 'ebay', 'poshmark'];

export const CATEGORIES = [
  'Jewelry & Accessories',
  'Clothing & Shoes',
  'Home & Living',
  'Art & Collectibles',
  'Digital Products',
  'Toys & Games',
  'Beauty & Personal Care',
  'Vintage',
  'Craft Supplies',
  'Other',
];

export const TONES: { value: string; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'luxe', label: 'Luxe' },
  { value: 'fun', label: 'Fun / Quirky' },
  { value: 'minimal', label: 'Minimal' },
];
