import { PortalShell } from '@/components/PortalShell';
import { listSubscriptions } from '@/lib/api';
import { WebhooksPanel } from './WebhooksPanel';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WebhooksPage() {
  const { data: subs, source } = await listSubscriptions();

  return (
    <PortalShell title="Webhooks" subtitle="Receive real-time event notifications, HMAC-signed.">
      <WebhooksPanel subs={subs} source={source} />
    </PortalShell>
  );
}
