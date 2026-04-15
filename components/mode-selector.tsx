'use client';

import { Mode } from '@/lib/types';

const modes: { key: Mode; label: string }[] = [
  { key: 'standard', label: 'Standard Analysis' },
  { key: 'adversarial', label: 'Attack My Position' },
  { key: 'deadend', label: 'Dead End Detection' },
];

interface ModeSelectorProps {
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function ModeSelector({ activeMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      {modes.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onModeChange(key)}
          className={`text-left px-3 py-2.5 rounded-md text-sm transition-colors ${
            activeMode === key
              ? 'bg-lexis-surface-elevated border-l-2 border-lexis-accent-blue-bright text-lexis-text-primary'
              : 'text-lexis-text-secondary hover:text-lexis-text-primary hover:bg-lexis-surface border-l-2 border-transparent'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
