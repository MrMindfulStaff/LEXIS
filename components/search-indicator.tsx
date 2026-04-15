'use client';

interface SearchIndicatorProps {
  query: string;
}

export default function SearchIndicator({ query }: SearchIndicatorProps) {
  return (
    <p className="text-lexis-text-tertiary text-xs italic py-1">
      Searching: {query}...
    </p>
  );
}
