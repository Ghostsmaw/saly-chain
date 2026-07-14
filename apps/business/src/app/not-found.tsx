import Link from 'next/link';
import { BusinessShell } from '@/components/BusinessShell';

export default function NotFound() {
  return (
    <BusinessShell title="Not found" subtitle="This page does not exist">
      <div className="grid place-items-center py-24 text-center">
        <p className="text-6xl font-semibold text-brand-300">404</p>
        <p className="mt-4 text-text-secondary">The page you requested could not be found.</p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white"
        >
          Back to dashboard
        </Link>
      </div>
    </BusinessShell>
  );
}
