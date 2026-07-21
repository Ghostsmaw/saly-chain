import { describe, expect, it, vi } from 'vitest';
import { AgentsController } from './agents.controller.js';
import type { AuthenticatedRequest, GatewayAuth } from '../auth/auth.types.js';
import type { AgentDto, AgentsClient } from '@salychain/sdk-internal';

function reqWith(auth: Partial<GatewayAuth>): AuthenticatedRequest {
  return {
    auth: {
      correlation_id: 'c1',
      auth_mode: 'api_key',
      principal_id: 'k1',
      scopes: [],
      rate_limit_per_min: 60,
      ...auth,
    } as GatewayAuth,
  } as AuthenticatedRequest;
}

function agent(overrides: Partial<AgentDto> = {}): AgentDto {
  return {
    id: 'agent-1',
    owner_id: 'usr_1',
    owner_kind: 'USER',
    org_id: 'org_a',
    name: 'Agent One',
    status: 'ACTIVE',
    ...overrides,
  } as AgentDto;
}

function controllerWith(a: AgentDto) {
  const client = {
    getById: vi.fn(async () => a),
    getPolicy: vi.fn(async () => ({ id: a.id })),
    updatePolicy: vi.fn(async () => ({ id: a.id })),
    listReasoningLogs: vi.fn(async () => ({ data: [] })),
  } as unknown as AgentsClient;
  return { controller: new AgentsController(client), client };
}

describe('AgentsController — cross-tenant agent access', () => {
  it('allows an API-key caller whose org matches the agent org', async () => {
    const a = agent({ org_id: 'org_a' });
    const { controller } = controllerWith(a);
    const req = reqWith({ auth_mode: 'api_key', org_id: 'org_a' });

    await expect(controller.byId(req, a.id)).resolves.toEqual(a);
    await expect(controller.getPolicy(req, a.id)).resolves.toBeDefined();
  });

  it('rejects an API-key caller from a different org (IDOR regression)', async () => {
    const a = agent({ org_id: 'org_a' });
    const { controller } = controllerWith(a);
    const req = reqWith({ auth_mode: 'api_key', org_id: 'org_b' });

    await expect(controller.byId(req, a.id)).rejects.toThrow(/does not belong/);
    await expect(controller.getPolicy(req, a.id)).rejects.toThrow(/does not belong/);
    await expect(
      controller.updatePolicy(req, a.id, {}),
    ).rejects.toThrow(/does not belong/);
    await expect(controller.reasoningLogs(req, a.id, 10)).rejects.toThrow(/does not belong/);
  });

  it('rejects an API-key caller when the agent has no org on record', async () => {
    const a = agent({ org_id: undefined });
    const { controller } = controllerWith(a);
    const req = reqWith({ auth_mode: 'api_key', org_id: 'org_a' });

    await expect(controller.byId(req, a.id)).rejects.toThrow(/does not belong/);
  });

  it('rejects an API-key caller with no org binding at all', async () => {
    const a = agent({ org_id: 'org_a' });
    const { controller } = controllerWith(a);
    const req = reqWith({ auth_mode: 'api_key', org_id: undefined });

    await expect(controller.byId(req, a.id)).rejects.toThrow(/does not belong/);
  });

  it('allows a JWT caller who owns the agent and has the delegation', async () => {
    const a = agent({ owner_id: 'usr_1' });
    const { controller } = controllerWith(a);
    const req = reqWith({ auth_mode: 'jwt', user_id: 'usr_1', agent_ids: [a.id] });

    await expect(controller.byId(req, a.id)).resolves.toEqual(a);
  });

  it('rejects a JWT caller who does not own the agent', async () => {
    const a = agent({ owner_id: 'usr_1' });
    const { controller } = controllerWith(a);
    const req = reqWith({ auth_mode: 'jwt', user_id: 'usr_2' });

    await expect(controller.byId(req, a.id)).rejects.toThrow(/not delegated to this user/);
  });

  it('rejects a JWT caller who owns the agent but lacks the delegation scope', async () => {
    const a = agent({ owner_id: 'usr_1' });
    const { controller } = controllerWith(a);
    const req = reqWith({ auth_mode: 'jwt', user_id: 'usr_1', agent_ids: ['other-agent'] });

    await expect(controller.byId(req, a.id)).rejects.toThrow(/No delegation/);
  });
});
