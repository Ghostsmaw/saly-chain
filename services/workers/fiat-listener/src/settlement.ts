import type { PrismaClient } from './generated/prisma/index.js';
import type { ParsedFiatPayin, ParsedFiatWebhook } from '@salychain/chain-fiat';
import { createLogger } from '@salychain/logger';
import type { ExecutionClient } from './execution-client.js';

const logger = createLogger({ service: 'fiat-listener' });

export async function processWebhookEvent(
  prisma: PrismaClient,
  execution: ExecutionClient,
  event: ParsedFiatWebhook,
  rawPayload: unknown,
): Promise<{ duplicate: boolean; applied: boolean }> {
  const existing = await prisma.fiatWebhookEvent.findUnique({
    where: {
      provider_externalEventId: {
        provider: event.provider,
        externalEventId: event.externalEventId,
      },
    },
  });
  if (existing) {
    logger.info(`duplicate webhook ${event.provider}:${event.externalEventId}`);
    return { duplicate: true, applied: false };
  }

  const result = await execution.confirmSettlement(event);

  await prisma.fiatWebhookEvent.create({
    data: {
      provider: event.provider,
      externalEventId: event.externalEventId,
      txId: event.txId,
      pspId: event.pspId,
      outcome: event.outcome,
      payload: rawPayload as object,
      executionResult: result as object,
    },
  });

  logger.info(
    `webhook ${event.provider} tx=${event.txId} psp=${event.pspId} outcome=${event.outcome} applied=${result.applied ?? false}`,
  );
  return { duplicate: false, applied: result.applied ?? false };
}

/**
 * Process an inbound pay-in (charge / virtual-account credit) webhook. Deduped
 * on (provider, externalEventId) in the same table as payout confirmations.
 */
export async function processPayinEvent(
  prisma: PrismaClient,
  execution: ExecutionClient,
  event: ParsedFiatPayin,
  rawPayload: unknown,
): Promise<{ duplicate: boolean; applied: boolean }> {
  const existing = await prisma.fiatWebhookEvent.findUnique({
    where: {
      provider_externalEventId: {
        provider: event.provider,
        externalEventId: event.externalEventId,
      },
    },
  });
  if (existing) {
    logger.info(`duplicate pay-in webhook ${event.provider}:${event.externalEventId}`);
    return { duplicate: true, applied: false };
  }

  const result = await execution.confirmPayin(event);

  await prisma.fiatWebhookEvent.create({
    data: {
      provider: event.provider,
      externalEventId: event.externalEventId,
      txId: event.reference,
      pspId: event.pspReference,
      outcome: event.outcome,
      payload: rawPayload as object,
      executionResult: result as object,
    },
  });

  logger.info(
    `pay-in ${event.provider} ref=${event.reference} psp=${event.pspReference} outcome=${event.outcome} applied=${result.applied ?? false}`,
  );
  return { duplicate: false, applied: result.applied ?? false };
}
