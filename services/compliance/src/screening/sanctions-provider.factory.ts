import type { ComplianceEnv } from '../config/env.js';
import { ChainalysisSanctionsProvider } from './chainalysis.provider.js';
import { ComplyAdvantageProvider } from './comply.provider.js';
import { CompositeSanctionsProvider } from './composite-sanctions.provider.js';
import { EmbeddedSanctionsProvider } from './embedded-sanctions.provider.js';
import { RefinitivWorldCheckProvider } from './refinitiv.provider.js';
import type { SanctionsProvider } from './screening.provider.js';

export interface ProviderStatus {
  active: string;
  configured: string[];
  vendors: Array<{ name: string; enabled: boolean; role: string }>;
}

export function createSanctionsProvider(env: ComplianceEnv): SanctionsProvider {
  switch (env.COMPLIANCE_SANCTIONS_PROVIDER) {
    case 'embedded':
      return new EmbeddedSanctionsProvider();
    case 'chainalysis':
      return new ChainalysisSanctionsProvider(
        env.CHAINALYSIS_API_KEY!,
        env.CHAINALYSIS_API_URL,
        env.COMPLIANCE_SANCTIONS_TIMEOUT_MS,
      );
    case 'comply':
      return new ComplyAdvantageProvider(
        env.COMPLYADVANTAGE_API_KEY!,
        env.COMPLYADVANTAGE_API_URL,
        env.COMPLIANCE_SANCTIONS_TIMEOUT_MS,
      );
    case 'refinitiv':
      return new RefinitivWorldCheckProvider({
        apiKey: env.REFINITIV_API_KEY!,
        apiSecret: env.REFINITIV_API_SECRET!,
        groupId: env.REFINITIV_GROUP_ID!,
        baseUrl: env.REFINITIV_API_URL,
        timeoutMs: env.COMPLIANCE_SANCTIONS_TIMEOUT_MS,
      });
    case 'composite':
      return buildComposite(env);
    default:
      throw new Error(`Unknown sanctions provider: ${env.COMPLIANCE_SANCTIONS_PROVIDER}`);
  }
}

function buildComposite(env: ComplianceEnv): CompositeSanctionsProvider {
  const providers: SanctionsProvider[] = [];

  // Baseline jurisdiction rules — no vendor contract required.
  providers.push(new EmbeddedSanctionsProvider());

  if (env.CHAINALYSIS_API_KEY) {
    providers.push(
      new ChainalysisSanctionsProvider(
        env.CHAINALYSIS_API_KEY,
        env.CHAINALYSIS_API_URL,
        env.COMPLIANCE_SANCTIONS_TIMEOUT_MS,
      ),
    );
  }
  if (env.COMPLYADVANTAGE_API_KEY) {
    providers.push(
      new ComplyAdvantageProvider(
        env.COMPLYADVANTAGE_API_KEY,
        env.COMPLYADVANTAGE_API_URL,
        env.COMPLIANCE_SANCTIONS_TIMEOUT_MS,
      ),
    );
  } else if (env.REFINITIV_API_KEY && env.REFINITIV_API_SECRET && env.REFINITIV_GROUP_ID) {
    providers.push(
      new RefinitivWorldCheckProvider({
        apiKey: env.REFINITIV_API_KEY,
        apiSecret: env.REFINITIV_API_SECRET,
        groupId: env.REFINITIV_GROUP_ID,
        baseUrl: env.REFINITIV_API_URL,
        timeoutMs: env.COMPLIANCE_SANCTIONS_TIMEOUT_MS,
      }),
    );
  }

  return new CompositeSanctionsProvider(providers);
}

export function describeProviderStatus(env: ComplianceEnv, active: SanctionsProvider): ProviderStatus {
  const vendors = [
    {
      name: 'embedded',
      enabled: true,
      role: 'Country risk + dev address samples',
    },
    {
      name: 'chainalysis',
      enabled: Boolean(env.CHAINALYSIS_API_KEY),
      role: 'On-chain address / exposure screening',
    },
    {
      name: 'comply',
      enabled: Boolean(env.COMPLYADVANTAGE_API_KEY),
      role: 'Sanctions, PEP, adverse media (entity names)',
    },
    {
      name: 'refinitiv',
      enabled: Boolean(env.REFINITIV_API_KEY && env.REFINITIV_API_SECRET && env.REFINITIV_GROUP_ID),
      role: 'World-Check watchlist screening',
    },
  ];

  const configured = vendors.filter((v) => v.enabled).map((v) => v.name);
  if (active instanceof CompositeSanctionsProvider) {
    return { active: active.name, configured: active.configuredProviders(), vendors };
  }

  return { active: active.name, configured, vendors };
}
