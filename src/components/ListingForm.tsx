'use client';

import { useState } from 'react';
import InputField from '@/components/shared/InputField';
import TextareaField from '@/components/shared/TextareaField';
import SelectField from '@/components/shared/SelectField';
import CheckboxGroup from '@/components/shared/CheckboxGroup';
import PhotoUpload from '@/components/shared/PhotoUpload';
import { CATEGORIES, TONES, ALL_PLATFORMS } from '@/lib/platforms';
import type { ListingInput, Platform, Tone } from '@/types';

interface ListingFormProps {
  onSubmit: (input: ListingInput) => void;
  isLoading: boolean;
}

const PLATFORM_OPTIONS = ALL_PLATFORMS.map((p) => ({
  value: p,
  label: p.charAt(0).toUpperCase() + p.slice(1),
}));

const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c, label: c }));

export default function ListingForm({ onSubmit, isLoading }: ListingFormProps) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [bullets, setBullets] = useState('');
  const [tone, setTone] = useState<Tone>('professional');
  const [platforms, setPlatforms] = useState<string[]>([...ALL_PLATFORMS]);
  const [photoBase64, setPhotoBase64] = useState<string | undefined>();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!productName.trim() || !bullets.trim() || platforms.length === 0) return;
    onSubmit({
      productName: productName.trim(),
      bullets: bullets.trim(),
      category,
      tone,
      platforms: platforms as Platform[],
      photoBase64,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PhotoUpload onPhotoChange={setPhotoBase64} />

      <InputField
        label="Product Name"
        value={productName}
        onChange={setProductName}
        placeholder="e.g. Handmade Silver Moon Necklace"
        required
      />

      <SelectField
        label="Category"
        value={category}
        onChange={setCategory}
        options={CATEGORY_OPTIONS}
        required
      />

      <TextareaField
        label="Product Details"
        value={bullets}
        onChange={setBullets}
        placeholder={"Describe your product in 3-5 bullet points:\n- Sterling silver with moonstone pendant\n- 18-inch adjustable chain\n- Handcrafted in small batches"}
        rows={5}
        required
        helperText="Enter 3-5 bullet points describing your product. One per line."
      />

      <SelectField
        label="Tone"
        value={tone}
        onChange={(v) => setTone(v as Tone)}
        options={TONES}
      />

      <CheckboxGroup
        label="Platforms"
        options={PLATFORM_OPTIONS}
        selected={platforms}
        onChange={setPlatforms}
      />

      <button
        type="submit"
        disabled={isLoading || !productName.trim() || !bullets.trim() || platforms.length === 0}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Generating...' : 'Generate Listings'}
      </button>
    </form>
  );
}
