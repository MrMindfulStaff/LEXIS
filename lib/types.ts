export type Mode = 'standard' | 'adversarial' | 'deadend';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  documents?: DocumentRef[];
  searchQuery?: string;
}

export interface DocumentRef {
  filename: string;
  content: string;
}

export type CaseType = 'suit' | 'countersuit' | 'motion' | 'appeal';

export interface ChatRequest {
  messages: { role: string; content: string }[];
  documents: DocumentRef[];
  mode: Mode;
  caseType: CaseType;
}
