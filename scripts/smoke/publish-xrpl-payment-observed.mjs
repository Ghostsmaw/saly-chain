#!/usr/bin/env node
/**
 * Ops recovery helper: republish salychain.chain.xrpl.payment_observed so
 * execution can settle an AWAITING_CONFIRMATION tx by tx_hash.
 *
 * Usage (from repo root):
 *   NATS_URL=nats://127.0.0.1:4222 node scripts/smoke/publish-xrpl-payment-observed.mjs \
 *     --tx-hash 9799... --from r... --to r... --ledger 19248007 --amount-drops 1000000
 */
import { EventBus, SUBJECTS } from '../../packages/events/dist/index.js';

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
  return fallback;
}

const txHash = arg('tx-hash');
const from = arg('from');
const to = arg('to');
const ledgerIndex = Number(arg('ledger'));
const amountDrops = arg('amount-drops');
const feeDrops = arg('fee-drops', '12');
const closeTime = Number(arg('close-time', String(Math.floor(Date.now() / 1000))));

if (!txHash || !from || !to || !Number.isFinite(ledgerIndex) || !amountDrops) {
  console.error(
    'required: --tx-hash --from --to --ledger --amount-drops [--fee-drops] [--close-time]',
  );
  process.exit(2);
}

const bus = new EventBus({
  servers: process.env.NATS_URL || 'nats://127.0.0.1:4222',
  serviceName: 'smoke-xrpl-payment-republish',
});

await bus.start();
await bus.publish(SUBJECTS.CHAIN_XRPL_PAYMENT_OBSERVED, {
  chain: 'XRPL',
  ledger_index: ledgerIndex,
  close_time: closeTime,
  tx_hash: txHash,
  from,
  to,
  amount_drops: amountDrops,
  fee_drops: feeDrops,
  confirmations_depth: 0,
});
await bus.stop();
console.log(`published payment_observed tx_hash=${txHash} ledger=${ledgerIndex}`);
