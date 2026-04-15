'use client';

import { useState, useCallback } from 'react';
import { Mode, CaseType } from '@/lib/types';
import { useChat } from '@/hooks/use-chat';
import { useDocuments } from '@/hooks/use-documents';
import Sidebar from './sidebar';
import ChatArea from './chat-area';
import MobileDrawer from './mobile-drawer';

export default function AppShell() {
  const [activeMode, setActiveMode] = useState<Mode>('standard');
  const [activeCaseType, setActiveCaseType] = useState<CaseType>('suit');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { messages, isStreaming, searchQuery, sendMessage, clearMessages } = useChat();
  const { documents, isUploading, uploadError, uploadFiles, removeDocument, clearDocuments } = useDocuments();

  const handleSend = useCallback(
    (text: string) => {
      sendMessage(text, activeMode, activeCaseType, documents);
      setInputValue('');
    },
    [sendMessage, activeMode, activeCaseType, documents]
  );

  const handleClearSession = useCallback(() => {
    clearMessages();
    clearDocuments();
    setInputValue('');
  }, [clearMessages, clearDocuments]);

  const handleFileSelect = useCallback(
    (files: FileList) => {
      uploadFiles(files);
    },
    [uploadFiles]
  );

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-[260px] flex-shrink-0">
        <Sidebar
          activeMode={activeMode}
          onModeChange={setActiveMode}
          activeCaseType={activeCaseType}
          onCaseTypeChange={setActiveCaseType}
          documents={documents}
          onRemoveDocument={removeDocument}
          isUploading={isUploading}
          uploadError={uploadError}
        />
      </div>

      {/* Mobile drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeMode={activeMode}
        onModeChange={setActiveMode}
        activeCaseType={activeCaseType}
        onCaseTypeChange={setActiveCaseType}
        documents={documents}
        onRemoveDocument={removeDocument}
        isUploading={isUploading}
        uploadError={uploadError}
      />

      {/* Main chat area */}
      <div className="flex-1 min-w-0">
        <ChatArea
          messages={messages}
          activeMode={activeMode}
          onModeChange={setActiveMode}
          onSend={handleSend}
          onFileSelect={handleFileSelect}
          isStreaming={isStreaming}
          searchQuery={searchQuery}
          onClearSession={handleClearSession}
          onOpenDrawer={() => setDrawerOpen(true)}
          inputValue={inputValue}
          onInputChange={setInputValue}
        />
      </div>
    </div>
  );
}
