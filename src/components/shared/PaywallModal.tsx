'use client';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'signup' | 'pricing';
}

export default function PaywallModal({ isOpen, onClose, type }: PaywallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {type === 'signup' ? <SignupContent onClose={onClose} /> : <PricingContent onClose={onClose} />}
      </div>
    </div>
  );
}

function SignupContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
          <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">You&apos;ve used your 5 free listings!</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign up for a free account to unlock 5 more listings.
        </p>
      </div>

      <div className="space-y-3">
        <a
          href="/auth/signin"
          className="block w-full rounded-lg bg-indigo-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Sign Up Free for 5 More Listings
        </a>
        <a
          href="/pricing"
          className="block w-full rounded-lg border border-gray-300 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          View Pricing Plans
        </a>
        <button
          onClick={onClose}
          className="block w-full rounded-lg py-2 text-center text-sm text-gray-500 hover:text-gray-700"
        >
          Maybe Later
        </button>
      </div>
    </>
  );
}

function PricingContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg className="h-7 w-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Upgrade to keep generating</h2>
        <p className="mt-2 text-sm text-gray-600">
          You&apos;ve reached the free limit. Unlock unlimited listings with a plan.
        </p>
      </div>

      <div className="space-y-3 rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Monthly Plan</p>
            <p className="text-sm text-gray-500">Unlimited listings, all platforms</p>
          </div>
          <span className="text-lg font-bold text-gray-900">$29<span className="text-sm font-normal text-gray-500">/mo</span></span>
        </div>
        <a
          href="/pricing"
          className="block w-full rounded-lg bg-indigo-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          View All Plans
        </a>
      </div>

      <button
        onClick={onClose}
        className="mt-3 block w-full rounded-lg border border-gray-300 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        Close
      </button>
    </>
  );
}
