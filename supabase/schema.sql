-- ListCraft AI — Supabase Schema
-- Run this in your Supabase SQL Editor to set up the database.

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'monthly', 'payg')),
  stripe_customer_id TEXT,
  free_listings_used INTEGER DEFAULT 0,
  payg_credits INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Listings table
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  input_bullets TEXT NOT NULL,
  category TEXT,
  tone TEXT DEFAULT 'professional',
  photo_url TEXT,
  output_etsy JSONB,
  output_amazon JSONB,
  output_shopify JSONB,
  output_ebay JSONB,
  output_poshmark JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Anonymous usage tracking (pre-signup)
CREATE TABLE IF NOT EXISTS anon_usage (
  fingerprint TEXT PRIMARY KEY,
  listings_generated INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_listings_user_id ON listings(user_id);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Policies: users can read/update their own row
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Policies: users can read/insert their own listings
CREATE POLICY "Users can view own listings" ON listings
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own listings" ON listings
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Service role bypass (for API routes using service key)
-- The service role key bypasses RLS by default in Supabase.

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
