'use client';

import { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { Mode } from '@/lib/types';

const modeLabels: Record<Mode, string> = {
  standard: 'Standard',
  adversarial: 'Attack',
  deadend: 'Dead End',
};

const modeCycle: Mode[] = ['standard', 'adversarial', 'deadend'];

interface InputBarProps {
  onSend: (text: string) => void;
  onFileSelect: (files: FileList) => void;
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
  isDisabled: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
}

export default function InputBar({
  onSend,
  onFileSelect,
  activeMode,
  onModeChange,
  isDisabled,
  inputValue,
  onInputChange,
}: InputBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isDisabled) {
        onSend(inputValue.trim());
      }
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);
    // Auto-resize
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  };

  const cycleMode = () => {
    const currentIdx = modeCycle.indexOf(activeMode);
    const nextIdx = (currentIdx + 1) % modeCycle.length;
    onModeChange(modeCycle[nextIdx]);
  };

  return (
    <div className="border-t border-lexis-border bg-lexis-surface px-4 py-3">
      <div className="flex items-end gap-2 max-w-4xl mx-auto">
        {/* File attach */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0 p-2 text-lexis-text-tertiary hover:text-lexis-text-secondary transition-colors rounded-lg hover:bg-lexis-surface-elevated"
          title="Attach document"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.docx"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onFileSelect(e.target.files);
              e.target.value = '';
            }
          }}
        />

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask LEXIS..."
          disabled={isDisabled}
          rows={1}
          className="flex-1 resize-none bg-lexis-bg border border-lexis-border rounded-xl px-4 py-2.5 text-sm text-lexis-text-primary placeholder:text-lexis-text-tertiary focus:outline-none focus:border-lexis-border-active transition-colors disabled:opacity-50 max-h-[180px] overflow-y-auto"
        />

        {/* Mode pill */}
        <button
          onClick={cycleMode}
          className="flex-shrink-0 px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-medium rounded-full border border-lexis-border text-lexis-text-tertiary hover:text-lexis-text-secondary hover:border-lexis-border-active transition-colors"
          title={`Current mode: ${modeLabels[activeMode]}. Click to cycle.`}
        >
          {modeLabels[activeMode]}
        </button>

        {/* Send */}
        <button
          onClick={() => {
            if (inputValue.trim() && !isDisabled) {
              onSend(inputValue.trim());
            }
          }}
          disabled={!inputValue.trim() || isDisabled}
          className="flex-shrink-0 p-2 rounded-lg bg-lexis-accent-blue text-lexis-text-primary hover:bg-lexis-accent-blue-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
