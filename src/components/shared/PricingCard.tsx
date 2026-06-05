interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  highlighted?: boolean;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  ctaHref,
  onCtaClick,
  highlighted = false,
}: PricingCardProps) {
  const Wrapper = ctaHref ? 'a' : 'button';
  const wrapperProps = ctaHref ? { href: ctaHref } : { onClick: onCtaClick, type: 'button' as const };

  return (
    <div
      className={`flex flex-col rounded-2xl border p-8 ${
        highlighted
          ? 'border-indigo-600 bg-indigo-50 shadow-lg ring-1 ring-indigo-600'
          : 'border-gray-200 bg-white shadow-sm'
      }`}
    >
      {highlighted && (
        <span className="mb-4 inline-block w-fit rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        {period && <span className="text-sm text-gray-500">{period}</span>}
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Wrapper
        {...wrapperProps}
        className={`mt-8 block rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors ${
          highlighted
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-white text-indigo-600 ring-1 ring-indigo-200 hover:bg-indigo-50'
        }`}
      >
        {cta}
      </Wrapper>
    </div>
  );
}
