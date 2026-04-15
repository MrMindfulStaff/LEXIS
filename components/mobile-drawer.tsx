'use client';

import { Mode, CaseType, DocumentRef } from '@/lib/types';
import Sidebar from './sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
  activeCaseType: CaseType;
  onCaseTypeChange: (caseType: CaseType) => void;
  documents: DocumentRef[];
  onRemoveDocument: (index: number) => void;
  isUploading?: boolean;
  uploadError?: string | null;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  activeMode,
  onModeChange,
  activeCaseType,
  onCaseTypeChange,
  documents,
  onRemoveDocument,
  isUploading,
  uploadError,
}: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      <div className="fixed left-0 top-0 bottom-0 w-[280px] z-50 shadow-2xl">
        <Sidebar
          activeMode={activeMode}
          onModeChange={(mode) => {
            onModeChange(mode);
            onClose();
          }}
          activeCaseType={activeCaseType}
          onCaseTypeChange={(ct) => {
            onCaseTypeChange(ct);
            onClose();
          }}
          documents={documents}
          onRemoveDocument={onRemoveDocument}
          isUploading={isUploading}
          uploadError={uploadError}
        />
      </div>
    </>
  );
}
