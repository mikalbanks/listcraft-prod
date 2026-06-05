'use client';

import { useState, useEffect } from 'react';

interface LoadingStateProps {
  messages?: string[];
}

const DEFAULT_MESSAGES = [
  'Analyzing your product...',
  'Crafting the perfect title...',
  'Optimizing keywords for SEO...',
  'Writing compelling descriptions...',
  'Generating platform-specific tags...',
  'Polishing your listings...',
];

export default function LoadingState({ messages = DEFAULT_MESSAGES }: LoadingStateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
      </div>
      <p className="animate-pulse text-lg font-medium text-gray-600">{messages[index]}</p>
    </div>
  );
}
