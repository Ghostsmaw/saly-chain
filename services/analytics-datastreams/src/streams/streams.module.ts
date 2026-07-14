import { Module } from '@nestjs/common';
import { StreamsService } from './streams.service.js';
import { DeliveryService } from '../delivery/delivery.service.js';
import { KafkaSink } from '../sinks/kafka.sink.js';
import { WebsocketHub } from '../sinks/websocket.hub.js';
import { StreamsGateway } from '../sinks/streams.gateway.js';
import { DeliveriesController, StreamsController } from './streams.controller.js';

/**
 * Owns the stream registry, the delivery row lifecycle, and the three sinks
 * (webhook, Kafka, WebSocket). The DeliveryWorker (a long-lived BullMQ consumer)
 * is registered in AppModule so it shares this module's exported providers.
 */
@Module({
  controllers: [StreamsController, DeliveriesController],
  providers: [StreamsService, DeliveryService, KafkaSink, WebsocketHub, StreamsGateway],
  exports: [StreamsService, DeliveryService, KafkaSink, WebsocketHub],
})
export class StreamsModule {}
