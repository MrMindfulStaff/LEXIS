'use client';

export default function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <span className="thinking-dot w-1.5 h-1.5 rounded-full bg-lexis-accent-blue-bright" />
      <span className="thinking-dot w-1.5 h-1.5 rounded-full bg-lexis-accent-blue-bright" />
      <span className="thinking-dot w-1.5 h-1.5 rounded-full bg-lexis-accent-blue-bright" />
    </div>
  );
}
