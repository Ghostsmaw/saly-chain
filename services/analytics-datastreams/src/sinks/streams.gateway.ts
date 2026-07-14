import type { IncomingMessage } from 'node:http';
import { Logger } from '@nestjs/common';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import type { WebSocket } from 'ws';
import { StreamsService } from '../streams/streams.service.js';
import { WebsocketHub, type SocketLike } from './websocket.hub.js';

/**
 * Live dashboard WebSocket sink. Clients connect to:
 *
 *   wss://<host>/v1/streams/live?stream_id=<id>&secret=<signing_secret>
 *
 * (the secret may also be sent as the `x-saly-stream-secret` header). The
 * connection is authorized against the stream's signing secret; on success the
 * socket joins the stream's broadcast group and receives every subsequent match
 * best-effort. There is no backfill — this is a live tail, not a durable feed.
 */
@WebSocketGateway({ path: '/v1/streams/live' })
export class StreamsGateway implements OnGatewayConnection {
  private readonly logger = new Logger(StreamsGateway.name);

  constructor(
    private readonly streams: StreamsService,
    private readonly hub: WebsocketHub,
  ) {}

  async handleConnection(client: WebSocket, request: IncomingMessage): Promise<void> {
    let streamId = '';
    let secret = '';
    try {
      const url = new URL(request.url ?? '', 'http://localhost');
      streamId = url.searchParams.get('stream_id') ?? '';
      secret = url.searchParams.get('secret') ?? headerValue(request, 'x-saly-stream-secret') ?? '';
    } catch {
      /* fall through to unauthorized */
    }

    if (!streamId || !secret) {
      this.reject(client, 'missing stream_id or secret');
      return;
    }

    const auth = await this.streams.authorizeWebsocket(streamId, secret).catch(() => null);
    if (!auth) {
      this.reject(client, 'unauthorized');
      return;
    }

    const socket = client as unknown as SocketLike;
    this.hub.register(streamId, socket);
    client.on('close', () => this.hub.unregister(streamId, socket));
    client.on('error', () => this.hub.unregister(streamId, socket));
    safeSend(client, JSON.stringify({ type: 'connected', stream_id: streamId }));
    this.logger.log(`ws client connected stream=${streamId} org=${auth.orgId}`);
  }

  private reject(client: WebSocket, reason: string): void {
    safeSend(client, JSON.stringify({ type: 'error', reason }));
    // 1008 = policy violation.
    try {
      client.close(1008, reason);
    } catch {
      /* ignore */
    }
  }
}

function headerValue(request: IncomingMessage, name: string): string | undefined {
  const v = request.headers[name];
  return Array.isArray(v) ? v[0] : v;
}

function safeSend(client: WebSocket, text: string): void {
  try {
    client.send(text);
  } catch {
    /* ignore */
  }
}
