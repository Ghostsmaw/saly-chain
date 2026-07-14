import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SalyChain Developer Portal',
  description: 'Manage API keys, webhooks, and integration health for your SalyChain organization.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
