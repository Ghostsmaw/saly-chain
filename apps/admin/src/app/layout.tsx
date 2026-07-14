import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SalyProviders } from '@/providers/SalyProviders';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SalyChain — Super Admin',
  description: 'Intelligent infrastructure for financial operating systems.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} min-h-screen font-sans antialiased`}>
        <SalyProviders>{children}</SalyProviders>
      </body>
    </html>
  );
}
