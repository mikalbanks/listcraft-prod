'use client';

import { useState } from 'react';
import CopyButton from '@/components/shared/CopyButton';
import { PLATFORM_CONFIGS } from '@/lib/platforms';
import type { Platform, PlatformListing, ListingResults as ListingResultsType } from '@/types';

interface ListingResultsProps {
  results: ListingResultsType;
  platforms: Platform[];
  onRegenerate: () => void;
  isLoading: boolean;
}

function formatListing(listing: PlatformListing): string {
  const parts = [
    `TITLE:\n${listing.title}`,
    `\nBULLET POINTS:\n${listing.bullets.map((b) => `- ${b}`).join('\n')}`,
    `\nDESCRIPTION:\n${listing.description}`,
    `\nTAGS:\n${listing.tags.join(', ')}`,
  ];
  return parts.join('\n');
}

export default function ListingResults({ results, platforms, onRegenerate, isLoading }: ListingResultsProps) {
  const availablePlatforms = platforms.filter((p) => results[p]);
  const [activeTab, setActiveTab] = useState<Platform>(availablePlatforms[0] || 'etsy');

  const listing = results[activeTab];

  if (!listing) return null;

  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {availablePlatforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setActiveTab(platform)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === platform
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {PLATFORM_CONFIGS[platform].name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6 pt-6">
        {/* Title */}
        <Section label="Title">
          <p className="text-lg font-medium text-gray-900">{listing.title}</p>
          <CopyButton text={listing.title} label="Copy Title" />
        </Section>

        {/* Bullets */}
        <Section label="Bullet Points">
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            {listing.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
          <CopyButton
            text={listing.bullets.map((b) => `- ${b}`).join('\n')}
            label="Copy Bullets"
          />
        </Section>

        {/* Description */}
        <Section label="Description">
          <p className="whitespace-pre-wrap text-gray-700">{listing.description}</p>
          <CopyButton text={listing.description} label="Copy Description" />
        </Section>

        {/* Tags */}
        <Section label="Tags">
          <div className="flex flex-wrap gap-2">
            {listing.tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <CopyButton text={listing.tags.join(', ')} label="Copy Tags" />
        </Section>

        {/* Actions */}
        <div className="flex gap-3 border-t border-gray-200 pt-4">
          <CopyButton
            text={formatListing(listing)}
            label="Copy All"
            className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
          />
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{label}</h3>
      </div>
      {children}
    </div>
  );
}
