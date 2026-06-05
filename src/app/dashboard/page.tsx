'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { getUsageCount, getMaxFreeUsage } from '@/lib/usage';
import { getSavedListings, type SavedListing } from '@/lib/listings';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [listings, setListings] = useState<SavedListing[]>([]);
  const [usageCount, setUsageCount] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isLoggedIn = !!session?.user;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    setListings(getSavedListings());
    setUsageCount(getUsageCount());
  }, []);

  if (status === 'loading') {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        </div>
      </DashboardLayout>
    );
  }

  const maxFree = getMaxFreeUsage(isLoggedIn);
  const remaining = Math.max(0, maxFree - usageCount);
  const usagePercent = Math.min(100, (usageCount / maxFree) * 100);

  return (
    <DashboardLayout title="Dashboard" subtitle="Your listing generation overview">
      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Listings Generated</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{usageCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Remaining (Free)</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{remaining}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-indigo-600 transition-all"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">{usageCount} of {maxFree} used</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Current Plan</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">Free</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
              <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <a
            href="/pricing"
            className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
          >
            Upgrade for unlimited listings
          </a>
        </div>
      </div>

      {/* Quick Action */}
      <div className="mt-8">
        <a
          href="/generate"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Generate New Listing
        </a>
      </div>

      {/* Listing History */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Listing History</h2>
        <p className="mt-1 text-sm text-gray-500">Your recently generated listings.</p>

        {listings.length === 0 ? (
          <div className="mt-6 rounded-xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-sm font-medium text-gray-900">No listings yet</p>
            <p className="mt-1 text-sm text-gray-500">Generate your first listing to see it here.</p>
            <a
              href="/generate"
              className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Generate Listing
            </a>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {listings.map((listing) => (
              <div key={listing.id} className="rounded-xl border border-gray-200 bg-white">
                <button
                  onClick={() => setExpandedId(expandedId === listing.id ? null : listing.id)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium text-gray-900">{listing.productName}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-gray-500">{listing.category}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs text-gray-500">{listing.tone}</span>
                        <span className="text-gray-300">|</span>
                        <div className="flex gap-1">
                          {listing.platforms.map((p) => (
                            <span key={p} className="rounded bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-600">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </span>
                    <svg
                      className={`h-5 w-5 text-gray-400 transition-transform ${expandedId === listing.id ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {expandedId === listing.id && (
                  <div className="border-t border-gray-100 px-6 py-4">
                    {Object.entries(listing.results).map(([platform, data]) => (
                      <div key={platform} className="mb-4 last:mb-0">
                        <h4 className="text-sm font-semibold text-indigo-600 uppercase">{platform}</h4>
                        <p className="mt-1 text-sm font-medium text-gray-900">{data.title}</p>
                        <ul className="mt-1 space-y-0.5">
                          {data.bullets.map((b, i) => (
                            <li key={i} className="text-xs text-gray-600">- {b}</li>
                          ))}
                        </ul>
                        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{data.description}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {data.tags.slice(0, 5).map((t) => (
                            <span key={t} className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">{t}</span>
                          ))}
                          {data.tags.length > 5 && (
                            <span className="text-xs text-gray-400">+{data.tags.length - 5} more</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
