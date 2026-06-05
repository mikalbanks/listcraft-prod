import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const signature = request.headers.get('x-lago-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature header' }, { status: 400 });
  }

  // Verify webhook signature against LAGO_WEBHOOK_SECRET
  // Lago signs webhooks with JWT — for production, verify with lago's public key
  // For now, log the event

  const body = await request.json();
  const eventType = body.webhook_type;

  switch (eventType) {
    case 'invoice.created':
      console.log('Invoice created:', body.invoice?.lago_id);
      break;
    case 'invoice.payment_status_updated':
      console.log('Payment status updated:', body.invoice?.lago_id, 'status:', body.invoice?.payment_status);
      break;
    case 'subscription.started':
      console.log('Subscription started:', body.subscription?.external_id);
      break;
    case 'subscription.terminated':
      console.log('Subscription terminated:', body.subscription?.external_id);
      break;
    default:
      console.log('Unhandled Lago webhook:', eventType);
  }

  return NextResponse.json({ received: true });
}
