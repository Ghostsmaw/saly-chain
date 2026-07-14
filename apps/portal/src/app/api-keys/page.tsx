import { PortalShell } from '@/components/PortalShell';
import { listApiKeys } from '@/lib/api';
import { ApiKeysPanel } from './ApiKeysPanel';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ApiKeysPage() {
  const { data: keys, source } = await listApiKeys();

  return (
    <PortalShell title="API Keys" subtitle="Issue, rotate, and revoke credentials for your applications.">
      <ApiKeysPanel keys={keys} source={source} />
    </PortalShell>
  );
}
