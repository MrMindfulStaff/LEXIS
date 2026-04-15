'use client';

import { CaseType } from '@/lib/types';

const caseTypes: { key: CaseType; label: string }[] = [
  { key: 'suit', label: 'Suit' },
  { key: 'countersuit', label: 'Countersuit' },
  { key: 'motion', label: 'Motion' },
  { key: 'appeal', label: 'Appeal' },
];

interface CaseTypeSelectorProps {
  activeCaseType: CaseType;
  onCaseTypeChange: (caseType: CaseType) => void;
}

export default function CaseTypeSelector({ activeCaseType, onCaseTypeChange }: CaseTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {caseTypes.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onCaseTypeChange(key)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
            activeCaseType === key
              ? 'bg-lexis-accent-blue border-lexis-accent-blue-bright text-lexis-text-primary'
              : 'bg-transparent border-lexis-border text-lexis-text-secondary hover:text-lexis-text-primary hover:border-lexis-border-active'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
