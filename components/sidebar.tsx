'use client';

import { Mode, DocumentRef } from '@/lib/types';
import { scenarios } from '@/lib/scenarios';
import ModeSelector from './mode-selector';
import ScenarioChip from './scenario-chip';
import FileChip from './file-chip';

interface SidebarProps {
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
  onScenarioSelect: (text: string, mode: Mode) => void;
  documents: DocumentRef[];
  onRemoveDocument: (index: number) => void;
}

export default function Sidebar({
  activeMode,
  onModeChange,
  onScenarioSelect,
  documents,
  onRemoveDocument,
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full bg-lexis-surface border-r border-lexis-border">
      {/* Wordmark */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold tracking-[0.2em] text-lexis-text-primary">
          LEXIS
        </h1>
        <p className="text-[10px] tracking-[0.25em] uppercase text-lexis-gold font-medium mt-1">
          D.R.U.G.S. Engine
        </p>
      </div>

      <div className="w-full h-px bg-lexis-border" />

      {/* Mode Selector */}
      <div className="px-4 py-4">
        <ModeSelector activeMode={activeMode} onModeChange={onModeChange} />
      </div>

      <div className="w-full h-px bg-lexis-border" />

      {/* Test Scenarios */}
      <div className="px-4 py-4 flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-wider text-lexis-text-tertiary font-medium px-1">
          Test Scenarios
        </span>
        {scenarios.map((scenario) => (
          <ScenarioChip
            key={scenario.title}
            title={scenario.title}
            onClick={() => onScenarioSelect(scenario.text, scenario.mode)}
          />
        ))}
      </div>

      <div className="w-full h-px bg-lexis-border" />

      {/* Context Documents */}
      <div className="px-4 py-4 flex flex-col gap-2 flex-1 min-h-0">
        <span className="text-[11px] uppercase tracking-wider text-lexis-text-tertiary font-medium px-1">
          Context Documents
        </span>
        <div className="flex flex-col gap-1.5 overflow-y-auto flex-1">
          {documents.length === 0 ? (
            <p className="text-lexis-text-tertiary text-xs px-1 italic">
              No documents attached
            </p>
          ) : (
            documents.map((doc, i) => (
              <FileChip
                key={`${doc.filename}-${i}`}
                filename={doc.filename}
                onRemove={() => onRemoveDocument(i)}
              />
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-lexis-border">
        <p className="text-[10px] text-lexis-text-tertiary">LEXIS v2.0</p>
        <p className="text-[9px] text-lexis-text-tertiary mt-0.5 leading-relaxed">
          Not legal advice. Attorney review required.
        </p>
      </div>
    </div>
  );
}
