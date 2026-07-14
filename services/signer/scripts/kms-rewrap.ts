/**
 * Re-wrap signer keys from a legacy KMS provider (local) to the active provider (AWS).
 *
 * Usage:
 *   KMS_PROVIDER=aws KMS_AWS_REGION=... KMS_AWS_KEY_ID=... \
 *   KMS_LOCAL_MASTER_KEY=... \
 *   DATABASE_URL=... \
 *   pnpm --filter @salychain/signer kms:rewrap [--dry-run] [--key-ref <ref>]
 */
import { PrismaClient } from '../src/generated/prisma/index.js';
import { loadEnv } from '@salychain/config';
import { signerEnvSchema } from '../src/config/env.js';
import { createActiveKmsProvider, createKmsProviderForRef } from '../src/kms/provider-factory.js';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const keyRefIdx = args.indexOf('--key-ref');
const singleKeyRef = keyRefIdx >= 0 ? args[keyRefIdx + 1] : undefined;

async function main(): Promise<void> {
  const env = loadEnv(signerEnvSchema);
  const target = createActiveKmsProvider(env);
  const prisma = new PrismaClient();

  const keys = await prisma.signerKey.findMany({
    where: {
      status: 'ACTIVE',
      ...(singleKeyRef ? { keyRef: singleKeyRef } : {}),
    },
    orderBy: { createdAt: 'asc' },
  });

  const pending = keys.filter((k) => k.wrappingKeyRef !== target.wrappingKeyRef);
  if (!pending.length) {
    // eslint-disable-next-line no-console
    console.log('No keys require re-wrap.');
    await prisma.$disconnect();
    return;
  }

  // eslint-disable-next-line no-console
  console.log(`Re-wrapping ${pending.length} key(s) → ${target.wrappingKeyRef}${dryRun ? ' (dry-run)' : ''}`);

  for (const key of pending) {
    const source = createKmsProviderForRef(key.wrappingKeyRef, env);
    const plaintext = await source.decrypt(Buffer.from(key.wrappedPrivateKey), key.wrappingKeyRef);
    const wrapped = await target.encrypt(plaintext);
    plaintext.fill(0);

    // eslint-disable-next-line no-console
    console.log(`  ${key.keyRef} (${key.chain}) ${key.wrappingKeyRef} → ${target.wrappingKeyRef}`);

    if (!dryRun) {
      await prisma.signerKey.update({
        where: { id: key.id },
        data: {
          wrappedPrivateKey: wrapped,
          wrappingKeyRef: target.wrappingKeyRef,
          rotatedAt: new Date(),
        },
      });
    }
  }

  await prisma.$disconnect();
  // eslint-disable-next-line no-console
  console.log(dryRun ? 'Dry-run complete.' : 'Re-wrap complete.');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('kms-rewrap failed:', err);
  process.exit(1);
});
