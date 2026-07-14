import { Injectable, Logger } from '@nestjs/common';
import { datastreamsWebsocketConnections } from '@salychain/observability';

/**
 * Minimal contract a connected client must satisfy. `ws.WebSocket` implements
 * it; tests can pass a fake. `readyState === 1` is the OPEN state in the `ws`
 * library (and the browser WebSocket spec).
 */
export interface SocketLike {
  readyState: number;
  send(data: string): void;
  close(code?: number, reason?: string): void;
}

const OPEN = 1;

/**
 * In-memory registry of live dashboard connections, grouped by stream. The
 * WEBSOCKET sink is **best-effort and ephemeral**: there is no delivery row, no
 * retry, and no dead-letter. If no client is connected when an event matches,
 * the event is simply not delivered over this sink (live-tail semantics).
 *
 * Process-local by design: a multi-replica deployment fans a given stream's
 * clients across pods, and each pod independently broadcasts the matches it
 * sees. Because every replica consumes the same NATS subjects, every connected
 * client still receives every match exactly once per delivering pod.
 */
@Injectable()
export class WebsocketHub {
  private readonly logger = new Logger(WebsocketHub.name);
  private readonly byStream = new Map<string, Set<SocketLike>>();

  register(streamId: string, socket: SocketLike): void {
    let set = this.byStream.get(streamId);
    if (!set) {
      set = new Set();
      this.byStream.set(streamId, set);
    }
    set.add(socket);
    datastreamsWebsocketConnections.set(this.totalConnections());
    this.logger.debug?.(`ws connect stream=${streamId} (now ${set.size})`);
  }

  unregister(streamId: string, socket: SocketLike): void {
    const set = this.byStream.get(streamId);
    if (!set) return;
    set.delete(socket);
    if (set.size === 0) this.byStream.delete(streamId);
    datastreamsWebsocketConnections.set(this.totalConnections());
    this.logger.debug?.(`ws disconnect stream=${streamId} (now ${set.size})`);
  }

  connectionCount(streamId: string): number {
    return this.byStream.get(streamId)?.size ?? 0;
  }

  totalConnections(): number {
    let n = 0;
    for (const set of this.byStream.values()) n += set.size;
    return n;
  }

  /**
   * Push a payload to every OPEN client of a stream. Returns the number of
   * clients the message was written to. Dead/closing sockets are pruned.
   */
  broadcast(streamId: string, payload: unknown): number {
    const set = this.byStream.get(streamId);
    if (!set || set.size === 0) return 0;
    const text = JSON.stringify(payload);
    let delivered = 0;
    for (const socket of [...set]) {
      if (socket.readyState !== OPEN) {
        set.delete(socket);
        continue;
      }
      try {
        socket.send(text);
        delivered += 1;
      } catch (err) {
        this.logger.warn(`ws send failed on stream=${streamId}: ${(err as Error).message}`);
        set.delete(socket);
      }
    }
    if (set.size === 0) this.byStream.delete(streamId);
    datastreamsWebsocketConnections.set(this.totalConnections());
    return delivered;
  }

  /** Close every connection for a stream (e.g. when it is paused/deleted). */
  closeStream(streamId: string, code = 1000, reason = 'stream_closed'): void {
    const set = this.byStream.get(streamId);
    if (!set) return;
    for (const socket of set) {
      try {
        socket.close(code, reason);
      } catch {
        /* ignore */
      }
    }
    this.byStream.delete(streamId);
    datastreamsWebsocketConnections.set(this.totalConnections());
  }
}
