import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { SUBJECTS } from '@salychain/events';
import { Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { OutboxService } from '../outbox/outbox.service.js';

@Injectable()
export class MarketplaceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
  ) {}

  private svcId() {
    return `asvc_${ulid()}`;
  }

  private listingId() {
    return `aml_${ulid()}`;
  }

  private subId() {
    return `asub_${ulid()}`;
  }

  private invId() {
    return `ainv_${ulid()}`;
  }

  private meterId() {
    return `umtr_${ulid()}`;
  }

  private async assertAgent(agentId: string) {
    const agent = await this.prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent || agent.status !== 'ACTIVE') {
      throw NotFoundError('agents.marketplace.agent_not_found', 'Active agent not found');
    }
    return agent;
  }

  async publishService(input: {
    agentId: string;
    name: string;
    description?: string;
    priceMinor: string;
    currency: string;
    capability?: Record<string, unknown>;
    tags?: string[];
    listOnMarketplace?: boolean;
  }) {
    await this.assertAgent(input.agentId);
    if (BigInt(input.priceMinor) < 0n) {
      throw ValidationError('agents.service.price', 'price_minor must be non-negative');
    }

    const service = await this.prisma.agentService.create({
      data: {
        id: this.svcId(),
        agentId: input.agentId,
        name: input.name,
        description: input.description ?? null,
        priceMinor: BigInt(input.priceMinor),
        currency: input.currency.toUpperCase(),
        capability: input.capability !== undefined ? (input.capability as Prisma.InputJsonValue) : undefined,
      },
    });

    let listing = null;
    if (input.listOnMarketplace !== false) {
      listing = await this.prisma.agentMarketplaceListing.create({
        data: {
          id: this.listingId(),
          serviceId: service.id,
          tags: (input.tags ?? []) as Prisma.InputJsonValue,
          visible: true,
        },
      });
    }

    await this.outbox.enqueue(SUBJECTS.AGENT_SERVICE_PUBLISHED, {
      agent_id: input.agentId,
      service_id: service.id,
      name: input.name,
    });

    return { service, listing };
  }

  async subscribe(input: {
    serviceId: string;
    subscriberAgentId: string;
    renewAt?: string;
    intentId?: string;
  }) {
    await this.assertAgent(input.subscriberAgentId);
    const service = await this.prisma.agentService.findFirst({
      where: { id: input.serviceId, status: 'ACTIVE' },
    });
    if (!service) throw NotFoundError('agents.service.not_found', 'Service not found');

    const subscription = await this.prisma.agentSubscription.create({
      data: {
        id: this.subId(),
        serviceId: input.serviceId,
        subscriberAgentId: input.subscriberAgentId,
        renewAt: input.renewAt ? new Date(input.renewAt) : null,
        intentId: input.intentId ?? null,
      },
    });

    await this.outbox.enqueue(SUBJECTS.AGENT_SUBSCRIPTION_CREATED, {
      service_id: input.serviceId,
      subscriber_agent_id: input.subscriberAgentId,
      subscription_id: subscription.id,
    });

    return subscription;
  }

  async createInvoice(input: {
    agentId: string;
    payerAgentId: string;
    amountMinor: string;
    currency: string;
    memo?: string;
    intentId?: string;
  }) {
    await this.assertAgent(input.agentId);
    await this.assertAgent(input.payerAgentId);
    if (BigInt(input.amountMinor) <= 0n) {
      throw ValidationError('agents.invoice.amount', 'amount_minor must be positive');
    }

    return this.prisma.agentInvoice.create({
      data: {
        id: this.invId(),
        agentId: input.agentId,
        payerAgentId: input.payerAgentId,
        amountMinor: BigInt(input.amountMinor),
        currency: input.currency.toUpperCase(),
        memo: input.memo ?? null,
        intentId: input.intentId ?? null,
      },
    });
  }

  async recordUsage(input: {
    agentId: string;
    serviceId?: string;
    units: string;
    amountMinor: string;
    currency: string;
    periodStart: string;
    periodEnd: string;
    intentId?: string;
  }) {
    await this.assertAgent(input.agentId);
    const meter = await this.prisma.usageMeter.create({
      data: {
        id: this.meterId(),
        agentId: input.agentId,
        serviceId: input.serviceId ?? null,
        units: BigInt(input.units),
        amountMinor: BigInt(input.amountMinor),
        currency: input.currency.toUpperCase(),
        periodStart: new Date(input.periodStart),
        periodEnd: new Date(input.periodEnd),
        intentId: input.intentId ?? null,
      },
    });

    await this.outbox.enqueue(SUBJECTS.AGENT_USAGE_RECORDED, {
      agent_id: input.agentId,
      meter_id: meter.id,
      amount_minor: input.amountMinor,
    });

    return meter;
  }

  async discover(input?: { tag?: string; limit?: number }) {
    const limit = Math.min(input?.limit ?? 25, 100);
    const listings = await this.prisma.agentMarketplaceListing.findMany({
      where: { visible: true },
      include: {
        service: {
          include: { agent: { select: { id: true, name: true, status: true, orgId: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    if (input?.tag) {
      return {
        data: listings
          .filter((l) => {
            const tags = Array.isArray(l.tags) ? (l.tags as string[]) : [];
            return tags.includes(input.tag!);
          })
          .map((l) => this.serializeListing(l)),
      };
    }
    return { data: listings.map((l) => this.serializeListing(l)) };
  }

  private serializeListing(
    listing: Awaited<ReturnType<typeof this.prisma.agentMarketplaceListing.findMany>>[number] & {
      service: {
        agent: { id: string; name: string; status: string; orgId: string | null };
        priceMinor: bigint;
        createdAt: Date;
      } & Record<string, unknown>;
    },
  ) {
    return {
      id: listing.id,
      serviceId: listing.serviceId,
      tags: listing.tags,
      visible: listing.visible,
      createdAt: listing.createdAt.toISOString(),
      service: {
        id: listing.service.id,
        name: listing.service.name,
        description: listing.service.description,
        priceMinor: listing.service.priceMinor.toString(),
        currency: listing.service.currency,
        agent: listing.service.agent,
      },
    };
  }
}
