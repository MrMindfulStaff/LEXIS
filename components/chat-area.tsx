'use client';

import { useEffect, useRef } from 'react';
import { Message, Mode } from '@/lib/types';
import MessageBubble from './message-bubble';
import InputBar from './input-bar';

const modeLabels: Record<Mode, string> = {
  standard: 'Standard Analysis',
  adversarial: 'Attack My Position',
  deadend: 'Dead End Detection',
};

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-lexis-border bg-lexis-surface flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
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
              <p className="text-sm text-lexis-text-tertiary max-w-md">
                Legal Council Intelligence System. Select a test scenario from
                the sidebar or ask a legal question to begin.
              </p>
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
