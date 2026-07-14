import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

export interface MonitorState {
  last_seen_output_index: string;
  last_emit_at?: string;
  spike_complete: boolean;
  events_emitted: number;
}

export function stateFilePath(stateDir: string): string {
  return resolve(stateDir, 'state.json');
}

export function loadMonitorState(stateDir: string): MonitorState {
  const path = stateFilePath(stateDir);
  if (!existsSync(path)) {
    return { last_seen_output_index: '-1', spike_complete: false, events_emitted: 0 };
  }
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as MonitorState;
  } catch {
    return { last_seen_output_index: '-1', spike_complete: false, events_emitted: 0 };
  }
}

export function saveMonitorState(stateDir: string, state: MonitorState): void {
  mkdirSync(stateDir, { recursive: true });
  writeFileSync(stateFilePath(stateDir), JSON.stringify(state, null, 2));
}

export function startHealthServer(
  port: number,
  getStatus: () => {
    ok: boolean;
    configured: boolean;
    spike_complete: boolean;
    last_seen_output_index: string;
    events_emitted: number;
  },
): ReturnType<typeof createServer> {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url !== '/health') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'not_found' }));
      return;
    }
    const body = getStatus();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  });
  server.listen(port, '127.0.0.1');
  return server;
}

export function defaultStateDir(): string {
  return process.env.L3_MONITOR_STATE_DIR ?? resolve(process.cwd(), '.l3-monitor');
}
