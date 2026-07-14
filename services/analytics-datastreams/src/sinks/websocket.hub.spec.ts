import { beforeEach, describe, expect, it } from 'vitest';
import { WebsocketHub, type SocketLike } from './websocket.hub.js';

class FakeSocket implements SocketLike {
  readyState = 1;
  sent: string[] = [];
  closed = false;
  send(data: string): void {
    if (this.readyState !== 1) throw new Error('not open');
    this.sent.push(data);
  }
  close(): void {
    this.closed = true;
    this.readyState = 3;
  }
}

describe('WebsocketHub', () => {
  let hub: WebsocketHub;
  beforeEach(() => {
    hub = new WebsocketHub();
  });

  it('registers and counts connections per stream', () => {
    const a = new FakeSocket();
    const b = new FakeSocket();
    hub.register('s1', a);
    hub.register('s1', b);
    hub.register('s2', new FakeSocket());
    expect(hub.connectionCount('s1')).toBe(2);
    expect(hub.connectionCount('s2')).toBe(1);
    expect(hub.totalConnections()).toBe(3);
  });

  it('broadcasts only to the stream and returns delivered count', () => {
    const a = new FakeSocket();
    const b = new FakeSocket();
    const other = new FakeSocket();
    hub.register('s1', a);
    hub.register('s1', b);
    hub.register('s2', other);

    const delivered = hub.broadcast('s1', { hello: 'world' });
    expect(delivered).toBe(2);
    expect(a.sent).toEqual(['{"hello":"world"}']);
    expect(b.sent).toEqual(['{"hello":"world"}']);
    expect(other.sent).toEqual([]);
  });

  it('returns 0 when no clients are connected (best-effort drop)', () => {
    expect(hub.broadcast('ghost', { x: 1 })).toBe(0);
  });

  it('prunes non-open sockets on broadcast', () => {
    const dead = new FakeSocket();
    dead.readyState = 3; // CLOSED
    const live = new FakeSocket();
    hub.register('s1', dead);
    hub.register('s1', live);

    const delivered = hub.broadcast('s1', { ping: true });
    expect(delivered).toBe(1);
    expect(hub.connectionCount('s1')).toBe(1);
  });

  it('unregister removes the socket and cleans up empty streams', () => {
    const a = new FakeSocket();
    hub.register('s1', a);
    hub.unregister('s1', a);
    expect(hub.connectionCount('s1')).toBe(0);
    expect(hub.totalConnections()).toBe(0);
  });

  it('closeStream closes and drops every client', () => {
    const a = new FakeSocket();
    const b = new FakeSocket();
    hub.register('s1', a);
    hub.register('s1', b);
    hub.closeStream('s1');
    expect(a.closed).toBe(true);
    expect(b.closed).toBe(true);
    expect(hub.connectionCount('s1')).toBe(0);
  });
});
