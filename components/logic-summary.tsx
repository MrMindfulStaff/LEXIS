'use client';

import { useState } from 'react';

interface LogicSummaryProps {
  content: string;
}

export default function LogicSummary({ content }: LogicSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content) return null;

  return (
    <div className="mt-3 border-t border-lexis-border pt-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs text-lexis-text-tertiary hover:text-lexis-text-secondary transition-colors"
      >
        <span className="font-medium">LEXIS Logic Summary — Audit Trail</span>
        <span className="text-[10px]">{isExpanded ? '▲' : '▼'}</span>
      </button>
      {isExpanded && (
        <div className="mt-2 p-3 bg-lexis-surface-elevated rounded-md overflow-x-auto">
          <pre className="text-xs text-lexis-text-secondary font-mono whitespace-pre-wrap leading-relaxed">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}
