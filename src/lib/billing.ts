/**
 * Billing abstraction layer — supports both Stripe and Lago.
 * Set BILLING_PROVIDER=stripe or BILLING_PROVIDER=lago in .env.local
 * Defaults to stripe if not set.
 *
 * Shared across products 2-5.
 */

export type BillingProvider = 'stripe' | 'lago';

export interface CheckoutResult {
  url: string;
}

export function getBillingProvider(): BillingProvider {
  const provider = process.env.BILLING_PROVIDER?.toLowerCase();
  if (provider === 'lago') return 'lago';
  return 'stripe'; // default
}

// ----- Plan code mappings (shared) -----

export const PLAN_CODES: Record<string, string> = {
  monthly: 'listcraft_monthly',
  payg_10: 'listcraft_payg_10',
  payg_50: 'listcraft_payg_50',
};

// ----- Stripe helpers -----

function getStripeClient() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Stripe = require('stripe');
  return new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-05-28.basil',
  });
}

const STRIPE_PRICE_MAP: Record<string, string> = {
  monthly: process.env.STRIPE_PRICE_MONTHLY || '',
  payg_10: process.env.STRIPE_PRICE_PAYG_10 || '',
  payg_50: process.env.STRIPE_PRICE_PAYG_50 || '',
};

async function createStripeCheckout(
  priceType: string,
  origin: string,
  email?: string
): Promise<CheckoutResult> {
  const stripe = getStripeClient();
  const priceId = STRIPE_PRICE_MAP[priceType];
  if (!priceId) throw new Error('Invalid plan selected');

  const isSubscription = priceType === 'monthly';

  const session = await stripe.checkout.sessions.create({
    mode: isSubscription ? 'subscription' : 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    ...(email ? { customer_email: email } : {}),
  });

  return { url: session.url };
}

// ----- Lago helpers -----

function getLagoClient() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Client } = require('lago-javascript-client');
  return Client(process.env.LAGO_API_KEY || '', {
    baseUrl: process.env.LAGO_API_URL || 'https://api.getlago.com/api/v1',
  });
}

async function createLagoCheckout(
  priceType: string,
  origin: string,
  email?: string
): Promise<CheckoutResult> {
  const lago = getLagoClient();
  const planCode = PLAN_CODES[priceType];
  if (!planCode) throw new Error('Invalid plan selected');

  const customerId = email || `anon_${Date.now()}`;

  // Create or update the customer
  await lago.customers.createCustomer({
    customer: {
      external_id: customerId,
      email: email || undefined,
      name: email || 'Anonymous User',
    },
  });

  // Create a subscription
  await lago.subscriptions.createSubscription({
    subscription: {
      external_customer_id: customerId,
      plan_code: planCode,
      external_id: `sub_${customerId}_${Date.now()}`,
    },
  });

  // Try to get a checkout URL
  try {
    const checkoutRes = await lago.customers.generateCustomerCheckoutUrl(customerId);
    if (checkoutRes.data?.customer?.checkout_url) {
      return { url: checkoutRes.data.customer.checkout_url };
    }
  } catch {
    // No payment provider configured — fall through
  }

  return { url: `${origin}/success` };
}

// ----- Public API -----

export async function createCheckoutSession(
  priceType: string,
  origin: string,
  email?: string
): Promise<CheckoutResult> {
  const provider = getBillingProvider();

  if (provider === 'lago') {
    return createLagoCheckout(priceType, origin, email);
  }

  return createStripeCheckout(priceType, origin, email);
}
