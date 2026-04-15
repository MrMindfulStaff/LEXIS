'use client';

import { useState, FormEvent } from 'react';

interface AuthGateProps {
  onLogin: (code: string) => boolean;
}

export default function AuthGate({ onLogin }: AuthGateProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const success = onLogin(code);
    if (!success) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setCode('');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-lexis-bg">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6">
        {/* Wordmark */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-5xl font-bold tracking-[0.25em] text-lexis-text-primary">
            LEXIS
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-lexis-gold font-medium">
            D.R.U.G.S. Engine
          </p>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          className={`w-full flex flex-col gap-4 ${shake ? 'animate-shake' : ''}`}
        >
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder="Access Code"
            autoFocus
            className={`w-full px-4 py-3 bg-lexis-surface border rounded-lg text-lexis-text-primary placeholder:text-lexis-text-tertiary focus:outline-none focus:border-lexis-border-active transition-colors text-center tracking-widest ${
              error ? 'border-lexis-danger' : 'border-lexis-border'
            }`}
          />
          <button
            type="submit"
            disabled={!code.trim()}
            className="w-full py-3 bg-lexis-accent-blue text-lexis-text-primary rounded-lg font-medium tracking-wider hover:bg-lexis-accent-blue-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ENTER
          </button>
          {error && (
            <p className="text-lexis-danger text-sm text-center">
              Invalid access code
            </p>
          )}
        </form>

        {/* Footer */}
        <p className="text-lexis-text-tertiary text-[10px] tracking-wider text-center mt-8">
          Legal Council Intelligence System v2.0
        </p>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
