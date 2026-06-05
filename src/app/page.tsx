import PricingCard from '@/components/shared/PricingCard';

const PLATFORMS = ['Etsy', 'Amazon', 'Shopify', 'eBay', 'Poshmark'];

const STEPS = [
  { number: '1', title: 'Describe Your Product', desc: 'Enter your product name, a few bullet points, and pick a category.' },
  { number: '2', title: 'Choose Your Platforms', desc: 'Select which marketplaces you sell on — Etsy, Amazon, Shopify, eBay, or Poshmark.' },
  { number: '3', title: 'Copy & Paste', desc: 'Get optimized titles, descriptions, bullet points, and tags. One click to copy.' },
];

const FAQS = [
  { q: 'How does ListCraft AI work?', a: 'You describe your product in a few bullet points, choose your platforms, and our AI generates SEO-optimized listings tailored to each marketplace in seconds.' },
  { q: 'Which platforms are supported?', a: 'We currently support Etsy, Amazon, Shopify, eBay, and Poshmark. Each platform gets listings formatted to its specific requirements — character limits, tag counts, and description styles.' },
  { q: 'Do I need to sign up?', a: 'No! You can generate 5 free listings without signing up. Create an account to unlock 5 more free listings, or upgrade for unlimited access.' },
  { q: 'Can I edit the generated listings?', a: 'Absolutely. The generated listings are a starting point — copy them, tweak them, and make them your own. You can also regenerate any listing to get a fresh version.' },
  { q: 'What AI model do you use?', a: 'We use Anthropic\'s Claude, one of the most advanced AI models available. It excels at writing natural, persuasive copy that converts browsers into buyers.' },
  { q: 'Is there a limit on free listings?', a: 'Free users get 5 listings without an account, or 10 with a free account. After that, our Monthly plan ($29/mo) gives you unlimited listings across all platforms.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-xl font-bold text-indigo-600">ListCraft <span className="text-gray-400">AI</span></span>
          <div className="flex items-center gap-4">
            <a href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="/auth/signin" className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign In</a>
            <a
              href="/generate"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Try Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl">
          Turn Products Into <span className="text-indigo-600">Sales</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          AI-powered listing writer for e-commerce sellers. Generate SEO-optimized titles, descriptions, bullet points, and tags for Etsy, Amazon, Shopify, eBay, and Poshmark — in seconds.
        </p>
        <a
          href="/generate"
          className="mt-8 inline-block rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-indigo-700"
        >
          Generate Your First Listing Free
        </a>
        <p className="mt-3 text-sm text-gray-500">No signup required. 5 free listings.</p>
      </section>

      {/* Platform Logos */}
      <section className="border-y border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-400">Optimized for</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {PLATFORMS.map((p) => (
              <span key={p} className="text-xl font-bold text-gray-300">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold text-gray-900">How It Works</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-600">Three steps to listings that sell. No copywriting skills required.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900">See the Difference</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-600">Your listing, transformed by AI.</p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Before */}
            <div className="rounded-xl border border-red-200 bg-white p-6">
              <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">Before</span>
              <h4 className="mt-4 text-base font-medium text-gray-800">Silver necklace with moon</h4>
              <p className="mt-3 text-sm text-gray-500">
                Pretty silver necklace. Has a moon on it. Good for gifts. Adjustable chain. Handmade.
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {['necklace', 'silver', 'moon'].map((t) => (
                  <span key={t} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{t}</span>
                ))}
              </div>
            </div>
            {/* After */}
            <div className="rounded-xl border border-green-200 bg-white p-6">
              <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">After — ListCraft AI</span>
              <h4 className="mt-4 text-base font-medium text-gray-800">Handmade Sterling Silver Moon Necklace with Moonstone — Adjustable 18&quot; Chain, Celestial Jewelry Gift</h4>
              <p className="mt-3 text-sm text-gray-500">
                Embrace celestial elegance with this stunning handcrafted sterling silver moon necklace. Featuring a luminous genuine moonstone pendant, this piece brings mystical charm to any outfit...
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {['sterling silver necklace', 'moonstone jewelry', 'celestial', 'handmade', 'gift for her', 'moon necklace', 'boho jewelry'].map((t) => (
                  <span key={t} className="rounded bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-4 py-20" id="pricing">
        <h2 className="text-center text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-600">Start free. Upgrade when you need more.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <PricingCard
            name="Free"
            price="$0"
            description="Try it out, no commitment."
            features={['5 listings (no signup)', '10 listings with free account', 'All 5 platforms', 'Copy with one click']}
            cta="Start Free"
            ctaHref="/generate"
          />
          <PricingCard
            name="Monthly"
            price="$29"
            period="/mo"
            description="For serious sellers."
            features={['Unlimited listings', 'All 5 platforms', 'Listing history', 'Priority generation', 'Cancel anytime']}
            cta="Subscribe"
            ctaHref="/pricing"
            highlighted
          />
          <PricingCard
            name="Pay As You Go"
            price="$0.50"
            period="/listing"
            description="Only pay for what you use."
            features={['Buy 10 credits for $5', 'Buy 50 credits for $20', 'All 5 platforms', 'Credits never expire']}
            cta="Buy Credits"
            ctaHref="/pricing"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-12 space-y-6">
            {FAQS.map((faq, i) => (
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
