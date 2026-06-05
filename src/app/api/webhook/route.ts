import { NextResponse } from 'next/server';
import { getBillingProvider } from '@/lib/billing';

export async function POST(request: Request) {
  const provider = getBillingProvider();

  if (provider === 'stripe') {
    return handleStripeWebhook(request);
  }
  return handleLagoWebhook(request);
}

// ----- Stripe Webhook -----

async function handleStripeWebhook(request: Request) {
  const sig = request.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  const body = await request.text();

  // Verify with Stripe webhook secret (production)
  let event;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Stripe = require('stripe');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Webhook verification failed';
    console.error('Stripe webhook verification failed:', msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      console.log('Stripe checkout completed:', event.data.object.id);
      // TODO: Activate subscription / credits in Supabase
      break;
    case 'customer.subscription.updated':
      console.log('Stripe subscription updated:', event.data.object.id);
      break;
    case 'customer.subscription.deleted':
      console.log('Stripe subscription deleted:', event.data.object.id);
      break;
    default:
      console.log('Unhandled Stripe event:', event.type);
  }

  return NextResponse.json({ received: true });
}

// ----- Lago Webhook -----

async function handleLagoWebhook(request: Request) {
  const signature = request.headers.get('x-lago-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature header' }, { status: 400 });
  }

  const body = await request.json();
  const eventType = body.webhook_type;

  switch (eventType) {
    case 'invoice.created':
      console.log('Lago invoice created:', body.invoice?.lago_id);
      break;
    case 'invoice.payment_status_updated':
      console.log('Lago payment status:', body.invoice?.lago_id, body.invoice?.payment_status);
      break;
    case 'subscription.started':
      console.log('Lago subscription started:', body.subscription?.external_id);
      break;
    case 'subscription.terminated':
      console.log('Lago subscription terminated:', body.subscription?.external_id);
      break;
    default:
      console.log('Unhandled Lago webhook:', eventType);
  }

  return NextResponse.json({ received: true });
}
