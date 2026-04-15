'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '@/lib/types';
import LogicSummary from './logic-summary';
import ThinkingIndicator from './thinking-indicator';
import SearchIndicator from './search-indicator';

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
  searchQuery?: string;
}

const LOGIC_SUMMARY_DELIMITER = 'LEXIS LOGIC SUMMARY';

function splitContent(content: string): { analysis: string; logicSummary: string } {
  const idx = content.indexOf(LOGIC_SUMMARY_DELIMITER);
  if (idx === -1) {
    return { analysis: content, logicSummary: '' };
  }
  // Find the start of the separator line (the ━━━ line before the delimiter)
  let separatorStart = idx;
  while (separatorStart > 0 && content[separatorStart - 1] !== '\n') {
    separatorStart--;
  }
  // Go back one more to skip the preceding ━━━ line
  if (separatorStart > 0) {
    const prevLineEnd = separatorStart - 1;
    let prevLineStart = prevLineEnd;
    while (prevLineStart > 0 && content[prevLineStart - 1] !== '\n') {
      prevLineStart--;
    }
    const prevLine = content.slice(prevLineStart, prevLineEnd);
    if (prevLine.includes('━')) {
      separatorStart = prevLineStart;
    }
  }

  const analysis = content.slice(0, separatorStart).trimEnd();
  const logicSummary = content.slice(idx + LOGIC_SUMMARY_DELIMITER.length).trim();
  return { analysis, logicSummary };
}

export default function MessageBubble({ message, isStreaming, searchQuery }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const { analysis, logicSummary } = isUser
    ? { analysis: message.content, logicSummary: '' }
    : splitContent(message.content);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`${
          isUser
            ? 'max-w-[72%] bg-lexis-surface-elevated rounded-2xl rounded-br-md'
            : 'max-w-[85%] bg-lexis-surface border-l-2 border-lexis-accent-blue rounded-2xl rounded-bl-md'
        } px-4 py-3`}
      >
        {/* Document chips above user message */}
        {isUser && message.documents && message.documents.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {message.documents.map((doc, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-lexis-bg rounded text-[11px] text-lexis-text-tertiary"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                {doc.filename}
              </span>
            ))}
          </div>
        )}

        {/* Search indicator */}
        {!isUser && searchQuery && <SearchIndicator query={searchQuery} />}

        {/* Thinking indicator */}
        {!isUser && isStreaming && !message.content && <ThinkingIndicator />}

        {/* Message content */}
        {isUser ? (
          <p className="text-sm text-lexis-text-primary whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        ) : (
          message.content && (
            <>
              <div className="lexis-markdown text-sm text-lexis-text-primary">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {analysis}
                </ReactMarkdown>
              </div>
              {!isStreaming && logicSummary && (
                <LogicSummary content={logicSummary} />
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}
