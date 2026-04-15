'use client';

import { Mode, CaseType, DocumentRef } from '@/lib/types';
import ModeSelector from './mode-selector';
import CaseTypeSelector from './case-type-selector';
import FileChip from './file-chip';
import DrugsLogo from './drugs-logo';

interface SidebarProps {
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
  activeCaseType: CaseType;
  onCaseTypeChange: (caseType: CaseType) => void;
  documents: DocumentRef[];
  onRemoveDocument: (index: number) => void;
  isUploading?: boolean;
  uploadError?: string | null;
}

export default function Sidebar({
  activeMode,
  onModeChange,
  activeCaseType,
  onCaseTypeChange,
  documents,
  onRemoveDocument,
  isUploading,
  uploadError,
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full bg-lexis-surface border-r border-lexis-border">
      {/* Branding block */}
      <div className="px-5 pt-5 pb-4">
        <h1 className="text-2xl font-bold tracking-[0.2em] text-lexis-text-primary mb-3">
          LEXIS
        </h1>
        <DrugsLogo />
        <div className="mt-4 px-3 py-2.5 rounded-md border border-lexis-border bg-lexis-bg">
          <p className="text-[11px] font-semibold tracking-wider text-lexis-text-primary">
            HUSCH BLACKWELL
          </p>
          <p className="text-[9px] text-lexis-text-tertiary mt-1 leading-relaxed">
            Built exclusively for Husch Blackwell.
            <br />
            Currently in trial &amp; development.
          </p>
        </div>
      </div>

      <div className="w-full h-px bg-lexis-border" />

      {/* Mode Selector */}
      <div className="px-4 py-4">
        <ModeSelector activeMode={activeMode} onModeChange={onModeChange} />
      </div>

      <div className="w-full h-px bg-lexis-border" />

      {/* Case Type */}
      <div className="px-4 py-4 flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-wider text-lexis-text-tertiary font-medium px-1">
          Case Type
        </span>
        <CaseTypeSelector activeCaseType={activeCaseType} onCaseTypeChange={onCaseTypeChange} />
      </div>

      <div className="w-full h-px bg-lexis-border" />

      {/* Context Documents */}
      <div className="px-4 py-4 flex flex-col gap-2 flex-1 min-h-0">
        <span className="text-[11px] uppercase tracking-wider text-lexis-text-tertiary font-medium px-1">
          Context Documents
        </span>
        <div className="flex flex-col gap-1.5 overflow-y-auto flex-1">
          {isUploading && (
            <p className="text-lexis-accent-blue-bright text-xs px-1 animate-pulse">
              Parsing document...
            </p>
          )}
          {uploadError && (
            <p className="text-lexis-danger text-xs px-1">
              {uploadError}
            </p>
          )}
          {documents.length === 0 && !isUploading ? (
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
      <div className="px-5 py-3 border-t border-lexis-border">
        <p className="text-[10px] text-lexis-text-tertiary">LEXIS v2.0</p>
        <p className="text-[9px] text-lexis-text-tertiary mt-0.5 leading-relaxed">
          Not legal advice. Attorney review required.
        </p>
      </div>
    </div>
  );
}
