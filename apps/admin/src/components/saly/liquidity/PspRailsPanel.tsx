import { SalyCard, SalyCodeBlock, SalySection } from '@/components/saly/ui';

const PSP_PROVIDERS = [
  {
    name: 'Flutterwave',
    currencies: 'NGN, GHS, KES, USD, EUR, GBP',
    env: 'FLUTTERWAVE_SECRET_KEY',
  },
  {
    name: 'Paystack',
    currencies: 'NGN (NIP)',
    env: 'PAYSTACK_SECRET_KEY',
  },
] as const;

export function PspRailsPanel() {
  return (
    <SalySection title="Fiat PSP rails" description="Bank payout credentials for African corridors">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PSP_PROVIDERS.map((p) => (
          <SalyCard key={p.name} hover>
            <p className="text-sm font-medium text-saly-text-primary">{p.name}</p>
            <p className="mt-1 text-xs text-saly-text-muted">{p.currencies}</p>
            <SalyCodeBlock className="mt-4">{`${p.env}=••••••••`}</SalyCodeBlock>
          </SalyCard>
        ))}
      </div>
    </SalySection>
  );
}
