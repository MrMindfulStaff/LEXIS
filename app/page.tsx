'use client';

import { useAuth } from '@/hooks/use-auth';
import AuthGate from '@/components/auth-gate';
import AppShell from '@/components/app-shell';

export default function Home() {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-lexis-bg">
        <div className="text-lexis-text-tertiary text-sm tracking-wider">
          Loading...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthGate onLogin={login} />;
  }

  return <AppShell />;
}
