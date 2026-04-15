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

export interface Scenario {
  title: string;
  mode: Mode;
  text: string;
}

export interface ChatRequest {
  messages: { role: string; content: string }[];
  documents: DocumentRef[];
  mode: Mode;
}
