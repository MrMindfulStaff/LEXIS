import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LEXIS — Legal Council Intelligence System',
  description: 'Structured legal reasoning powered by the D.R.U.G.S. Engine architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-lexis-bg text-lexis-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
