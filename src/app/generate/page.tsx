'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import ListingForm from '@/components/ListingForm';
import ListingResults from '@/components/ListingResults';
import LoadingState from '@/components/shared/LoadingState';
import PaywallModal from '@/components/shared/PaywallModal';
import { getUsageCount, incrementUsage, getMaxFreeUsage, shouldShowSignupModal, shouldShowPricingModal } from '@/lib/usage';
import { saveListing } from '@/lib/listings';
import type { ListingInput, ListingResults as ListingResultsType } from '@/types';

export default function GeneratePage() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const [results, setResults] = useState<ListingResultsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<ListingInput | null>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [modalType, setModalType] = useState<'signup' | 'pricing' | null>(null);

  useEffect(() => {
    setUsageCount(getUsageCount());
  }, []);

  async function handleGenerate(input: ListingInput) {
    if (shouldShowPricingModal(isLoggedIn)) {
      setModalType('pricing');
      return;
    }
    if (shouldShowSignupModal(isLoggedIn)) {
      setModalType('signup');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLastInput(input);

    try {
      const res = await fetch('/api/generate-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to generate listings');
      }

      const data = await res.json();
      setResults(data);
      const newCount = incrementUsage();
      setUsageCount(newCount);

      // Save to listing history
      saveListing({
        id: `listing_${Date.now()}`,
        productName: input.productName,
        category: input.category,
        tone: input.tone,
        platforms: input.platforms,
        createdAt: new Date().toISOString(),
        results: data,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  function handleRegenerate() {
    if (lastInput) handleGenerate(lastInput);
  }

  const maxFree = getMaxFreeUsage(isLoggedIn);
  const remaining = Math.max(0, maxFree - usageCount);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="/" className="text-xl font-bold text-indigo-600">
            ListCraft <span className="text-gray-400">AI</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {remaining > 0
                ? `${usageCount} of ${maxFree} free listings used`
                : 'Free limit reached'}
            </span>
            {isLoggedIn ? (
              <>
                <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Dashboard
                </a>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <a href="/auth/signin" className="text-sm font-medium text-indigo-600 hover:underline">
                Sign In
              </a>
            )}
            <a href="/pricing" className="text-sm font-medium text-indigo-600 hover:underline">
              Upgrade
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* Left Panel — Form */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:self-start lg:sticky lg:top-8">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">Product Details</h2>
            <ListingForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>

          {/* Right Panel — Results */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <div className="rounded-full bg-red-100 p-3">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-600 font-medium">{error}</p>
                <button
                  onClick={handleRegenerate}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : results && lastInput ? (
              <ListingResults
                results={results}
                platforms={lastInput.platforms}
                onRegenerate={handleRegenerate}
                isLoading={isLoading}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
                <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium">Your listings will appear here</p>
                <p className="text-sm">Fill in your product details and click Generate</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <PaywallModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType || 'signup'}
      />
    </div>
  );
}
