import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import {
  parseFlutterwavePayinWebhook,
  parseFlutterwaveTransferWebhook,
  parsePaystackPayinWebhook,
  parsePaystackTransferWebhook,
  verifyFlutterwaveWebhookSignature,
  verifyPaystackWebhookSignature,
} from '@salychain/chain-fiat';
import { createLogger } from '@salychain/logger';
import { PrismaClient } from './generated/prisma/index.js';
import { env } from './config.js';
import { ExecutionClient } from './execution-client.js';
import { processPayinEvent, processWebhookEvent } from './settlement.js';

const logger = createLogger({ service: 'fiat-listener' });
const prisma = new PrismaClient();
const execution = new ExecutionClient();

function readRawBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function clientIp(req: IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0]!.trim();
  return req.socket.remoteAddress ?? '';
}

function assertAllowedIp(req: IncomingMessage): void {
  if (!env.WEBHOOK_ALLOWED_IPS.length) return;
  const ip = clientIp(req);
  if (!env.WEBHOOK_ALLOWED_IPS.includes(ip)) {
    throw Object.assign(new Error('forbidden ip'), { statusCode: 403 });
  }
}

function json(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

async function handlePaystack(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (!env.PAYSTACK_SECRET_KEY) {
    json(res, 503, { error: 'paystack_not_configured' });
    return;
  }
  const raw = await readRawBody(req);
  const signature = req.headers['x-paystack-signature'];
  if (
    !verifyPaystackWebhookSignature(
      raw,
      typeof signature === 'string' ? signature : undefined,
      env.PAYSTACK_SECRET_KEY,
    )
  ) {
    json(res, 401, { error: 'invalid_signature' });
    return;
  }

  const payload = JSON.parse(raw.toString('utf8')) as unknown;

  // A single PSP webhook URL receives both payout (transfer.*) and pay-in
  // (charge.*) events; route by whichever parser recognizes the payload.
  const transfer = parsePaystackTransferWebhook(payload);
  if (transfer) {
    const result = await processWebhookEvent(prisma, execution, transfer, payload);
    json(res, 200, { ok: true, ...result });
    return;
  }

  const payin = parsePaystackPayinWebhook(payload);
  if (payin) {
    const result = await processPayinEvent(prisma, execution, payin, payload);
    json(res, 200, { ok: true, ...result });
    return;
  }

  json(res, 200, { ok: true, ignored: true });
}

async function handleFlutterwave(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (!env.FLUTTERWAVE_WEBHOOK_SECRET) {
    json(res, 503, { error: 'flutterwave_not_configured' });
    return;
  }
  const raw = await readRawBody(req);
  const verifHash = req.headers['verif-hash'];
  if (
    !verifyFlutterwaveWebhookSignature(
      typeof verifHash === 'string' ? verifHash : undefined,
      env.FLUTTERWAVE_WEBHOOK_SECRET,
    )
  ) {
    json(res, 401, { error: 'invalid_signature' });
    return;
  }

  const payload = JSON.parse(raw.toString('utf8')) as unknown;

  const transfer = parseFlutterwaveTransferWebhook(payload);
  if (transfer) {
    const result = await processWebhookEvent(prisma, execution, transfer, payload);
    json(res, 200, { ok: true, ...result });
    return;
  }

  const payin = parseFlutterwavePayinWebhook(payload);
  if (payin) {
    const result = await processPayinEvent(prisma, execution, payin, payload);
    json(res, 200, { ok: true, ...result });
    return;
  }

  json(res, 200, { ok: true, ignored: true });
}

export function createWebhookServer() {
  return createServer(async (req, res) => {
    try {
      if (req.method === 'GET' && req.url === '/health') {
        json(res, 200, { status: 'ok', service: 'fiat-listener' });
        return;
      }

      if (req.method !== 'POST') {
        json(res, 405, { error: 'method_not_allowed' });
        return;
      }

      assertAllowedIp(req);

      if (req.url === '/webhooks/paystack') {
        await handlePaystack(req, res);
        return;
      }
      if (req.url === '/webhooks/flutterwave') {
        await handleFlutterwave(req, res);
        return;
      }

      json(res, 404, { error: 'not_found' });
    } catch (err) {
      const status = (err as { statusCode?: number }).statusCode ?? 500;
      logger.error(`request failed: ${(err as Error).message}`);
      json(res, status, { error: (err as Error).message });
    }
  });
}

export async function startServer(): Promise<void> {
  const server = createWebhookServer();
  await new Promise<void>((resolve) => server.listen(env.PORT, resolve));
  logger.info(`fiat-listener listening on :${env.PORT}`);
}

export async function shutdown(): Promise<void> {
  await prisma.$disconnect();
}
