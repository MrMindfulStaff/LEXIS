'use client';

import { Mode, DocumentRef } from '@/lib/types';
import Sidebar from './sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
  onScenarioSelect: (text: string, mode: Mode) => void;
  documents: DocumentRef[];
  onRemoveDocument: (index: number) => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  activeMode,
  onModeChange,
  onScenarioSelect,
  documents,
  onRemoveDocument,
}: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="fixed left-0 top-0 bottom-0 w-[280px] z-50 shadow-2xl">
        <Sidebar
          activeMode={activeMode}
          onModeChange={(mode) => {
            onModeChange(mode);
            onClose();
          }}
          onScenarioSelect={(text, mode) => {
            onScenarioSelect(text, mode);
            onClose();
          }}
          documents={documents}
          onRemoveDocument={onRemoveDocument}
        />
      </div>
    </>
  );
}
