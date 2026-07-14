import { notFound } from 'next/navigation';
import { fetchPublicPaymentLink } from '@/lib/api';
import { HostedCheckoutClient } from './HostedCheckoutClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const link = await fetchPublicPaymentLink(slug);
    if (link.status !== 'ACTIVE') notFound();
    return (
      <main className="min-h-screen bg-surface-bg px-4 py-16">
        <HostedCheckoutClient link={link} />
      </main>
    );
  } catch {
    notFound();
  }
}
