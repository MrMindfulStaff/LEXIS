'use client';

interface FileChipProps {
  filename: string;
  onRemove: () => void;
}

export default function FileChip({ filename, onRemove }: FileChipProps) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5 bg-lexis-surface-elevated rounded-md text-sm border border-lexis-border group">
      <svg className="w-3.5 h-3.5 text-lexis-text-tertiary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
      <span className="truncate text-lexis-text-secondary max-w-[160px]">{filename}</span>
      <button
        onClick={onRemove}
        className="ml-auto text-lexis-text-tertiary hover:text-lexis-danger transition-colors flex-shrink-0"
        aria-label={`Remove ${filename}`}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
