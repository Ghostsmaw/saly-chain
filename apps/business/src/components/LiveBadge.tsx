import { Chip } from '@salychain/ui';

export function LiveBadge({ live }: { live: boolean }) {
  return (
    <Chip tone={live ? 'success' : 'warning'}>{live ? 'Live data' : 'Service offline'}</Chip>
  );
}
