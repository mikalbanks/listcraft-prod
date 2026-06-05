/**
 * Client-side listing history storage (localStorage).
 * Stores up to 50 recent listings for the dashboard.
 * When Supabase is configured, this acts as a cache — listings also sync to the DB.
 */

export interface SavedListing {
  id: string;
  productName: string;
  category: string;
  tone: string;
  platforms: string[];
  createdAt: string;
  results: Record<string, {
    title: string;
    bullets: string[];
    description: string;
    tags: string[];
  }>;
}

const LISTING_STORAGE_KEY = 'listcraft_saved_listings';

export function getSavedListings(): SavedListing[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LISTING_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveListing(listing: SavedListing): void {
  const listings = getSavedListings();
  listings.unshift(listing);
  // Keep last 50
  const trimmed = listings.slice(0, 50);
  localStorage.setItem(LISTING_STORAGE_KEY, JSON.stringify(trimmed));
}

export function deleteListing(id: string): void {
  const listings = getSavedListings().filter((l) => l.id !== id);
  localStorage.setItem(LISTING_STORAGE_KEY, JSON.stringify(listings));
}

export function clearListings(): void {
  localStorage.removeItem(LISTING_STORAGE_KEY);
}
