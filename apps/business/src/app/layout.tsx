import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SalyChain Business',
  description: 'Treasury operations, payouts, and financial visibility for your organization.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
