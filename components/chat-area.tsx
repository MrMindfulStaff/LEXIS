'use client';

import { useEffect, useRef, useState, DragEvent } from 'react';
import { Message, Mode } from '@/lib/types';
import MessageBubble from './message-bubble';
import InputBar from './input-bar';

const modeLabels: Record<Mode, string> = {
  standard: 'Standard Analysis',
  adversarial: 'Attack My Position',
  deadend: 'Dead End Detection',
};

const ACCEPTED_TYPES = [
  'application/pdf',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ACCEPTED_EXTS = ['.pdf', '.txt', '.docx'];

interface ChatAreaProps {
  messages: Message[];
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
  onSend: (text: string) => void;
  onFileSelect: (files: FileList) => void;
  isStreaming: boolean;
  searchQuery: string | null;
  onClearSession: () => void;
  onOpenDrawer: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
}

export default function ChatArea({
  messages,
  activeMode,
  onModeChange,
  onSend,
  onFileSelect,
  isStreaming,
  searchQuery,
  onClearSession,
  onOpenDrawer,
  inputValue,
  onInputChange,
}: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const dragCounter = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const isValidFile = (file: File) => {
    if (ACCEPTED_TYPES.includes(file.type)) return true;
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    return ACCEPTED_EXTS.includes(ext);
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Filter to accepted types
      const dt = new DataTransfer();
      for (let i = 0; i < files.length; i++) {
        if (isValidFile(files[i])) {
          dt.items.add(files[i]);
        }
      }
      if (dt.files.length > 0) {
        onFileSelect(dt.files);
      }
    }
  };

  return (
    <div
      className="flex flex-col h-full relative"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-50 bg-lexis-bg/90 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-3 p-8 rounded-xl border-2 border-dashed border-lexis-accent-blue-bright">
            <svg className="w-10 h-10 text-lexis-accent-blue-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-lexis-text-primary font-medium text-sm">
              Drop documents here
            </p>
            <p className="text-lexis-text-tertiary text-xs">
              PDF, DOCX, or TXT
            </p>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-lexis-border bg-lexis-surface flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDrawer}
            className="lg:hidden p-1.5 text-lexis-text-tertiary hover:text-lexis-text-secondary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <span className="text-sm font-semibold tracking-wider text-lexis-text-primary">
            LEXIS
          </span>
          <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-full border border-lexis-border text-lexis-text-tertiary">
            {modeLabels[activeMode]}
          </span>
        </div>
        <button
          onClick={onClearSession}
          className="text-xs text-lexis-text-tertiary hover:text-lexis-text-secondary transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
              <h2 className="text-2xl font-bold tracking-[0.15em] text-lexis-text-primary mb-2">
                LEXIS
              </h2>
              <p className="text-sm text-lexis-text-tertiary max-w-md mb-6">
                Legal Council Intelligence System. Select a mode and case type
                from the sidebar, then ask a legal question to begin.
              </p>
              <div className="flex items-center gap-2 text-lexis-text-tertiary text-xs">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span>Drop PDF, DOCX, or TXT files anywhere to attach</span>
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isStreaming={isStreaming && i === messages.length - 1 && msg.role === 'assistant'}
              searchQuery={
                isStreaming && i === messages.length - 1 && msg.role === 'assistant'
                  ? searchQuery ?? undefined
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      {/* Input */}
      <InputBar
        onSend={onSend}
        onFileSelect={onFileSelect}
        activeMode={activeMode}
        onModeChange={onModeChange}
        isDisabled={isStreaming}
        inputValue={inputValue}
        onInputChange={onInputChange}
      />
    </div>
  );
}
