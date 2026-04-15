'use client';

interface ScenarioChipProps {
  title: string;
  onClick: () => void;
}

export default function ScenarioChip({ title, onClick }: ScenarioChipProps) {
  return (
    <button
      onClick={onClick}
      className="text-left px-3 py-2 rounded-md text-sm text-lexis-text-secondary hover:text-lexis-text-primary hover:bg-lexis-surface-elevated border border-lexis-border hover:border-lexis-border-active transition-colors"
    >
      {title}
    </button>
  );
}
