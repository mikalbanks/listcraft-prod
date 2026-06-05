'use client';

import PricingCard from '@/components/shared/PricingCard';

const PRICING_FAQS = [
  { q: 'Can I cancel anytime?', a: 'Yes! The monthly plan has no lock-in. Cancel anytime from your dashboard and you won\'t be charged again.' },
  { q: 'Do pay-as-you-go credits expire?', a: 'No — credits never expire. Use them whenever you need them.' },
  { q: 'What counts as one listing?', a: 'One listing = one product generated across all selected platforms. If you generate for Etsy + Amazon + Shopify at once, that counts as one listing.' },
  { q: 'Can I switch between plans?', a: 'Absolutely. Upgrade, downgrade, or switch to pay-as-you-go anytime. Unused credits carry over.' },
  { q: 'Is there a free trial of the monthly plan?', a: 'The free tier (5 listings, no signup) is effectively your trial. Try it out and upgrade when you\'re ready.' },
];

async function handleCheckout(priceType: string) {
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceType }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  } catch {
    alert('Unable to start checkout. Please try again.');
  }
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="/" className="text-xl font-bold text-indigo-600">ListCraft <span className="text-gray-400">AI</span></a>
          <a
            href="/generate"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Try Free
          </a>
        </div>
      </nav>

      {/* Header */}
      <section className="mx-auto max-w-4xl px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="mt-3 text-lg text-gray-600">
          Start free. Upgrade when your store needs more listings.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="grid gap-8 sm:grid-cols-3">
          <PricingCard
            name="Free"
            price="$0"
            description="Perfect for trying it out."
            features={[
              '5 listings without signup',
              '10 listings with free account',
              'All 5 platforms',
              'One-click copy',
              'Regenerate anytime',
            ]}
            cta="Start Free"
            ctaHref="/generate"
          />
          <PricingCard
            name="Monthly"
            price="$29"
            period="/mo"
            description="For sellers who list regularly."
            features={[
              'Unlimited listings',
              'All 5 platforms',
              'Listing history & re-editing',
              'Priority generation speed',
              'Cancel anytime',
            ]}
            cta="Subscribe — $29/mo"
            onCtaClick={() => handleCheckout('monthly')}
            highlighted
          />
          <PricingCard
            name="Pay As You Go"
            price="$0.50"
            period="/listing"
            description="Buy only what you need."
            features={[
              '10 credits for $5',
              '50 credits for $20',
              'All 5 platforms',
              'Credits never expire',
              'No subscription needed',
            ]}
            cta="Buy 10 Credits — $5"
            onCtaClick={() => handleCheckout('payg_10')}
          />
        </div>

        {/* PAYG 50-pack option */}
        <div className="mt-4 text-center">
          <button
            onClick={() => handleCheckout('payg_50')}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Or buy 50 credits for $20 (save 20%)
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900">Pricing FAQ</h2>
          <div className="mt-12 space-y-6">
            {PRICING_FAQS.map((faq, i) => (
              <details key={i} className="group rounded-lg border border-gray-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-medium text-gray-900">
                  {faq.q}
                  <svg className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-6 pb-4 text-sm text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ListCraft AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
