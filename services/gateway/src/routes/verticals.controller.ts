import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';
import { enforceOrgScope } from '../auth/org-scope.js';
import { gatewayEnvSchema } from '../config/env.js';
import { loadEnv } from '@salychain/config';

const env = loadEnv(gatewayEnvSchema);

async function proxyPost(baseUrl: string, path: string, body: unknown) {
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function proxyGet(baseUrl: string, path: string) {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json();
}

@ApiTags('verticals')
@Controller()
@UseGuards(ScopeGuard)
export class VerticalsController {
  @Post('finance/instruments')
  @HttpCode(201)
  @RequireScopes('finance:write')
  @ApiOperation({ summary: 'Register financial instrument' })
  financeInstrument(@Req() req: AuthenticatedRequest, @Body() body: Record<string, unknown>) {
    return proxyPost(env.FINANCE_BASE_URL, '/v1/finance/instruments', {
      ...body,
      org_id: enforceOrgScope(req, body.org_id),
    });
  }

  @Get('finance/instruments')
  @RequireScopes('finance:read')
  listFinanceInstruments(@Req() req: AuthenticatedRequest, @Query('limit') limit?: string) {
    const orgId = req.auth?.org_id ?? '';
    return proxyGet(env.FINANCE_BASE_URL, `/v1/finance/instruments?org_id=${encodeURIComponent(orgId)}&limit=${limit ?? '50'}`);
  }

  @Post('gov/programs')
  @HttpCode(201)
  @RequireScopes('gov:write')
  govProgram(@Req() req: AuthenticatedRequest, @Body() body: Record<string, unknown>) {
    return proxyPost(env.GOV_BASE_URL, '/v1/gov/programs', { ...body, org_id: enforceOrgScope(req, body.org_id) });
  }

  @Get('gov/transparency/:programId')
  @RequireScopes('gov:read')
  govTransparency(@Req() req: AuthenticatedRequest, @Param('programId') programId: string) {
    const orgId = req.auth?.org_id ?? '';
    return proxyGet(env.GOV_BASE_URL, `/v1/gov/transparency/${encodeURIComponent(programId)}?org_id=${encodeURIComponent(orgId)}`);
  }

  @Post('agri/lots')
  @HttpCode(201)
  @RequireScopes('agri:write')
  agriLot(@Req() req: AuthenticatedRequest, @Body() body: Record<string, unknown>) {
    return proxyPost(env.AGRI_BASE_URL, '/v1/agri/lots', { ...body, org_id: enforceOrgScope(req, body.org_id) });
  }

  @Get('agri/lots/:id/trace')
  @RequireScopes('agri:read')
  agriTrace(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const orgId = req.auth?.org_id ?? '';
    return proxyGet(env.AGRI_BASE_URL, `/v1/agri/lots/${encodeURIComponent(id)}/trace?org_id=${encodeURIComponent(orgId)}`);
  }

  @Post('scm/shipments')
  @HttpCode(201)
  @RequireScopes('scm:write')
  scmShipment(@Req() req: AuthenticatedRequest, @Body() body: Record<string, unknown>) {
    return proxyPost(env.SCM_BASE_URL, '/v1/scm/shipments', { ...body, org_id: enforceOrgScope(req, body.org_id) });
  }

  @Get('scm/shipments/:id/trace')
  @RequireScopes('scm:read')
  scmTrace(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const orgId = req.auth?.org_id ?? '';
    return proxyGet(env.SCM_BASE_URL, `/v1/scm/shipments/${encodeURIComponent(id)}/trace?org_id=${encodeURIComponent(orgId)}`);
  }

  @Post('aviation/parts')
  @HttpCode(201)
  @RequireScopes('aviation:write')
  aviationPart(@Req() req: AuthenticatedRequest, @Body() body: Record<string, unknown>) {
    return proxyPost(env.AVIATION_BASE_URL, '/v1/aviation/parts', { ...body, org_id: enforceOrgScope(req, body.org_id) });
  }

  @Get('aviation/parts/:serial/history')
  @RequireScopes('aviation:read')
  aviationHistory(@Req() req: AuthenticatedRequest, @Param('serial') serial: string) {
    const orgId = req.auth?.org_id ?? '';
    return proxyGet(env.AVIATION_BASE_URL, `/v1/aviation/parts/${encodeURIComponent(serial)}/history?org_id=${encodeURIComponent(orgId)}`);
  }

  @Post('health/consent')
  @HttpCode(201)
  @RequireScopes('health:write')
  healthConsent(@Req() req: AuthenticatedRequest, @Body() body: Record<string, unknown>) {
    return proxyPost(env.HEALTH_BASE_URL, '/v1/health/consent', { ...body, org_id: enforceOrgScope(req, body.org_id) });
  }

  @Get('health/consent/verify/:id')
  @RequireScopes('health:read')
  healthVerify(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const orgId = req.auth?.org_id ?? '';
    return proxyGet(env.HEALTH_BASE_URL, `/v1/health/consent/verify/${encodeURIComponent(id)}?org_id=${encodeURIComponent(orgId)}`);
  }

  @Post('edu/credentials/issue')
  @HttpCode(201)
  @RequireScopes('edu:write')
  eduCredential(@Req() req: AuthenticatedRequest, @Body() body: Record<string, unknown>) {
    return proxyPost(env.EDU_BASE_URL, '/v1/edu/credentials/issue', { ...body, org_id: enforceOrgScope(req, body.org_id) });
  }

  @Get('edu/credentials/verify/:id')
  @RequireScopes('edu:read')
  eduVerify(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const orgId = req.auth?.org_id ?? '';
    return proxyGet(env.EDU_BASE_URL, `/v1/edu/credentials/verify/${encodeURIComponent(id)}?org_id=${encodeURIComponent(orgId)}`);
  }

  @Get('agents/marketplace/discover')
  @RequireScopes('agents:read')
  discoverAgents(@Query('tag') tag?: string, @Query('limit') limit?: string) {
    const q = new URLSearchParams();
    if (tag) q.set('tag', tag);
    if (limit) q.set('limit', limit);
    return proxyGet(env.AGENTS_BASE_URL, `/v1/agents/marketplace/discover?${q.toString()}`);
  }
}
