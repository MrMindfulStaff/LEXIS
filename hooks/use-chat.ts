'use client';

import { useState, useCallback, useRef } from 'react';
import { Message, Mode, CaseType, DocumentRef } from '@/lib/types';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string, mode: Mode, caseType: CaseType, documents: DocumentRef[]) => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        documents: documents.length > 0 ? [...documents] : undefined,
      };

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '',
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsStreaming(true);
      setSearchQuery(null);

      // Build conversation history for API (without the empty assistant msg)
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        abortRef.current = new AbortController();

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: apiMessages,
            documents,
            mode,
            caseType,
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Request failed' }));
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: `Error: ${err.error || 'Something went wrong'}`,
            };
            return updated;
          });
          setIsStreaming(false);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) {
          setIsStreaming(false);
          return;
        }

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const jsonStr = line.slice(6).trim();
            if (!jsonStr) continue;

            try {
              const event = JSON.parse(jsonStr);

              if (event.type === 'text') {
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  updated[updated.length - 1] = {
                    ...last,
                    content: last.content + event.text,
                  };
                  return updated;
                });
              } else if (event.type === 'search') {
                setSearchQuery(event.query);
              } else if (event.type === 'done') {
                setSearchQuery(null);
              } else if (event.type === 'error') {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content:
                      updated[updated.length - 1].content +
                      `\n\n**Error:** ${event.error}`,
                  };
                  return updated;
                });
              }
            } catch {
              // Skip malformed JSON lines
            }
          }
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: `Error: ${err.message || 'Connection failed'}`,
            };
            return updated;
          });
        }
      } finally {
        setIsStreaming(false);
        setSearchQuery(null);
        abortRef.current = null;
      }
    },
    [messages]
  );

  const clearMessages = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setMessages([]);
    setIsStreaming(false);
    setSearchQuery(null);
  }, []);

  return { messages, isStreaming, searchQuery, sendMessage, clearMessages };
}
