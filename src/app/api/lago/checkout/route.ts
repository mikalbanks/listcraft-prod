import { NextResponse } from 'next/server';
import { lago, PLAN_CODES } from '@/lib/lago';

export async function POST(request: Request) {
  try {
    const { priceType, email } = await request.json() as { priceType: string; email?: string };

    const planCode = PLAN_CODES[priceType];
    if (!planCode) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const customerId = email || `anon_${Date.now()}`;

    // Create or update the customer in Lago
    await lago.customers.createCustomer({
      customer: {
        external_id: customerId,
        email: email || undefined,
        name: email || 'Anonymous User',
      },
    });

    // Create a subscription (assign the plan)
    await lago.subscriptions.createSubscription({
      subscription: {
        external_customer_id: customerId,
        plan_code: planCode,
        external_id: `sub_${customerId}_${Date.now()}`,
      },
    });

    // Try to get a checkout URL (requires a payment provider configured in Lago)
    try {
      const checkoutRes = await lago.customers.generateCustomerCheckoutUrl(customerId);
      if (checkoutRes.data?.customer?.checkout_url) {
        return NextResponse.json({ url: checkoutRes.data.customer.checkout_url });
      }
    } catch {
      // No payment provider configured — fall through to success
    }

    // If no payment provider / checkout URL, redirect to success directly
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    return NextResponse.json({ url: `${origin}/success` });
  } catch (err) {
    console.error('Lago checkout error:', err);
    const message = err instanceof Error ? err.message : 'Failed to create checkout session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
