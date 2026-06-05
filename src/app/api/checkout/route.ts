import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/billing';

export async function POST(request: Request) {
  try {
    const { priceType, email } = await request.json() as { priceType: string; email?: string };

    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const result = await createCheckoutSession(priceType, origin, email);

    return NextResponse.json(result);
  } catch (err) {
    console.error('Checkout error:', err);
    const message = err instanceof Error ? err.message : 'Failed to create checkout session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
