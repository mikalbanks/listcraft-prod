import { NextResponse } from 'next/server';
import { generateWithClaude } from '@/lib/claude';
import { PLATFORM_CONFIGS } from '@/lib/platforms';
import type { Platform, Tone, PlatformListing, ListingResults } from '@/types';

function buildSystemPrompt(platform: Platform, tone: Tone): string {
  const config = PLATFORM_CONFIGS[platform];
  const titleRule = config.titleLimit
    ? `- Title: max ${config.titleLimit} characters, front-load primary keywords`
    : '- Title: no hard character limit, but keep it concise and keyword-rich';

  return `You are an expert e-commerce copywriter specializing in ${config.name} listings.

PLATFORM RULES FOR ${config.name.toUpperCase()}:
${titleRule}
- Description: ${config.wordRange} words, scannable with line breaks
- Tags: exactly ${config.tagCount} tags, mix of broad and long-tail
- Tone: ${tone}

GUIDELINES:
- Lead with the primary benefit, not the feature
- Include sensory language for physical products
- Use power words: handcrafted, premium, exclusive, versatile
- Naturally embed searchable keywords without stuffing
- For Etsy: emphasize handmade, unique, gift-worthy
- For Amazon: focus on problem-solving, specs, comparison advantages
- For Shopify: use brand-voice, lifestyle-oriented copy
- For eBay: detailed specs, condition clarity, value proposition
- For Poshmark: emphasize brand, condition, styling suggestions

OUTPUT FORMAT (respond in valid JSON only, no markdown fences):
{
  "title": "...",
  "bullets": ["...", "...", "...", "...", "..."],
  "description": "...",
  "tags": ["...", "..."]
}`;
}

function buildUserMessage(productName: string, bullets: string, category: string): string {
  return `Product Name: ${productName}
Category: ${category}
Product Details:
${bullets}

Generate the optimized listing now.`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productName, bullets, category, tone, platforms, photoBase64 } = body as {
      productName: string;
      bullets: string;
      category: string;
      tone: Tone;
      platforms: Platform[];
      photoBase64?: string;
    };

    if (!productName || !bullets || !platforms?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userMessage = buildUserMessage(productName, bullets, category);

    // Clean the base64 image data (strip data URL prefix if present)
    const cleanBase64 = photoBase64?.replace(/^data:image\/\w+;base64,/, '');

    const results: ListingResults = {};
    const promises = platforms.map(async (platform) => {
      const systemPrompt = buildSystemPrompt(platform, tone);
      const raw = await generateWithClaude({
        systemPrompt,
        userMessage: cleanBase64
          ? `${userMessage}\n\n[A product photo is attached. Use visual details from the photo to enhance the listing — materials, colors, style, craftsmanship, etc.]`
          : userMessage,
        imageBase64: cleanBase64,
      });
      const parsed: PlatformListing = JSON.parse(raw);
      results[platform] = parsed;
    });

    await Promise.all(promises);

    return NextResponse.json(results);
  } catch (err) {
    console.error('Generate listing error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
