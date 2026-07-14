import { Global, Module } from '@nestjs/common';
import { OutboxService } from './outbox.service.js';
import { OutboxRelayService } from './outbox.relay.service.js';

/**
 * Transactional outbox: the store (used by producers to enqueue events inside
 * their DB transactions) and the relay (drains pending rows to NATS). Global so
 * any producer can inject OutboxService without re-importing.
 */
@Global()
@Module({
  providers: [OutboxService, OutboxRelayService],
  exports: [OutboxService],
})
export class OutboxModule {}
