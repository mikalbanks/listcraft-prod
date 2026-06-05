/**
 * Supabase database types for ListCraft AI.
 * Matches the SQL schema from the spec.
 */

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          plan: 'free' | 'monthly' | 'payg';
          stripe_customer_id: string | null;
          free_listings_used: number;
          payg_credits: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          plan?: 'free' | 'monthly' | 'payg';
          stripe_customer_id?: string | null;
          free_listings_used?: number;
          payg_credits?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          plan?: 'free' | 'monthly' | 'payg';
          stripe_customer_id?: string | null;
          free_listings_used?: number;
          payg_credits?: number;
          updated_at?: string;
        };
      };
      listings: {
        Row: {
          id: string;
          user_id: string;
          product_name: string;
          input_bullets: string;
          category: string | null;
          tone: string;
          photo_url: string | null;
          output_etsy: Record<string, unknown> | null;
          output_amazon: Record<string, unknown> | null;
          output_shopify: Record<string, unknown> | null;
          output_ebay: Record<string, unknown> | null;
          output_poshmark: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_name: string;
          input_bullets: string;
          category?: string | null;
          tone?: string;
          photo_url?: string | null;
          output_etsy?: Record<string, unknown> | null;
          output_amazon?: Record<string, unknown> | null;
          output_shopify?: Record<string, unknown> | null;
          output_ebay?: Record<string, unknown> | null;
          output_poshmark?: Record<string, unknown> | null;
          created_at?: string;
        };
        Update: {
          product_name?: string;
          input_bullets?: string;
          category?: string | null;
          tone?: string;
          photo_url?: string | null;
          output_etsy?: Record<string, unknown> | null;
          output_amazon?: Record<string, unknown> | null;
          output_shopify?: Record<string, unknown> | null;
          output_ebay?: Record<string, unknown> | null;
          output_poshmark?: Record<string, unknown> | null;
        };
      };
      anon_usage: {
        Row: {
          fingerprint: string;
          listings_generated: number;
          created_at: string;
        };
        Insert: {
          fingerprint: string;
          listings_generated?: number;
          created_at?: string;
        };
        Update: {
          listings_generated?: number;
        };
      };
    };
  };
}
