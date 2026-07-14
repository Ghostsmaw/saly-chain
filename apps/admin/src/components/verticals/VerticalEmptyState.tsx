import { SalyEmptyState } from '@/components/saly/ui';

export function VerticalEmptyState({ message }: { message: string }) {
  return <SalyEmptyState title={message} />;
}
