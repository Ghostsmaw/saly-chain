import type { Metadata } from 'next';
import './globals.css';
import { ExplorerShell } from '@/components/ExplorerShell';

export const metadata: Metadata = {
  title: 'Saly Explorer',
  description: 'Multi-chain explorer for Base, Saly L3 and XRPL — with intent → rail → settlement lineage.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-screen antialiased">
        <ExplorerShell>{children}</ExplorerShell>
      </body>
    </html>
  );
}
